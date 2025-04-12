// File: /app/api/doctors/[id]/route.ts

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
    })

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 })
    }

    return NextResponse.json({ doctor })
  } catch (error) {
    console.error('[GET /api/doctors/[id]] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch doctor' },
      { status: 500 }
    )
  }
}
