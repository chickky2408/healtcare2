import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  })
  return NextResponse.json(notifications)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { userId, message } = body
  const newNotification = await prisma.notification.create({
    data: { userId, message },
  })
  return NextResponse.json(newNotification)
}