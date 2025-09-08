'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost';
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
    default: 'bg-glass-white border-white/20 text-foreground hover:bg-white/20',
    primary: 'bg-glass-primary border-blue-500/30 text-white hover:bg-blue-500/20',
    secondary: 'bg-glass-secondary border-cyan-500/30 text-white hover:bg-cyan-500/20',
    accent: 'bg-glass-accent border-amber-500/30 text-white hover:bg-amber-500/20',
    ghost: 'bg-transparent border-transparent text-foreground hover:bg-white/10',
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
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Glow effects
        glow && variant === 'primary' && 'shadow-glow',
        glow && variant === 'secondary' && 'shadow-glow-secondary',
        glow && variant === 'accent' && 'shadow-glow-accent',
        
        // Hover and active states
        'hover:scale-[1.02] hover:shadow-medium',
        'active:scale-[0.98]',
        
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        
        // Custom classes
        className
      )}
    >
      {/* Glass gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </div>
    </button>
  );
};

export default GlassButton;
