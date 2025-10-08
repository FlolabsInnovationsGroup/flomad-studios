'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Play, Sparkles } from 'lucide-react';
import { SkyButton, GhostButton } from './EnhancedButton';
import Link from 'next/link';

interface EnhancedHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  videoId?: string;
  className?: string;
  showScrollIndicator?: boolean;
  animated?: boolean;
}

export default function EnhancedHero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  videoId,
  className,
  showScrollIndicator = true,
  animated = true
}: EnhancedHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const titleWords = title.split(' ');

  return (
    <section 
      className={cn(
        "relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Floating particles - only render after mount to avoid hydration mismatch */}
      {animated && isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gray-600/30 dark:bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive light beam - only render after mount to avoid hydration mismatch */}
      {animated && isMounted && (
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}
        />
      )}

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Subtitle */}
        {subtitle && (
          <motion.div
            initial={animated ? { opacity: 0, y: 20 } : {}}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/20 text-sky-800 dark:text-sky-300 font-medium">
              <Sparkles className="w-4 h-4" />
              {subtitle}
            </span>
          </motion.div>
        )}

        {/* Main Title */}
        <div className="mb-8">
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              initial={animated ? { opacity: 0, y: 50 } : {}}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: animated ? 0.4 + index * 0.1 : 0,
                ease: [0.25, 0.25, 0, 1]
              }}
              className="inline-block mr-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white leading-tight bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 dark:from-white dark:via-blue-100 dark:to-cyan-100 bg-clip-text text-transparent drop-shadow-lg"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Description */}
        {description && (
          <motion.p
            initial={animated ? { opacity: 0, y: 20 } : {}}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: animated ? 0.8 : 0 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {/* Action Buttons */}
        {(primaryAction || secondaryAction) && (
          <motion.div
            initial={animated ? { opacity: 0, y: 30 } : {}}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: animated ? 1 : 0 }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${showScrollIndicator ? 'mb-24' : 'mb-16'}`}
          >
            {primaryAction && (
              primaryAction.href ? (
                <Link href={primaryAction.href}>
                  <SkyButton
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {primaryAction.label}
                  </SkyButton>
                </Link>
              ) : (
                <SkyButton
                  size="lg"
                  onClick={primaryAction.onClick}
                  className="w-full sm:w-auto"
                >
                  {primaryAction.label}
                </SkyButton>
              )
            )}
            
            {secondaryAction && (
              secondaryAction.href ? (
                <Link href={secondaryAction.href}>
                  <GhostButton
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Play className="w-5 h-5" />
                    {secondaryAction.label}
                  </GhostButton>
                </Link>
              ) : (
                <GhostButton
                  size="lg"
                  onClick={secondaryAction.onClick}
                  className="w-full sm:w-auto"
                >
                  <Play className="w-5 h-5" />
                  {secondaryAction.label}
                </GhostButton>
              )
            )}
          </motion.div>
        )}

        {/* Video Preview */}
        {videoId && (
          <motion.div
            initial={animated ? { opacity: 0, scale: 0.9 } : {}}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: animated ? 1.2 : 0 }}
            className={`relative max-w-4xl mx-auto ${showScrollIndicator ? 'mb-24' : 'mb-16'}`}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 backdrop-blur-xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-blue-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-gray-800/20 dark:bg-white/20 backdrop-blur-xl border border-gray-600/30 dark:border-white/30 flex items-center justify-center group hover:bg-gray-800/30 dark:hover:bg-white/30 transition-colors"
                >
                  <Play className="w-8 h-8 text-gray-800 dark:text-white ml-1 group-hover:scale-110 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            initial={animated ? { opacity: 0 } : {}}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: animated ? 1.4 : 0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-gray-700 dark:text-white/60 cursor-pointer hover:text-gray-900 dark:hover:text-white/80 transition-colors"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20 dark:from-black/20 dark:via-transparent dark:to-black/40 pointer-events-none" />
    </section>
  );
}

// Specialized variants for different sections
interface Product {
  name: string;
  description: string;
  link?: string;
}

interface Service {
  title: string;
  description: string;
}

export function ProductHero({ product, ...props }: { product: Product } & Omit<EnhancedHeroProps, 'title' | 'description'>) {
  return (
    <EnhancedHero
      title={product.name}
      description={product.description}
      primaryAction={{
        label: "Get Started",
        onClick: () => window.open(product.link, '_blank')
      }}
      secondaryAction={{
        label: "Watch Demo",
        onClick: () => {}
      }}
      {...props}
    />
  );
}

export function ServiceHero({ service, ...props }: { service: Service } & Omit<EnhancedHeroProps, 'title' | 'description'>) {
  return (
    <EnhancedHero
      title={service.title}
      description={service.description}
      primaryAction={{
        label: "Learn More",
        onClick: () => {}
      }}
      {...props}
    />
  );
}