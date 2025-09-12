'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'sky';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  glow?: boolean;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  glow = false,
}) => {
  const variants = {
    default: 'glass border-border text-foreground hover:bg-primary/10',
    primary: 'bg-glass-primary border-primary/30 text-foreground hover:bg-primary/20',
    secondary: 'bg-glass-secondary border-secondary/30 text-foreground hover:bg-secondary/20',
    accent: 'bg-glass-accent border-accent/30 text-foreground hover:bg-accent/20',
    ghost: 'bg-transparent border-transparent text-foreground hover:bg-primary/10',
    sky: 'glass-sky border-primary/20 text-foreground hover:bg-primary/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center',
        'font-medium rounded-xl border',
        'backdrop-blur-md',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Glow effects - enhanced for sky theme
        glow && variant === 'primary' && 'shadow-glow',
        glow && variant === 'secondary' && 'shadow-glow-secondary',
        glow && variant === 'accent' && 'shadow-glow-accent',
        glow && variant === 'sky' && 'shadow-[0_0_20px_rgba(3,105,161,0.4)]',
        
        // Hover and active states
        'hover:scale-[1.02] hover:shadow-medium',
        'active:scale-[0.98]',
        
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        
        // Custom classes
        className
      )}
    >
      {/* Enhanced glass gradient overlay for theme consistency */}
      <div className={cn(
        "absolute inset-0 rounded-xl pointer-events-none",
        variant === 'sky' 
          ? "bg-gradient-to-br from-white/15 to-primary/5 dark:from-primary-900/20 dark:to-transparent" 
          : "bg-gradient-to-br from-white/10 to-white/5"
      )} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Enhanced shimmer effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className={cn(
          "absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-out skew-x-12",
          variant === 'sky' 
            ? "bg-gradient-to-r from-transparent via-primary/20 to-transparent" 
            : "bg-gradient-to-r from-transparent via-white/20 to-transparent"
        )} />
      </div>
    </button>
  );
};

export default GlassButton;
