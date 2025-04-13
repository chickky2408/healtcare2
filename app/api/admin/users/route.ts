// // File: /app/api/admin/users/route.ts

// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         createdAt: true,
//       },
//       orderBy: { createdAt: 'desc' },
//     })

//     const doctors = await prisma.doctor.findMany({
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         createdAt: true,
//       },
//       orderBy: { createdAt: 'desc' },
//     })

//     return NextResponse.json({ users, doctors })
//   } catch (error) {
//     console.error('[ADMIN_USERS_ERROR]', error)
//     return NextResponse.json({ message: 'Failed to load users' }, { status: 500 })
//   }
// }







// File: app/api/admin/users/route.ts

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      // Filter users by role if the role field exists in the schema
      // where: { role: 'USER' },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({users})
  } catch (error) {
    console.error('[ADMIN_USERS_GET]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

// DELETE user by ID
export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { id } = body

    const deleted = await prisma.user.delete({ where: { id } })
    return NextResponse.json(deleted)
  } catch (error) {
    console.error('[ADMIN_USERS_DELETE]', error)
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 })
  }
}
