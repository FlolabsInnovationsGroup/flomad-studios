import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import CaseStudyCard from '@/components/ui/CaseStudyCard';
import GlassCard from '@/components/ui/GlassCard';
import { ExternalLink, Play, Palette, Code, Video, Presentation, Globe } from 'lucide-react';

export const metadata = {
  title: "Our Work | Flomad Studios",
  description: "Explore our portfolio of websites, presentations, and digital experiences designed for the Flomad Labs ecosystem.",
};

export default function WorkPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <Section backdrop="default" className="py-24 md:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-block px-6 py-3 bg-sky-500/20 border border-sky-400/30 rounded-lg mb-6">
            <span className="text-sm font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">PORTFOLIO SHOWCASE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text text-transparent">Our Work</h1>
          <p className="text-xl max-w-2xl mx-auto text-foreground/80 mb-8">
            Real projects, websites, and digital experiences we&apos;ve designed and developed for AI, robotics, and emerging technology platforms.
          </p>
        </div>
      </Section>

      {/* Portfolio Stats */}
      <Section backdrop="subtle" className="py-16">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "5+", label: "Websites Designed" },
              { number: "3+", label: "Platforms Built" }, 
              { number: "10+", label: "Presentations Created" },
              { number: "2", label: "Years Experience" }
            ].map((stat, index) => (
              <GlassCard key={index} className="p-6 text-center" variant="sky" blur="md">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Websites */}
      <Section backdrop="subtle" className="py-16 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Website Portfolio</h2>
            </div>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Professional websites designed with Figma, built with modern technologies, and optimized for performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <CaseStudyCard
              title="Flomad Labs R&D"
              description="Corporate website showcasing AI & robotics research with modern design, professional portfolio presentation, and service highlights."
              category="Corporate Website"
              image="/images/flomadlabs.png"
              url="https://flomadlabs.com"
              status="live"
              tools={["Next.js", "Figma", "Tailwind CSS", "TypeScript", "Vercel"]}
              features={["Responsive Design", "SEO Optimized", "Performance Focused", "Modern UI/UX"]}
              date="2024"
              size="featured"
            />

            <CaseStudyCard
              title="RoboCollective.ai"
              description="Premium robot marketplace with full e-commerce functionality, product showcases, customer testimonials, and integrated blog."
              category="E-commerce Platform"
              image="/images/robocollective.png"
              url="https://robocollective.ai"
              status="live"
              tools={["WordPress", "Canva", "WooCommerce", "Custom CSS", "PHP"]}
              features={["Product Catalog", "Shopping Cart", "Blog Integration", "Customer Reviews"]}
              metrics={[
                { label: "Products", value: "50+" },
                { label: "Categories", value: "3" }
              ]}
            />

            <CaseStudyCard
              title="Flomad International"
              description="Educational platform for AI & robotics programs featuring course catalogs, application systems, and student resources."
              category="Educational Website"
              image="/images/flomadinternational.png"
              url="https://flomad.international"
              status="live"
              tools={["WordPress", "Figma", "Canva", "Custom Plugins", "MySQL"]}
              features={["Course Catalog", "Application System", "Student Portal", "Program Info"]}
            />

            <CaseStudyCard
              title="CAIPO.ai"
              description="AI assistant platform landing page with modern animations, early access signup, and interactive design elements."
              category="AI Platform"
              image="/images/caipoai.png"
              url="https://caipo.ai"
              status="in-development"
              tools={["Next.js", "Figma", "Framer Motion", "Tailwind CSS", "TypeScript"]}
              features={["Waitlist System", "Interactive Design", "Mobile Optimized", "Animation Effects"]}
            />

            <CaseStudyCard
              title="MoodChanger.ai"
              description="AI mood management platform with comprehensive brand design, user experience planning, and coming soon page."
              category="AI Platform"
              image="/images/moodchanger.png"
              url="https://moodchanger.ai"
              status="coming-soon"
              tools={["Next.js", "Canva", "Figma", "Brand Guidelines", "Design System"]}
              features={["Brand Identity", "UI/UX Design", "Landing Page", "Brand Guidelines"]}
            />

            <CaseStudyCard
              title="Flomad Studios"
              description="This very website - our own portfolio and creative studio showcase built with modern web technologies."
              category="Portfolio Website"
              image="/images/flomadstudios.png"
              status="live"
              tools={["Next.js", "Figma", "Tailwind CSS", "Framer Motion", "TypeScript"]}
              features={["Dark/Light Mode", "Animations", "Portfolio Grid", "Contact Forms"]}
            />
          </div>
        </div>
      </Section>

      {/* Presentations & Creative Work */}
      <Section backdrop="default" className="py-16 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Presentation className="w-8 h-8 text-secondary" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Presentations & Design</h2>
            </div>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Professional pitch decks, brand presentations, and marketing materials created with Canva Pro and Figma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <CaseStudyCard
              title="MoodChanger.ai Pitch Deck"
              description="Comprehensive presentation showcasing the AI mood management platform concept, market opportunity, and technical approach."
              category="Pitch Presentation"
              image="/images/moodchanger.png"
              url="https://www.canva.com/design/DAGW8HnZilc/FiHkWHhXQkpkm5jcDU9fLA/view"
              status="live"
              tools={["Canva Pro", "Brand Guidelines", "Market Research", "Visual Design"]}
              features={["Market Analysis", "Product Features", "Business Model", "Technical Specs"]}
            />

            <CaseStudyCard
              title="MoodChanger for Pets"
              description="Specialized presentation for AI health monitoring for pets with custom branding, infographics, and product mockups."
              category="Product Presentation"
              image="/images/moodchanger.png"
              url="https://www.canva.com/design/DAGYja1TUd4/0uXWmOksp8B2tV22841r9g/view"
              status="live"
              tools={["Canva Pro", "Custom Graphics", "Pet-focused Design", "Brand Extension"]}
              features={["Product Mockups", "Health Tracking UI", "Pet-focused Branding", "Market Positioning"]}
            />
          </div>
        </div>
      </Section>

      {/* Design Process */}
      <Section backdrop="subtle" className="py-16 md:py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Design Process</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              From concept to launch, we use industry-standard tools and proven methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Palette,
                title: "Design & Prototyping",
                tools: ["Figma", "Canva Pro", "Adobe Creative Suite"],
                description: "Creating wireframes, mockups, and interactive prototypes with professional design tools."
              },
              {
                icon: Code,
                title: "Development & Build",
                tools: ["Next.js", "WordPress", "Tailwind CSS", "TypeScript"],
                description: "Building responsive, performant websites with modern web technologies and frameworks."
              },
              {
                icon: ExternalLink,
                title: "Launch & Optimize",
                tools: ["Vercel", "Google Analytics", "SEO Tools", "Performance Monitoring"],
                description: "Deploying, monitoring, and continuously optimizing for the best user experience."
              }
            ].map((step, index) => (
              <GlassCard key={index} className="p-8 text-center group hover:scale-105 transition-all duration-300" variant="primary" blur="md">
                <div className="mb-6">
                  <step.icon className="w-12 h-12 mx-auto text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                <p className="text-foreground/70 mb-6">{step.description}</p>
                <div className="space-y-2">
                  {step.tools.map((tool) => (
                    <span key={tool} className="inline-block px-3 py-1 bg-primary/10 text-primary rounded text-sm mr-2 mb-2">
                      {tool}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Tools We Use */}
          <GlassCard className="p-8 text-center" variant="secondary" blur="lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">Professional Tools We Master</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "Figma", color: "bg-purple-500/20 text-purple-300" },
                { name: "Canva Pro", color: "bg-blue-500/20 text-blue-300" },
                { name: "Next.js", color: "bg-gray-500/20 text-gray-300" },
                { name: "WordPress", color: "bg-blue-600/20 text-blue-300" },
                { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-300" },
                { name: "TypeScript", color: "bg-blue-700/20 text-blue-300" }
              ].map((tool) => (
                <div key={tool.name} className={`px-4 py-3 rounded-lg ${tool.color} font-medium`}>
                  {tool.name}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* CTA */}
      <Section backdrop="intense" className="py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-12 md:p-16 rounded-2xl border border-border/60">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-heading">Interested in This Work?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-foreground/80">
              Join our creative learning program and help create content for the next generation of technology at Flomad Labs R&D.
            </p>
            <Button className="bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 text-lg px-8 py-4 transition-all duration-300" asChild>
              <a href="https://flomad.international" target="_blank" rel="noopener noreferrer">Apply to Join</a>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
} 
