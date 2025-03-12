'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/layout/Logo';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';
import SearchAnimation from '@/components/animation/SearchAnimation';
import ThinkingAnimation from '@/components/animation/ThinkingAnimation';
import ApiKeySettings from '@/components/settings/ApiKeySettings';
import FileUpload from '@/components/upload/FileUpload';
import SearchStatus from '@/components/search/SearchStatus';
import SearchFilter from '@/components/search/SearchFilter';
import RateLimitAlert from '@/components/search/RateLimitAlert';
import QueryManager from '@/components/search/QueryManager';
import PaginationControls from '@/components/search/PaginationControls';
import SearchHistory from '@/components/search/SearchHistory';
import SearchServiceProvider, { useSearchService } from '@/components/search/SearchService';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function SearchInterface() {
  const searchService = useSearchService();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [useApiKey, setUseApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showRateLimitAlert, setShowRateLimitAlert] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchHistory, setSearchHistory] = useState<Array<{id: string; query: string; timestamp: Date}>>([]);
  const [requestsRemaining, setRequestsRemaining] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update search service when API key changes
  useEffect(() => {
    searchService.setApiKey(useApiKey ? apiKey : null);
  }, [searchService, useApiKey, apiKey]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchResults([]);
    
    // Add to search history
    const newHistoryItem = {
      id: Date.now().toString(),
      query,
      timestamp: new Date()
    };
    
    setSearchHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
    
    // Reset pagination
    setCurrentPage(1);
    
    // Close mobile sidebar if open
    setIsSidebarOpen(false);
    
    try {
      // Perform search with files if any are uploaded
      const response = uploadedFiles.length > 0 
        ? await searchService.searchWithFiles(query, uploadedFiles)
        : await searchService.search(query);
      
      setSearchResults(response.results);
      
      // Update requests remaining if not using API key
      if (!useApiKey) {
        setRequestsRemaining(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Search error:', error);
      
      // Check if it's a rate limit error
      if (!useApiKey && requestsRemaining <= 0) {
        setShowRateLimitAlert(true);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
  };

  const handleToggleUseApiKey = (use: boolean) => {
    setUseApiKey(use);
    if (!use) {
      setApiKey('');
      setRequestsRemaining(3);
    }
  };
  
  const handleRateLimitReached = () => {
    setShowRateLimitAlert(true);
  };
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // In a real implementation, this would filter the results
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real implementation, this would fetch the next page of results
  };
  
  const handleSelectFromHistory = (query: string) => {
    handleSearch(query);
    // Close mobile sidebar if open
    setIsSidebarOpen(false);
  };

  // Sidebar content component for reuse
  const SidebarContent = () => (
    <div className="space-y-6">
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-secondary/30 border-secondary/50 hover:bg-secondary/50 transition-all duration-300"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-background border-border sm:max-w-[425px]">
          <ApiKeySettings 
            onSaveApiKey={handleSaveApiKey}
            useApiKey={useApiKey}
            onToggleUseApiKey={handleToggleUseApiKey}
          />
        </DialogContent>
      </Dialog>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Upload Files</h3>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
      
      <SearchStatus 
        isSearching={isSearching} 
        requestsRemaining={requestsRemaining}
        useApiKey={useApiKey}
      />
      
      <SearchHistory 
        history={searchHistory}
        onSelectQuery={handleSelectFromHistory}
      />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <ResponsiveContainer className="py-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <Logo className="mb-4" />
            <p className="text-muted-foreground text-center max-w-md px-4">
              Advanced AI-powered deep search capabilities with semantic understanding and contextual awareness.
            </p>
          </div>
          
          <QueryManager 
            useApiKey={useApiKey} 
            apiKey={apiKey} 
            onRateLimitReached={handleRateLimitReached}
          >
            {(executeQuery) => (
              <>
                {/* Mobile view */}
                <div className="block md:hidden mb-6">
                  <SearchBar 
                    onSearch={handleSearch} 
                    isSearching={isSearching} 
                  />
                  
                  <div className="mt-4 flex justify-center">
                    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="bg-secondary/30 border-secondary/50 hover:bg-secondary/50 transition-all duration-300"
                        >
                          <Menu className="h-4 w-4 mr-2" />
                          Options
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[85%] sm:w-[350px] bg-background border-border">
                        <div className="py-4">
                          <SidebarContent />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
                
                {/* Desktop view */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="hidden md:block md:col-span-1">
                    <SidebarContent />
                  </div>
                  
                  <div className="md:col-span-3 space-y-6">
                    {/* Search bar only shown on desktop, already shown above for mobile */}
                    <div className="hidden md:block">
                      <SearchBar 
                        onSearch={handleSearch} 
                        isSearching={isSearching} 
                      />
                    </div>
                    
                    {isSearching ? (
                      <>
                        <ThinkingAnimation isActive={isSearching} />
                        <SearchAnimation isSearching={isSearching} />
                      </>
                    ) : searchResults.length > 0 && (
                      <>
                        <SearchFilter 
                          activeFilter={activeFilter}
                          onFilterChange={handleFilterChange}
                        />
                        <SearchResults 
                          results={searchResults} 
                          isLoading={isSearching} 
                        />
                        <PaginationControls 
                          currentPage={currentPage}
                          totalPages={3} // Mock total pages
                          onPageChange={handlePageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </QueryManager>
        </ResponsiveContainer>
      </main>
      
      <Footer />
      
      <RateLimitAlert 
        isVisible={showRateLimitAlert} 
        onClose={() => setShowRateLimitAlert(false)} 
      />
    </div>
  );
}

export default function Home() {
  return (
    <SearchServiceProvider>
      <SearchInterface />
    </SearchServiceProvider>
  );
}
