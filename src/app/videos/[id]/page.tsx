import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Force dynamic rendering to prevent prerendering errors when database is unavailable
export const dynamic = 'force-dynamic';

// Generate metadata for the page
export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { id } = await params;
  const video = await prisma.video.findUnique({
    where: { id, published: true },
    include: { user: true },
  });

  if (!video) {
    return {
      title: 'Video Not Found',
    };
  }

  return {
    title: `${video.title} | Flomad Studios`,
    description: video.description,
  };
}

// Main component
export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  // Fetch the video
  const video = await prisma.video.findUnique({
    where: { id, published: true },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // If video doesn't exist or is not published
  if (!video) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(video.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="container max-w-5xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link href="/videos" className="inline-flex items-center text-primary hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all videos
      </Link>

      {/* Video title */}
      <h1 className="text-4xl font-bold mb-6">{video.title}</h1>

      {/* Video meta info */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm text-foreground/70">
        {video.user.name && (
          <div className="flex items-center">
            <User className="mr-1.5 h-4 w-4" />
            <span>{video.user.name}</span>
          </div>
        )}
        <div className="flex items-center">
          <Calendar className="mr-1.5 h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        {video.category && (
          <div className="flex items-center">
            <Tag className="mr-1.5 h-4 w-4" />
            <span>{video.category}</span>
          </div>
        )}
      </div>

      {/* Video player */}
      <Card className="overflow-hidden mb-8">
        <div className="aspect-video w-full">
          <video
            src={video.src}
            poster={video.poster || undefined}
            controls
            className="w-full h-full"
            preload="metadata"
          />
        </div>
      </Card>

      {/* Video description */}
      {video.description && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {video.description.split('\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {video.tags && video.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Interested in our work?</h2>
        <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
          Contact us today to discuss your project and see how we can bring your vision to life.
        </p>
        <Button asChild>
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </main>
  );
} 