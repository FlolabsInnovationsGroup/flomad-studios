import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { message: 'Not Found' },
      { status: 404 }
    );
  }

  try {
    const { email } = await request.json();
    
    // Test database connection only
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    return NextResponse.json({
      success: true,
      userFound: !!user,
      userDetails: user || null
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
