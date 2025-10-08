

export const metadata = {
  title: "About | Flomad Studios",
  description: "Learn about FlomadStudios - the creative division of Flomad Labs R&D where emerging talent creates content for AI, robotics, and emerging technology projects.",
};

export default function AboutPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-8 md:p-12 mb-8 border border-border/60">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text text-transparent text-enhanced-strong">About Flomad Studios</h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-foreground/80 text-enhanced-readable px-4">
              The creative division of Flomad Labs R&D, where emerging talent learns by creating content for cutting-edge technology projects in AI, robotics, and emerging tech.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-heading text-enhanced-strong">Our Mission</h2>
          <div className="glass p-6 sm:p-8 md:p-12 border border-border/60">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground/80 text-enhanced-readable">
              At Flomad Studios, we believe creativity has the power to make complex technology more accessible and engaging. Our mission is to bridge the gap between cutting-edge research and human understanding by creating content that brings emerging technologies to life.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-heading text-enhanced-strong">What We Focus On</h2>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              { emoji: "🤖", title: "AI & Robotics Content", text: "Creating documentation, tutorials, and promotional content for artificial intelligence and robotics research projects at Flomad Labs." },
              { emoji: "🎥", title: "Technology Storytelling", text: "Developing videos, podcasts, and written content that explains complex technologies in accessible, engaging ways." },
              { emoji: "📚", title: "Research Communication", text: "Transforming technical research into compelling narratives for diverse audiences, from academic papers to public presentations." },
            ].map(({ emoji, title, text }) => (
              <div key={title} className="glass p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300 border border-border/60">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-heading text-enhanced-strong">{title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-enhanced-readable">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flomad Labs Connection */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-heading text-enhanced-strong">Part of the Flomad Ecosystem</h2>
          <div className="glass p-6 sm:p-8 md:p-12 mb-6 sm:mb-8 border border-border/60">
            <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 mb-4 sm:mb-6 text-enhanced-readable">
              Flomad Studios is the creative division of <strong className="text-heading text-enhanced-strong">Flomad Labs R&D</strong>, bringing together design expertise
              with cutting-edge technology and research. This unique connection allows us to offer innovative solutions
              that blend creativity with technical excellence.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-enhanced-readable">
              Our collaborative approach combines strategic design thinking with advanced development capabilities,
              ensuring every project benefits from both creative vision and technical innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://www.linkedin.com/company/flomad-labs-r-d"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center justify-center bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 rounded-lg text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 transition-all duration-300 text-sm sm:text-base"
              >
                Visit Flomad Labs R&D
              </a>
              <a
                href="https://flomad.international"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center justify-center bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 rounded-lg text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-200 transition-all duration-300 text-sm sm:text-base"
              >
                Explore Flomad International
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="relative z-10 text-center max-w-xl mx-auto px-4 sm:px-6">
          <div className="glass p-6 sm:p-8 md:p-12 border border-border/60">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-heading text-enhanced-strong">Ready to Create With Us?</h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 text-foreground/70 text-enhanced-readable">
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
      </section>
    </main>
  );
}
