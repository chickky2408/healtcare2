// File: /app/api/appointments/doctor/route.ts

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { doctorId } = await req.json()

  if (!doctorId) {
    return NextResponse.json({ message: 'Missing doctorId' }, { status: 400 })
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      orderBy: { date: 'asc' },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('[DOCTOR_APPOINTMENTS_ERROR]', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
