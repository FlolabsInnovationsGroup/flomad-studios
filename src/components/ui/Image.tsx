'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Loading from './Loading';

interface ImageProps extends React.ComponentProps<typeof Image> {
  containerClassName?: string;
  showLoadingState?: boolean;
}

export default function OptimizedImage({
  containerClassName,
  className,
  showLoadingState = true,
  alt = '',
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background-surface">
          <Loading size="sm" />
        </div>
      )}
      <Image
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
          className
        )}
        onLoad={() => setIsLoading(false)}
        alt={alt}
        {...props}
      />
    </div>
  );
} 