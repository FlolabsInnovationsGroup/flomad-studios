import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Analytics } from '@vercel/analytics/react';
import { defaultMetadata } from './metadata';
import { cn } from '@/lib/utils';
import AuthProvider from '@/components/auth/Provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from "@/components/ErrorBoundary";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SkyBackground from "@/components/ui/SkyBackground";
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
        {/* Enhanced viewport configuration for optimal mobile experience */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
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
      <body className={cn('min-h-screen text-foreground antialiased font-sans transition-colors duration-300')}>
        <ErrorBoundary>
          <AuthProvider>
            <ThemeProvider>
              <NoTooltip>
                <div className="relative flex min-h-screen flex-col">
                  {/* Desktop-only cursor effects */}
                  <div className="hidden md:block">
                    <AnimatedCursor />
                  </div>
                  
                  {/* Enhanced sky background with clouds and detailed effects */}
                  <div className="fixed inset-0 z-[-20]">
                    <SkyBackground />
                  </div>
                  
                  {/* Subtle text readability overlay - preserves sky beauty while ensuring text contrast */}
                  <div className="fixed inset-0 z-[-19] bg-white/[0.02] dark:bg-black/[0.08] backdrop-blur-[0.5px]" />
                  
                  <Header />
                  {children}
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
