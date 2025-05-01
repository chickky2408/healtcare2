// import { PrismaClient } from '@prisma/client'
// import { NextRequest, NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const doctorId = params.id;

//   try {
//     const doctor = await prisma.doctor.findUnique({
//       where: { id: doctorId },
//     })

//     if (!doctor) {
//       return NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
//     }

//     return NextResponse.json(doctor)
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ message: 'Server error' }, { status: 500 })
//   }
// }



import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const doctorId = params.id;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    })

    if (!doctor) {
      return NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
    }

    return NextResponse.json(doctor)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}