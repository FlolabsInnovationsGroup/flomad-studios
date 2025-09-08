'use client';

import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import GlassButton from '../ui/GlassButton';
import GlassCard from '../ui/GlassCard';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const renderAuthButtons = () => {
    if (session) {
      return (
        <div className="flex items-center space-x-3">
          <GlassButton variant="secondary" size="sm" className="border-sky-400/30 hover:border-sky-300/50 hover:bg-sky-500/10">
            <Link href="/dashboard" className="text-sky-300 hover:text-sky-200">Dashboard</Link>
          </GlassButton>
          <GlassButton variant="ghost" size="sm" onClick={() => signOut()} className="border-amber-400/30 hover:border-amber-300/50 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200">
            Logout
          </GlassButton>
        </div>
      );
    }
    return (
      <GlassButton variant="primary" size="sm" glow className="border-sky-400/30 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 hover:from-sky-500/30 hover:to-emerald-500/30">
        <Link href="/login" className="text-white font-medium">Login</Link>
      </GlassButton>
    );
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation Only */}
      <GlassCard className="hidden md:flex items-center px-6 py-3 border-sky-400/20 bg-black/20" blur="lg" variant="primary">
        <div className="flex items-center space-x-8 text-lg font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'nav-link relative font-medium text-white hover:text-sky-300 whitespace-nowrap transition-all duration-300 px-3 py-2 rounded-lg hover:bg-sky-500/10',
                pathname === item.href 
                  ? 'text-sky-300 font-semibold bg-sky-500/15 border border-sky-400/20' 
                  : 'hover:bg-white/5'
              )}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"></span>
              )}
            </Link>
          ))}
          <div className="flex items-center space-x-4 ml-6 border-l border-white/10 pl-6">
            {renderAuthButtons()}
          </div>
        </div>
      </GlassCard>
    </nav>
  );
} 