import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import CaseStudyCard from '@/components/ui/CaseStudyCard';
import ClientGeometricBackground from '@/components/ui/ClientGeometricBackground';
import SkyBackground from '@/components/ui/SkyBackground';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import FloatingScrollIndicator from '@/components/ui/FloatingScrollIndicator';
import Link from 'next/link';
import { Play, Users, Mic, Video, Book, GraduationCap, Heart, ArrowRight, Sparkles, Rocket, Lightbulb } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-[100dvh] bg-background-light dark:bg-background relative overflow-x-hidden">
      {/* Sky Background Effects - Fixed positioning for mobile */}
      <div className="absolute inset-0 w-full h-full">
        <SkyBackground />
      </div>
      {/* Geometric Background */}
      <div className="absolute inset-0 w-full h-full">
        <ClientGeometricBackground />
      </div>

      {/* Light mode atmosphere overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/20 via-transparent to-sky-100/10 dark:from-transparent dark:via-transparent dark:to-transparent pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center px-6 z-10">
        {/* Modern Atmospheric Background Effects */}
        <div className="absolute inset-0">
          {/* Professional sky-themed gradient orbs */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-secondary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-secondary/12 to-accent/8 rounded-full blur-3xl animate-float-delay-1" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-3xl animate-float-delay-2" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-tl from-primary/12 to-secondary/8 rounded-full blur-3xl animate-float-delay-3" />

          {/* Atmospheric particles */}
          <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-60">
            <div className="absolute w-1 h-1 bg-primary rounded-full animate-float left-[10%] top-[20%]" />
            <div className="absolute w-1 h-1 bg-secondary rounded-full animate-float-delay-1 left-[80%] top-[30%]" />
            <div className="absolute w-1 h-1 bg-accent rounded-full animate-float-delay-2 left-[25%] top-[70%]" />
            <div className="absolute w-1 h-1 bg-primary/80 rounded-full animate-float-delay-3 left-[75%] top-[60%]" />
            <div className="absolute w-1 h-1 bg-secondary/80 rounded-full animate-float left-[45%] top-[15%]" />
            <div className="absolute w-1 h-1 bg-accent/80 rounded-full animate-float-delay-1 left-[60%] top-[80%]" />
            <div className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float-delay-2 left-[15%] top-[50%]" />
            <div className="absolute w-1 h-1 bg-secondary/60 rounded-full animate-float-delay-3 left-[90%] top-[10%]" />
          </div>

          {/* Professional grid pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="h-full w-full bg-[linear-gradient(rgb(3,105,161,0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(8,145,178,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>
        </div>

        {/* Main Content - Optimized for mobile readability */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Professional badge */}
            <div className="mb-8 animate-float">
              <GlassCard className="inline-block px-8 py-4 glow-effect group" variant="sky" blur="xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/30 rounded-full group-hover:rotate-12 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-primary dark:text-primary-300" />
                  </div>
                  <span className="text-sm font-bold tracking-wider text-foreground uppercase">Digital Design Studio</span>
                </div>
              </GlassCard>
            </div>

            {/* Professional themed heading - Mobile optimized */}
            <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-none tracking-tight">
                <div className="relative inline-block mb-2">
                  <span className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/15 blur-2xl rounded-2xl animate-pulse" />
                  <span className="relative professional-heading transform hover:scale-105 transition-transform duration-300 inline-block">
                    Flomad
                  </span>
                </div>
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-none tracking-tight">
                <span className="gradient-text-sky font-extrabold drop-shadow-2xl transform hover:scale-105 transition-transform duration-300 inline-block">
                  Studios
                </span>
              </h1>
            </div>

            {/* Professional Subtitle - Mobile optimized spacing */}
            <div className="mb-8 sm:mb-12 max-w-4xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold professional-text leading-relaxed mb-3 sm:mb-4">
                Creative Digital Studio
              </p>
              <p className="text-sm sm:text-base md:text-lg text-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                The creative division of Flomad Labs R&D, where we create content and experiences for cutting-edge technology projects in AI, robotics, and emerging tech platforms.
              </p>
            </div>

            {/* Professional CTA Section - Optimized for Mobile Touch */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <GlassButton
                  variant="primary"
                  size="lg"
                  glow
                  className="group relative overflow-hidden px-10 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 border-sky-500/30 min-h-[48px] min-w-[44px] touch-manipulation"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Link href="/contact" className="relative flex items-center gap-3">
                    <span>Let&apos;s Talk</span>
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                  </Link>
                </GlassButton>

                <GlassButton
                  variant="ghost"
                  size="lg"
                  className="group px-10 py-4 text-lg font-semibold border-amber-400/40 hover:border-yellow-400/60 transform hover:scale-105 transition-all duration-300 min-h-[48px] min-w-[44px] touch-manipulation"
                >
                  <Link href="/work" className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                      <Play className="w-5 h-5" />
                    </div>
                    <span>View Our Work</span>
                  </Link>
                </GlassButton>
              </div>

              {/* Mission Statement */}
              <div className="flex flex-wrap justify-center gap-12 mt-16 pt-8 border-t border-sky-300/20">
                <div className="text-center max-w-2xl">
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</div>
                  <div className="text-lg text-foreground leading-relaxed">
                    To provide a collaborative creative environment where emerging talent can learn,
                    grow, and create meaningful content alongside experienced mentors and industry professionals.
                  </div>
                </div>
              </div>

              {/* Trust Indicators with Sky Blue to Yellow Theme */}
              <div className="mt-12 pt-6">
                <p className="text-foreground text-sm lg:text-base mb-6 text-center">Building authentic content for creative professionals</p>
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8 text-foreground text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                    Professional Quality
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Creative Excellence
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    Timely Delivery
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    Collaborative Learning
                  </span>
                </div>
              </div>

              {/* Enhanced Scroll Indicator - positioned higher for better visibility */}
              <ScrollIndicator text="Discover Our Services" hideAfterScroll={true} />
            </div>
          </div>
        </div>

        {/* Floating Scroll Indicator - Only show on larger screens and hide quickly */}
        <div className="hidden lg:block">
          <FloatingScrollIndicator hideAfterScroll={true} />
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section className="relative py-16 md:py-32 creative-gradient z-10 bg-white/5 dark:bg-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="text-center mb-12 md:mb-20 slide-up">
            <GlassCard className="inline-block px-6 py-3 mb-8 glow-effect" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-foreground">OUR WORK</span>
              </div>
            </GlassCard>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 text-enhanced-strong">
              Websites & <span className="text-foreground font-extrabold">Digital Experiences</span>
            </h2>
            <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
              Real projects we&apos;ve designed and developed for the Flomad Labs ecosystem, from AI platforms to robotics marketplaces.
            </p>
          </div>

          {/* Portfolio Grid - Enhanced mobile responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <CaseStudyCard
              title="Flomad Labs R&D"
              description="Main company website showcasing AI & robotics research with modern design and professional portfolio presentation."
              category="Corporate Website"
              image="/images/flomadlabs.png"
              url="https://flomadlabs.com"
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
              title="Flomad International"
              description="Educational platform for AI & robotics programs with course information and application system."
              category="Educational Website"
              image="/images/flomadinternational.png"
              url="https://flomad.international"
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
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Design Arsenal</h3>
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
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 slide-up">
            <GlassCard className="inline-block px-6 py-3 mb-8 glow-effect" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-foreground">WHAT WE DO</span>
              </div>
            </GlassCard>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 text-enhanced-strong">
              Digital <span className="text-foreground font-extrabold">Creative Services</span>
            </h2>
            <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
              Professional design and development services powered by industry-standard tools and creative expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">{[
            {
              icon: Users,
              title: "Web Design & Development",
              description: "Creating modern, responsive websites that effectively represent your brand and engage visitors.",
              variant: "primary" as const
            },
            {
              icon: Mic,
              title: "Brand Identity Design",
              description: "Developing visual identity systems that help your business stand out and connect with customers.",
              variant: "secondary" as const
            },
            {
              icon: Video,
              title: "Digital Content Creation",
              description: "Producing engaging video, audio, and visual content to tell your brand&apos;s story across platforms.",
              variant: "accent" as const
            },
            {
              icon: Book,
              title: "Digital Strategy",
              description: "Planning and implementing digital solutions that align with your business goals and growth objectives.",
              variant: "primary" as const
            },
            {
              icon: GraduationCap,
              title: "Creative Consultation",
              description: "Providing expert guidance on digital projects, from concept development to final implementation.",
              variant: "secondary" as const
            },
            {
              icon: Heart,
              title: "Ongoing Support",
              description: "Maintaining and evolving your digital presence with updates, improvements, and new features.",
              variant: "accent" as const
            }
          ].map((service, index) => (
            <GlassCard
              key={index}
              className="p-8 text-center group fade-in hover:scale-105 transition-all duration-300"
              variant={service.variant}
              blur="md"
              hover
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-12 h-12 mx-auto text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{service.title}</h3>
              <p className="text-foreground leading-relaxed">{service.description}</p>
            </GlassCard>
          ))}
          </div>
        </div>
      </section>

      {/* Podcast Spotlight Section */}
      <section className="relative py-24 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <GlassCard className="inline-block px-6 py-3 mb-8 glow-effect" variant="accent" blur="md">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-foreground">THE FLOMAD FREQUENCY</span>
              </div>
            </GlassCard>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Podcast <span className="gradient-text-sky">Coming Soon</span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
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
                  <h3 className="text-2xl font-bold text-foreground mb-2">The Flomad Frequency</h3>
                  <p className="text-foreground/70 mb-4">
                    Technology conversations that matter. From AI breakthroughs to creative innovation.
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
                    <span key={feature} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Ribbon */}
      <section className="relative py-16 bg-gradient-to-r from-sky-50/50 via-blue-50/30 to-emerald-50/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/50 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Part of the <span className="text-primary">Flomad Labs Ecosystem</span>
            </h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Flomad Studios works alongside other innovative platforms in the Flomad Labs network
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "Flomad Labs",
                description: "AI & Robotics R&D",
                url: "https://flomadlabs.com",
                color: "bg-blue-500/10 border-blue-400/30 hover:bg-blue-500/20"
              },
              {
                name: "Flomad International", 
                description: "Education Programs",
                url: "https://flomad.international",
                color: "bg-emerald-500/10 border-emerald-400/30 hover:bg-emerald-500/20"
              },
              {
                name: "Flomad Travel",
                description: "AI-Powered Travel",
                url: "https://flomadtravel.com",
                color: "bg-purple-500/10 border-purple-400/30 hover:bg-purple-500/20"
              },
              {
                name: "CAIPO",
                description: "AI Productivity Officer",
                url: "https://caipo.ai",
                color: "bg-amber-500/10 border-amber-400/30 hover:bg-amber-500/20"
              }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-lg border transition-all duration-300 text-center group ${platform.color}`}
              >
                <div className="font-semibold text-foreground group-hover:scale-105 transition-transform">
                  {platform.name}
                </div>
                <div className="text-sm text-foreground/60 mt-1">
                  {platform.description}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 z-10">
        <div className="absolute inset-0 opacity-10">
          {/* Creative studio themed pattern */}
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-sky-400/30 rotate-45" />
          <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-blue-400/30 rounded-full" />
          <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-400/20 transform rotate-12" />
          <div className="absolute bottom-20 left-40 w-20 h-2 bg-pink-400/30 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 slide-up">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-foreground font-extrabold">
              Ready to Work Together?
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-foreground leading-relaxed">
            Let&apos;s discuss your project and explore how we can help bring your digital vision to life.
            Get in touch to start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg sm:max-w-none mx-auto">
            <GlassButton variant="primary" size="lg" glow className="group hover:scale-105 transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation">
              <a href="https://flomad.international" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-1">
                <span>Join the Studio</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </GlassButton>

            <GlassButton variant="ghost" size="lg" className="group hover:scale-105 transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation">
              <a href="https://flomad.international" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-1">
                <Lightbulb className="w-5 h-5" />
                <span>Apply to Programs</span>
              </a>
            </GlassButton>
          </div>
        </div>
      </section>
    </main>
  );
}
