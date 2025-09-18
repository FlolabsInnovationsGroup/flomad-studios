'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Video, 
  Mic, 
  FileText, 
  Calendar, 
  BarChart2, 
  Settings, 
  Users,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface FloatingSidebarProps {
  className?: string;
}

const sidebarItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard', badge: null },
  { href: '/dashboard/videos', icon: Video, label: 'Videos', badge: '12' },
  { href: '/dashboard/podcasts', icon: Mic, label: 'Podcasts', badge: '5' },
  { href: '/dashboard/blog', icon: FileText, label: 'Blog', badge: null },
  { href: '/dashboard/calendar', icon: Calendar, label: 'Calendar', badge: null },
  { href: '/dashboard/analytics', icon: BarChart2, label: 'Analytics', badge: null },
  { href: '/dashboard/users', icon: Users, label: 'Users', badge: null },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings', badge: null },
];

const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            'fixed left-4 top-20 bottom-4 z-40',
            'flex flex-col',
            className
          )}
        >
          <motion.div
            variants={sidebarVariants}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full relative"
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-background/70 dark:bg-background-muted/70 backdrop-blur-xl rounded-2xl border border-border/60 shadow-2xl" />
            
            {/* Header */}
            <div className="relative z-10 p-4 border-b border-border/60">
              <div className="flex items-center justify-between">
                {!isCollapsed && (
                  <motion.div
                    variants={itemVariants}
                    animate={isCollapsed ? 'collapsed' : 'expanded'}
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-6 h-6 text-primary" />
                    <span className="font-bold text-heading">Studio</span>
                  </motion.div>
                )}
                
                <motion.button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 rounded-lg bg-background/60 dark:bg-background-muted/60 hover:bg-background/80 dark:hover:bg-background-muted/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-heading" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-heading" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex-1 p-4 space-y-2 overflow-hidden">
              {sidebarItems.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300',
                        'hover:bg-background/70 dark:hover:bg-background-muted/70 hover:scale-105',
                        isActive && 'bg-primary/20 text-primary shadow-lg'
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}

                      {/* Icon */}
                      <div className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-heading dark:group-hover:text-foreground'
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Label and Badge */}
                      {!isCollapsed && (
                        <motion.div
                          variants={itemVariants}
                          animate={isCollapsed ? 'collapsed' : 'expanded'}
                          className="flex items-center justify-between flex-1 min-w-0"
                        >
                          <span className={cn(
                            'font-medium transition-colors',
                            isActive ? 'text-primary' : 'text-heading/90 group-hover:text-heading dark:text-foreground/90 dark:group-hover:text-foreground'
                          )}>
                            {item.label}
                          </span>
                          
                          {item.badge && (
                            <span className="px-2 py-1 text-xs bg-accent rounded-full text-heading font-medium">
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-2 bg-heading/90 dark:bg-background-muted/90 text-background dark:text-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {item.label}
                          {item.badge && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-accent rounded text-heading">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="relative z-10 p-4 border-t border-slate-200/50 dark:border-white/10">
              {!isCollapsed && (
                <motion.div
                  variants={itemVariants}
                  animate={isCollapsed ? 'collapsed' : 'expanded'}
                  className="text-center text-xs text-muted-foreground"
                >
                  Flomad Studios v1.0
                </motion.div>
              )}
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default FloatingSidebar;
