import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/podcasts - Retrieve all podcasts (filtered by published for non-admins)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in
    if (!session) {
      // For public access, return only published podcasts
      const podcasts = await prisma.podcast.findMany({
        where: {
          published: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return NextResponse.json(podcasts);
    }
    
    // For logged in users, return based on role
    if (session.user.role === 'ADMIN') {
      // Admins see all podcasts
      const podcasts = await prisma.podcast.findMany({
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
      
      return NextResponse.json(podcasts);
    } else {
      // Regular users see their own podcasts and published podcasts
      const podcasts = await prisma.podcast.findMany({
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
      
      return NextResponse.json(podcasts);
    }
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcasts' },
      { status: 500 }
    );
  }
}

// POST /api/podcasts - Create a new podcast
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only authenticated users can create podcasts
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
    
    // Create the podcast
    const podcast = await prisma.podcast.create({
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
    
    return NextResponse.json(podcast, { status: 201 });
  } catch (error) {
    console.error('Error creating podcast:', error);
    return NextResponse.json(
      { error: 'Failed to create podcast' },
      { status: 500 }
    );
  }
} 