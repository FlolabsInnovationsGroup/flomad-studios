'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type SectionBackdrop = 'default' | 'subtle' | 'intense' | 'none';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  backdrop?: SectionBackdrop;
}

export default function Section({ children, className, backdrop, ...props }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if this section has parallax classes
    const section = sectionRef.current;
    if (!section) return;
    
    const isParallax = section.classList.contains('parallax-container');
    if (!isParallax) return;

    const isSlow = section.classList.contains('parallax-slow');
    const isMedium = section.classList.contains('parallax-medium');
    const isFast = section.classList.contains('parallax-fast');
    
    let speed = 0.05; // default speed
    if (isSlow) speed = 0.03;
    if (isMedium) speed = 0.05;
    if (isFast) speed = 0.08;

    const handleParallax = () => {
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax when section is in view
      if (
        scrollY + viewportHeight > sectionTop &&
        scrollY < sectionTop + sectionHeight
      ) {
        const translateY = (scrollY - sectionTop) * speed;
        section.style.transform = `translateY(${translateY}px)`;
      }
    };

    // Only add event listener if this is a parallax section
    window.addEventListener('scroll', handleParallax);
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  const resolvedBackdrop = backdrop && backdrop !== 'none' ? backdrop : (backdrop === 'none' ? null : 'default');
  const backdropClass = resolvedBackdrop && resolvedBackdrop !== 'default'
    ? `section-backdrop--${resolvedBackdrop}`
    : undefined;

  return (
    <section
      ref={sectionRef}
      className={cn('py-16 px-4 relative overflow-hidden', className)}
      {...props}
    >
      {resolvedBackdrop && (
        <div
          aria-hidden="true"
          className={cn('section-backdrop', backdropClass)}
        />
      )}
      {children}
    </section>
  );
}
