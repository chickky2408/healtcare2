import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const doctor = await prisma.doctor.findUnique({ where: { email } })

  if (!doctor) {
    return NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
  }

  const isMatch = await bcrypt.compare(password, doctor.password)
  if (!isMatch) {
    return NextResponse.json({ message: 'Incorrect password' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'Login successful',
    doctor: {
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
    },
  })
}