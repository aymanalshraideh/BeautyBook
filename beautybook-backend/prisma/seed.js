const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: 'admin@beautybook.com' },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@beautybook.com',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Admin user created: admin@beautybook.com / admin123');
  } else {
    console.log('⚠️ Admin already exists');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
