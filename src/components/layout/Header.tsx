'use client';

import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import MobileNavMenu from '../ui/MobileNavMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-glass border-b border-white/10" 
          : "bg-background/40 backdrop-blur-lg border-b border-white/5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            {/* Your Original Logo */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/flomadlogo.svg"
                alt="Flomad Studios Logo"
                width={40}
                height={40}
                className="transition-transform group-hover:scale-105 drop-shadow-sm"
              />
            </div>
            
            {/* Brand Text */}
            <div className="relative">
              <span className="text-xl font-bold text-white drop-shadow-sm">
                Flomad Studios
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Navigation />
            <MobileNavMenu />
          </div>
        </div>
      </div>
      
      {/* Animated glow effect */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent transition-opacity duration-300 shadow-glow",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
} 