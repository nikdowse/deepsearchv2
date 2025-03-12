import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface SearchHistoryItemProps {
  query: string;
  timestamp: Date;
  onClick: () => void;
}

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({ query, timestamp, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors duration-200 flex items-center space-x-2 group"
    >
      <Sparkles className="h-3 w-3 text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{query}</p>
        <p className="text-xs text-muted-foreground">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </button>
  );
};

interface SearchHistoryProps {
  className?: string;
  history: Array<{ id: string; query: string; timestamp: Date }>;
  onSelectQuery: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ className, history, onSelectQuery }) => {
  if (history.length === 0) return null;
  
  return (
    <div className={cn("space-y-1", className)}>
      <h3 className="text-xs font-medium text-muted-foreground px-3 mb-2">Recent Searches</h3>
      <div className="space-y-1">
        {history.map((item) => (
          <SearchHistoryItem
            key={item.id}
            query={item.query}
            timestamp={item.timestamp}
            onClick={() => onSelectQuery(item.query)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
