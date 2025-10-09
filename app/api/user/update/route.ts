// app/api/user/update/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request) {
  try {
    const { id, name, phone, allergies, image } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    // อัพเดทข้อมูลผู้ใช้
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        phone: phone || null,
        allergies: allergies || null,
        image: image || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        allergies: true,
        image: true,
        role: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    })

  } catch (error: any) {
    console.error('Profile update error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    )
  }
}