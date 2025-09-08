import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock database - replace with actual database in production
import { mockPodcasts, Podcast } from '@/lib/mockData';

// GET /api/podcasts/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const podcast = mockPodcasts.find((podcast: Podcast) => podcast.id === id);
    
    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }
    
    // Check if podcast is published or if current user owns it
    if (!podcast.published && (!session || session.user.id !== podcast.userId)) {
      return NextResponse.json(
        { error: "You don't have permission to view this podcast" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(podcast);
  } catch (error) {
    console.error("Error fetching podcast:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast" },
      { status: 500 }
    );
  }
}

// PATCH /api/podcasts/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to update a podcast" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const podcastIndex = mockPodcasts.findIndex((podcast: Podcast) => podcast.id === id);
    
    if (podcastIndex === -1) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }
    
    // Check if current user owns the podcast or is an admin
    if (session.user.id !== mockPodcasts[podcastIndex].userId && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "You don't have permission to update this podcast" },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const updateData = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.src !== undefined && { src: body.src }),
      ...(body.poster !== undefined && { poster: body.poster }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.tags !== undefined && { tags: body.tags }),
      ...(body.published !== undefined && { published: body.published }),
      updatedAt: new Date().toISOString(),
    };
    
    // Update podcast in mock database
    mockPodcasts[podcastIndex] = {
      ...mockPodcasts[podcastIndex],
      ...updateData,
    };
    
    return NextResponse.json(mockPodcasts[podcastIndex]);
  } catch (error) {
    console.error("Error updating podcast:", error);
    return NextResponse.json(
      { error: "Failed to update podcast" },
      { status: 500 }
    );
  }
}

// DELETE /api/podcasts/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to delete a podcast" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const podcastIndex = mockPodcasts.findIndex((podcast: Podcast) => podcast.id === id);
    
    if (podcastIndex === -1) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }
    
    // Check if current user owns the podcast or is an admin
    if (session.user.id !== mockPodcasts[podcastIndex].userId && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "You don't have permission to delete this podcast" },
        { status: 403 }
      );
    }
    
    // Remove podcast from mock database
    mockPodcasts.splice(podcastIndex, 1);
    
    return NextResponse.json(
      { message: "Podcast deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting podcast:", error);
    return NextResponse.json(
      { error: "Failed to delete podcast" },
      { status: 500 }
    );
  }
} 