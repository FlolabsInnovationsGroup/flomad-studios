import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

// Mock database - replace with actual database in production
import { mockPodcasts, Podcast } from '@/lib/mockData';

// Define the type for podcast data in the mock database
export interface PodcastRecord {
  id: string;
  title: string;
  description?: string;
  src: string;
  poster?: string;
  category?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Schema for podcast creation/update (keeping for future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PodcastData {
  title: string;
  description?: string;
  src: string;
  poster?: string;
  category?: string;
  tags: string[];
  published: boolean;
}

// GET /api/podcasts
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const url = new URL(request.url);
    const onlyPublished = url.searchParams.get('published') === 'true';
    
    let podcasts: Podcast[];
    
    if (onlyPublished) {
      // If only published podcasts are requested, filter them
      podcasts = mockPodcasts.filter((podcast: Podcast) => podcast.published);
    } else if (session) {
      // If user is logged in, return published podcasts + their own unpublished podcasts
      podcasts = mockPodcasts.filter(
        (podcast: Podcast) => podcast.published || podcast.userId === session.user.id
      );
      
      // If user is admin, return all podcasts
      if (session.user.role === 'ADMIN') {
        podcasts = mockPodcasts;
      }
    } else {
      // If user is not logged in, only return published podcasts
      podcasts = mockPodcasts.filter((podcast: Podcast) => podcast.published);
    }
    
    return NextResponse.json(podcasts);
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}

// POST /api/podcasts
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to create a podcast" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.src) {
      return NextResponse.json(
        { error: "Title and audio source are required" },
        { status: 400 }
      );
    }
    
    // Create new podcast
    const now = new Date().toISOString();
    const newPodcast: Podcast = {
      id: uuidv4(),
      title: body.title,
      description: body.description || "",
      src: body.src,
      poster: body.poster || null,
      category: body.category || null,
      tags: body.tags || [],
      published: body.published === true ? true : false,
      createdAt: now,
      updatedAt: now,
      userId: session.user.id,
    };
    
    // Add to mock database
    mockPodcasts.unshift(newPodcast);
    
    return NextResponse.json(newPodcast, { status: 201 });
  } catch (error) {
    console.error("Error creating podcast:", error);
    return NextResponse.json(
      { error: "Failed to create podcast" },
      { status: 500 }
    );
  }
} 