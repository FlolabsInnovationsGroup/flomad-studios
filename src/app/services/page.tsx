import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';
import { servicesMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata = servicesMetadata;

export default function ServicesPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-6 sm:p-8 md:p-12 border border-border/60">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text text-transparent text-enhanced-strong">Our Services</h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-foreground/80 mb-6 sm:mb-8 text-enhanced-readable">
              We specialize in creating content and experiences that make cutting-edge technology accessible and engaging.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="glass p-4 sm:p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="AI & Robotics Documentation"
                description="Technical documentation, user guides, and educational content that makes complex AI and robotics systems understandable and accessible to diverse audiences."
                iconName="Palette"
                colorScheme="primary"
              />
            </div>
            <div className="glass p-4 sm:p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Technology Video Production"
                description="Professional video content including research demonstrations, tutorial series, and technology showcases that bring complex concepts to life."
                iconName="Code"
                colorScheme="secondary"
              />
            </div>
            <div className="glass p-4 sm:p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Research Communication"
                description="Transforming technical research into compelling narratives through podcasts, articles, and multimedia content that reaches broader audiences."
                iconName="BarChart"
                colorScheme="accent"
              />
            </div>
            <div className="glass p-4 sm:p-6 group hover:scale-105 transition-all duration-300 border border-border/60">
              <ServiceCard
                title="Technology Platform Content"
                description="Content creation for technology platforms, interfaces, and user experiences that support emerging tech products and research initiatives."
                iconName="Video"
                colorScheme="primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Verticals */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-sky-50/30 via-blue-50/20 to-transparent dark:from-slate-900/30 dark:via-slate-800/20 dark:to-transparent">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="glass p-6 sm:p-8 border border-border/60 inline-block">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-heading text-enhanced-strong">Innovation Across Industries</h2>
              <p className="text-lg sm:text-xl text-foreground/80 text-enhanced-readable max-w-3xl">
                Our experiential learning programs span four key verticals, preparing students 
                to tackle real-world challenges with AI and robotics solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                emoji: "🎓",
                title: "Education",
                description: "Experiential learning programs combining AI tools, hands-on projects, and industry mentorship. Students build real platforms like CAIPO and MoodChanger while earning GetRecruitedToday credentials.",
                examples: ["AI Learning Platforms", "Student Project Incubation", "Research Documentation", "Educational Content Creation"]
              },
              {
                emoji: "🏥",
                title: "Healthcare",
                description: "AI-driven health innovations improving patient outcomes and wellness. Our MoodChanger platform demonstrates how AI can revolutionize mental health tracking for people, athletes, and even pets.",
                examples: ["MoodChanger AI", "Wellness Tracking", "Mental Health Tech", "Patient Experience Design"]
              },
              {
                emoji: "✈️",
                title: "Travel",
                description: "AI-powered travel planning and personalized experiences. Flo Travel uses machine learning to create custom itineraries, recommend destinations, and optimize journeys based on individual preferences.",
                examples: ["Flo Travel Platform", "AI Trip Planning", "Destination Recommendations", "Travel Content Creation"]
              },
              {
                emoji: "🚀",
                title: "Space",
                description: "Space sector innovation and exploration technology. Preparing the next generation for careers in space tech through projects focused on AI applications in aerospace, satellite systems, and robotics.",
                examples: ["Space Tech Education", "Satellite Systems", "Aerospace AI Applications", "Robotics for Space"]
              }
            ].map((vertical) => (
              <div key={vertical.title} className="glass p-6 hover:scale-105 transition-all duration-300 border border-border/60 flex flex-col">
                <div className="text-5xl mb-4">{vertical.emoji}</div>
                <h3 className="text-2xl font-bold mb-3 text-heading text-enhanced-strong">{vertical.title}</h3>
                <p className="text-sm text-foreground/70 mb-4 text-enhanced-readable flex-grow">
                  {vertical.description}
                </p>
                <div className="space-y-2 pt-4 border-t border-border/40">
                  <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Key Areas:</p>
                  {vertical.examples.map((example) => (
                    <div key={example} className="flex items-start gap-2 text-xs text-foreground/60">
                      <span className="text-sky-500 mt-0.5">▸</span>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <div className="glass p-6 sm:p-8 border border-border/60 inline-block max-w-3xl">
              <p className="text-base sm:text-lg text-foreground/70 text-enhanced-readable">
                <strong className="text-foreground">Cross-Vertical Approach:</strong> Our students gain exposure to multiple 
                industries, building transferable AI and robotics skills that apply across sectors. This holistic approach 
                ensures graduates are versatile, adaptable, and ready for the future of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="glass p-6 sm:p-8 md:p-12 border border-border/60">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-heading text-enhanced-strong">Our Process</h2>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto text-foreground/80 text-enhanced-readable">
                We follow a collaborative approach to bring your vision to life.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
              <div key={index} className="glass p-6 sm:p-8 hover:scale-105 transition-all duration-300 group border border-border/60">
                <div className="text-3xl sm:text-4xl font-bold text-sky-600 dark:text-sky-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{step.number}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-heading transition-colors text-enhanced-strong">{step.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 text-enhanced-readable">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 md:py-32">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass p-6 sm:p-8 md:p-12 border border-border/60">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-heading text-enhanced-strong">Ready to Get Started?</h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 text-foreground/80 text-enhanced-readable">
              Let&apos;s collaborate on your next project and bring your creative vision to life.
            </p>
            <Button className="bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4" asChild>
              <a href="https://www.flolabs.international/internships/" target="_blank" rel="noopener noreferrer">Apply to GetRecruitedToday</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 
