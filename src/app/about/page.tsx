import Section from '@/components/ui/Section';

export const metadata = {
  title: "About | Flomad Studios",
  description: "Learn more about Flomad Studios — our mission, our vision, and the creatives we empower.",
};

export default function AboutPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <Section className="relative overflow-hidden py-24 md:py-32">
        <div className="creative-gradient absolute inset-0 opacity-20" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-radial-gradient-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-radial-gradient-secondary rounded-full animate-pulse opacity-40" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-card p-8 md:p-12 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-visible">About Flomad Studios</h1>
            <p className="text-xl max-w-2xl mx-auto text-foreground/90">
              A growing digital design agency focused on creating exceptional web experiences and helping businesses thrive in the digital landscape.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Mission */}
      <Section className="py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text-visible">Our Mission</h2>
          <div className="glass-card p-8 md:p-12">
            <p className="text-xl leading-relaxed text-foreground/90">
              At Flomad Studios, we believe great design has the power to transform businesses and connect with audiences on a deeper level.
              Our mission is to partner with growing companies to create digital experiences that not only look exceptional but drive real business results.
            </p>
          </div>
        </div>
      </Section>

      {/* What We Do */}
      <Section className="relative py-16 md:py-24">
        <div className="creative-gradient absolute inset-0 opacity-10" />
        <div className="absolute top-10 right-10 w-20 h-20 bg-radial-gradient-primary rounded-full animate-bounce-subtle opacity-50" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text-visible">What We Focus On</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              { emoji: "�", title: "Strategic Design", text: "We create visual identities and user experiences that align with your business goals and resonate with your target audience." },
              { emoji: "�", title: "Modern Development", text: "Building fast, responsive websites with cutting-edge technology that performs well on all devices and search engines." },
              { emoji: "📈", title: "Growth-Focused", text: "Every project is designed with measurable goals in mind — whether that's increased conversions, engagement, or brand recognition." },
            ].map(({ emoji, title, text }) => (
              <div key={title} className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-glow">
                <div className="text-5xl mb-6">{emoji}</div>
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-foreground/80 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Flomad Labs Connection */}
      <Section className="py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text-visible">Part of the Flomad Ecosystem</h2>
          <div className="glass-card p-8 md:p-12 mb-8">
            <p className="text-xl leading-relaxed text-foreground/90 mb-6">
              Flomad Studios is the creative division of <strong>Flomad Labs R&D</strong>, bringing together design expertise 
              with cutting-edge technology and research. This unique connection allows us to offer innovative solutions 
              that blend creativity with technical excellence.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              Our collaborative approach combines strategic design thinking with advanced development capabilities, 
              ensuring every project benefits from both creative vision and technical innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.linkedin.com/company/flomad-labs-r-d" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button px-6 py-3 inline-flex items-center justify-center hover:shadow-glow transition-all"
              >
                Visit Flomad Labs R&D
              </a>
              <a 
                href="https://flomad.international" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button px-6 py-3 inline-flex items-center justify-center hover:shadow-glow transition-all"
              >
                Explore Flomad International
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="section text-center bg-gradient-to-tr from-primary-dark to-accent-dark text-white rounded-xl shadow-lg px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Create With Us?</h2>
        <p className="text-lg max-w-xl mx-auto mb-6 text-white/90">
          Whether you’re a seasoned storyteller or just getting started, Flomad Studios is your launchpad.
        </p>
        <a href="/join" className="button button-outline border-white text-white hover:bg-white hover:text-primary">
          Join the Studio
        </a>
      </section>
    </main>
  );
}
