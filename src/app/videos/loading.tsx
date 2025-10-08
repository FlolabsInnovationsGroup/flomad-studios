
import Card from '@/components/ui/Card';

export default function VideosLoading() {
  return (
    <main className="fade-in">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse">
        <div className="text-center">
          <div className="h-12 w-48 bg-white/20 rounded-md mx-auto mb-4" />
          <div className="h-6 w-96 bg-white/20 rounded-md mx-auto" />
        </div>
      </section>

      {/* Featured Video Skeleton */}
      <section>
        <div className="text-center">
          <div className="h-8 w-48 bg-background-surface rounded-md mx-auto mb-4" />
          <Card className="max-w-3xl mx-auto aspect-video bg-background-surface animate-pulse" />
        </div>
      </section>

      {/* Video Grid Skeleton */}
      <section className="bg-background-surface">
        <div className="text-center">
          <div className="h-8 w-32 bg-background rounded-md mx-auto mb-10" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="aspect-video bg-background animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse">
        <div className="text-center">
          <div className="h-8 w-64 bg-white/20 rounded-md mx-auto mb-4" />
          <div className="h-6 w-96 bg-white/20 rounded-md mx-auto mb-6" />
          <div className="h-10 w-32 bg-white/20 rounded-md mx-auto" />
        </div>
      </section>
    </main>
  );
} 
