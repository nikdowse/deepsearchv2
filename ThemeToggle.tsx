import React from 'react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  // Since we're using a dark theme only, this is just a visual element
  // that doesn't actually toggle the theme
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-10 h-5 bg-secondary/50 rounded-full relative">
        <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-primary transition-transform duration-300"></div>
      </div>
      <span className="text-xs text-muted-foreground">Dark Mode</span>
    </div>
  );
};

export default ThemeToggle;
