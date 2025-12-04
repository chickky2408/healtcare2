import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json(
        { valid: false, message: 'Token is required' },
        { status: 400 }
      )
    }

    // Find the token in database
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!resetToken) {
      return NextResponse.json(
        { valid: false, message: 'Invalid reset token' },
        { status: 404 }
      )
    }

    // Check if token has been used
    if (resetToken.used) {
      return NextResponse.json(
        { valid: false, message: 'This reset link has already been used' },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json(
        { valid: false, message: 'This reset link has expired' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      message: 'Token is valid'
    })

  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json(
      { valid: false, message: 'Failed to validate token' },
      { status: 500 }
    )
  }
}
