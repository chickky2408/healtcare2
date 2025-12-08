// Script to update meetLink for all doctors
// Run with: npx ts-node scripts/update-doctor-meetlinks.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to update doctor meetLinks...')

  // Get all doctors
  const doctors = await prisma.doctor.findMany()

  console.log(`Found ${doctors.length} doctors`)

  // Update each doctor with a unique meet link
  for (const doctor of doctors) {
    // Generate a unique meet link based on doctor ID
    const meetLink = `https://meet.google.com/doctor-${doctor.id}`

    await prisma.doctor.update({
      where: { id: doctor.id },
      data: { meetLink }
    })

    console.log(`Updated ${doctor.name} with meetLink: ${meetLink}`)
  }

  console.log('All doctors updated successfully!')
}

main()
  .catch((e) => {
    console.error('Error updating doctors:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
