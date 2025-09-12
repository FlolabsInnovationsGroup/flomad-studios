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
      <Section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-sky-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-600/5 dark:from-sky-500/20 dark:to-blue-600/15" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 dark:bg-purple-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-teal-400/15 dark:bg-teal-400/25 rounded-full animate-pulse" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-block px-6 py-3 bg-sky-500/20 border border-sky-400/30 rounded-lg mb-6">
            <span className="text-sm font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">SHOWCASING OUR BEST</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text text-transparent">Latest Work</h1>
          <p className="text-xl max-w-2xl mx-auto text-slate-700 dark:text-gray-300 mb-8">
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
                title: "Brand Identity Design",
                category: "Branding",
                description: "Clean, modern brand development for creative businesses",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
                color: "primary"
              },
              {
                title: "Digital Studio Platform",
                category: "Web Development",
                description: "Responsive web platform for creative studios",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
                color: "secondary"
              }
            ].map((project, index) => (
              <div key={index} className="glass group h-[450px] overflow-hidden border border-white/20 dark:border-white/10 light:border-slate-200/50 hover:scale-105 transition-all duration-300">
                <div className="relative h-full">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black/90 dark:via-black/30 dark:to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <div className="inline-block px-3 py-1 text-sm font-medium mb-4 w-fit bg-sky-500/30 border border-sky-400/50 rounded text-sky-200">
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 dark:text-white">{project.title}</h3>
                    <p className="text-slate-600 dark:text-white/90 mb-6 max-w-md">{project.description}</p>
                    <Button className="bg-white/20 hover:bg-white/30 border border-white/40 text-slate-800 dark:text-white hover:text-slate-800 dark:hover:text-white w-full sm:w-auto" size="md" asChild>
                      <Link href="/contact">
                        Discuss Project
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
          <div className="glass p-12 md:p-16 rounded-2xl border border-white/20 dark:border-white/10 light:border-slate-200/50">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">Ready for Your Project?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-slate-700 dark:text-gray-300">
              Let&apos;s collaborate and bring your creative vision to life with our design and technology expertise.
            </p>
            <Button className="bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 text-lg px-8 py-4 transition-all duration-300" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
} 