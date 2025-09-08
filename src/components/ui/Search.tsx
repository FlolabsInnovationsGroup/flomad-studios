'use client';

import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md hover:bg-background-surface transition-colors"
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="p-2 flex items-center gap-2 border-b border-border">
            <SearchIcon className="h-5 w-5 text-foreground-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos, podcasts..."
              className="flex-1 bg-transparent border-none outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md hover:bg-background-surface transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="p-2">
            {query ? (
              <div className="text-sm text-foreground-muted">
                Searching for &ldquo;{query}&rdquo;...
              </div>
            ) : (
              <div className="text-sm text-foreground-muted">
                Start typing to search...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 