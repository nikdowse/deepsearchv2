import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface SearchResultDetailProps {
  className?: string;
  result: {
    id: string;
    title: string;
    content: string;
    relevance: number;
    source?: string;
    timestamp?: string;
  };
}

const SearchResultDetail: React.FC<SearchResultDetailProps> = ({ className, result }) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{result.title}</h2>
        <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-xs">{Math.round(result.relevance * 100)}% match</span>
        </div>
      </div>
      
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p>{result.content}</p>
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
        {result.source && (
          <span>Source: {result.source}</span>
        )}
        {result.timestamp && (
          <span>Found: {result.timestamp}</span>
        )}
      </div>
    </div>
  );
};

export default SearchResultDetail;
