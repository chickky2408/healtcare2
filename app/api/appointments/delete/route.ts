// File: app/api/appointments/delete/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(req: Request) {
  const body = await req.json()
  const { id } = body

  if (!id) {
    return NextResponse.json({ message: 'Missing appointment ID' }, { status: 400 })
  }

  try {
    await prisma.appointment.delete({ where: { id } })
    return NextResponse.json({ message: 'Appointment deleted' })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 })
  }
}