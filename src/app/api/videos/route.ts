import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/videos - Retrieve all videos (filtered by published for non-admins)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in
    if (!session) {
      // For public access, return only published videos
      const videos = await prisma.video.findMany({
        where: {
          published: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return NextResponse.json(videos);
    }
    
    // For logged in users, return based on role
    if (session.user.role === 'ADMIN') {
      // Admins see all videos
      const videos = await prisma.video.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
      
      return NextResponse.json(videos);
    } else {
      // Regular users see their own videos and published videos
      const videos = await prisma.video.findMany({
        where: {
          OR: [
            { userId: session.user.id },
            { published: true }
          ]
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return NextResponse.json(videos);
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// POST /api/videos - Create a new video
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only authenticated users can create videos
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { title, description, src, poster, category, tags, published = false } = await request.json();
    
    // Validate required fields
    if (!title || !src) {
      return NextResponse.json(
        { error: 'Title and source URL are required' },
        { status: 400 }
      );
    }
    
    // Create the video
    const video = await prisma.video.create({
      data: {
        title,
        description,
        src,
        poster,
        category,
        tags: Array.isArray(tags) ? tags : [],
        published,
        userId: session.user.id
      }
    });
    
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
} 