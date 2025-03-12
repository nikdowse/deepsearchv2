'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
        <Search className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-medium mb-2">Page Not Found</h2>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button className="bg-primary hover:bg-primary/80 transition-all duration-300">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
