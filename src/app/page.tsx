import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import CaseStudyCard from '@/components/ui/CaseStudyCard';
import EnhancedHero from '@/components/ui/EnhancedHero';
import { EnhancedGrid, FeatureCard } from '@/components/ui/EnhancedGrid';
import { SkyButton, GhostButton } from '@/components/ui/EnhancedButton';
import Link from 'next/link';
import { Play, Users, Mic, Video, Book, GraduationCap, Heart, ArrowRight, Rocket, Lightbulb, Cpu, Plane, Bot } from 'lucide-react';
import { homeMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <main className="min-h-[100dvh] relative overflow-x-hidden">
      {/* Enhanced mobile readability overlay - works with full sky background */}
      <div className="md:hidden absolute inset-0 bg-white/[0.03] dark:bg-black/[0.12] pointer-events-none z-0" />

      {/* Enhanced Hero Section */}
      <EnhancedHero
        subtitle="AI-Powered Creative Learning"
        title="FloStudios.ai"
        description="Where AI meets creativity. A learning-focused division of FloLabs Innovations Group, creating AI-enhanced content and experiences for cutting-edge technology education in artificial intelligence, robotics, and emerging tech platforms."
        primaryAction={{
          label: "Let's Talk",
          href: '/contact'
        }}
        secondaryAction={{
          label: "View Our Work",
          href: '/work'
        }}
        className="relative z-10"
      />

      {/* Portfolio Showcase Section */}
      <section className="relative py-16 md:py-32 creative-gradient z-10 bg-white/5 dark:bg-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="text-center mb-8 sm:mb-12 md:mb-20">
            <GlassCard className="inline-block px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 glow-effect" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">OUR WORK</span>
              </div>
            </GlassCard>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 text-enhanced-strong px-2">
              Websites & <span className="text-foreground font-extrabold">Digital Experiences</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground max-w-4xl mx-auto leading-relaxed px-4">
              Real projects we&apos;ve designed and developed for the FloLabs Innovations Group ecosystem, from AI platforms to robotics marketplaces.
            </p>
          </div>

          {/* Portfolio Grid - Enhanced mobile responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <CaseStudyCard
              title="FloLabs Innovations Group"
              description="Main company website showcasing AI & robotics research with modern design and professional portfolio presentation."
              category="Corporate Website"
              image="/images/flomadlabs.png"
              url="https://www.flolabsinnovations.com/"
              status="live"
              tools={["Next.js", "Figma", "Tailwind CSS", "TypeScript"]}
              features={["Responsive Design", "SEO Optimized", "Performance Focused"]}
              date="2024"
            />

            <CaseStudyCard
              title="RoboCollective.ai"
              description="Premium robot marketplace with e-commerce functionality, product showcases, and customer testimonials."
              category="E-commerce Platform"
              image="/images/robocollective.png"
              url="https://robocollective.ai"
              status="live"
              tools={["WordPress", "Canva", "WooCommerce", "Custom CSS"]}
              features={["Product Catalog", "Shopping Cart", "Blog Integration"]}
              metrics={[
                { label: "Products", value: "50+" },
                { label: "Categories", value: "3" }
              ]}
            />

            <CaseStudyCard
              title="FloLabs International"
              description="Educational platform for AI & robotics programs with course information and application system."
              category="Educational Website"
              image="/images/flomadinternational.png"
              url="https://www.flolabs.international/"
              status="live"
              tools={["WordPress", "Figma", "Canva", "Custom Plugins"]}
              features={["Course Catalog", "Application System", "Student Portal"]}
            />

            <CaseStudyCard
              title="CAIPO.ai"
              description="AI assistant platform landing page with modern design and early access signup functionality."
              category="AI Platform"
              image="/images/caipoai.png"
              url="https://caipo.ai"
              status="in-development"
              tools={["Next.js", "Figma", "Framer Motion", "Tailwind CSS"]}
              features={["Waitlist System", "Interactive Design", "Mobile Optimized"]}
            />

            <CaseStudyCard
              title="MoodChanger.ai"
              description="AI mood management platform with comprehensive brand design and user experience planning."
              category="AI Platform"
              image="/images/moodchanger.png"
              url="https://moodchanger.ai"
              status="coming-soon"
              tools={["Canva", "Figma", "Brand Guidelines", "Presentation Design"]}
              features={["Brand Identity", "Pitch Deck", "UI/UX Mockups"]}
            />

            <CaseStudyCard
              title="MoodChanger for Pets"
              description="Specialized AI health monitoring for pets with custom branding and presentation materials."
              category="Presentation Design"
              image="/images/moodchanger.png"
              status="coming-soon"
              tools={["Canva", "Figma", "Illustration", "Brand Design"]}
              features={["Custom Graphics", "Pet-focused UI", "Health Tracking"]}
            />
          </div>

          {/* Design Tools Section */}
          <div className="text-center">
            <GlassCard className="inline-block px-8 py-6 mb-8" variant="primary" blur="lg">
              <h3 className="text-2xl font-bold text-foreground text-enhanced-readable mb-4">Our Design Arsenal</h3>
              <div className="flex flex-wrap justify-center gap-4 text-foreground">
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <span className="w-3 h-3 bg-blue-500 rounded"></span>
                  Figma
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <span className="w-3 h-3 bg-purple-500 rounded"></span>
                  Canva Pro
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <span className="w-3 h-3 bg-green-500 rounded"></span>
                  Next.js
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <span className="w-3 h-3 bg-blue-600 rounded"></span>
                  WordPress
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <span className="w-3 h-3 bg-cyan-500 rounded"></span>
                  Tailwind CSS
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 sm:py-24 md:py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 slide-up">
            <GlassCard className="inline-block px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 glow-effect" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">WHAT WE DO</span>
              </div>
            </GlassCard>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 text-enhanced-strong px-2">
              Digital <span className="text-foreground font-extrabold">Creative Services</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground max-w-4xl mx-auto leading-relaxed px-4">
              Professional design and development services powered by industry-standard tools and creative expertise.
            </p>
          </div>

          <EnhancedGrid columns={3} gap="lg" staggered hover3d>
            <FeatureCard
              title="Web Design & Development"
              description="Creating modern, responsive websites that effectively represent your brand and engage visitors."
              icon={<Users className="w-12 h-12" />}
            />
            <FeatureCard
              title="Brand Identity Design"
              description="Developing visual identity systems that help your business stand out and connect with customers."
              icon={<Mic className="w-12 h-12" />}
            />
            <FeatureCard
              title="Digital Content Creation"
              description="Producing engaging video, audio, and visual content to tell your brand's story across platforms."
              icon={<Video className="w-12 h-12" />}
            />
            <FeatureCard
              title="Digital Strategy"
              description="Planning and implementing digital solutions that align with your business goals and growth objectives."
              icon={<Book className="w-12 h-12" />}
            />
            <FeatureCard
              title="Creative Consultation"
              description="Providing expert guidance on digital projects, from concept development to final implementation."
              icon={<GraduationCap className="w-12 h-12" />}
            />
            <FeatureCard
              title="Ongoing Support"
              description="Maintaining and evolving your digital presence with updates, improvements, and new features."
              icon={<Heart className="w-12 h-12" />}
            />
          </EnhancedGrid>
        </div>
      </section>

      {/* Podcast Spotlight Section */}
      <section className="relative py-12 sm:py-18 md:py-24 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <GlassCard className="inline-block px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 glow-effect" variant="accent" blur="md">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">THE FLO FREQUENCY</span>
              </div>
            </GlassCard>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-enhanced-strong mb-4 sm:mb-6 px-2">
              Our AI-Powered Podcast <span className="gradient-text-sky">Coming Soon</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto px-4">
              Deep conversations about AI, robotics, creativity, and the future of technology. 
              Season 1 launches soon with industry experts and innovative minds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <GlassCard className="p-8" variant="primary" blur="lg">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Mic className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <div className="text-lg font-semibold text-foreground">Season 1</div>
                    <div className="text-sm text-foreground/60">Launching Soon</div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">The Flo Frequency</h3>
                  <p className="text-foreground/70 mb-4">
                    AI-powered conversations exploring technology, creativity, and the future of learning.
                  </p>
                  <GlassButton variant="secondary" size="sm" className="w-full">
                    <Link href="/podcasts" className="flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Get Notified
                    </Link>
                  </GlassButton>
                </div>
              </GlassCard>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    "AI & Robotics Industry Insights",
                    "Creative Technology Processes", 
                    "Startup Stories & Lessons",
                    "Future of Digital Design"
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center gap-3 text-foreground/80">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              <GlassCard className="p-6" variant="secondary" blur="md">
                <h4 className="text-lg font-semibold text-foreground mb-3">Produced With</h4>
                <div className="flex flex-wrap gap-3">
                  {["Professional Audio", "Video Recording", "Post-Production", "Multi-Platform"].map((feature) => (
                    <span key={feature} className="px-4 py-2 bg-blue-100 dark:bg-purple-500/20 text-blue-800 dark:text-purple-300 rounded-full text-sm font-medium tracking-wide">
                      {feature}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Student Work Showcase */}
      <section className="relative py-16 sm:py-24 md:py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 slide-up">
            <GlassCard className="inline-block px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 glow-effect" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">STUDENT IMPACT</span>
              </div>
            </GlassCard>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 text-enhanced-strong px-2">
              Built by <span className="gradient-text-sky">Flearners</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground max-w-4xl mx-auto leading-relaxed px-4">
              Real-world AI and robotics projects developed through our experiential learning programs. 
              These platforms are live products serving real users—built by students, for the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <a href="https://caipo.ai" target="_blank" rel="noopener noreferrer" className="block group" aria-label="Visit CAIPO.ai - AI Productivity Assistant">
              <FeatureCard
                title="CAIPO.ai"
                description="Wearable AI productivity assistant that helps professionals optimize their workflow and manage tasks through intelligent automation and voice commands."
                icon={<Cpu className="w-12 h-12 text-amber-400" />}
              />
            </a>
            <a href="https://moodchanger.ai" target="_blank" rel="noopener noreferrer" className="block group" aria-label="Visit MoodChanger.ai - AI Mood Management">
              <FeatureCard
                title="MoodChanger.ai"
                description="AI-powered mood management platform serving people, athletes, and pets with personalized wellness tracking and emotional intelligence insights."
                icon={<Heart className="w-12 h-12 text-pink-400" />}
              />
            </a>
            <a href="https://flomadtravel.com" target="_blank" rel="noopener noreferrer" className="block group" aria-label="Visit Flo Travel - AI Travel Planning">
              <FeatureCard
                title="Flo Travel"
                description="AI-driven travel planning platform that creates personalized itineraries, recommends destinations, and optimizes travel experiences using machine learning."
                icon={<Plane className="w-12 h-12 text-blue-400" />}
              />
            </a>
            <a href="https://robocollective.ai" target="_blank" rel="noopener noreferrer" className="block group" aria-label="Visit RoboCollective - Robot Marketplace">
              <FeatureCard
                title="RoboCollective"
                description="Revolutionary robot marketplace and dealership franchise platform connecting buyers with the latest robotics technology and automation solutions."
                icon={<Bot className="w-12 h-12 text-purple-400" />}
              />
            </a>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <GlassCard className="inline-block p-6 sm:p-8" variant="primary" blur="lg">
              <p className="text-lg sm:text-xl font-semibold text-foreground mb-4">
                Want to build the next big thing?
              </p>
              <p className="text-foreground/70 mb-6 max-w-2xl">
                Join our experiential learning program and work on real AI and robotics projects 
                that make an impact. Get recruited today while building your portfolio.
              </p>
              <GlassButton variant="primary" size="lg" className="glow-effect">
                <a href="https://www.flolabs.international/internships/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Apply to GetRecruitedToday
                </a>
              </GlassButton>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Ecosystem Ribbon */}
      <section className="relative py-16 bg-gradient-to-r from-sky-50/50 via-blue-50/30 to-emerald-50/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/50 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Part of the <span className="text-primary">FloLabs Ecosystem</span>
            </h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              FloStudios.ai works alongside other innovative platforms in the FloLabs Innovations Group network
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-6">
            {[
              {
                name: "FloLabs Innovations Group",
                description: "AI & Robotics R&D",
                url: "https://www.flolabsinnovations.com/",
                color: "bg-blue-100/80 dark:bg-blue-500/10 border-blue-500/50 dark:border-blue-400/30 hover:bg-blue-200/80 dark:hover:bg-blue-500/20 text-blue-900 dark:text-blue-100"
              },
              {
                name: "FloLabs International", 
                description: "Education Programs",
                url: "https://www.flolabs.international/",
                color: "bg-emerald-100/80 dark:bg-emerald-500/10 border-emerald-600/50 dark:border-emerald-400/30 hover:bg-emerald-200/80 dark:hover:bg-emerald-500/20 text-emerald-900 dark:text-emerald-100"
              },
              {
                name: "Flo Travel",
                description: "AI-Powered Travel",
                url: "https://flomadtravel.com",
                color: "bg-indigo-100/80 dark:bg-purple-500/10 border-indigo-600/50 dark:border-purple-400/30 hover:bg-indigo-200/80 dark:hover:bg-purple-500/20 text-indigo-900 dark:text-purple-100"
              },
              {
                name: "CAIPO",
                description: "AI Productivity Officer",
                url: "https://caipo.ai",
                color: "bg-amber-100/80 dark:bg-amber-500/10 border-amber-600/50 dark:border-amber-400/30 hover:bg-amber-200/80 dark:hover:bg-amber-500/20 text-amber-900 dark:text-amber-100"
              }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 sm:p-4 md:p-6 rounded-xl border-2 transition-all duration-300 text-center group hover:scale-105 hover:shadow-lg ${platform.color}`}
              >
                <div className="font-bold group-hover:scale-105 transition-transform mb-2 text-base sm:text-sm md:text-base leading-relaxed tracking-wide">
                  {platform.name}
                </div>
                <div className="text-sm opacity-80 leading-relaxed tracking-wide px-1 sm:px-2">
                  {platform.description}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 md:py-32 z-10">
        <div className="absolute inset-0 opacity-10">
          {/* Creative studio themed pattern - Hidden on mobile for cleaner look */}
          <div className="hidden sm:block absolute top-20 left-20 w-32 h-32 border-2 border-sky-400/30 rotate-45" />
          <div className="hidden sm:block absolute bottom-32 right-32 w-24 h-24 border-2 border-blue-400/30 rounded-full" />
          <div className="hidden md:block absolute top-40 right-20 w-16 h-16 bg-cyan-400/20 transform rotate-12" />
          <div className="hidden md:block absolute bottom-20 left-40 w-20 h-2 bg-pink-400/30 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 px-2">
            <span className="text-foreground font-extrabold text-enhanced-strong">
              Ready to Work Together?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-foreground leading-relaxed px-4">
            Let&apos;s discuss your project and explore how we can help bring your digital vision to life.
            Get in touch to start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg sm:max-w-none mx-auto">
            <Link href="https://www.flolabs.international/internships/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <SkyButton 
                size="lg" 
                className="w-full sm:w-auto"
              >
                <span>Join the Studio</span>
                <ArrowRight className="w-5 h-5" />
              </SkyButton>
            </Link>

            <Link href="https://www.flolabs.international/internships/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <GhostButton 
                size="lg"
                className="w-full sm:w-auto"
              >
                <Lightbulb className="w-5 h-5" />
                <span>Apply to Programs</span>
              </GhostButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
