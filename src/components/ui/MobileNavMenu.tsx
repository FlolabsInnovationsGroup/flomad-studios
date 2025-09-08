'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu, Home, Briefcase, Layers, Phone, Info } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Services', href: '/services', icon: Layers },
  { name: 'Work', href: '/work', icon: Briefcase },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: 1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="p-2 z-50 relative text-white hover:text-sky-300 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-slate-900/95 backdrop-blur-xl border-l border-sky-400/20 z-50 shadow-2xl px-6 py-12 flex flex-col"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">Navigation</h2>
            </div>
            
            <nav className="flex-1">
              <ul className="space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  
                  return (
                    <motion.li key={link.name} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className={`flex items-center p-3 rounded-md text-lg transition-colors text-white ${
                          isActive 
                            ? 'bg-sky-500/20 border border-sky-400/30 text-sky-300 font-medium' 
                            : 'hover:bg-white/10 hover:text-sky-300'
                        }`}
                      >
                        <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-sky-300' : 'text-white'}`} />
                        {link.name}
                        {isActive && (
                          <motion.span
                            layoutId="activeIndicator"
                            className="ml-auto w-1.5 h-6 bg-gradient-to-b from-sky-400 to-emerald-400 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="mt-auto">
              <motion.div 
                variants={itemVariants}
                className="p-4 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sm"
              >
                <p className="font-medium mb-1 text-white">Need help?</p>
                <p className="text-gray-300">Contact our support team anytime</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 