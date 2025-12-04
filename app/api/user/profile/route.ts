// app/api/user/profile/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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
        phoneNumber: true,
        allergies: true,
        image: true,
        profileImage: true,
        createdAt: true,
        // Personal Information
        gender: true,
        dateOfBirth: true,
        age: true,
        weight: true,
        // Dental History
        hasDentalSurgery: true,
        dentalSurgeryDetails: true,
        previousDentalDiseases: true,
        dentalTreatmentHistory: true,
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