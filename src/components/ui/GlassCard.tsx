'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'sky';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  glow?: boolean;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  blur = 'md',
  border = true,
  glow = false,
  hover = true,
}) => {
  const variants = {
    default: 'glass',
    primary: 'bg-glass-primary border-primary/20',
    secondary: 'bg-glass-secondary border-secondary/20',
    accent: 'bg-glass-accent border-accent/20',
    sky: 'glass-sky border-sky-500/15',
  };

  const blurLevels = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  return (
    <div
      className={cn(
        // Base glassmorphism styles
        'relative rounded-xl p-6',
        blurLevels[blur],
        variants[variant],
        
        // Border
        border && 'border border-opacity-20',
        
        // Shadow and depth - enhanced for sky theme
        variant === 'sky' ? 'shadow-lg' : 'shadow-glass',
        
        // Glow effect - updated for sky theme
        glow && variant === 'primary' && 'shadow-glow',
        glow && variant === 'secondary' && 'shadow-glow-secondary',
        glow && variant === 'accent' && 'shadow-glow-accent',
        glow && variant === 'sky' && 'shadow-[0_0_20px_rgba(3,105,161,0.3)]',
        
        // Hover effects
        hover && 'transition-all duration-300 ease-out',
        hover && 'hover:scale-[1.02] hover:shadow-medium',
        hover && glow && variant === 'sky' && 'hover:shadow-[0_0_25px_rgba(3,105,161,0.4)]',
        hover && glow && variant !== 'sky' && 'hover:shadow-glow-accent',
        
        // Custom classes
        className
      )}
    >
      {/* Enhanced glass gradient overlay for sky theme */}
      <div className={cn(
        "absolute inset-0 rounded-xl pointer-events-none",
        variant === 'sky' 
          ? "bg-gradient-to-br from-white/15 to-sky-100/10 dark:from-sky-900/20 dark:to-transparent" 
          : "bg-gradient-to-br from-white/10 to-white/5"
      )} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Enhanced shimmer effect */}
      {hover && (
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className={cn(
            "absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-out skew-x-12",
            variant === 'sky' 
              ? "bg-gradient-to-r from-transparent via-sky-200/20 to-transparent dark:via-sky-400/10" 
              : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
          )} />
        </div>
      )}
    </div>
  );
};

export default GlassCard;
