import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(req: Request) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 })

  await prisma.appointment.delete({ where: { id } })

  return NextResponse.json({ message: 'Appointment cancelled' }, { status: 200 })
}