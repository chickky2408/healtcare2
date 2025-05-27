// scripts/hash-admin.ts
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function hashAdminPassword() {
  const plainPassword = 'admin'
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  await prisma.admin.update({
    where: { email: 'admin@gmail.com' },
    data: { password: hashedPassword },
  })

  console.log('✅ Admin password updated with hash:', hashedPassword)
}

hashAdminPassword().finally(() => prisma.$disconnect())