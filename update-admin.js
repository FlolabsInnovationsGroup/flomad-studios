const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function updateAdminUser() {
  try {
    console.log('🔄 Starting admin user update...');
    
    // First check if old user exists
    const oldUser = await prisma.user.findUnique({
      where: { email: 'admin@flomadstudios.com' }
    });
    
    if (!oldUser) {
      console.log('❌ Old admin user not found');
      return;
    }
    
    console.log('👤 Found old user:', oldUser.email);
    
    // Update the user
    const updatedUser = await prisma.user.update({
      where: { email: 'admin@flomadstudios.com' },
      data: {
        email: 'devteam@flomadlabs.com',
        password: 'FlomadLabs2025',
        name: 'Dev Team'
      }
    });
    
    console.log('✅ User updated successfully!');
    console.log('📋 New details:', {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role
    });
    
  } catch (error) {
    console.error('🚨 Update failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminUser();
