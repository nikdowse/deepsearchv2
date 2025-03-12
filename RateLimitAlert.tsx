import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface RateLimitAlertProps {
  className?: string;
  isVisible: boolean;
  onClose: () => void;
}

const RateLimitAlert: React.FC<RateLimitAlertProps> = ({ className, isVisible, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div className={cn(
      "fixed bottom-4 right-4 max-w-sm bg-secondary/80 backdrop-blur-sm border border-destructive/50 rounded-lg p-4 shadow-lg",
      "transform transition-all duration-300 ease-in-out",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
      className
    )}>
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-medium text-sm">Rate limit reached</h4>
          <p className="text-xs text-muted-foreground mt-1">
            You've reached the limit of 3 requests per minute. Add your Jina API key in settings for higher limits.
          </p>
          <button 
            onClick={onClose}
            className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateLimitAlert;
