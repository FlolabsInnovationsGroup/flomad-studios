import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Link from 'next/link';
import { Play, Users, Mic, Video, Book, GraduationCap, Heart, ArrowRight, Sparkles, Rocket, Lightbulb } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <GlassCard className="inline-block px-6 py-3 mb-8" variant="primary" blur="lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-white">CREATIVE EXCELLENCE SINCE 2023</span>
            </div>
          </GlassCard>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
            <span className="block text-white mb-4">Flomad</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Studios
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            A creative division of Flomad Labs empowering the next generation of storytellers, 
            content creators, and makers through mentorship and real-world collaboration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <GlassButton variant="primary" size="lg" glow className="group">
              <Link href="/join" className="flex items-center gap-2">
                <span>Join the Studio</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </GlassButton>
            
            <GlassButton variant="ghost" size="lg" className="group">
              <Link href="/work" className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>View Our Content</span>
              </Link>
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <GlassCard className="inline-block px-6 py-3 mb-8" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-white">WHAT WE DO</span>
              </div>
            </GlassCard>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Creative Learning & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Content Creation</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We provide real-world creative experience through mentorship, collaboration, and hands-on content creation 
              in podcasts, videos, digital storytelling, and emerging media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Creative Mentorship",
                description: "Learn from experienced creators and industry professionals who guide you through real projects.",
                variant: "primary" as const
              },
              {
                icon: Mic,
                title: "Podcast Production",
                description: "From concept to final edit, create compelling audio content that tells meaningful stories.",
                variant: "secondary" as const
              },
              {
                icon: Video,
                title: "Video Content Creation",
                description: "Develop video storytelling skills through hands-on production, editing, and creative direction.",
                variant: "accent" as const
              },
              {
                icon: Book,
                title: "Digital Storytelling",
                description: "Explore innovative ways to tell stories across digital platforms with interactive elements.",
                variant: "primary" as const
              },
              {
                icon: GraduationCap,
                title: "Internship Programs",
                description: "Gain real-world experience working on actual projects with mentorship and skill development.",
                variant: "secondary" as const
              },
              {
                icon: Heart,
                title: "Creative Community",
                description: "Join a supportive network of creators where collaboration and shared learning drive innovation.",
                variant: "accent" as const
              }
            ].map((service, index) => (
              <GlassCard
                key={index}
                className="p-8 text-center group"
                variant={service.variant}
                blur="md"
                hover
              >
                <div className="mb-6">
                  <service.icon className="w-12 h-12 mx-auto text-white/80" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Start Creating?
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300 leading-relaxed">
            Join our community of storytellers, creators, and makers. Whether you&apos;re here to learn, 
            mentor, or collaborate, there&apos;s a place for you at Flomad Studios.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <GlassButton variant="primary" size="lg" glow className="group">
              <Link href="/join" className="flex items-center gap-2">
                <span>Join the Studio</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </GlassButton>
            
            <GlassButton variant="ghost" size="lg" className="group">
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
