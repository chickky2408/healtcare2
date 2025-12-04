const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'noonkhonsuai@gmaiil.com' },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        image: true,
      }
    });

    console.log('User data:', JSON.stringify(user, null, 2));

    if (user) {
      console.log('\n✅ User found!');
      console.log('Has profileImage:', user.profileImage ? 'YES' : 'NO');
      console.log('profileImage value:', user.profileImage);
      console.log('Has image:', user.image ? 'YES' : 'NO');
      console.log('image value:', user.image);
    } else {
      console.log('\n❌ User not found!');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();
