import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}