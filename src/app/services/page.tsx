import Section from '@/components/ui/Section';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export const metadata = {
  title: "Our Services | Flomad Studios",
  description: "Explore the comprehensive range of creative services we offer to elevate your brand.",
};

export default function ServicesPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <Section backdrop="default" className="py-24 md:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-8 md:p-12 border border-border/60">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text text-transparent">Our Services</h1>
            <p className="text-xl max-w-2xl mx-auto text-foreground/80 mb-8">
              We offer a comprehensive range of creative services to help businesses establish a strong digital presence.
            </p>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section backdrop="subtle" className="py-16">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Brand & Digital Identity"
                description="Complete brand development from logo design to brand guidelines, creating cohesive visual identities that resonate with your target audience."
                iconName="Palette"
                colorScheme="primary"
              />
            </div>
            <div className="glass p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Web Development & UX"
                description="Modern, responsive websites built with cutting-edge technology. We focus on performance, user experience, and conversion optimization."
                iconName="Code"
                colorScheme="secondary"
              />
            </div>
            <div className="glass p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Digital Marketing & Analytics"
                description="Data-driven marketing strategies including SEO, content marketing, and performance analytics to grow your online presence and drive results."
                iconName="BarChart"
                colorScheme="accent"
              />
            </div>
            <div className="glass p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Creative Content & Video"
                description="Professional video production, photography, and creative content that tells your story and engages your audience across all platforms."
                iconName="Video"
                colorScheme="primary"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section backdrop="subtle" className="py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="glass p-8 md:p-12 border border-border/60">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-heading">Our Process</h2>
              <p className="text-xl max-w-2xl mx-auto text-foreground/80">
                We follow a collaborative approach to bring your vision to life.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Discovery",
                description: "We begin by understanding your goals, audience, and vision through in-depth consultations."
              },
              {
                number: "02",
                title: "Creation",
                description: "Our team develops tailored solutions that align with your brand and business objectives."
              },
              {
                number: "03",
                title: "Delivery",
                description: "We implement, refine, and launch your project with ongoing support to ensure success."
              }
            ].map((step, index) => (
              <div key={index} className="glass p-8 hover:scale-105 transition-all duration-300 group border border-border/60">
                <div className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-4 group-hover:scale-110 transition-transform">{step.number}</div>
                <h3 className="text-2xl font-bold mb-3 text-heading transition-colors">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section backdrop="intense" className="py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-8 md:p-12 border border-border/60">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-heading">Ready to Get Started?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-foreground/80">
              Let&apos;s collaborate on your next project and bring your creative vision to life.
            </p>
            <Button className="bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 text-lg px-8 py-4" asChild>
              <Link href="/join">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
} 
