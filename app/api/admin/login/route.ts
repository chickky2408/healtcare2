import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const admin = await prisma.admin.findUnique({
    where: { email },
  })

  if (!admin || admin.password !== password) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  return NextResponse.json({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: 'ADMIN',
  })
}
