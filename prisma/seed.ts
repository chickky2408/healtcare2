import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding doctor data safely (no data loss)...')

  // Doctor 1
  await prisma.doctor.upsert({
    where: { email: 'doctor1@gmail.com' },
    update: {
      name: 'Dr. Alice',
      specialty: 'Orthodontist',
      meetLink: 'https://meet.google.com/doctor1-link',
    },
    create: {
      name: 'Dr. Alice',
      email: 'doctor1@gmail.com',
      password: await bcrypt.hash('123456', 10),
      specialty: 'Orthodontist',
      meetLink: 'https://meet.google.com/doctor1-link',
    },
  })

  // Doctor 2
  await prisma.doctor.upsert({
    where: { email: 'doctor2@gmail.com' },
    update: {
      name: 'Dr. Bob',
      specialty: 'Cleaning & Hygiene',
      meetLink: 'https://meet.google.com/doctor2-link',
    },
    create: {
      name: 'Dr. Bob',
      email: 'doctor2@gmail.com',
      password: await bcrypt.hash('123456', 10),
      specialty: 'Cleaning & Hygiene',
      meetLink: 'https://meet.google.com/doctor2-link',
    },
  })

  console.log('✅ Doctor seeding completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())