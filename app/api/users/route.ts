// app/api/users/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      image: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, phone, image } = body

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Email, name, and password are required' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        image
      }
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// app/api/users/[id]/route.ts
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, email, phone, image, password } = body

    const updateData: any = { name, email, phone, image }

    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const updated = await prisma.user.update({
      where: { id: context.params.id },
      data: updateData,
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: context.params.id }
    })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}