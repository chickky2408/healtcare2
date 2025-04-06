// File: app/api/appointments/available/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { doctorId, date } = await req.json()

    if (!doctorId || !date) {
      return NextResponse.json({ message: 'Missing doctorId or date' }, { status: 400 })
    }

    // Fetch existing appointments for that doctor and date
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: new Date(date),
      },
      select: { time: true },
    })

    // List of all possible time slots
    const allTimeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00',
      '13:00', '13:30', '14:00', '14:30', '15:00',
      '16:00', '16:30', '17:00', '17:30'
    ]

    // Remove booked times from the list
    const bookedTimes = existingAppointments.map((a) => a.time)
    const availableTimes = allTimeSlots.filter((time) => !bookedTimes.includes(time))

    return NextResponse.json({ availableTimes })
  } catch (error) {
    console.error('[AVAILABLE_TIMES_ERROR]', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
