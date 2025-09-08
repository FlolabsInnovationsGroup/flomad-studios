import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import ClientGeometricBackground from '@/components/ui/ClientGeometricBackground';
import Link from 'next/link';
import { Play, Users, Mic, Video, Book, GraduationCap, Heart, ArrowRight, Sparkles, Rocket, Lightbulb } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 overflow-hidden relative">
      {/* Geometric Background */}
      <ClientGeometricBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Modern Sky Blue to Yellow Background Effects */}
        <div className="absolute inset-0">
          {/* Sky Blue to Yellow Gradient Orbs */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-500/20 to-blue-600/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-green-500/15 to-emerald-600/10 rounded-full blur-3xl animate-float-delay-1" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-amber-400/20 to-yellow-500/15 rounded-full blur-3xl animate-float-delay-2" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-tl from-yellow-300/15 to-amber-500/10 rounded-full blur-3xl animate-float-delay-3" />
          
          {/* Bright Floating Particles */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute w-1 h-1 bg-sky-300 rounded-full animate-float left-[10%] top-[20%]" />
            <div className="absolute w-1 h-1 bg-green-300 rounded-full animate-float-delay-1 left-[80%] top-[30%]" />
            <div className="absolute w-1 h-1 bg-amber-300 rounded-full animate-float-delay-2 left-[25%] top-[70%]" />
            <div className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-float-delay-3 left-[75%] top-[60%]" />
            <div className="absolute w-1 h-1 bg-sky-400 rounded-full animate-float left-[45%] top-[15%]" />
            <div className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-float-delay-1 left-[60%] top-[80%]" />
            <div className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float-delay-2 left-[15%] top-[50%]" />
            <div className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float-delay-3 left-[90%] top-[10%]" />
          </div>

          {/* Modern Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>
        </div>

        {/* Main Content - Fixed spacing to prevent overlaps */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Sky Blue to Yellow Badge */}
            <div className="mb-8 animate-float">
              <GlassCard className="inline-block px-8 py-4 glow-effect group border-sky-300/30" variant="primary" blur="xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/30 rounded-full group-hover:rotate-12 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-sky-300" />
                  </div>
                  <span className="text-sm font-bold tracking-wider text-white uppercase">Digital Design Studio</span>
                </div>
              </GlassCard>
            </div>

            {/* Sky Blue to Yellow Themed Heading */}
            <div className="mb-8 space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight">
                <div className="relative inline-block mb-2">
                  <span className="absolute -inset-4 bg-gradient-to-r from-sky-500/20 to-amber-500/15 blur-2xl rounded-2xl animate-pulse" />
                  <span className="relative text-white drop-shadow-2xl transform hover:scale-105 transition-transform duration-300 inline-block">
                    Flomad
                  </span>
                </div>
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight">
                <span className="bg-gradient-to-r from-white via-white/80 to-transparent bg-clip-text text-transparent font-extrabold drop-shadow-2xl transform hover:scale-105 transition-transform duration-300 inline-block">
                  Studios
                </span>
              </h1>
            </div>

            {/* Professional Subtitle */}
            <div className="mb-12 max-w-4xl mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-white/95 leading-relaxed mb-4">
                Creative Digital Studio
              </p>
              <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                A division of Flomad Labs R&D, we help businesses bring their digital visions to life through thoughtful design, modern development, and creative content solutions.
              </p>
            </div>

            {/* Professional CTA Section */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <GlassButton 
                  variant="primary" 
                  size="lg" 
                  glow 
                  className="group relative overflow-hidden px-10 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 border-sky-500/30"
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
                  className="group px-10 py-4 text-lg font-semibold border-amber-400/40 hover:border-yellow-400/60 transform hover:scale-105 transition-all duration-300"
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
                  <div className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</div>
                  <div className="text-lg text-white/80 leading-relaxed">
                    To provide a collaborative creative environment where emerging talent can learn, 
                    grow, and create meaningful content alongside experienced mentors and industry professionals.
                  </div>
                </div>
              </div>

              {/* Trust Indicators with Sky Blue to Yellow Theme */}
              <div className="mt-12 pt-6">
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">Building authentic content for creative professionals</p>
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8 text-white/80 text-sm">
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

              {/* Sky Blue to Yellow Scroll Indicator */}
              <div className="flex justify-center mt-16 mb-8">
                <div className="flex flex-col items-center space-y-3 animate-bounce">
                  <span className="text-xs text-white/60 uppercase tracking-wide font-medium">Scroll to explore</span>
                  <div className="w-6 h-10 border-2 border-sky-400/40 rounded-full flex justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/30 to-transparent animate-pulse" />
                    <div className="w-1 h-3 bg-gradient-to-b from-sky-400 to-amber-400 rounded-full mt-2 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remove the old absolute positioned scroll indicator */}
      </section>

      {/* Services Section */}
      <section className="relative py-32 creative-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 slide-up">
            <GlassCard className="inline-block px-6 py-3 mb-8 glow-effect" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-white dark:text-white light:text-slate-800">WHAT WE DO</span>
              </div>
            </GlassCard>
            <h2 className="text-5xl md:text-6xl font-bold text-white dark:text-white light:text-slate-900 mb-8">
              Digital <span className="text-cyan-200 font-extrabold">Creative Services</span>
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-slate-700 max-w-4xl mx-auto leading-relaxed">
              As a division of Flomad Labs R&D, we bring together creative design and modern technology 
              to help businesses establish their digital presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{[
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
                  <service.icon className="w-12 h-12 mx-auto text-white/80 dark:text-white/80 light:text-slate-700/80" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-slate-900">{service.title}</h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-slate-600 leading-relaxed">{service.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {/* Creative studio themed pattern */}
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-sky-400/30 rotate-45" />
          <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-blue-400/30 rounded-full" />
          <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-400/20 transform rotate-12" />
          <div className="absolute bottom-20 left-40 w-20 h-2 bg-pink-400/30 rounded-full" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 slide-up">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-white font-extrabold">
              Ready to Work Together?
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300 dark:text-gray-300 light:text-slate-700 leading-relaxed">
            Let&apos;s discuss your project and explore how we can help bring your digital vision to life. 
            Get in touch to start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <GlassButton variant="primary" size="lg" glow className="group hover:scale-105 transition-all duration-300">
              <Link href="/join" className="flex items-center gap-2">
                <span>Join the Studio</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </GlassButton>
            
            <GlassButton variant="ghost" size="lg" className="group hover:scale-105 transition-all duration-300">
              <Link href="/about" className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>Learn About Our Mission</span>
              </Link>
            </GlassButton>
          </div>
        </div>
      </section>
    </main>
  );
}
