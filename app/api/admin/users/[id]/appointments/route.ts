// File: app/api/admin/users/[id]/appointments/route.ts

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { patientEmail: params.id }, // เราใช้ email แทน id
      include: {
        doctor: true,
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('[ADMIN_APPOINTMENTS_ERROR]', error)
    return NextResponse.json({ message: 'Failed to fetch appointments' }, { status: 500 })
  }
}
