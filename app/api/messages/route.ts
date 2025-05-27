// API สำหรับดึงและส่งข้อความของการนัดหมาย (message API)
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ดึงข้อความทั้งหมดของ appointmentId
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const appointmentId = searchParams.get('appointmentId')

  if (!appointmentId) {
    return NextResponse.json({ error: 'Missing appointmentId' }, { status: 400 })
  }

  const messages = await prisma.message.findMany({
    where: { appointmentId },
    orderBy: { timestamp: 'asc' }
  })

  return NextResponse.json(messages)
}

// ส่งข้อความใหม่
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { appointmentId, senderId, text } = body

  if (!appointmentId || !senderId || !text) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const message = await prisma.message.create({
    data: {
      appointmentId,
      senderId,
      text
    }
  })

  return NextResponse.json(message)
}