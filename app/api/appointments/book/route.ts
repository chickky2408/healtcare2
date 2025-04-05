import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { doctorId, date, time } = await req.json()

  if (!doctorId || !date || !time) {
    return NextResponse.json({ message: 'Missing data' }, { status: 400 })
  }

  const appointment = await prisma.appointment.create({
    data: {
      doctorId,
      date: new Date(date),
      time,
      patientName: 'Test User', // <- ต้องเปลี่ยนเป็นชื่อจาก localStorage หรือ session จริง
      patientEmail: 'test@example.com', // <- เช่นเดียวกัน
      type: 'CLEANING',
    },
  })

  return NextResponse.json({ appointment })
}