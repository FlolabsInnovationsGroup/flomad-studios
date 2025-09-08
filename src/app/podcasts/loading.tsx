import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function PodcastsLoading() {
  return (
    <main className="fade-in">
      {/* Hero Skeleton */}
      <Section className="bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse">
        <div className="text-center">
          <div className="h-12 w-48 bg-white/20 rounded-md mx-auto mb-4" />
          <div className="h-6 w-96 bg-white/20 rounded-md mx-auto" />
        </div>
      </Section>

      {/* Featured Podcast Skeleton */}
      <Section>
        <div className="text-center">
          <div className="h-8 w-48 bg-background-surface rounded-md mx-auto mb-4" />
          <Card className="max-w-3xl mx-auto p-6 bg-background-surface animate-pulse">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-48 bg-background rounded-md" />
              <div className="flex-1 space-y-4">
                <div className="h-6 w-3/4 bg-background rounded-md" />
                <div className="h-4 w-1/2 bg-background rounded-md" />
                <div className="h-4 w-2/3 bg-background rounded-md" />
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Podcast Grid Skeleton */}
      <Section className="bg-background-surface">
        <div className="text-center">
          <div className="h-8 w-32 bg-background rounded-md mx-auto mb-10" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-4 bg-background animate-pulse">
                <div className="aspect-square bg-background-surface rounded-md mb-4" />
                <div className="h-5 w-3/4 bg-background-surface rounded-md mb-2" />
                <div className="h-4 w-1/2 bg-background-surface rounded-md" />
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Skeleton */}
      <Section className="bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse">
        <div className="text-center">
          <div className="h-8 w-64 bg-white/20 rounded-md mx-auto mb-4" />
          <div className="h-6 w-96 bg-white/20 rounded-md mx-auto mb-6" />
          <div className="h-10 w-32 bg-white/20 rounded-md mx-auto" />
        </div>
      </Section>
    </main>
  );
} 