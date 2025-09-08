'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Loader2, LayoutDashboard, Video, Podcast, FileText, Calendar, Settings, LogOut, BarChart2, Users } from 'lucide-react';

// Navigation items
const navItems = [
  { name: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: 'Videos', href: '/dashboard/videos', icon: <Video className="h-4 w-4" /> },
  { name: 'Podcasts', href: '/dashboard/podcasts', icon: <Podcast className="h-4 w-4" /> },
  { name: 'Blog', href: '/dashboard/blog', icon: <FileText className="h-4 w-4" /> },
  { name: 'Content Calendar', href: '/dashboard/calendar', icon: <Calendar className="h-4 w-4" /> },
  { name: 'Analytics', href: '/dashboard/analytics', icon: <BarChart2 className="h-4 w-4" /> },
  { name: 'Users', href: '/dashboard/users', icon: <Users className="h-4 w-4" /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-4 w-4" /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 h-screen border-r border-border bg-card overflow-y-auto fixed">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">Flomad Studios</h2>
            <p className="text-sm text-foreground/60 mt-1">Content Dashboard</p>
          </div>

          <div className="p-4">
            {session.user?.image && (
              <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-background-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={session.user.image} 
                  alt={session.user?.name || 'User'} 
                  className="h-10 w-10 rounded-full border border-border"
                />
                <div>
                  <p className="font-medium text-sm">{session.user?.name}</p>
                  <p className="text-xs text-foreground/60">{session.user?.email}</p>
                </div>
              </div>
            )}

            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-muted/50 text-foreground/80'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t border-border">
            <button 
              className="flex items-center gap-3 px-4 py-2.5 rounded-md w-full hover:bg-red-500/10 hover:text-red-500 transition-colors text-foreground/70"
              onClick={() => {
                // Handle logout
                router.push('/api/auth/signout');
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 