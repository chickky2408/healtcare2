// import { NextResponse } from 'next/server'
// import prisma from '@/lib/db'

// export async function GET() {
//   const users = await prisma.user.findMany({
//     orderBy: { createdAt: 'desc' },
//   })
//   return NextResponse.json(users)
// }



//8 Oct 2025

// app/api/admin/users/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'

// GET - ดู users ทั้งหมด
export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      // ไม่ select password เพื่อความปลอดภัย
    },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(users)
}

// POST - สร้าง user ใหม่ (พร้อม hash password)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, role } = body

    // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Email, name, and password are required' }, 
        { status: 400 }
      )
    }

    // ตรวจสอบว่า email ซ้ำหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' }, 
        { status: 400 }
      )
    }

    // Hash password ด้วย bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    // สร้าง user ใหม่
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // บันทึก hashed password
        ...(role && { role }) // ถ้ามี role ให้ใส่ ถ้าไม่มีจะใช้ default จาก schema
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        // ไม่ return password กลับไป
      }
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' }, 
      { status: 500 }
    )
  }
}