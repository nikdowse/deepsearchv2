import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} jina-deepsearch-v1. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Powered by Jina AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
