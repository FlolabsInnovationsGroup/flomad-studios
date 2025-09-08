'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  gradient?: 'primary' | 'secondary' | 'accent' | 'creative';
  interactive?: boolean;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(200px,auto)] gap-4 md:gap-6",
        "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoItem: React.FC<BentoItemProps> = ({
  children,
  className,
  variant = 'medium',
  title,
  description,
  icon,
  gradient = 'primary',
  interactive = true,
}) => {
  const variants = {
    small: 'md:col-span-1 md:row-span-1',
    medium: 'md:col-span-1 md:row-span-2',
    large: 'md:col-span-2 md:row-span-2',
    wide: 'md:col-span-2 md:row-span-1',
    tall: 'md:col-span-1 md:row-span-3',
  };

  const gradients = {
    primary: 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent',
    secondary: 'bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent',
    accent: 'bg-gradient-to-br from-accent/20 via-accent/10 to-transparent',
    creative: 'bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20',
  };

  return (
    <GlassCard
      className={cn(
        'relative overflow-hidden group',
        'transition-all duration-500 ease-out',
        interactive && 'hover:scale-[1.02] hover:shadow-2xl',
        variants[variant],
        className
      )}
      variant="default"
      blur="lg"
      hover={interactive}
    >
      {/* Background gradient */}
      <div className={cn('absolute inset-0 opacity-50', gradients[gradient])} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {(title || icon) && (
          <div className="flex items-center gap-3 mb-4">
            {icon && (
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                {icon}
              </div>
            )}
            {title && (
              <div>
                <h3 className="font-semibold text-lg text-white">{title}</h3>
                {description && (
                  <p className="text-sm text-white/70 mt-1">{description}</p>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1 flex flex-col justify-between">
          {children}
        </div>
      </div>
      
      {/* Interactive shine effect */}
      {interactive && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>
      )}
    </GlassCard>
  );
};

export { BentoGrid, BentoItem };
