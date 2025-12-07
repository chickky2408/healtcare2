//ver1


// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function GET() {
//   const doctors = await prisma.doctor.findMany()
//   return NextResponse.json({ doctors })
// }



//ver 2    //api/doctors/[id]/route.ts

// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const doctor = await prisma.doctor.findUnique({
//     where: { id: params.id },
//   })

//   if (!doctor) {
//     return NextResponse.json({ error: 'Doctor not found' }, { status: 404 })
//   }

//   return NextResponse.json({ doctor })
// }


//8 Oct 2025


// // app/api/doctors/route.ts
// import { NextResponse } from 'next/server'
// import prisma from '@/lib/db'
// import bcrypt from 'bcryptjs'

// // GET - ดู doctors ทั้งหมด
// export async function GET() {
//   try {
//     const doctors = await prisma.doctor.findMany({
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         specialty: true,
//         // phone: true,     // comment ออกก่อน
//         // image: true,     // comment ออกก่อน
//         createdAt: true,
//         _count: {
//           select: { appointments: true }
//         }
//       },
//       orderBy: { createdAt: 'desc' },
//     })
    
//     // เพิ่ม default phone และ image
//     const doctorsWithPhone = doctors.map(doctor => ({
//       ...doctor,
//       phone: '', // default empty
//       image: 'https://via.placeholder.com/150' // default placeholder
//     }))
    
//     return NextResponse.json(doctorsWithPhone)
//   } catch (error) {
//     console.error('Error fetching doctors:', error)
//     return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 })
//   }
// }

// // POST - สร้าง doctor ใหม่
// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     const { email, name, password, specialty, phone, image } = body

//     if (!email || !name || !password || !specialty) {
//       return NextResponse.json(
//         { error: 'Email, name, password, and specialty are required' },
//         { status: 400 }
//       )
//     }

//     // ตรวจสอบว่า email ซ้ำหรือไม่
//     const existingDoctor = await prisma.doctor.findUnique({
//       where: { email }
//     })

//     if (existingDoctor) {
//       return NextResponse.json(
//         { error: 'Email already exists' },
//         { status: 400 }
//       )
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // สร้าง doctor ใหม่
//     const newDoctor = await prisma.doctor.create({
//       data: {
//         email,
//         name,
//         password: hashedPassword,
//         specialty,
//         phone: phone || '',
//         image: image || 'https://via.placeholder.com/150'
//       }
//     })

//     return NextResponse.json(newDoctor, { status: 201 })
//   } catch (error) {
//     console.error('Error creating doctor:', error)
//     return NextResponse.json(
//       { error: 'Failed to create doctor' },
//       { status: 500 }
//     )
//   }
// }




// app/api/doctors/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'

// GET - ดู doctors ทั้งหมด
export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        specialty: true,
        phone: true,
        image: true,
        createdAt: true,
        _count: {
          select: { appointments: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    })
    
    // แปลง phone/image จาก null ถ้ายังไม่มีข้อมูล
    const doctorsWithPhone = doctors.map(doctor => ({
      ...doctor,
      phone: doctor.phone || '',
      image: doctor.image || 'https://via.placeholder.com/150'
    }))
    
    return NextResponse.json(doctorsWithPhone)
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 })
  }
}

// POST - สร้าง doctor ใหม่
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, specialty, phone, image } = body

    if (!email || !name || !password || !specialty) {
      return NextResponse.json(
        { error: 'Email, name, password, and specialty are required' },
        { status: 400 }
      )
    }

    // ตรวจสอบว่า email ซ้ำหรือไม่
    const existingDoctor = await prisma.doctor.findUnique({
      where: { email }
    })

    if (existingDoctor) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // สร้าง doctor ใหม่
    const newDoctor = await prisma.doctor.create({
      data: {
        email,
        name,
        password: hashedPassword,
        specialty,
        // ไม่ใส่ phone และ image ก่อน จนกว่า schema จะมี fields เหล่านี้
        // phone: phone || '',
        // image: image || 'https://via.placeholder.com/150'
      }
    })

    return NextResponse.json(newDoctor, { status: 201 })
  } catch (error) {
    console.error('Error creating doctor:', error)
    return NextResponse.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    )
  }
}