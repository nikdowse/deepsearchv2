'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-xl font-medium mb-2">Something went wrong</h2>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        {error.message || 'An unexpected error occurred while loading jina-deepsearch-v1.'}
      </p>
      <Button onClick={reset} className="bg-primary hover:bg-primary/80 transition-all duration-300">
        Try again
      </Button>
    </div>
  );
}
