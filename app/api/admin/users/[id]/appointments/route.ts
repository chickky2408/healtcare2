// // File: app/api/admin/users/[id]/appointments/route.ts

// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const appointments = await prisma.appointment.findMany({
//       where: { patientEmail: params.id }, // เราใช้ email แทน id
//       include: {
//         doctor: true,
//       },
//       orderBy: { date: 'desc' },
//     })

//     return NextResponse.json({ appointments })
//   } catch (error) {
//     console.error('[ADMIN_APPOINTMENTS_ERROR]', error)
//     return NextResponse.json({ message: 'Failed to fetch appointments' }, { status: 500 })
//   }
// }


import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').at(-2) // หรือใช้ req.nextUrl.searchParams.get('id') ก็ได้หากใช้ query string

  if (!id) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: { patientEmail: id },
      include: { doctor: true },
    })

    return NextResponse.json({ appointments })
  } catch  {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}