import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ThinkingAnimationProps {
  className?: string;
  isActive: boolean;
}

const ThinkingAnimation: React.FC<ThinkingAnimationProps> = ({ className, isActive }) => {
  if (!isActive) return null;
  
  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)}>
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping"></div>
        <div className="absolute inset-4 rounded-full bg-primary/10 animate-pulse"></div>
      </div>
      
      <div className="flex space-x-2 mt-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">Deep searching...</p>
    </div>
  );
};

export default ThinkingAnimation;
