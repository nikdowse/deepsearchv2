import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface QueryManagerProps {
  className?: string;
  useApiKey: boolean;
  apiKey: string | null;
  onRateLimitReached: () => void;
  children: (executeQuery: (query: string, files?: File[]) => Promise<any>) => React.ReactNode;
}

const QueryManager: React.FC<QueryManagerProps> = ({ 
  className, 
  useApiKey, 
  apiKey, 
  onRateLimitReached,
  children 
}) => {
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Reset request count every minute if not using API key
  useEffect(() => {
    if (!useApiKey) {
      const timer = setInterval(() => {
        const now = Date.now();
        if (now - lastRequestTime >= 60000) {
          setRequestCount(0);
        }
      }, 5000);
      
      return () => {
        clearInterval(timer);
      };
    }
    
    return () => {};
  }, [useApiKey, lastRequestTime]);
  
  const executeQuery = async (query: string, files?: File[]) => {
    const now = Date.now();
    
    // If using API key, no rate limiting
    if (useApiKey && apiKey) {
      // Here we would use the API key for the request
      console.log(`Executing query with API key: ${query}`);
      
      // Mock API response
      return mockApiResponse(query);
    }
    
    // Without API key, limit to 3 requests per minute
    if (requestCount >= 3) {
      // Check if a minute has passed since the first request
      if (now - lastRequestTime < 60000) {
        onRateLimitReached();
        return null;
      }
      
      // Reset counter if a minute has passed
      setRequestCount(1);
      setLastRequestTime(now);
    } else {
      // Increment counter
      setRequestCount(prev => prev + 1);
      if (requestCount === 0) {
        setLastRequestTime(now);
      }
    }
    
    console.log(`Executing query without API key: ${query}, count: ${requestCount + 1}`);
    
    // Mock API response
    return mockApiResponse(query);
  };
  
  // Mock API response for demonstration
  const mockApiResponse = (query: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          results: [
            {
              id: '1',
              title: `Result for "${query}"`,
              content: `This is a mock result for the query "${query}". In a real implementation, this would be actual search results from the Jina API.`,
              relevance: Math.random() * 0.5 + 0.5, // Random relevance between 0.5 and 1.0
              source: 'Mock Database',
              timestamp: new Date().toISOString()
            },
            {
              id: '2',
              title: `Secondary match for "${query}"`,
              content: `Another mock result showing how multiple items would be displayed for the query "${query}".`,
              relevance: Math.random() * 0.4 + 0.3, // Random relevance between 0.3 and 0.7
              source: 'Mock Database',
              timestamp: new Date().toISOString()
            },
            {
              id: '3',
              title: `Related information to "${query}"`,
              content: `Additional context and information that might be relevant to the search query "${query}".`,
              relevance: Math.random() * 0.3 + 0.2, // Random relevance between 0.2 and 0.5
              source: 'Mock Database',
              timestamp: new Date().toISOString()
            }
          ],
          metadata: {
            totalResults: 3,
            processingTime: Math.random() * 1000 + 500, // Random time between 500ms and 1500ms
            queryMode: useApiKey && apiKey ? 'api_key' : 'limited'
          }
        });
      }, 2000);
    });
  };
  
  return (
    <div className={cn("", className)}>
      {children(executeQuery)}
    </div>
  );
};

export default QueryManager;
