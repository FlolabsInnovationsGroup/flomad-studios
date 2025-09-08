'use client';

import React, { useEffect, useRef } from 'react';

interface NoTooltipProps {
  children: React.ReactNode;
}

/**
 * NoTooltip component - wraps children and removes any title attributes 
 * to prevent default browser tooltips from appearing
 */
export function NoTooltip({ children }: NoTooltipProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Function to remove title attributes
    const removeTitles = (element: HTMLElement) => {
      if (element.hasAttribute('title')) {
        element.removeAttribute('title');
      }

      // Process all child elements recursively
      Array.from(element.children).forEach(child => {
        removeTitles(child as HTMLElement);
      });
    };

    // Initial removal
    removeTitles(containerRef.current);

    // Set up mutation observer to handle dynamically added elements
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'title') {
          (mutation.target as HTMLElement).removeAttribute('title');
        }

        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              removeTitles(node as HTMLElement);
            }
          });
        }
      });
    });

    // Start observing the container
    observer.observe(containerRef.current, {
      attributes: true,
      attributeFilter: ['title'],
      childList: true,
      subtree: true
    });

    // Clean up observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
}

export default NoTooltip; 