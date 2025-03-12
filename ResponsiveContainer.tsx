import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  className?: string;
  children: React.ReactNode;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 md:px-8",
      "transition-all duration-300 ease-in-out",
      "max-w-[90rem]",
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
