// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function PUT(req: Request) {
//   const { email, meetLink } = await req.json()

//   if (!email || !meetLink) {
//     return NextResponse.json({ message: 'Email and Meet Link are required' }, { status: 400 })
//   }

//   try {
//     const updated = await prisma.doctor.update({
//       where: { email },
//       data: { meetLink },
//     })

//     return NextResponse.json({ doctor: updated }) // ✅ แก้ตรงนี้
//   } catch (error) {
//     console.error('Error updating meet link:', error)
//     return NextResponse.json({ message: 'Update failed' }, { status: 500 })
//   }
// }






// ✅ [1] FIX API: /api/doctors/update-meet-link
// File: app/api/doctors/update-meet-link/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const { email, meetLink } = await req.json();

    if (!email || !meetLink) {
      return NextResponse.json(
        { message: 'Missing email or meetLink' },
        { status: 400 }
      );
    }

    const updated = await prisma.doctor.update({
      where: { email },
      data: { meetLink },
    });

    return NextResponse.json({ success: true, meetLink: updated.meetLink });
  } catch (error) {
    console.error('❌ Error updating meet link:', error);
    return NextResponse.json(
      { message: 'Server error while updating meet link' },
      { status: 500 }
    );
  }
}
