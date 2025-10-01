import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper function to send email notification
async function sendNotificationEmail(contact: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  // TODO: Implement actual email sending
  // You could use services like:
  // - Nodemailer with SMTP
  // - SendGrid
  // - Resend
  // - AWS SES

  console.log('📧 New contact submission notification:', {
    from: `${contact.firstName} ${contact.lastName} <${contact.email}>`,
    subject: contact.subject,
    preview: contact.message.substring(0, 100) + '...'
  });

  // For now, just log the notification
  // In production, you would send an actual email to admin@flomadlabs.com
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Save contact message to database
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        subject,
        message,
      },
    });

    // Send notification email to admin
    try {
      await sendNotificationEmail({
        firstName,
        lastName,
        email,
        subject,
        message,
      });
    } catch (emailError) {
      // Don't fail the request if email fails, just log it
      console.error('Failed to send notification email:', emailError);
    }

    // TODO: Add email notification here
    // You could use services like Nodemailer, SendGrid, or Resend
    // For now, we'll just save to database

    return NextResponse.json(
      {
        message: 'Message sent successfully! We\'ll get back to you soon.',
        id: contact.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve contact messages (for dashboard)
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}