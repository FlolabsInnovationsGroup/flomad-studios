'use client';

import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Sparkles, Home, Briefcase, Phone, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { 
    name: 'Work', 
    href: '/work', 
    icon: Briefcase,
    children: [
      { name: 'Portfolio', href: '/work' },
      { name: 'Case Studies', href: '/work/case-studies' },
      { name: 'Process', href: '/work/process' }
    ]
  },
  { name: 'Services', href: '/services', icon: Sparkles },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Phone }
];

export default function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  const navVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.4, 0, 0.2, 1) }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: cubicBezier(0.4, 0, 0.2, 1) }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3, ease: cubicBezier(0.4, 0, 0.2, 1) }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: cubicBezier(0.4, 0, 0.2, 1)
      }
    })
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/40 shadow-lg"
            : "bg-transparent"
        )}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FloStudios.ai
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Creative Division
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                      pathname === item.href
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    )}
                    onMouseEnter={() => item.children && setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                    {item.children && <ChevronRight className="w-3 h-3 ml-1" />}
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.children && activeSubmenu === item.name && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setActiveSubmenu(item.name)}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Search and CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">Get Started</Link>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              title={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  Menu
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base font-medium",
                        pathname === item.href
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      {item.name}
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  className="pt-6 border-t border-gray-200 dark:border-gray-700"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navigationItems.length}
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}