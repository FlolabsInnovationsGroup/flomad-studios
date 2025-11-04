import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { Mail, ExternalLink, GraduationCap, Building2 } from 'lucide-react';
import { contactMetadata } from '@/lib/seo';

export const metadata = contactMetadata;

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <GlassCard className="p-6 sm:p-8 md:p-12 border border-border/60" variant="primary" blur="xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-heading text-enhanced-strong">
              Get in <span className="bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-foreground/70 leading-relaxed text-enhanced-readable">
              Connect with us through Flo Labs International or Flomad Labs R&D for inquiries about our programs and services.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Flo Labs International */}
            <GlassCard className="p-8 sm:p-10" variant="primary" blur="lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/15 rounded-lg flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-2 text-enhanced-strong">
                    Flo Labs International
                  </h2>
                  <p className="text-foreground/70 text-enhanced-readable">
                    Experiential Learning & Internships
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-foreground/80 leading-relaxed">
                  For information about the GetRecruitedToday program, student internships, 
                  AI and robotics learning opportunities, and joining our experiential education programs.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Apply to Internship Programs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Student Project Inquiries</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Learning Program Questions</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <GlassButton variant="primary" size="lg" glow className="w-full">
                  <a 
                    href="https://flolabs.international/internships/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    Apply to Internships
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </GlassButton>
                
                <GlassButton variant="secondary" size="md" className="w-full">
                  <a 
                    href="https://flolabs.international" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    Visit Flo Labs International
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </GlassButton>
              </div>
            </GlassCard>

            {/* Flomad Labs R&D */}
            <GlassCard className="p-8 sm:p-10" variant="primary" blur="lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-secondary/15 rounded-lg flex-shrink-0">
                  <Building2 className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-2 text-enhanced-strong">
                    Flomad Labs R&D
                  </h2>
                  <p className="text-foreground/70 text-enhanced-readable">
                    Corporate & Partnership Inquiries
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-foreground/80 leading-relaxed">
                  For business partnerships, corporate collaborations, technology projects, 
                  AI research initiatives, and professional service inquiries.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Business Partnerships</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Technology Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Research Collaboration</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <GlassButton variant="secondary" size="lg" className="w-full border-emerald-500/40 hover:border-emerald-500/60">
                  <a 
                    href="mailto:john@flomadlabs.com" 
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    <Mail className="w-4 h-4" />
                    john@flomadlabs.com
                  </a>
                </GlassButton>
                
                <GlassButton variant="ghost" size="md" className="w-full">
                  <a 
                    href="https://flolabsrd.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    Visit Flomad Labs R&D
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </GlassButton>
              </div>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-sky-50/30 via-blue-50/20 to-transparent dark:from-slate-900/30 dark:via-slate-800/20 dark:to-transparent">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <GlassCard className="p-8 sm:p-10" variant="secondary" blur="lg">
            <h3 className="text-2xl font-bold text-heading mb-6 text-enhanced-strong text-center">
              More Ways to Connect
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-heading mb-2">LinkedIn</h4>
                <a 
                  href="https://www.linkedin.com/company/flomad-labs-r-d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                >
                  Follow Flo Labs
                </a>
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-heading mb-2">Response Time</h4>
                <p className="text-sm text-foreground/70">
                  24-48 hours
                </p>
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-heading mb-2">Our Work</h4>
                <Link 
                  href="/work"
                  className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
