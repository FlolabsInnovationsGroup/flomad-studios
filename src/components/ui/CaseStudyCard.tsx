'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar } from 'lucide-react';
import GlassCard from './GlassCard';

interface CaseStudyCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  url?: string;
  status: 'live' | 'coming-soon' | 'in-development';
  tools: string[];
  features?: string[];
  date?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  className?: string;
  size?: 'default' | 'featured';
}

export default function CaseStudyCard({
  title,
  description,
  category,
  image,
  url,
  status,
  tools,
  features,
  date,
  metrics,
  className = '',
  size = 'default'
}: CaseStudyCardProps) {
  const isClickable = status === 'live' && url;
  const cardHeight = size === 'featured' ? 'min-h-[500px]' : 'min-h-[450px]';
  
  const statusColors = {
    'live': 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-400/30',
    'coming-soon': 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-400/30',
    'in-development': 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-400/30'
  };

  const statusLabels = {
    'live': 'Live',
    'coming-soon': 'Coming Soon',
    'in-development': 'In Development'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${cardHeight} ${className}`}
    >
      {isClickable ? (
        <Link 
          href={url!} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group"
        >
          <CaseStudyContent />
        </Link>
      ) : (
        <div className="group">
          <CaseStudyContent />
        </div>
      )}
    </motion.div>
  );

  function CaseStudyContent() {
    return (
      <GlassCard 
        className={`relative ${cardHeight} flex flex-col overflow-hidden hover:scale-105 transition-all duration-300 border-border/60 ${isClickable ? 'cursor-pointer' : ''}`}
        variant="sky"
        blur="md"
      >
        {/* Image Section */}
        <div className="relative h-48 flex-shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>

          {/* External Link Icon for Live Sites */}
          {isClickable && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Category */}
          <div className="text-sm font-medium text-primary mb-2">
            {category}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-foreground/70 text-sm mb-4 line-clamp-3 flex-grow">
            {description}
          </p>

          {/* Tools Used */}
          <div className="mb-4">
            <div className="text-xs font-medium text-foreground/60 mb-2">Design & Development</div>
            <div className="flex flex-wrap gap-2">
              {tools.slice(0, 4).map((tool, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                >
                  {tool}
                </span>
              ))}
              {tools.length > 4 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                  +{tools.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Features or Metrics */}
          {(features || metrics) && (
            <div className="mt-auto">
              {features && (
                <div className="space-y-1">
                  {features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-foreground/60">
                      <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {metrics && (
                <div className="flex justify-between text-xs text-foreground/60 mt-3 pt-3 border-t border-border/50">
                  {metrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="font-semibold text-foreground">{metric.value}</div>
                      <div>{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Date if provided */}
          {date && (
            <div className="flex items-center text-xs text-foreground/50 mt-2">
              <Calendar className="w-3 h-3 mr-1" />
              {date}
            </div>
          )}
        </div>
      </GlassCard>
    );
  }
}