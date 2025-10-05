import Section from '@/components/ui/Section';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';

export const metadata = {
  title: "Our Services | Flomad Studios",
  description: "Learn about our technology content creation services - from AI research documentation to robotics project storytelling.",
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
              We specialize in creating content and experiences that make cutting-edge technology accessible and engaging.
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
                title="AI & Robotics Documentation"
                description="Technical documentation, user guides, and educational content that makes complex AI and robotics systems understandable and accessible to diverse audiences."
                iconName="Palette"
                colorScheme="primary"
              />
            </div>
            <div className="glass p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Technology Video Production"
                description="Professional video content including research demonstrations, tutorial series, and technology showcases that bring complex concepts to life."
                iconName="Code"
                colorScheme="secondary"
              />
            </div>
            <div className="glass p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Research Communication"
                description="Transforming technical research into compelling narratives through podcasts, articles, and multimedia content that reaches broader audiences."
                iconName="BarChart"
                colorScheme="accent"
              />
            </div>
            <div className="glass p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Technology Platform Content"
                description="Content creation for technology platforms, interfaces, and user experiences that support emerging tech products and research initiatives."
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
              <a href="https://flomad.international" target="_blank" rel="noopener noreferrer">Apply to Join</a>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
} 
