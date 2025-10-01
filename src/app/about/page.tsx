import Section from '@/components/ui/Section';

export const metadata = {
  title: "About | Flomad Studios",
  description: "Learn about FlomadStudios - the creative division of Flomad Labs R&D where emerging talent creates content for AI, robotics, and emerging technology projects.",
};

export default function AboutPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <Section backdrop="default" className="py-24 md:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-8 md:p-12 mb-8 border border-border/60">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text text-transparent">About Flomad Studios</h1>
            <p className="text-xl max-w-2xl mx-auto text-foreground/80">
              The creative division of Flomad Labs R&D, where emerging talent learns by creating content for cutting-edge technology projects in AI, robotics, and emerging tech.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Mission */}
      <Section backdrop="subtle" className="py-16 md:py-24">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-heading">Our Mission</h2>
          <div className="glass p-8 md:p-12 border border-border/60">
            <p className="text-xl leading-relaxed text-foreground/80">
              At Flomad Studios, we believe creativity has the power to make complex technology more accessible and engaging. Our mission is to bridge the gap between cutting-edge research and human understanding by creating content that brings emerging technologies to life.
            </p>
          </div>
        </div>
      </Section>

      {/* What We Do */}
      <Section backdrop="subtle" className="py-16 md:py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-heading">What We Focus On</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              { emoji: "🤖", title: "AI & Robotics Content", text: "Creating documentation, tutorials, and promotional content for artificial intelligence and robotics research projects at Flomad Labs." },
              { emoji: "🎥", title: "Technology Storytelling", text: "Developing videos, podcasts, and written content that explains complex technologies in accessible, engaging ways." },
              { emoji: "�", title: "Research Communication", text: "Transforming technical research into compelling narratives for diverse audiences, from academic papers to public presentations." },
            ].map(({ emoji, title, text }) => (
              <div key={title} className="glass p-8 text-center hover:scale-105 transition-all duration-300 border border-border/60">
                <div className="text-5xl mb-6">{emoji}</div>
                <h3 className="text-2xl font-bold mb-4 text-heading">{title}</h3>
                <p className="text-foreground/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Flomad Labs Connection */}
      <Section backdrop="subtle" className="py-16 md:py-24">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-heading">Part of the Flomad Ecosystem</h2>
          <div className="glass p-8 md:p-12 mb-8 border border-border/60">
            <p className="text-xl leading-relaxed text-foreground/80 mb-6">
              Flomad Studios is the creative division of <strong className="text-heading">Flomad Labs R&D</strong>, bringing together design expertise
              with cutting-edge technology and research. This unique connection allows us to offer innovative solutions
              that blend creativity with technical excellence.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our collaborative approach combines strategic design thinking with advanced development capabilities,
              ensuring every project benefits from both creative vision and technical innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/company/flomad-labs-r-d"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 inline-flex items-center justify-center bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 rounded-lg text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 transition-all duration-300"
              >
                Visit Flomad Labs R&D
              </a>
              <a
                href="https://flomad.international"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 inline-flex items-center justify-center bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 rounded-lg text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-200 transition-all duration-300"
              >
                Explore Flomad International
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section backdrop="intense" className="py-16 md:py-24">
        <div className="relative z-10 text-center max-w-xl mx-auto px-6">
          <div className="glass p-8 md:p-12 border border-border/60">
            <h2 className="text-3xl font-bold mb-4 text-heading">Ready to Create With Us?</h2>
            <p className="text-lg mb-6 text-foreground/70">
              Whether you&apos;re a seasoned storyteller or just getting started, Flomad Studios is your launchpad.
            </p>
            <a
              href="https://flomad.international"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 rounded-lg text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 transition-all duration-300 font-medium"
            >
              Apply to Join
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
