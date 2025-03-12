import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchFilterProps {
  className?: string;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  className, 
  onFilterChange,
  activeFilter
}) => {
  return (
    <Tabs 
      defaultValue={activeFilter} 
      className={cn("w-full", className)}
      onValueChange={onFilterChange}
    >
      <TabsList className="grid grid-cols-4 bg-secondary/30">
        <TabsTrigger value="all" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          All
        </TabsTrigger>
        <TabsTrigger value="documents" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          Documents
        </TabsTrigger>
        <TabsTrigger value="images" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          Images
        </TabsTrigger>
        <TabsTrigger value="web" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          Web
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SearchFilter;
