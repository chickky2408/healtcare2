// File: /app/api/appointments/all/route.ts

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: true, // ดึงข้อมูลหมอด้วย
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('[ADMIN_APPOINTMENTS_ERROR]', error)
    return NextResponse.json({ message: 'Failed to fetch appointments' }, { status: 500 })
  }
}
