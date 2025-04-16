import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, doctorId } = body

    if (!email || !doctorId) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        patientEmail: email,
        doctorId,
        type: 'VIDEO_CALL',
      },
      include: {
        doctor: true, // ต้อง include เพื่อให้ได้ meetLink
      },
    })

    if (!appointment) {
      return NextResponse.json({ message: 'No video call appointment found' }, { status: 404 })
    }

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error('[TELEMEDICINE_API]', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}