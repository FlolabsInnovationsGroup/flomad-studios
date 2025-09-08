const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testUser() {
  try {
    console.log('🔍 Checking admin user in database...');
    
    // Find the admin user
    const user = await prisma.user.findUnique({
      where: { email: 'admin@flomadstudios.com' }
    });
    
    if (user) {
      console.log('✅ Admin user found!');
      console.log('📧 Email:', user.email);
      console.log('🔑 Password:', user.password);
      console.log('👤 Name:', user.name);
      console.log('🎯 Role:', user.role);
      console.log('📅 Created:', user.createdAt);
      
      // Test password comparison
      const testPassword = 'admin123';
      const passwordMatch = testPassword === user.password;
      console.log('🔒 Password test ("admin123"):', passwordMatch ? '✅ MATCH' : '❌ NO MATCH');
      
    } else {
      console.log('❌ No admin user found with email: admin@flomadstudios.com');
      
      // List all users
      console.log('\n📋 All users in database:');
      const allUsers = await prisma.user.findMany();
      if (allUsers.length === 0) {
        console.log('   No users found in database');
      } else {
        allUsers.forEach((u, index) => {
          console.log(`   ${index + 1}. ${u.email} - ${u.role} (password: ${u.password})`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testUser();
