import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  try {
    const { id, date, time, type } = await req.json()

    if (!id || !date || !time || !type) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const exists = await prisma.appointment.findUnique({ where: { id } })
    if (!exists) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        date,
        time,
        type,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[DOCTOR_EDIT_APPOINTMENT]', error)
    return NextResponse.json({ message: 'Failed to update appointment' }, { status: 500 })
  }
}