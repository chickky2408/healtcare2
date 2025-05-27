// import { NextResponse } from 'next/server'
// import prisma from '@/lib/db'

// export async function GET() {
//   const appointments = await prisma.appointment.findMany({
//     orderBy: { date: 'desc' },
//     include: {
//       // user: true, // Removed because 'user' does not exist in type 'AppointmentInclude<DefaultArgs>'
//       doctor: true,
//     },
//   })
//   return NextResponse.json(appointments)
// }



// app/api/admin/appointments/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: true,
        
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to load appointments' }, { status: 500 })
  }
}