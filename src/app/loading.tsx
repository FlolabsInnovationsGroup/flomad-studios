import Card from '@/components/ui/Card';

export default function HomeLoading() {
  return (
    <main className="space-y-24 fade-in">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse py-16">
        <div className="text-center container mx-auto px-6">
          <div className="h-12 w-64 bg-white/20 rounded-md mx-auto mb-4" />
          <div className="h-6 w-96 bg-white/20 rounded-md mx-auto mb-6" />
          <div className="flex flex-wrap justify-center gap-4">
            <div className="h-10 w-32 bg-white/20 rounded-md" />
            <div className="h-10 w-32 bg-white/20 rounded-md" />
          </div>
        </div>
      </section>

      {/* About Preview Skeleton */}
      <section className="py-16">
        <div className="text-center container mx-auto px-6">
          <div className="h-8 w-48 bg-background-surface rounded-md mx-auto mb-4" />
          <div className="h-6 w-96 bg-background-surface rounded-md mx-auto mb-6" />
          <div className="h-10 w-32 bg-background-surface rounded-md mx-auto" />
        </div>
      </section>

      {/* Creative Areas Skeleton */}
      <section className="bg-background-surface py-16">
        <div className="text-center container mx-auto px-6">
          <div className="h-8 w-64 bg-background rounded-md mx-auto mb-10" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="p-4 bg-background animate-pulse">
                <div className="h-12 w-12 bg-background-surface rounded-full mx-auto mb-2" />
                <div className="h-5 w-20 bg-background-surface rounded-md mx-auto" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Skeleton */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse py-16">
        <div className="text-center container mx-auto px-6">
          <div className="h-8 w-64 bg-white/20 rounded-md mx-auto mb-4" />
          <div className="h-6 w-96 bg-white/20 rounded-md mx-auto mb-6" />
          <div className="h-10 w-32 bg-white/20 rounded-md mx-auto" />
        </div>
      </section>
    </main>
  );
} 
