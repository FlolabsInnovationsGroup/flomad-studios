import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/Image';

export const metadata = {
  title: "Our Work | Flomad Studios",
  description: "Explore our creative projects and case studies.",
};

export default function WorkPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <Section className="relative overflow-hidden py-24 md:py-32 section-gradient">
        <div className="creative-bg" />
        <div className="floating-element floating-purple" />
        <div className="floating-element floating-teal" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="section-badge mb-6">
            <span>SHOWCASING OUR BEST</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">Latest Work</h1>
          <p className="text-xl max-w-2xl mx-auto text-foreground/90 mb-8">
            Explore our most recent projects and creative collaborations.
          </p>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section className="relative overflow-hidden py-16 md:py-24">
        <div className="creative-gradient absolute inset-0 opacity-10" />
        <div className="absolute top-10 right-10 w-20 h-20 bg-radial-gradient-primary rounded-full animate-bounce-subtle opacity-50" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {[
              {
                title: "Immersive Brand Experience",
                category: "Branding",
                description: "A complete brand overhaul with immersive digital touchpoints",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
                color: "primary"
              },
              {
                title: "Digital Creative Platform",
                category: "Web Development",
                description: "Interactive platform for creators to showcase their work",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
                color: "secondary"
              },
              {
                title: "Motion Graphics Series",
                category: "Animation",
                description: "Animated series exploring abstract concepts through motion",
                image: "https://images.unsplash.com/photo-1550108026-b327d5e8a326",
                color: "accent"
              },
              {
                title: "Interactive Installation",
                category: "Experiential",
                description: "Public installation that responds to viewer movements",
                image: "https://images.unsplash.com/photo-1555778586-9743c95fcef9",
                color: "primary"
              }
            ].map((project, index) => (
              <div key={index} className="glass-card group h-[450px] overflow-hidden hover:shadow-glow transition-all duration-300">
                <div className="relative h-full">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <div className={`glass-button inline-block px-3 py-1 text-sm font-medium mb-4 w-fit`}>
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{project.title}</h3>
                    <p className="text-white/90 mb-6 max-w-md">{project.description}</p>
                    <Button className="glass-button w-full sm:w-auto" size="md" asChild>
                      <Link href={`/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        View Project
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden py-32">
        <div className="creative-gradient-intense absolute inset-0 opacity-50" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-radial-gradient-primary rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-radial-gradient-secondary rounded-full animate-pulse opacity-30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-intense p-12 md:p-16 rounded-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text-visible">Ready for Your Project?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-foreground/90">
              Let&apos;s collaborate and bring your creative vision to life with our design and technology expertise.
            </p>
            <Button className="glass-button text-lg px-8 py-4 hover:shadow-glow transition-all duration-300" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
} 