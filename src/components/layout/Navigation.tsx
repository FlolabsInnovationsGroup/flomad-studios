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
          <GlassButton variant="secondary" size="sm" className="border-primary/30 hover:border-primary/50 hover:bg-primary/10">
            <Link href="/dashboard" className="text-primary-foreground hover:text-primary">Dashboard</Link>
          </GlassButton>
          <GlassButton variant="ghost" size="sm" onClick={() => signOut()} className="border-accent/30 hover:border-accent/50 hover:bg-accent/10 text-foreground hover:text-accent-foreground">
            Logout
          </GlassButton>
        </div>
      );
    }
    return (
      <GlassButton variant="primary" size="sm" glow className="border-primary/30 bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30">
        <Link href="/login" className="text-foreground font-medium">Login</Link>
      </GlassButton>
    );
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation Only */}
      <GlassCard className="hidden md:flex items-center px-6 py-3" blur="lg" variant="sky">
        <div className="flex items-center space-x-8 text-lg font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'nav-link relative font-medium text-foreground hover:text-primary whitespace-nowrap transition-all duration-300 px-3 py-2 rounded-lg hover:bg-primary/10',
                pathname === item.href
                  ? 'text-primary font-semibold bg-primary/15 border border-primary/20 shadow-sm'
                  : 'hover:bg-primary/5'
              )}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              )}
            </Link>
          ))}
          <div className="flex items-center space-x-4 ml-6 border-l border-border pl-6">
            {renderAuthButtons()}
          </div>
        </div>
      </GlassCard>
    </nav>
  );
} 