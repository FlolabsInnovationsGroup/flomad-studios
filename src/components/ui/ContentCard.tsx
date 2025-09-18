'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Eye, 
  Calendar, 
  Clock, 
  Heart, 
  Share2, 
  MoreVertical,
  Edit3,
  Trash2,
  ExternalLink,
  TrendingUp
} from 'lucide-react';

interface ContentCardProps {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'podcast' | 'blog';
  thumbnail?: string;
  publishDate: string;
  status: 'published' | 'draft' | 'scheduled';
  metrics?: {
    views?: number;
    likes?: number;
    duration?: string;
    readTime?: string;
  };
  tags?: string[];
  className?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  description,
  type,
  thumbnail,
  publishDate,
  status,
  metrics = {},
  tags = [],
  className,
  onEdit,
  onDelete,
  onShare,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const typeConfig = {
    video: {
      icon: Play,
      color: 'from-red-500/20 to-red-600/20',
      accent: 'text-red-400',
      bg: 'bg-red-500/10',
    },
    podcast: {
      icon: Play,
      color: 'from-purple-500/20 to-purple-600/20',
      accent: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    blog: {
      icon: Edit3,
      color: 'from-green-500/20 to-green-600/20',
      accent: 'text-green-400',
      bg: 'bg-green-500/10',
    },
  };

  const statusConfig = {
    published: { color: 'bg-green-500/20 text-green-400', label: 'Published' },
    draft: { color: 'bg-orange-500/20 text-orange-400', label: 'Draft' },
    scheduled: { color: 'bg-blue-500/20 text-blue-400', label: 'Scheduled' },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      className={cn(
        'relative group overflow-hidden rounded-2xl',
        'bg-slate-100/80 dark:bg-black/20 backdrop-blur-xl border border-slate-200/50 dark:border-white/10',
        'transition-all duration-500',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Background gradient */}
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', config.color)} />

      {/* Thumbnail/Header */}
      <div className="relative h-48 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={cn(
            'w-full h-full flex items-center justify-center',
            'bg-gradient-to-br', config.color
          )}>
            <Icon className={cn('w-16 h-16', config.accent)} />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm',
            statusConfig[status].color
          )}>
            {statusConfig[status].label}
          </span>
        </div>

        {/* Actions menu */}
        <div className="absolute top-4 right-4">
          <motion.button
            className="p-2 rounded-full bg-slate-200/60 dark:bg-black/20 backdrop-blur-sm hover:bg-slate-300/60 dark:hover:bg-black/40 transition-colors"
            onClick={() => setShowActions(!showActions)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoreVertical className="w-4 h-4 text-heading" />
          </motion.button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className="absolute top-full right-0 mt-2 py-2 min-w-[140px] bg-white/95 dark:bg-black/80 backdrop-blur-xl rounded-lg border border-slate-200/50 dark:border-white/10 shadow-2xl"
              >
                {onEdit && (
                  <button
                    onClick={() => onEdit(id)}
                    className="w-full px-4 py-2 text-left text-sm text-heading hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                )}
                {onShare && (
                  <button
                    onClick={() => onShare(id)}
                    className="w-full px-4 py-2 text-left text-sm text-heading hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                )}
                <Link
                  href={`/${type}s/${id}`}
                  className="w-full px-4 py-2 text-left text-sm text-heading hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </Link>
                {onDelete && (
                  <button
                    onClick={() => onDelete(id)}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Play button overlay for videos/podcasts */}
        <AnimatePresence>
          {isHovered && (type === 'video' || type === 'podcast') && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.button
                className="p-4 rounded-full bg-slate-200/60 dark:bg-white/20 backdrop-blur-sm hover:bg-slate-300/60 dark:hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play className="w-8 h-8 text-heading fill-current" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Title and description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-heading mb-2 line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Metrics */}
        {Object.keys(metrics).length > 0 && (
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            {metrics.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{metrics.views.toLocaleString()}</span>
              </div>
            )}
            {metrics.likes && (
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{metrics.likes.toLocaleString()}</span>
              </div>
            )}
            {metrics.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{metrics.duration}</span>
              </div>
            )}
            {metrics.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{metrics.readTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-2 py-1 text-xs bg-slate-200/50 dark:bg-white/10 rounded-md text-foreground/70 dark:text-foreground/80"
              >
                {tag}
              </motion.span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-slate-200/50 dark:bg-white/10 rounded-md text-muted-foreground">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(publishDate).toLocaleDateString()}</span>
          </div>
          
          {status === 'published' && metrics.views && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? `0 0 30px ${config.accent.includes('red') ? 'rgba(239, 68, 68, 0.3)' : 
                        config.accent.includes('purple') ? 'rgba(147, 51, 234, 0.3)' : 
                        'rgba(34, 197, 94, 0.3)'}`
            : '0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ContentCard;
