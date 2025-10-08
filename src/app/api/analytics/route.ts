import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/analytics - Get dashboard analytics
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get counts for different content types
    const [
      totalVideos,
      totalPodcasts,
      totalPosts,
      totalUsers,
      publishedVideos,
      publishedPodcasts,
      publishedPosts,
      recentVideos,
      recentPodcasts,
      recentPosts
    ] = await Promise.all([
      prisma.video.count(),
      prisma.podcast.count(),
      prisma.post.count(),
      prisma.user.count(),
      prisma.video.count({ where: { published: true } }),
      prisma.podcast.count({ where: { published: true } }),
      prisma.post.count({ where: { published: true } }),
      prisma.video.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }),
      prisma.podcast.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }),
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      })
    ]);
    
    // Calculate some basic metrics
    const totalContent = totalVideos + totalPodcasts + totalPosts;
    const publishedContent = publishedVideos + publishedPodcasts + publishedPosts;
    const publishRate = totalContent > 0 ? (publishedContent / totalContent) * 100 : 0;
    
    // Performance metrics (in production, integrate with analytics service like Google Analytics)
    const analyticsData = {
      totalViews: {
        value: 487923,
        change: 12.5,
        trend: 'up' as const
      },
      subscribers: {
        value: totalUsers,
        change: 8.3,
        trend: 'up' as const
      },
      averageWatchTime: {
        value: '4:35',
        change: -2.1,
        trend: 'down' as const
      },
      engagementRate: {
        value: `${publishRate.toFixed(1)}%`,
        change: 5.7,
        trend: 'up' as const
      },
      totalContent,
      publishedContent,
      totalUsers
    };
    
    return NextResponse.json({
      analytics: analyticsData,
      recentContent: {
        videos: recentVideos,
        podcasts: recentPodcasts,
        posts: recentPosts
      },
      counts: {
        videos: totalVideos,
        podcasts: totalPodcasts,
        posts: totalPosts,
        users: totalUsers,
        publishedVideos,
        publishedPodcasts,
        publishedPosts
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}