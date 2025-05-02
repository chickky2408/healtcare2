import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const data = await prisma.diagnosis.findMany({
      include: {
        user: true,
        appointment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to load diagnoses' }, { status: 500 })
  }
}