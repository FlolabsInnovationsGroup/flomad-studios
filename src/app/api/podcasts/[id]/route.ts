import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/podcasts/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    
    const podcast = await prisma.podcast.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
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
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Find the podcast
    const podcast = await prisma.podcast.findUnique({
      where: { id }
    });
    
    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }
    
    // Check if current user owns the podcast or is an admin
    if (session.user.id !== podcast.userId && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "You don't have permission to update this podcast" },
        { status: 403 }
      );
    }
    
    const { title, description, src, poster, category, tags, published } = await request.json();
    
    // Update the podcast
    const updatedPodcast = await prisma.podcast.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(src !== undefined && { src }),
        ...(poster !== undefined && { poster }),
        ...(category !== undefined && { category }),
        ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : [] }),
        ...(published !== undefined && { published }),
      }
    });
    
    return NextResponse.json(updatedPodcast);
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
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Find the podcast
    const podcast = await prisma.podcast.findUnique({
      where: { id }
    });
    
    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }
    
    // Check if current user owns the podcast or is an admin
    if (session.user.id !== podcast.userId && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "You don't have permission to delete this podcast" },
        { status: 403 }
      );
    }
    
    // Delete the podcast
    await prisma.podcast.delete({
      where: { id }
    });
    
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