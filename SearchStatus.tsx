import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface SearchStatusProps {
  isSearching: boolean;
  requestsRemaining?: number;
  className?: string;
  useApiKey: boolean;
}

const SearchStatus: React.FC<SearchStatusProps> = ({ 
  isSearching, 
  requestsRemaining = 3,
  className,
  useApiKey
}) => {
  return (
    <div className={cn("flex items-center justify-between text-xs text-muted-foreground p-2 rounded-md bg-secondary/20", className)}>
      <div className="flex items-center space-x-2">
        {isSearching ? (
          <>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Searching...</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Ready</span>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        {useApiKey ? (
          <>
            <Sparkles className="h-3 w-3 text-blue-400" />
            <span>Using API key</span>
          </>
        ) : (
          <>
            <span>{requestsRemaining} requests remaining</span>
            <span className="text-[10px] opacity-70">per minute</span>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchStatus;
