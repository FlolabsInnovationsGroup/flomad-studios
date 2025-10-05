import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { message: 'Not Found' },
      { status: 404 }
    );
  }

  try {
    // Try a simple count operation
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
