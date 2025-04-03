import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ message: 'Email not found' }, { status: 400 })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return NextResponse.json({ message: 'Incorrect password' }, { status: 401 })
  }

  // ✅ ตรงนี้สามารถเพิ่ม session/JWT ได้ในอนาคต
  return NextResponse.json({ message: 'Login successful', user }, { status: 200 })
}