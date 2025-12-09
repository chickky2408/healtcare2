// ✅ app/api/doctor/diagnosis/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('[DIAGNOSIS_API] Fetching diagnosis data...')
    const data = await (prisma as any).diagnosis.findMany({
      include: {
        user: true,
        appointment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    console.log('[DIAGNOSIS_API] Found records:', data.length)
    console.log('[DIAGNOSIS_API] Sample data:', data.length > 0 ? data[0] : 'No data')
    return NextResponse.json(data)
  } catch (err) {
    console.error('[DIAGNOSIS_API_ERROR]', err)
    return NextResponse.json({ error: 'Failed to load diagnoses' }, { status: 500 })
  }
}