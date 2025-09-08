import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Analytics } from '@vercel/analytics/react';
import { defaultMetadata } from './metadata';
import { cn } from '@/lib/utils';
import AuthProvider from '@/components/auth/Provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from '@/components/ui/PageTransition';
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import NoTooltip from '@/components/ui/NoTooltip';

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>
          {`
            *[title] { 
              position: relative;
            }
            *[title]:hover::before,
            *[title]:hover::after {
              content: "";
              display: none !important;
            }
          `}
        </style>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Remove all title attributes to disable tooltips
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('[title]').forEach(function(el) {
                el.removeAttribute('title');
              });
              
              // Create a mutation observer to remove title attributes added dynamically
              const observer = new MutationObserver(function(mutations) {
                for (let mutation of mutations) {
                  if (mutation.type === 'attributes' && mutation.attributeName === 'title') {
                    mutation.target.removeAttribute('title');
                  }
                  if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                      if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute('title')) {
                        node.removeAttribute('title');
                      }
                    });
                  }
                }
              });
              
              // Start observing the document
              observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['title'],
                childList: true,
                subtree: true
              });
            });
          `
        }} />
      </head>
      <body className={cn('min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 text-foreground antialiased font-sans')}>
        <ErrorBoundary>
          <AuthProvider>
            <ThemeProvider>
              <NoTooltip>
                <div className="relative flex min-h-screen flex-col">
                  {/* Desktop-only cursor effects */}
                  <div className="hidden md:block">
                    <AnimatedCursor />
                  </div>
                  
                  {/* Enhanced background effects */}
                  <BackgroundEffects />
                  
                  {/* Subtle overlay for better readability */}
                  <div className="fixed inset-0 z-[-10] bg-white/5 dark:bg-black/10 backdrop-blur-[1px]" />
                  
                  <Header />
                  <PageTransition>
                    {children}
                  </PageTransition>
                  <Footer />
                  <ScrollToTop />
                  <Analytics />
                </div>
              </NoTooltip>
            </ThemeProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
