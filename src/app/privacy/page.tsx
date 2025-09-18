import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, UserCheck, Lock, Globe } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Section from '@/components/ui/Section';

export const metadata = {
  title: "Privacy Policy | Flomad Studios",
  description: "Learn how Flomad Studios protects your privacy and handles your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section backdrop="intense" className="py-24 md:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <GlassCard className="p-8 md:p-12" variant="primary" blur="xl">
            <Shield className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-heading">
              Privacy <span className="bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-foreground/70 leading-relaxed">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 2024
            </p>
          </GlassCard>
        </div>
      </Section>

      {/* Privacy Policy Content */}
      <Section backdrop="subtle" className="py-20 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          
          {/* Overview */}
          <GlassCard className="p-8 mb-12" variant="primary" blur="lg">
            <h2 className="text-3xl font-bold text-heading mb-6">Overview</h2>
            <p className="text-foreground/70 text-lg leading-relaxed">
              At Flomad Studios, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, store, and share information about you when you 
              use our services, visit our website, or interact with us.
            </p>
          </GlassCard>

          {/* Information We Collect */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/15 rounded-lg flex-shrink-0">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-heading mb-4">Information We Collect</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-heading mb-3">Personal Information</h3>
                <ul className="text-foreground/70 space-y-2 list-disc list-inside">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials and profile information</li>
                  <li>Application materials for internships and programs</li>
                  <li>Communication preferences and settings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-heading mb-3">Usage Information</h3>
                <ul className="text-foreground/70 space-y-2 list-disc list-inside">
                  <li>Pages visited and features used on our website</li>
                  <li>Time spent on different sections</li>
                  <li>Device information and browser type</li>
                  <li>IP address and general location</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-heading mb-3">Content Information</h3>
                <ul className="text-foreground/70 space-y-2 list-disc list-inside">
                  <li>Content you create, upload, or share through our platform</li>
                  <li>Comments, messages, and feedback you provide</li>
                  <li>Portfolio materials and creative work samples</li>
                  <li>Project collaboration data</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* How We Use Your Information */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-secondary/15 rounded-lg flex-shrink-0">
                <UserCheck className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-heading mb-4">How We Use Your Information</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-secondary/30 pl-4">
                <h3 className="text-lg font-semibold text-heading mb-2">Service Provision</h3>
                <p className="text-foreground/70">
                  To provide, maintain, and improve our services, including account management, 
                  content delivery, and platform functionality.
                </p>
              </div>

              <div className="border-l-4 border-primary/30 pl-4">
                <h3 className="text-lg font-semibold text-heading mb-2">Communication</h3>
                <p className="text-foreground/70">
                  To respond to your inquiries, send important updates, and communicate about 
                  programs, events, and opportunities.
                </p>
              </div>

              <div className="border-l-4 border-accent/30 pl-4">
                <h3 className="text-lg font-semibold text-heading mb-2">Improvement & Analytics</h3>
                <p className="text-foreground/70">
                  To analyze usage patterns, improve our services, and develop new features 
                  that better serve our community.
                </p>
              </div>

              <div className="border-l-4 border-accent/30 pl-4">
                <h3 className="text-lg font-semibold text-heading mb-2">Legal Compliance</h3>
                <p className="text-foreground/70">
                  To comply with legal obligations, protect our rights, and ensure the safety 
                  and security of our platform and users.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Information Sharing */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/15 rounded-lg flex-shrink-0">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-heading mb-4">Information Sharing</h2>
              </div>
            </div>
            
            <p className="text-foreground/70 mb-4">
              We do not sell your personal information. We may share information in the following circumstances:
            </p>

            <div className="space-y-4">
              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Within Flomad Ecosystem</h3>
                <p className="text-foreground/70">
                  With other Flomad companies (Flomad Labs, Flomad International) for legitimate business purposes 
                  and to provide integrated services.
                </p>
              </div>

              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Service Providers</h3>
                <p className="text-foreground/70">
                  With trusted third-party service providers who help us operate our platform, 
                  process payments, or provide customer support.
                </p>
              </div>

              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Legal Requirements</h3>
                <p className="text-foreground/70">
                  When required by law, court order, or to protect our rights, property, 
                  or the safety of our users.
                </p>
              </div>

              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Business Transfers</h3>
                <p className="text-foreground/70">
                  In connection with a merger, acquisition, or sale of business assets, 
                  with appropriate protections for your information.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Data Security */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/15 rounded-lg flex-shrink-0">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-heading mb-4">Data Security</h2>
              </div>
            </div>
            
            <p className="text-foreground/70 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Encryption</h3>
                <p className="text-foreground/70 text-sm">
                  Data in transit and at rest is encrypted using industry-standard protocols.
                </p>
              </div>

              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Access Controls</h3>
                <p className="text-foreground/70 text-sm">
                  Limited access to personal data on a need-to-know basis.
                </p>
              </div>

              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Regular Audits</h3>
                <p className="text-foreground/70 text-sm">
                  Regular security assessments and vulnerability testing.
                </p>
              </div>

              <div className="bg-background/85 dark:bg-background-muted/80 border border-border/60 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-heading mb-2">Incident Response</h3>
                <p className="text-foreground/70 text-sm">
                  Established procedures for responding to security incidents.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Your Rights */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-accent/15 rounded-lg flex-shrink-0">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-heading mb-4">Your Rights</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-1">Access</h3>
                  <p className="text-foreground/70">Request a copy of the personal information we hold about you.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-1">Correction</h3>
                  <p className="text-foreground/70">Request correction of inaccurate or incomplete information.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-1">Deletion</h3>
                  <p className="text-foreground/70">Request deletion of your personal information, subject to legal requirements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-1">Portability</h3>
                  <p className="text-foreground/70">Request a copy of your data in a structured, machine-readable format.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-1">Objection</h3>
                  <p className="text-foreground/70">Object to certain types of processing of your personal information.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-background/85 dark:bg-background-muted/80 border border-border/60 rounded-lg">
              <p className="text-foreground/70">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:privacy@flomadlabs.com" className="text-accent hover:text-accent/80 transition-colors">
                  privacy@flomadlabs.com
                </a>
              </p>
            </div>
          </GlassCard>

          {/* Contact Information */}
          <GlassCard className="p-8 mb-8" variant="primary" blur="lg">
            <h2 className="text-2xl font-bold text-heading mb-6">Contact Us</h2>
            <p className="text-foreground/70 mb-4">
              If you have questions about this privacy policy or our privacy practices, please contact us:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">Email</h3>
                <a href="mailto:privacy@flomadlabs.com" className="text-primary hover:text-primary/80 transition-colors">
                  privacy@flomadlabs.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">General Contact</h3>
                <a href="mailto:studios@flomadlabs.com" className="text-primary hover:text-primary/80 transition-colors">
                  studios@flomadlabs.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">Mailing Address</h3>
                <p className="text-foreground/70">
                  Flomad Studios<br />
                  c/o Flomad Labs<br />
                  [Address to be provided]
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Updates */}
          <GlassCard className="p-6" variant="secondary" blur="lg">
            <h2 className="text-xl font-bold text-heading mb-4">Policy Updates</h2>
            <p className="text-foreground/70">
              We may update this privacy policy from time to time. We will notify you of any material changes 
              by posting the updated policy on our website and updating the &ldquo;Last updated&rdquo; date. 
              Your continued use of our services after any changes indicates your acceptance of the updated policy.
            </p>
          </GlassCard>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <GlassButton variant="ghost" className="border-primary/40 hover:border-primary/60">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <Link href="/">Back to Home</Link>
            </GlassButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
