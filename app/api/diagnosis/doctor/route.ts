import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const data = await (prisma as any).diagnosis.findMany({
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
    console.error('[DIAGNOSIS_API_ERROR]', err)
    return NextResponse.json({ error: 'Failed to load diagnoses' }, { status: 500 })
  }
}