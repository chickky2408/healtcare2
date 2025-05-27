// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const appointment = await prisma.appointment.findUnique({
//       where: { id: params.id },
//     })

//     if (!appointment) {
//       return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
//     }

//     return NextResponse.json(appointment)
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ message: 'Server error' }, { status: 500 })
//   }
// }


// import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function GET(request: NextRequest) {
//   const url = new URL(request.url)
//   const id = url.pathname.split('/').pop() // ดึง id จาก path

//   if (!id) {
//     return NextResponse.json({ message: 'Appointment ID not provided' }, { status: 400 })
//   }

//   try {
//     const appointment = await prisma.appointment.findUnique({
//       where: { id },
//       include: {
//         doctor: true,
//       },
//     })

//     if (!appointment) {
//       return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
//     }

//     return NextResponse.json(appointment)
//   } catch {
//     return NextResponse.json({ message: 'Error fetching appointment' }, { status: 500 })
//   }
// }



//1 may 2024

// import { PrismaClient } from '@prisma/client'
// import { NextRequest, NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function GET(_: NextRequest, context: { params: { id: string } }) {
//   const id = context.params.id

//   try {
//     const appointment = await prisma.appointment.findUnique({
//       where: { id },
//       include: {
//         doctor: true
//       }
//     })

//     if (!appointment) {
//       return NextResponse.json({ message: 'Appointment not found' }, { status: 404 })
//     }

//     return NextResponse.json(appointment)
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ message: 'Server error' }, { status: 500 })
//   }
// }



// import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const appointmentId = params.id
//   try {
//     const appointment = await prisma.appointment.findUnique({
//       where: { id: appointmentId },
//       include: { doctor: true },
//     })

//     if (!appointment) {
//       return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
//     }

//     return NextResponse.json(appointment)
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }


// 2 may 2024

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Props = {
  params: {
    id: string
  }
}

export async function GET(
  _request: NextRequest,
  props: Props
) {
  const appointmentId = props.params.id
  
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

//6may2024
export async function DELETE(
  _request: NextRequest,
  props: Props
) {
  const appointmentId = props.params.id

  try {
    await prisma.appointment.delete({
      where: { id: appointmentId },
    })
    return NextResponse.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 })
  }
}