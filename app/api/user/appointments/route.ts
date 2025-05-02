import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { TreatmentType } from '@prisma/client' // ✅ enum ที่ใช้ถูกต้องแล้ว

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get('userEmail')
  if (!userEmail) {
    return NextResponse.json({ error: 'Missing userEmail' }, { status: 400 })
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      patientEmail: userEmail, // ✅ ใช้ชื่อฟิลด์ตรงจาก Prisma schema
      type: TreatmentType.AI_DIAGNOSIS, // ✅ enum ที่ถูกต้อง
    },
  })

  return NextResponse.json(appointments)
}