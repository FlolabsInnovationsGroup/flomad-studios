import { Linkedin, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Flomad Studios</h3>
            <p className="footer-text mb-6">
              A creative division of Flomad Labs R&D, empowering the next generation of content creators, 
              storytellers, and digital innovators. Part of the Flomad ecosystem.
            </p>
            <div className="mb-6">
              <p className="text-sm text-foreground/70 mb-2">Part of the Flomad Network:</p>
              <div className="flex flex-col space-y-2 text-sm">
                <a 
                  href="https://flomadlabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link flex items-center text-primary hover:text-primary/80"
                >
                  Flomad Labs R&D <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <a 
                  href="https://flomad.international" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link flex items-center text-primary hover:text-primary/80"
                >
                  Flomad International <ExternalLink className="h-3 w-3 ml-1" />
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
            <ul className="space-y-3">
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
                    className="footer-text footer-link flex items-center"
                  >
                    <span className="w-2 h-2 mr-2 rounded-full bg-primary/50"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 footer-heading">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a href="mailto:John@flomadlabs.com" className="footer-text footer-link">
                  John@flomadlabs.com
                </a>
              </li>
              <li className="flex items-center">
                <Linkedin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a 
                  href="https://www.linkedin.com/company/flomad-labs-r-d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-text footer-link"
                >
                  Follow us on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm copyright-text mb-4 md:mb-0">
            © {new Date().getFullYear()} Flomad Studios. A division of Flomad Labs R&D. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="footer-link copyright-text">Privacy Policy</Link>
            <Link href="/terms" className="footer-link copyright-text">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
