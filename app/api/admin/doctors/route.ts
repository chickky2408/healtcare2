// File: app/api/admin/doctors/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany()
    return NextResponse.json(doctors)
  } catch (error) {
    console.error('Failed to fetch doctors:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}