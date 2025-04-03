import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  const exists = await prisma.admin.findUnique({ where: { email } })
  if (exists) {
    return NextResponse.json({ message: 'อีเมลนี้ถูกใช้แล้ว' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const newAdmin = await prisma.admin.create({
    data: { name, email, password: hashed },
  })

  return NextResponse.json({ message: 'ลงทะเบียนแอดมินสำเร็จ', admin: newAdmin }, { status: 201 })
}