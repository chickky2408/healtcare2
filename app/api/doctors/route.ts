import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const doctors = await prisma.doctor.findMany()
  return NextResponse.json({ doctors })
}