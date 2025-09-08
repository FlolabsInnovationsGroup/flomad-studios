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
      <Section className="relative overflow-hidden py-24 md:py-32">
        <div className="creative-gradient absolute inset-0 opacity-20" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-radial-gradient-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-radial-gradient-secondary rounded-full animate-pulse opacity-40" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-card p-8 md:p-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-visible">Our Services</h1>
            <p className="text-xl max-w-2xl mx-auto text-foreground/90 mb-8">
              We offer a comprehensive range of creative services to help businesses establish a strong digital presence.
            </p>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section className="relative overflow-hidden py-16">
        <div className="creative-gradient absolute inset-0 opacity-10" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card group hover:glass-intense transition-all duration-300">
              <ServiceCard
                title="Brand & Digital Identity"
                description="Complete brand development from logo design to brand guidelines, creating cohesive visual identities that resonate with your target audience."
                iconName="Palette"
                colorScheme="primary"
              />
            </div>
            <div className="glass-card group hover:glass-intense transition-all duration-300">
              <ServiceCard
                title="Web Development & UX"
                description="Modern, responsive websites built with cutting-edge technology. We focus on performance, user experience, and conversion optimization."
                iconName="Code"
                colorScheme="secondary"
              />
            </div>
            <div className="glass-card group hover:glass-intense transition-all duration-300">
              <ServiceCard
                title="Digital Marketing & Analytics"
                description="Data-driven marketing strategies including SEO, content marketing, and performance analytics to grow your online presence and drive results."
                iconName="BarChart"
                colorScheme="accent"
              />
            </div>
            <div className="glass-card group hover:glass-intense transition-all duration-300">
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
      <Section className="relative overflow-hidden py-24">
        <div className="creative-gradient absolute inset-0 opacity-30" />
        <div className="absolute top-20 right-10 w-24 h-24 bg-radial-gradient-primary rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-radial-gradient-secondary rounded-full animate-pulse opacity-40" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="glass-card p-8 md:p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-visible">Our Process</h2>
              <p className="text-xl max-w-2xl mx-auto text-foreground/90">
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
              <div key={index} className="glass-card p-8 hover:glass-intense transition-all duration-300 group">
                <div className="text-4xl font-bold gradient-text-visible mb-4 group-hover:scale-110 transition-transform">{step.number}</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text-visible transition-colors">{step.title}</h3>
                <p className="text-foreground/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden py-32">
        <div className="creative-gradient absolute inset-0 opacity-50" />
        <div className="absolute top-20 right-10 w-40 h-40 bg-radial-gradient-primary rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-radial-gradient-secondary rounded-full animate-pulse opacity-30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-visible">Ready to Get Started?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-foreground/90">
              Let&apos;s collaborate on your next project and bring your creative vision to life.
            </p>
            <Button className="glass-button text-lg px-8 py-4" asChild>
              <Link href="/join">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
} 