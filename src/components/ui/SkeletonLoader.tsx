'use client';

import { motion, cubicBezier } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar';
  animation?: 'pulse' | 'wave' | 'shimmer';
  lines?: number;
  style?: React.CSSProperties;
}

export function Skeleton({ 
  className, 
  variant = 'rectangular',
  animation = 'shimmer',
  lines = 1,
  style
}: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-slate-200/60 via-slate-300/80 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/80 dark:to-slate-700/60";
  
  const variantClasses = {
    text: "h-4 rounded-md",
    circular: "rounded-full aspect-square",
    rectangular: "rounded-lg",
    card: "rounded-xl",
    avatar: "rounded-full w-10 h-10"
  };

  const shimmerAnimation = {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      ease: cubicBezier(0, 0, 1, 1), // linear
      repeat: Infinity
    }
  };

  const pulseAnimation = {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.42, 0, 0.58, 1), // easeInOut
      repeat: Infinity
    }
  };

  const waveAnimation = {
    transform: ['translateX(-100%)', 'translateX(100%)'],
    transition: {
      duration: 1.5,
      ease: cubicBezier(0, 0, 1, 1), // linear
      repeat: Infinity
    }
  };

  const getAnimation = () => {
    switch (animation) {
      case 'pulse': return pulseAnimation;
      case 'wave': return waveAnimation;
      case 'shimmer': return shimmerAnimation;
      default: return shimmerAnimation;
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              baseClasses,
              variantClasses[variant],
              index === lines - 1 && "w-3/4", // Last line shorter
              className
            )}
            animate={getAnimation()}
            style={{
              ...(animation === 'shimmer' ? {
                backgroundSize: '400% 100%',
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
              } : {}),
              ...style
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      animate={getAnimation()}
      style={{
        ...(animation === 'shimmer' ? {
          backgroundSize: '400% 100%',
          backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
        } : {}),
        ...style
      }}
    />
  );
}

// Pre-built skeleton components for common use cases
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <Skeleton variant="rectangular" className="h-48" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-6 w-3/4" />
        <Skeleton variant="text" lines={2} className="h-4" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton variant="avatar" />
        <div className="space-y-1">
          <Skeleton variant="text" className="h-4 w-24" />
          <Skeleton variant="text" className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <Skeleton variant="text" className="h-8 w-64" />
          <Skeleton variant="text" className="h-5 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rectangular" className="h-10 w-32" />
          <Skeleton variant="rectangular" className="h-10 w-28" />
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-800/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton variant="text" className="h-4 w-20" />
              <Skeleton variant="circular" className="w-8 h-8" />
            </div>
            <Skeleton variant="text" className="h-8 w-16 mb-2" />
            <Skeleton variant="text" className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-800/40 p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton variant="text" className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton variant="rectangular" className="h-8 w-16" />
            <Skeleton variant="rectangular" className="h-8 w-16" />
            <Skeleton variant="rectangular" className="h-8 w-16" />
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton 
              key={i} 
              variant="rectangular" 
              className="flex-1"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
          ))}
        </div>
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-800/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" className="w-5 h-5" />
                <Skeleton variant="text" className="h-5 w-24" />
              </div>
              <Skeleton variant="rectangular" className="h-8 w-16" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="p-2">
                  <div className="flex justify-between mb-1">
                    <Skeleton variant="text" className="h-4 w-32" />
                    <Skeleton variant="rectangular" className="h-5 w-16 rounded-full" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton variant="text" className="h-3 w-20" />
                    <Skeleton variant="text" className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton variant="rectangular" className="h-10 w-full mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Skeleton variant="text" className="h-12 w-3/4 mx-auto" />
          <Skeleton variant="text" className="h-6 w-1/2 mx-auto" />
          <div className="flex items-center justify-center gap-4">
            <Skeleton variant="avatar" />
            <div className="space-y-2">
              <Skeleton variant="text" className="h-4 w-24" />
              <Skeleton variant="text" className="h-3 w-20" />
            </div>
          </div>
        </div>

        {/* Featured image */}
        <Skeleton variant="rectangular" className="h-64 w-full" />

        {/* Content */}
        <div className="space-y-4">
          <Skeleton variant="text" lines={3} />
          <Skeleton variant="text" lines={4} />
          <Skeleton variant="rectangular" className="h-32 w-full" />
          <Skeleton variant="text" lines={3} />
          <Skeleton variant="text" lines={2} />
        </div>
      </div>
    </article>
  );
}