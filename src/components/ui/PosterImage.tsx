'use client';

import { useEffect, useRef } from 'react';

interface PosterImageProps {
  src: string;
  className?: string;
  alt?: string;
}

export default function PosterImage({ src, className = '', alt = '' }: PosterImageProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && src) {
      divRef.current.style.backgroundImage = `url(${src})`;
    }
  }, [src]);

  return (
    <div
      ref={divRef}
      className={className}
      role="img"
      aria-label={alt}
    />
  );
}
