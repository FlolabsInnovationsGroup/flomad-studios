import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/videos/[id] - Get a specific video
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // Find the video
    const video = await prisma.video.findUnique({
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

    // Check if video exists
    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // If video is not published and user is not logged in or not the owner
    if (!video.published && 
        (!session || 
         (session.user.id !== video.userId && 
          session.user.role !== 'ADMIN'))) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

// PATCH /api/videos/[id] - Update a video
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // Check if user is logged in
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the existing video
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    // Check if video exists
    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Check if user is authorized (admin or video owner)
    if (existingVideo.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get update data
    const { title, description, src, poster, category, tags, published } = await request.json();

    // Update the video
    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(src !== undefined && { src }),
        ...(poster !== undefined && { poster }),
        ...(category !== undefined && { category }),
        ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : [] }),
        ...(published !== undefined && { published })
      }
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

// DELETE /api/videos/[id] - Delete a video
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // Check if user is logged in
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the existing video
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    // Check if video exists
    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Check if user is authorized (admin or video owner)
    if (existingVideo.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Delete the video
    await prisma.video.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Video deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
} 