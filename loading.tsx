import React from 'react';
import ThinkingAnimation from '@/components/animation/ThinkingAnimation';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <ThinkingAnimation isActive={true} />
      <p className="text-muted-foreground text-center mt-4">Loading jina-deepsearch-v1...</p>
    </div>
  );
}
