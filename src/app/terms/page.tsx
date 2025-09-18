import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Users, Gavel, Shield, ExternalLink } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Section from '@/components/ui/Section';

export const metadata = {
  title: "Terms of Service | Flomad Studios",
  description: "Read the terms and conditions for using Flomad Studios' services and platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-blue-600/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-sky-500/15 to-emerald-600/10 rounded-full blur-3xl animate-float-delay-1" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <GlassCard className="p-8 md:p-12" variant="primary" blur="xl">
            <FileText className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-heading">
              Terms of <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-foreground/70 leading-relaxed">
              Understanding your rights and responsibilities when using our platform.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: December 2024
            </p>
          </GlassCard>
        </div>
      </Section>

      {/* Terms Content */}
      <Section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Agreement Overview */}
          <GlassCard className="p-8 mb-12" variant="primary" blur="lg">
            <h2 className="text-3xl font-bold text-white mb-6">Agreement Overview</h2>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Important Notice</h3>
                  <p className="text-gray-300 leading-relaxed">
                    By accessing or using Flomad Studios&rsquo; services, you agree to be bound by these Terms of Service. 
                    Please read them carefully. If you do not agree to these terms, you may not use our services.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Definitions */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-sky-500/20 rounded-lg flex-shrink-0">
                <FileText className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Definitions</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-sky-400/30 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">&ldquo;Services&rdquo;</h3>
                <p className="text-gray-300">
                  Refers to all websites, applications, platforms, content, and services provided by Flomad Studios, 
                  including but not limited to our creative platform, community features, and educational programs.
                </p>
              </div>

              <div className="border-l-4 border-emerald-400/30 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">&ldquo;User&rdquo; or &ldquo;You&rdquo;</h3>
                <p className="text-gray-300">
                  Refers to any individual or entity that accesses or uses our Services, whether as a registered 
                  user, visitor, or participant in our programs.
                </p>
              </div>

              <div className="border-l-4 border-purple-400/30 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">&ldquo;Content&rdquo;</h3>
                <p className="text-gray-300">
                  Refers to all text, graphics, images, videos, audio, software, data, and other materials 
                  available through or used in connection with our Services.
                </p>
              </div>

              <div className="border-l-4 border-amber-400/30 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2">&ldquo;Flomad Ecosystem&rdquo;</h3>
                <p className="text-gray-300">
                  Refers to Flomad Studios and its affiliated companies, including Flomad Labs and Flomad International.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Acceptable Use */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-lg flex-shrink-0">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">You May:</h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Use our Services for lawful purposes in accordance with these terms</li>
                  <li>Create, upload, and share original content</li>
                  <li>Participate in community discussions and collaborations</li>
                  <li>Apply for programs and opportunities we offer</li>
                  <li>Contact us with questions, feedback, or support requests</li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  You May Not:
                </h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights of others</li>
                  <li>Upload or share malicious, harmful, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Use our Services for spam, phishing, or fraudulent activities</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Interfere with the proper functioning of our Services</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* User Accounts */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Account Security</h3>
                <p className="text-gray-300">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. Notify us immediately of any unauthorized access.
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Account Information</h3>
                <p className="text-gray-300">
                  You agree to provide accurate, current, and complete information when creating your account 
                  and to update it as necessary to keep it accurate and current.
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Account Termination</h3>
                <p className="text-gray-300">
                  We reserve the right to suspend or terminate your account at our discretion, including for 
                  violations of these terms. You may also terminate your account at any time.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Content and Intellectual Property */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-500/20 rounded-lg flex-shrink-0">
                <Gavel className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Content & Intellectual Property</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Your Content</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">
                    You retain ownership of content you create and upload to our Services. However, by uploading content, 
                    you grant us a limited license to use, display, and distribute your content as necessary to provide our Services.
                  </p>
                  <p className="text-gray-300">
                    You represent and warrant that you have all necessary rights to the content you upload and that 
                    it does not infringe on the rights of others.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Our Content</h3>
                <p className="text-gray-300">
                  All content provided by Flomad Studios, including but not limited to text, graphics, logos, 
                  software, and design elements, is owned by us or our licensors and is protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Collaborative Projects</h3>
                <p className="text-gray-300">
                  For collaborative projects and programs, specific terms regarding content ownership, usage rights, 
                  and attribution will be outlined in separate agreements or program guidelines.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Programs and Services */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <h2 className="text-2xl font-bold text-white mb-6">Programs and Services</h2>
            
            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Internship Programs</h3>
                <p className="text-gray-300">
                  Participation in internship programs is subject to additional terms, application requirements, 
                  and program-specific guidelines that will be provided during the application process.
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Creative Services</h3>
                <p className="text-gray-300">
                  Custom creative services are subject to separate agreements that will outline specific deliverables, 
                  timelines, payment terms, and intellectual property arrangements.
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Community Features</h3>
                <p className="text-gray-300">
                  Access to community features may require additional verification, adherence to community guidelines, 
                  or participation requirements as determined by Flomad Studios.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Disclaimers and Limitations */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <h2 className="text-2xl font-bold text-white mb-6">Disclaimers and Limitations</h2>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Service Availability</h3>
              <p className="text-gray-300">
                Our Services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do not guarantee uninterrupted or error-free operation. 
                We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Limitation of Liability</h3>
                <p className="text-gray-300">
                  To the maximum extent permitted by law, Flomad Studios shall not be liable for any indirect, 
                  incidental, special, or consequential damages arising from your use of our Services.
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Third-Party Content</h3>
                <p className="text-gray-300">
                  We are not responsible for third-party content, websites, or services that may be linked to or 
                  accessible through our Services. Your use of such third-party services is at your own risk.
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Indemnification</h3>
                <p className="text-gray-300">
                  You agree to indemnify and hold harmless Flomad Studios from any claims, damages, or expenses 
                  arising from your use of our Services or violation of these terms.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Termination */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <h2 className="text-2xl font-bold text-white mb-6">Termination</h2>
            
            <div className="space-y-4">
              <p className="text-gray-300">
                Either party may terminate this agreement at any time. Upon termination:
              </p>
              
              <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4">
                <li>Your access to our Services will be discontinued</li>
                <li>Any outstanding obligations will remain in effect</li>
                <li>Provisions regarding intellectual property, disclaimers, and limitations will survive</li>
                <li>We may, but are not obligated to, delete your account and associated data</li>
              </ul>
            </div>
          </GlassCard>

          {/* Governing Law */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <h2 className="text-2xl font-bold text-white mb-6">Governing Law and Disputes</h2>
            
            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Applicable Law</h3>
                <p className="text-gray-300">
                  These Terms of Service are governed by and construed in accordance with applicable local laws. 
                  Any disputes will be resolved through appropriate legal channels.
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Dispute Resolution</h3>
                <p className="text-gray-300">
                  We encourage resolving disputes through direct communication. For formal disputes, 
                  mediation or arbitration may be required as specified in separate agreements.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Changes to Terms */}
          <GlassCard className="p-8 mb-8" variant="secondary" blur="lg">
            <h2 className="text-2xl font-bold text-white mb-6">Changes to These Terms</h2>
            
            <p className="text-gray-300 mb-4">
              We may update these Terms of Service from time to time to reflect changes in our Services, 
              legal requirements, or business practices. We will notify you of material changes by:
            </p>
            
            <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4 mb-4">
              <li>Posting the updated terms on our website</li>
              <li>Updating the &ldquo;Last updated&rdquo; date</li>
              <li>Sending email notifications for significant changes</li>
              <li>Providing in-app notifications where applicable</li>
            </ul>
            
            <p className="text-gray-300">
              Your continued use of our Services after any changes constitutes acceptance of the updated terms.
            </p>
          </GlassCard>

          {/* Contact Information */}
          <GlassCard className="p-8 mb-8" variant="primary" blur="lg">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Legal Inquiries</h3>
                <a href="mailto:legal@flomadlabs.com" className="text-sky-300 hover:text-sky-200 transition-colors">
                  legal@flomadlabs.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">General Contact</h3>
                <a href="mailto:studios@flomadlabs.com" className="text-sky-300 hover:text-sky-200 transition-colors">
                  studios@flomadlabs.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Additional Resources</h3>
                <div className="flex flex-wrap gap-4">
                  <Link href="/privacy" className="text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1">
                    Privacy Policy <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link href="/contact" className="text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1">
                    Contact Us <ExternalLink className="w-3 h-3" />
                  </Link>
                  <a href="https://flomadlabs.com" className="text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1">
                    Flomad Labs <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <GlassButton variant="ghost" className="border-emerald-400/30 hover:border-emerald-400/60">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <Link href="/">Back to Home</Link>
            </GlassButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
