import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('🔍 Debug Auth Test:', { 
      email, 
      hasPassword: !!password,
      environment: process.env.NODE_ENV,
      nextauthUrl: process.env.NEXTAUTH_URL,
      nextauthSecret: process.env.NEXTAUTH_SECRET?.substring(0, 10) + '...',
      databaseUrl: process.env.DATABASE_URL?.substring(0, 30) + '...'
    });
    
    // Test database connection
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    console.log('👤 User lookup result:', user ? 'FOUND' : 'NOT FOUND');
    
    if (user) {
      console.log('📋 User details:', {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        storedPassword: user.password,
        providedPassword: password,
        passwordMatch: user.password === password
      });
      
      return NextResponse.json({
        success: true,
        userFound: true,
        passwordMatch: user.password === password,
        userDetails: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
          hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
          hasDatabaseUrl: !!process.env.DATABASE_URL
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        userFound: false,
        message: 'User not found'
      });
    }
    
  } catch (error) {
    console.error('🚨 Debug auth test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
