import Link from 'next/link';
import { ArrowRight, Users, Lightbulb, Zap, Heart, Video, Mic, BookOpen, Calendar } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Section from '@/components/ui/Section';

export const metadata = {
  title: "Join Flomad Studios | Creative Internships & Mentorship",
  description: "Join our creative community and gain hands-on experience in content creation, podcasting, video production, and digital storytelling.",
};

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-sky-900 dark:to-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-500/10 to-blue-600/5 dark:from-sky-500/20 dark:to-blue-600/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-emerald-500/5 to-green-600/5 dark:from-emerald-500/15 dark:to-green-600/10 rounded-full blur-3xl animate-float-delay-1" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-yellow-500/5 dark:from-amber-400/20 dark:to-yellow-500/15 rounded-full blur-3xl animate-float-delay-2" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <GlassCard className="p-8 md:p-12 mb-8 border border-white/20 dark:border-white/10 light:border-slate-200/50" variant="primary" blur="xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
              Join Our <span className="bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">Creative Studio</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-600 dark:text-gray-300 leading-relaxed mb-8">
              Where emerging creators learn, collaborate, and build meaningful content alongside experienced mentors and industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GlassButton variant="primary" size="lg" glow className="group">
                <Link href="/register" className="flex items-center gap-2">
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassButton>
              <GlassButton variant="ghost" size="lg" className="border-white/20 hover:border-white/40">
                <Link href="#learn-more" className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Learn More</span>
                </Link>
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* What We Offer Section */}
      <Section className="py-20 md:py-32" id="learn-more">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              What Makes Flomad Studios Special?
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              We&apos;re not just another internship program. We&apos;re a creative community that bridges 
              the gap between learning and real-world content creation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Users,
                title: "Real Mentorship",
                description: "Work directly with experienced creators, not just junior staff. Get personalized guidance from industry professionals who've been where you want to go.",
                color: "sky"
              },
              {
                icon: Zap,
                title: "Live Projects",
                description: "No busywork. Create actual content that gets published - podcasts, videos, articles, and digital experiences that real audiences engage with.",
                color: "emerald"
              },
              {
                icon: Heart,
                title: "Collaborative Environment",
                description: "Work alongside other creators, learn from each other, and build lasting professional relationships in a supportive, inclusive community.",
                color: "amber"
              }
            ].map((feature, index) => (
              <GlassCard key={index} className="p-8 hover:scale-105 transition-all duration-300" variant="secondary" blur="lg" hover>
                <div className={`mb-6 p-3 bg-${feature.color}-500/20 rounded-xl w-fit`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Content Areas Section */}
      <Section className="py-20 md:py-32 bg-gradient-to-r from-slate-900/50 to-sky-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Content Creation Areas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore different creative disciplines and find your passion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Video,
                title: "Video Production",
                description: "From concept to final edit, learn every aspect of video creation - scripting, filming, editing, motion graphics, and storytelling for digital platforms.",
                skills: ["Video Editing", "Motion Graphics", "Storytelling", "Camera Work", "Color Grading"]
              },
              {
                icon: Mic,
                title: "Podcast Production",
                description: "Master the art of audio storytelling through our flagship show 'The Flomad Frequency' and other podcast projects.",
                skills: ["Audio Editing", "Interview Techniques", "Show Production", "Sound Design", "Distribution"]
              },
              {
                icon: BookOpen,
                title: "Digital Storytelling",
                description: "Craft compelling narratives across digital platforms, from blog posts to interactive media and social content.",
                skills: ["Content Writing", "SEO", "Social Media", "Interactive Design", "Brand Voice"]
              },
              {
                icon: Calendar,
                title: "Content Strategy",
                description: "Learn to plan, schedule, and optimize content for maximum impact and audience engagement across multiple channels.",
                skills: ["Content Planning", "Analytics", "Audience Research", "Brand Strategy", "Campaign Management"]
              }
            ].map((area, index) => (
              <GlassCard key={index} className="p-8" variant="primary" blur="lg">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-white/10 rounded-xl flex-shrink-0">
                    <area.icon className="w-8 h-8 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-full text-sky-300 text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Application Process Section */}
      <Section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How to Join
            </h2>
            <p className="text-xl text-gray-300">
              Our application process is designed to be accessible and focused on your passion for creating.
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Create Your Account",
                description: "Sign up with your basic information and tell us about your creative interests and goals.",
                action: "Takes 2-3 minutes",
                color: "sky"
              },
              {
                step: "02",
                title: "Complete Your Profile",
                description: "Share your creative background, any relevant experience, and what you hope to learn and contribute.",
                action: "10-15 minutes",
                color: "emerald"
              },
              {
                step: "03",
                title: "Creative Sample (Optional)",
                description: "Submit a portfolio piece, creative project, or simply tell us about a creative idea you're passionate about.",
                action: "Whatever feels right",
                color: "amber"
              },
              {
                step: "04",
                title: "Welcome to the Studio",
                description: "Once reviewed, you'll get access to your dashboard, our community, and can start collaborating on projects.",
                action: "Usually within 3-5 days",
                color: "purple"
              }
            ].map((step) => (
              <GlassCard key={step.step} className="p-8" variant="secondary" blur="lg">
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 bg-${step.color}-500/20 border border-${step.color}-400/30 rounded-xl flex items-center justify-center`}>
                    <span className={`text-2xl font-bold text-${step.color}-400`}>{step.step}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">{step.description}</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-${step.color}-500/10 border border-${step.color}-400/20 rounded-full`}>
                      <span className={`text-sm text-${step.color}-300`}>{step.action}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20 md:py-32 bg-gradient-to-r from-slate-900/50 to-sky-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Do I need prior experience in content creation?",
                answer: "Not at all! We welcome creators at all levels. What matters most is your enthusiasm to learn and contribute to meaningful projects."
              },
              {
                question: "Is this a paid program?",
                answer: "Flomad Studios operates as an experiential learning program. While positions aren't traditionally paid, you gain real-world experience, portfolio pieces, and mentorship that's invaluable for your career."
              },
              {
                question: "How much time commitment is expected?",
                answer: "We're flexible! Most creators spend 10-20 hours per week, but we work with your schedule. Some projects are ongoing, others are shorter sprints."
              },
              {
                question: "Can I participate remotely?",
                answer: "Yes! We're a remote-first studio with creators around the world. All you need is reliable internet and enthusiasm for creating."
              },
              {
                question: "What's the connection to Flomad Labs?",
                answer: "Flomad Studios is the creative content division of Flomad Labs R&D. You'll be part of a larger ecosystem focused on innovation in AI, robotics, and emerging technologies."
              }
            ].map((faq, index) => (
              <GlassCard key={index} className="p-8" variant="primary" blur="lg">
                <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <GlassCard className="p-12" variant="primary" blur="xl" glow>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join a community of creators, makers, and storytellers who are building the future of digital content.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GlassButton variant="primary" size="lg" glow className="group">
                <Link href="/register" className="flex items-center gap-2">
                  <span>Apply to Join Studio</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassButton>
              <GlassButton variant="ghost" size="lg" className="border-white/20 hover:border-white/40">
                <Link href="/about" className="flex items-center gap-2">
                  <span>Learn More About Us</span>
                </Link>
              </GlassButton>
            </div>
            
            <div className="mt-8 text-sm text-gray-400">
              Questions? Email us at <a href="mailto:studios@flomadlabs.com" className="text-sky-300 hover:text-sky-200">studios@flomadlabs.com</a>
            </div>
          </GlassCard>
        </div>
      </Section>
    </main>
  );
}