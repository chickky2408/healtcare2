// app/api/admin/users/[id]/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET user by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({ where: { id: params.id } })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    console.error('[ADMIN_USER_GET]', error)
    return NextResponse.json({ message: 'Error retrieving user' }, { status: 500 })
  }
}

// PUT update user
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, email } = body

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: { name, email },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[ADMIN_USER_PUT]', error)
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 })
  }
}
