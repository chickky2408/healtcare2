import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // 🔍 ลองเช็คใน User ก่อน
  let user = await prisma.user.findUnique({ where: { email } })
  let role = 'USER'

  // 🔍 ถ้าไม่เจอใน User ให้ลองเช็คใน Doctor
  if (!user) {
    const doctor = await prisma.doctor.findUnique({ where: { email } })
    if (doctor) {
      role = 'DOCTOR'
      user = doctor
    }
  }

  // 🔍 ถ้าไม่เจอใน Doctor → ลอง Admin
  if (!user) {
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (admin) {
      role = 'ADMIN'
      user = admin
    }
  }

  // ❌ ไม่พบ email ในระบบใดๆ
  if (!user) {
    return NextResponse.json({ message: 'Email not found' }, { status: 400 })
  }

  // ✅ เช็ครหัสผ่าน
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return NextResponse.json({ message: 'Incorrect password' }, { status: 401 })
  }

  // ✅ ส่งข้อมูลกลับ
  return NextResponse.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role, // ส่ง role ตามที่เจอ
    }
  })
}







// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json()

//     // Try User
//     let account = await prisma.user.findUnique({ where: { email } })
//     if (account && account.password === password) {
//       return NextResponse.json({
//         id: account.id,
//         name: account.name,
//         email: account.email,
//         role: 'USER',
//       })
//     }

//     // Try Doctor
//     account = await prisma.doctor.findUnique({ where: { email } })
//     if (account && account.password === password) {
//       return NextResponse.json({
//         id: account.id,
//         name: account.name,
//         email: account.email,
//         role: 'DOCTOR',
//       })
//     }

//     // Try Admin
//     account = await prisma.admin.findUnique({ where: { email } })
//     if (account && account.password === password) {
//       return NextResponse.json({
//         id: account.id,
//         name: account.name,
//         email: account.email,
//         role: 'ADMIN',
//       })
//     }

//     return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
//   } catch (err) {
//     console.error('Login error:', err)
//     return NextResponse.json({ message: 'Server error' }, { status: 500 })
//   }
// }