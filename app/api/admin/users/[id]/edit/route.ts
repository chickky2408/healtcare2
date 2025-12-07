// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/db'

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const userId = params.id
//   const body = await req.json()
//   const { name, email, password } = body

//   try {
//     const updated = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//         email,
//         password,
//       },
//     })
//     return NextResponse.json(updated)
//   } catch (error) {
//     console.error('Update user error:', error)
//     return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
//   }
// }


//ver2

// app/api/admin/users/[id]/edit/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: { id: string } } 
) {
  const userId = context.params.id;

  const body = await request.json();
  const { name, email, password } = body;

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { name, email, password }, 
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}