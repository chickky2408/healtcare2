import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updated = await prisma.notification.update({
    where: { id: params.id },
    data: { isRead: true },
  })
  return NextResponse.json(updated)
}