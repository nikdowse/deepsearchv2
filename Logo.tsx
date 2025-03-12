import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute inset-1 bg-blue-400 rounded-full opacity-40"></div>
        <div className="absolute inset-2 bg-blue-300 rounded-full opacity-60"></div>
        <div className="absolute inset-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full"></div>
      </div>
      <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        jina-deepsearch-v1
      </span>
    </div>
  );
};

export default Logo;
