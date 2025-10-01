import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PATCH /api/newsletter/[id] - Update subscriber status
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { active } = await request.json();
    const { id: subscriberId } = await params;

    // Validate input
    if (typeof active !== 'boolean') {
      return NextResponse.json(
        { error: 'Active status must be a boolean' },
        { status: 400 }
      );
    }

    // Update subscriber
    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id: subscriberId },
      data: { active },
    });

    return NextResponse.json(subscriber);

  } catch (error) {
    console.error('Error updating subscriber:', error);
    return NextResponse.json(
      { error: 'Failed to update subscriber' },
      { status: 500 }
    );
  }
}

// DELETE /api/newsletter/[id] - Delete subscriber
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: subscriberId } = await params;

    // Delete subscriber
    await prisma.newsletterSubscriber.delete({
      where: { id: subscriberId },
    });

    return NextResponse.json({ message: 'Subscriber deleted successfully' });

  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}