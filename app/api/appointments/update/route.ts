import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  const { id, date, time, type } = await req.json()

  if (!id || !date || !time || !type) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: { date: new Date(date), time, type },
  })

  return NextResponse.json({ message: 'Appointment updated', updated })
}