import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection successful:', result);
    
    // Test user lookup specifically
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@flomadstudios.com' }
    });
    
    console.log('👤 Admin user lookup:', adminUser ? 'FOUND' : 'NOT FOUND');
    
    if (adminUser) {
      console.log('📋 Admin user details:', {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        hasPassword: !!adminUser.password,
        passwordLength: adminUser.password?.length || 0
      });
    }
    
    return NextResponse.json({
      success: true,
      dbConnection: 'OK',
      adminUserExists: !!adminUser,
      adminUserData: adminUser ? {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        hasPassword: !!adminUser.password,
        passwordLength: adminUser.password?.length || 0
      } : null
    });
    
  } catch (error) {
    console.error('🚨 Database test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
