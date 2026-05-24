import { Linkedin, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 gradient-text">FloStudios.ai</h3>
            <p className="footer-text mb-6">
              An AI-focused creative learning division of FloLabs Innovations Group, empowering the next generation of content creators, 
              storytellers, and digital innovators with cutting-edge AI technology and innovative learning experiences.
            </p>
            <div className="mb-6">
              <p className="text-sm text-foreground/70 mb-4">Part of the FloLabs Network:</p>
              <div className="flex flex-col space-y-3 text-sm">
                <a 
                  href="https://www.flolabsinnovations.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link flex items-center text-blue-600 dark:text-primary hover:text-blue-800 dark:hover:text-primary/80 py-3 px-4 rounded-lg transition-all hover:bg-blue-50 dark:hover:bg-primary/10 border border-transparent hover:border-blue-200 dark:hover:border-primary/20"
                >
                  <span className="tracking-wide font-medium flex-1 mr-3">FloLabs Innovations Group</span>
                  <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-70" />
                </a>
                <a 
                  href="https://www.flolabs.international/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link flex items-center text-blue-600 dark:text-primary hover:text-blue-800 dark:hover:text-primary/80 py-3 px-4 rounded-lg transition-all hover:bg-blue-50 dark:hover:bg-primary/10 border border-transparent hover:border-blue-200 dark:hover:border-primary/20"
                >
                  <span className="tracking-wide font-medium flex-1 mr-3">FloLabs International</span>
                  <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-70" />
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/flomad-labs-r-d"
                aria-label="LinkedIn"
                className="social-icon w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-card/20 backdrop-blur-sm hover:bg-primary/20 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5 text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 footer-heading">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "Services", href: "/services" },
                { label: "Our Work", href: "/work" },
                { label: "About Us", href: "/about" },
                { label: "Join Us", href: "/join" },
                { label: "Podcasts", href: "/podcasts" },
                { label: "Videos", href: "/videos" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link 
                    href={href}
                    className="footer-text footer-link flex items-center py-1 px-1 -mx-1 rounded transition-all hover:bg-primary/10"
                  >
                    <span className="w-2 h-2 mr-3 rounded-full bg-primary/50 flex-shrink-0"></span>
                    <span className="tracking-wide">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 footer-heading">Connect</h3>
            <ul className="space-y-5">
              <li className="flex items-center py-2">
                <Mail className="h-5 w-5 text-primary mr-4 flex-shrink-0" />
                <a href="mailto:John@flomadlabs.com" className="footer-text footer-link tracking-wide">
                  John@flomadlabs.com
                </a>
              </li>
              <li className="flex items-center py-2">
                <Linkedin className="h-5 w-5 text-primary mr-4 flex-shrink-0" />
                <a 
                  href="https://www.linkedin.com/company/flomad-labs-r-d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-text footer-link tracking-wide"
                >
                  Follow us on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
            <Link href="/privacy" className="footer-link copyright-text py-2 px-2 -mx-2 rounded transition-all hover:bg-primary/10 tracking-wide text-center sm:text-left">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link copyright-text py-2 px-2 -mx-2 rounded transition-all hover:bg-primary/10 tracking-wide text-center sm:text-left">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
