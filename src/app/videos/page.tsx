import { Metadata } from 'next';
import Link from 'next/link';
import { Play, Calendar } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import OptimizedImage from '@/components/ui/Image';

// Define video with user type
interface VideoWithUser {
  id: string;
  title: string;
  description: string | null;
  src: string;
  poster: string | null;
  category: string | null;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    name: string | null;
  } | null;
}

export const metadata: Metadata = {
  title: 'Videos | Flomad Studios',
  description: 'Watch our latest video content, tutorials, case studies and creative showcases.'
};

// Force dynamic rendering to prevent prerendering errors when database is unavailable
export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  // Fetch published videos
  const videos = await prisma.video.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true }
      }
    }
  });

  return (
    <main className="min-h-screen fade-in">
      {/* Header */}
      <Section className="relative overflow-hidden py-24 md:py-32">
        <div className="creative-gradient absolute inset-0 opacity-20" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-radial-gradient-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-radial-gradient-secondary rounded-full animate-pulse opacity-40" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-card p-8 md:p-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-visible">Video Content</h1>
            <p className="text-xl max-w-2xl mx-auto text-foreground/90 mb-6">
              Explore our collection of videos, tutorials, and creative showcases that highlight our expertise and passion for digital design.
            </p>
          </div>
        </div>
      </Section>

      {/* Video Grid */}
      <Section className="py-16 md:py-24">
        {videos.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 gradient-text-visible">No videos available yet</h2>
            <p className="text-foreground/70 text-lg">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video: VideoWithUser) => {
              // Format date
              const formattedDate = new Date(video.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              
              return (
                <Link 
                  key={video.id} 
                  href={`/videos/${video.id}`}
                  className="group"
                >
                  <div className="glass-card h-full overflow-hidden transition-all hover:shadow-2xl hover:scale-105 hover:glass-intense">
                    {/* Thumbnail */}
                    <div className="relative aspect-video">
                      {video.poster ? (
                        <OptimizedImage
                          src={video.poster}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-radial-gradient flex items-center justify-center">
                          <Play className="w-16 h-16 text-primary/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4 text-heading">
                          {video.category && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium glass-button mb-2">
                              {video.category}
                            </span>
                          )}
                          <h3 className="text-lg font-bold line-clamp-2 group-hover:gradient-text-visible transition-colors">{video.title}</h3>
                        </div>
                      </div>
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full glass-button flex items-center justify-center transform group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                          <Play className="h-8 w-8 text-primary" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Video metadata */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/70">
                        {video.user?.name && (
                          <span className="flex items-center font-medium">
                            By {video.user.name}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {formattedDate}
                        </span>
                      </div>
                      
                      {/* Description preview */}
                      {video.description && (
                        <p className="mt-3 text-foreground/80 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                      
                      {/* Tags */}
                      {video.tags && video.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {video.tags.slice(0, 3).map((tag: string, index: number) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 glass-button text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {video.tags.length > 3 && (
                            <span className="px-3 py-1 glass-button text-xs font-medium">
                              +{video.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden py-16 md:py-24">
        <div className="creative-gradient absolute inset-0 opacity-20" />
        <div className="absolute top-10 right-20 w-40 h-40 bg-radial-gradient-primary rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-radial-gradient-secondary rounded-full animate-pulse opacity-30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-visible">Ready to Create Your Own Video?</h2>
            <p className="text-xl max-w-2xl mx-auto text-foreground/90 mb-8">
              Let&apos;s discuss your project and explore how we can help bring your vision to life with engaging video content.
            </p>
            <Link 
              href="/join" 
              className="inline-block"
            >
              <Button size="lg" className="glass-button text-lg px-8 py-4">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
