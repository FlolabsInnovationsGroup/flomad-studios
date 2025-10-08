import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/posts - Retrieve all blog posts (filtered by published for non-admins)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in
    if (!session) {
      // For public access, return only published posts
      const posts = await prisma.post.findMany({
        where: {
          published: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return NextResponse.json(posts);
    }
    
    // For logged in users, return based on role
    if (session.user.role === 'ADMIN') {
      // Admins see all posts
      const posts = await prisma.post.findMany({
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
      
      return NextResponse.json(posts);
    } else {
      // Regular users see their own posts and published posts
      const posts = await prisma.post.findMany({
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
      
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new blog post
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only authenticated users can create posts
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { title, content, published = false } = await request.json();
    
    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        userId: session.user.id
      }
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}