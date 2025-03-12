import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Ask anything or upload a file..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-12 bg-secondary/50 border-secondary focus-visible:ring-primary transition-all duration-300"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-1 bg-primary hover:bg-primary/80 transition-all duration-300"
          disabled={isSearching}
        >
          <Search className={`h-4 w-4 ${isSearching ? 'animate-spin' : ''}`} />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
