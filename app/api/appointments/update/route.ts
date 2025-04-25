//good to use

// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function PUT(req: Request) {
//   const { id, date, time, type } = await req.json()

//   if (!id || !date || !time || !type) {
//     return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
//   }

//   const updated = await prisma.appointment.update({
//     where: { id },
//     data: { date: new Date(date), time, type },
//   })

//   return NextResponse.json({ message: 'Appointment updated', updated })
// }




// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();
//     const { id, date, time, type, symptoms } = body;

//     const updated = await prisma.appointment.update({
//       where: { id },
//       data: {
//         date,
//         time,
//         type,
//         symptoms,
//       },
//     });

//     return NextResponse.json({ success: true, updated });
//   } catch (error) {
//     console.error("❌ Failed to update appointment:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  const { id, date, time, type, symptoms } = await req.json()

  if (!id || !type) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      ...(date && { date: new Date(date) }),
      ...(time && { time }),
      type,
      symptoms,
    },
  })

  return NextResponse.json({ message: 'Appointment updated', updated })
}