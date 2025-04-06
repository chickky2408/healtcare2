// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'


// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   const { doctorId, date, time, patientName, patientEmail, type, symptoms } = await req.json()

//   // Validate required fields
//   if (!doctorId || !date || !time || !patientName || !patientEmail || !type) {
//     return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
//   }


//     // check for duplicate time slot (optional)
//     const existing = await prisma.appointment.findFirst({
//         where: { doctorId, date: new Date(date), time }
//     })
//     if (existing) {
//         return NextResponse.json({ message: 'Time slot already booked' }, { status: 409 })
//     }
  

//   try {
//     const appointment = await prisma.appointment.create({
//       data: {
//         doctorId,
//         date: new Date(date),
//         time,
//         patientName,
//         patientEmail,
//         type,           // TreatmentType enum (e.g., 'CLEANING', 'VIDEO_CALL', etc.)
//         symptoms: symptoms || '', // Optional field, fallback to empty string
//       },
//     })

//     return NextResponse.json({ appointment })
//   } catch (error) {
//     console.error('[BOOK_APPOINTMENT_ERROR]', error)
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
//   }
// }







// File: app/api/appointments/book/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient, TreatmentType } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { doctorId, date, time, patientName, patientEmail, type, symptoms } = await req.json()

    if (!doctorId || !date || !time || !patientName || !patientEmail || !type) {
      return NextResponse.json({ message: 'Missing required data' }, { status: 400 })
    }

    // Check if appointment slot already taken
    const existing = await prisma.appointment.findFirst({
      where: {
        doctorId,
        date: new Date(date),
        time,
      },
    })

    if (existing) {
      return NextResponse.json({ message: '❌ Time slot already booked' }, { status: 409 })
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        date: new Date(date),
        time,
        patientName,
        patientEmail,
        type: type as TreatmentType,
        symptoms,
      },
    })

    return NextResponse.json({ appointment })
  } catch (err) {
    console.error('[BOOK_APPOINTMENT_ERROR]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}