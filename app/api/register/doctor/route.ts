import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, password, specialty } = await req.json()

  const existing = await prisma.doctor.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ message: 'อีเมลนี้ถูกใช้แล้ว' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const newDoctor = await prisma.doctor.create({
    data: {
      name,
      email,
      password: hashed,
      specialty,
    },
  })

  return NextResponse.json({ message: 'ลงทะเบียนหมอสำเร็จ', doctor: newDoctor }, { status: 201 })
}