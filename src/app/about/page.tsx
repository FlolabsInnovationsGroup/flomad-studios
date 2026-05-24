import { aboutMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-8 md:p-12 mb-8 border border-border/60">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text text-transparent text-enhanced-strong">About FloStudios.ai</h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-foreground/80 text-enhanced-readable px-4">
              The AI-focused creative learning division of FloLabs Innovations Group, where emerging talent learns by creating AI-powered content and experiences for cutting-edge technology projects in artificial intelligence, robotics, and emerging tech.
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
              At FloStudios.ai, we believe AI-enhanced creativity has the power to make complex technology more accessible and engaging. Our mission is to bridge the gap between cutting-edge AI research and human understanding by creating innovative learning experiences and content that brings emerging technologies to life.
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
              { emoji: "🤖", title: "AI & Robotics Content", text: "Creating documentation, tutorials, and promotional content for artificial intelligence and robotics research projects at FloLabs Innovations Group." },
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

      {/* Our Learning Methodology */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50/30 via-blue-50/20 to-transparent dark:from-slate-900/30 dark:via-slate-800/20 dark:to-transparent">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 text-heading text-enhanced-strong">Our Learning Methodology</h2>
          <p className="text-lg sm:text-xl text-center text-foreground/70 max-w-3xl mx-auto mb-12 sm:mb-16 text-enhanced-readable">
            We combine proven experiential learning techniques with cutting-edge AI tools to create an immersive, 
            hands-on educational experience that prepares you for the future of work.
          </p>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                emoji: "🧠", 
                title: "Brainwriting Exercises", 
                text: "Collaborative ideation sessions where students generate and build upon creative concepts for AI and robotics projects in a structured, inclusive environment." 
              },
              { 
                emoji: "🤖", 
                title: "Advanced AI Tools", 
                text: "Hands-on experience with large language models (LLMs) and other cutting-edge AI technologies to enhance productivity and creativity in real-world applications." 
              },
              { 
                emoji: "📹", 
                title: "Recorded Meetings", 
                text: "All sessions are recorded for review and reflection, allowing students to revisit complex concepts and track their learning journey over time." 
              },
              { 
                emoji: "👨‍💼", 
                title: "Expert Mentorship", 
                text: "Direct access to industry professionals and researchers from FloLabs Innovations Group who provide guidance, feedback, and insights into emerging technologies." 
              },
              { 
                emoji: "🛠️", 
                title: "Hands-on Projects", 
                text: "Work on real-world AI and robotics initiatives like CAIPO, MoodChanger, and Flo Travel—building production-ready platforms that serve actual users." 
              },
              { 
                emoji: "🎯", 
                title: "Project-Based Learning", 
                text: "Learn by doing. Every concept is immediately applied to tangible projects, ensuring knowledge translates directly into practical skills and portfolio pieces." 
              },
            ].map(({ emoji, title, text }) => (
              <div key={title} className="glass p-6 sm:p-8 hover:scale-105 transition-all duration-300 border border-border/60">
                <div className="text-4xl sm:text-5xl mb-4">{emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-heading text-enhanced-strong">{title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-enhanced-readable">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-16 md:py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 text-heading text-enhanced-strong">Why Choose FloStudios.ai</h2>
          <p className="text-lg sm:text-xl text-center text-foreground/70 max-w-3xl mx-auto mb-12 sm:mb-16 text-enhanced-readable">
            Our program is designed to make cutting-edge AI and robotics education accessible, 
            practical, and career-focused for the next generation of innovators.
          </p>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {[
              { 
                emoji: "⏰", 
                title: "Flexibility", 
                text: "Work at your own pace with asynchronous learning options and recorded sessions available 24/7. Balance education with other commitments seamlessly." 
              },
              { 
                emoji: "💰", 
                title: "Affordability", 
                text: "Quality learning without the high costs of traditional programs. Gain industry experience through GetRecruitedToday while building valuable skills." 
              },
              { 
                emoji: "🚀", 
                title: "Opportunities", 
                text: "Position yourself at the forefront of AI and robotics innovation. Work on projects that matter and build a portfolio that stands out to employers." 
              },
              { 
                emoji: "🎓", 
                title: "Expertise", 
                text: "Learn from professionals working on the latest AI and robotics trends. Get insider knowledge and mentorship from FloLabs Innovations Group researchers." 
              },
            ].map(({ emoji, title, text }) => (
              <div key={title} className="glass p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300 border border-border/60">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-heading text-enhanced-strong">{title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-enhanced-readable">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FloLabs Innovations Group Connection */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-heading text-enhanced-strong">Part of the FloLabs Ecosystem</h2>
          <div className="glass p-6 sm:p-8 md:p-12 mb-6 sm:mb-8 border border-border/60">
            <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 mb-4 sm:mb-6 text-enhanced-readable">
              FloStudios.ai is the AI-focused creative learning division of <strong className="text-heading text-enhanced-strong">FloLabs Innovations Group</strong>, bringing together design expertise
              with cutting-edge AI technology and research. This unique connection allows us to offer innovative learning solutions
              that blend creativity with AI-powered technical excellence.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-enhanced-readable">
              Our collaborative approach combines strategic design thinking with advanced development capabilities,
              ensuring every project benefits from both creative vision and technical innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://www.flolabsinnovations.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center justify-center bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 rounded-lg text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 transition-all duration-300 text-sm sm:text-base"
              >
                Visit FloLabs Innovations Group
              </a>
              <a
                href="https://www.flolabs.international/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center justify-center bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 rounded-lg text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-200 transition-all duration-300 text-sm sm:text-base"
              >
                Explore FloLabs International
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
              Whether you&apos;re a seasoned storyteller or just getting started, FloStudios.ai is your AI-powered creative learning launchpad.
            </p>
            <a
              href="https://www.flolabs.international/internships/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 rounded-lg text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 transition-all duration-300 font-medium"
            >
              Apply to GetRecruitedToday
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
