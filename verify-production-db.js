const { PrismaClient } = require('@prisma/client');

async function verifyProductionDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing production database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check if admin user exists
    console.log('\n🔍 Looking for admin user...');
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@flomadstudios.com' }
    });
    
    if (adminUser) {
      console.log('✅ Admin user found:');
      console.log('  - ID:', adminUser.id);
      console.log('  - Email:', adminUser.email);
      console.log('  - Name:', adminUser.name);
      console.log('  - Role:', adminUser.role);
      console.log('  - Password:', adminUser.password);
      console.log('  - Created:', adminUser.createdAt);
    } else {
      console.log('❌ Admin user NOT found in database');
      console.log('\n🔧 Creating admin user...');
      
      const newAdmin = await prisma.user.create({
        data: {
          email: 'admin@flomadstudios.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'ADMIN'
        }
      });
      
      console.log('✅ Admin user created successfully:');
      console.log('  - Email:', newAdmin.email);
      console.log('  - Password: admin123');
      console.log('  - Role:', newAdmin.role);
    }
    
    // Check all users
    console.log('\n📋 All users in database:');
    const allUsers = await prisma.user.findMany();
    console.log(`Found ${allUsers.length} users:`);
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.role})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyProductionDatabase();
