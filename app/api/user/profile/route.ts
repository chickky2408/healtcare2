// app/api/user/profile/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        allergies: true,
        image: true,
        role: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}