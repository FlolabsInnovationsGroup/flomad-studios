import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PATCH /api/contact/[id] - Update contact read status
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

    const { read } = await request.json();
    const { id: contactId } = await params;

    // Validate input
    if (typeof read !== 'boolean') {
      return NextResponse.json(
        { error: 'Read status must be a boolean' },
        { status: 400 }
      );
    }

    // Update contact
    const contact = await prisma.contact.update({
      where: { id: contactId },
      data: { read },
    });

    return NextResponse.json(contact);

  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete contact submission
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

    const { id: contactId } = await params;

    // Delete contact
    await prisma.contact.delete({
      where: { id: contactId },
    });

    return NextResponse.json({ message: 'Contact deleted successfully' });

  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}