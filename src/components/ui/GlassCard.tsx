'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
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
    default: 'bg-glass-white border-white/10',
    primary: 'bg-glass-primary border-primary/20',
    secondary: 'bg-glass-secondary border-secondary/20',
    accent: 'bg-glass-accent border-accent/20',
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
        
        // Shadow and depth
        'shadow-glass',
        
        // Glow effect
        glow && variant === 'primary' && 'shadow-glow',
        glow && variant === 'secondary' && 'shadow-glow-secondary',
        glow && variant === 'accent' && 'shadow-glow-accent',
        
        // Hover effects
        hover && 'transition-all duration-300 ease-out',
        hover && 'hover:scale-[1.02] hover:shadow-medium',
        hover && glow && 'hover:shadow-glow-accent',
        
        // Custom classes
        className
      )}
    >
      {/* Glass gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer effect on hover */}
      {hover && (
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        </div>
      )}
    </div>
  );
};

export default GlassCard;
