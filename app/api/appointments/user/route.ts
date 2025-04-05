// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   const { email } = await req.json()

//   if (!email) {
//     return NextResponse.json({ message: 'Missing email' }, { status: 400 })
//   }

//   const appointments = await prisma.appointment.findMany({
//     where: { patientEmail: email },
//     include: { doctor: true },
//     orderBy: { date: 'asc' },
//   })

//   return NextResponse.json({ appointments })
// }





// new version

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email } = await req.json()

  const appointments = await prisma.appointment.findMany({
    where: {
      patientEmail: email,
    },
    include: {
      doctor: true, // ดึงข้อมูลหมอมาด้วย
    },
    orderBy: {
      date: 'asc',
    },
  })

  return NextResponse.json({ appointments })
}