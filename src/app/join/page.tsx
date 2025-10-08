import Link from 'next/link';
import { ArrowRight, Users, Lightbulb, Zap, Heart, Video, Mic, BookOpen, Calendar } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';

import { cn } from '@/lib/utils';

export const metadata = {
  title: "Join Flomad Studios | Creative Learning at Flomad Labs R&D",
  description: "Learn creative skills by working on real technology projects at Flomad Labs R&D. Gain hands-on experience in content creation, podcasting, video production for AI, robotics, and emerging tech.",
};

const variantStyles = {
  primary: {
    iconBg: 'bg-primary/15',
    icon: 'text-primary',
    pill: 'bg-primary/10 border border-primary/20 text-primary/80',
  },
  secondary: {
    iconBg: 'bg-secondary/15',
    icon: 'text-secondary',
    pill: 'bg-secondary/10 border border-secondary/20 text-secondary/80',
  },
  accent: {
    iconBg: 'bg-accent/15',
    icon: 'text-accent',
    pill: 'bg-accent/10 border border-accent/20 text-accent/80',
  },
} as const;

type VariantKey = keyof typeof variantStyles;

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <GlassCard className="p-8 md:p-12 mb-8 border border-border/60" variant="primary" blur="xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-heading">
              Learn Creative Skills at <span className="bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">Flomad Labs R&D</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-foreground/70 leading-relaxed mb-8">
              Where emerging creatives work on real technology projects. As the creative division of Flomad Labs R&D, you&rsquo;ll create content for AI research, robotics projects, and emerging technology initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GlassButton variant="primary" size="lg" glow className="group">
                <Link href="/register" className="flex items-center gap-2">
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassButton>
              <GlassButton variant="ghost" size="lg" className="border-border/60 hover:border-border/40">
                <Link href="#learn-more" className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Learn More</span>
                </Link>
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 md:py-32" id="learn-more">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
              Why FlomadStudios is Different
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              We&rsquo;re the creative division of a technology R&D company, which means you&rsquo;ll work on content for AI, robotics, and emerging tech projects - not typical marketing materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Users,
                title: "Technology R&D Environment",
                description: "Work within Flomad Labs R&D on real technology projects. Create content for AI research, robotics development, and emerging tech initiatives - not traditional client work.",
                variant: 'primary' as VariantKey,
              },
              {
                icon: Zap,
                title: "Real Project Experience",
                description: "No busywork or theoretical exercises. You'll work on actual content that supports live research and development projects at Flomad Labs.",
                variant: 'secondary' as VariantKey,
              },
              {
                icon: Heart,
                title: "Professional Mentorship",
                description: "Learn from experienced creators who understand both creative excellence and technology industry standards. Get guidance that prepares you for tech industry careers.",
                variant: 'accent' as VariantKey,
              }
            ].map((feature, index) => {
              const variant = variantStyles[feature.variant];
              return (
                <GlassCard key={index} className="p-8 hover:scale-105 transition-all duration-300" variant="secondary" blur="lg" hover>
                  <div className={cn('mb-6 p-3 rounded-xl w-fit', variant.iconBg)}>
                    <feature.icon className={cn('w-8 h-8', variant.icon)} />
                  </div>
                  <h3 className="text-2xl font-bold text-heading mb-4">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Areas Section */}
      <section className="py-20 md:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
              Content Creation Areas
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Explore different creative disciplines and find your passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Video,
                title: "Video Production",
                description: "From concept to final edit, learn every aspect of video creation - scripting, filming, editing, motion graphics, and storytelling for digital platforms.",
                skills: ["Video Editing", "Motion Graphics", "Storytelling", "Camera Work", "Color Grading"],
                variant: 'primary' as VariantKey,
              },
              {
                icon: Mic,
                title: "Podcast Production",
                description: "Master the art of audio storytelling through our flagship show 'The Flomad Frequency' and other podcast projects.",
                skills: ["Audio Editing", "Interview Techniques", "Show Production", "Sound Design", "Distribution"],
                variant: 'secondary' as VariantKey,
              },
              {
                icon: BookOpen,
                title: "Digital Storytelling",
                description: "Craft compelling narratives across digital platforms, from blog posts to interactive media and social content.",
                skills: ["Content Writing", "SEO", "Social Media", "Interactive Design", "Brand Voice"],
                variant: 'accent' as VariantKey,
              },
              {
                icon: Calendar,
                title: "Content Strategy",
                description: "Learn to plan, schedule, and optimize content for maximum impact and audience engagement across multiple channels.",
                skills: ["Content Planning", "Analytics", "Audience Research", "Brand Strategy", "Campaign Management"],
                variant: 'secondary' as VariantKey,
              }
            ].map((area, index) => {
              const variant = variantStyles[area.variant];
              return (
                <GlassCard key={index} className="p-8" variant="primary" blur="lg">
                  <div className="flex items-start gap-6">
                    <div className={cn('p-3 rounded-xl flex-shrink-0', variant.iconBg)}>
                      <area.icon className={cn('w-8 h-8', variant.icon)} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-heading mb-4">{area.title}</h3>
                      <p className="text-foreground/70 leading-relaxed mb-6">{area.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill) => (
                          <span key={skill} className={cn('px-3 py-1 rounded-full text-sm', variant.pill)}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20 md:py-32">
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
              How to Join
            </h2>
            <p className="text-xl text-foreground/70">
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
                variant: 'primary' as VariantKey,
              },
              {
                step: "02",
                title: "Complete Your Profile",
                description: "Share your creative background, any relevant experience, and what you hope to learn and contribute.",
                action: "10-15 minutes",
                variant: 'secondary' as VariantKey,
              },
              {
                step: "03",
                title: "Creative Sample (Optional)",
                description: "Submit a portfolio piece, creative project, or simply tell us about a creative idea you're passionate about.",
                action: "Whatever feels right",
                variant: 'accent' as VariantKey,
              },
              {
                step: "04",
                title: "Welcome to the Studio",
                description: "Once reviewed, you'll get access to your dashboard, our community, and can start collaborating on projects.",
                action: "Usually within 3-5 days",
                variant: 'secondary' as VariantKey,
              }
            ].map((step) => {
              const variant = variantStyles[step.variant];
              return (
                <GlassCard key={step.step} className="p-8" variant="secondary" blur="lg">
                  <div className="flex items-start gap-6">
                    <div className={cn('flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center border border-border/60', variant.iconBg)}>
                      <span className={cn('text-2xl font-bold', variant.icon)}>{step.step}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-heading mb-3">{step.title}</h3>
                      <p className="text-foreground/70 leading-relaxed mb-4">{step.description}</p>
                      <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm', variant.pill)}>
                        <span>{step.action}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
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
                answer: "We&rsquo;re flexible! Most creators spend 10-20 hours per week, but we work with your schedule. Some projects are ongoing, others are shorter sprints."
              },
              {
                question: "Can I participate remotely?",
                answer: "Yes! We&rsquo;re a remote-first studio with creators around the world. All you need is reliable internet and enthusiasm for creating."
              },
              {
                question: "What's the connection to Flomad Labs?",
                answer: "Flomad Studios is the creative content division of Flomad Labs R&D. You'll be part of a larger ecosystem focused on innovation in AI, robotics, and emerging technologies."
              }
            ].map((faq, index) => (
              <GlassCard key={index} className="p-8" variant="primary" blur="lg">
                <h3 className="text-xl font-bold text-heading mb-4">{faq.question}</h3>
                <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <GlassCard className="p-12" variant="primary" blur="xl" glow>
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join a community of creators, makers, and storytellers who are building the future of digital content.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GlassButton variant="primary" size="lg" glow className="group">
                <Link href="/register" className="flex items-center gap-2">
                  <span>Apply to Join Studio</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassButton>
              <GlassButton variant="ghost" size="lg" className="border-border/60 hover:border-border/40">
                <Link href="/about" className="flex items-center gap-2">
                  <span>Learn More About Us</span>
                </Link>
              </GlassButton>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              Questions? Email us at <a href="mailto:studios@flomadlabs.com" className="text-primary hover:text-primary/80">studios@flomadlabs.com</a>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
