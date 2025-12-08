// API endpoint to update meetLinks for all doctors
// Call with POST request to /api/admin/doctors/update-meetlinks

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('Starting to update doctor meetLinks...')

    // Get all doctors
    const doctors = await prisma.doctor.findMany()

    console.log(`Found ${doctors.length} doctors`)

    const updates = []

    // Update each doctor with a unique meet link
    for (const doctor of doctors) {
      // Generate a unique meet link based on doctor ID
      const meetLink = `https://meet.google.com/doctor-${doctor.id}`

      const updated = await prisma.doctor.update({
        where: { id: doctor.id },
        data: { meetLink }
      })

      updates.push({
        name: doctor.name,
        meetLink: meetLink
      })

      console.log(`Updated ${doctor.name} with meetLink: ${meetLink}`)
    }

    return NextResponse.json({
      success: true,
      message: 'All doctors updated successfully!',
      updates: updates
    })

  } catch (error) {
    console.error('Error updating doctors:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update doctor meetLinks',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
