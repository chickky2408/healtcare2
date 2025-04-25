// // File: /app/api/appointments/doctor/route.ts

// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   const { doctorId } = await req.json()

//   if (!doctorId) {
//     return NextResponse.json({ message: 'Missing doctorId' }, { status: 400 })
//   }

//   try {
//     const appointments = await prisma.appointment.findMany({
//       where: { doctorId },
//       orderBy: { date: 'asc' },
//     })

//     return NextResponse.json({ appointments })
//   } catch (error) {
//     console.error('[DOCTOR_APPOINTMENTS_ERROR]', error)
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
//   }
// }







// app/api/appointments/doctor/route.ts

// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   try {
//     const { doctorId } = await req.json()

//     if (!doctorId) {
//       return NextResponse.json({ message: 'Missing doctorId' }, { status: 400 })
//     }

//     const appointments = await prisma.appointment.findMany({
//       where: { doctorId },
//       orderBy: { date: 'asc' },
//       include: {
//         doctor: true,
//       },
//     })

//     return NextResponse.json({ appointments })
//   } catch (error) {
//     console.error('Error fetching doctor appointments:', error)
//     return NextResponse.json({ message: 'Server error' }, { status: 500 })
//   }
// }






import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: 'Missing doctor email' }, { status: 400 })
    }

    const doctor = await prisma.doctor.findUnique({ where: { email } })
    if (!doctor) {
      return NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
    }

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      orderBy: { date: 'asc' },
      include: { doctor: true },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Error fetching doctor appointments:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}