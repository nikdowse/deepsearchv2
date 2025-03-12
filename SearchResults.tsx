import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  relevance: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-secondary/30 border-secondary/50 overflow-hidden">
            <CardContent className="p-4">
              <div className="h-6 w-1/3 bg-secondary/70 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-secondary/50 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-5/6 bg-secondary/50 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
      {results.map((result) => (
        <Card 
          key={result.id} 
          className="bg-secondary/30 border-secondary/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-secondary/40"
        >
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-foreground mb-2">{result.title}</h3>
            <p className="text-sm text-muted-foreground">{result.content}</p>
            <div className="mt-2 flex items-center">
              <div className="h-1 bg-primary/30 rounded-full w-24">
                <div 
                  className="h-1 bg-primary rounded-full" 
                  style={{ width: `${result.relevance * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs text-muted-foreground">
                {Math.round(result.relevance * 100)}% relevant
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
