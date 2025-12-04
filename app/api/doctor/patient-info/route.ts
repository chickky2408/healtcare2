import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { patientEmail } = await req.json()

    if (!patientEmail) {
      return NextResponse.json(
        { success: false, message: 'Patient email is required' },
        { status: 400 }
      )
    }

    // Fetch patient information including all medical and dental history
    const patient = await prisma.user.findUnique({
      where: { email: patientEmail },
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
        // Surgery History
        surgeryHistory: {
          select: {
            id: true,
            surgeryType: true,
            surgeryDate: true,
            hospital: true,
            notes: true,
            createdAt: true,
          },
          orderBy: {
            surgeryDate: 'desc'
          }
        },
        // Diagnosis History
        diagnoses: {
          select: {
            id: true,
            result: true,
            confidence: true,
            createdAt: true,
            explanation: true,
            findings: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10 // Last 10 diagnoses
        }
      }
    })

    if (!patient) {
      return NextResponse.json(
        { success: false, message: 'Patient not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      patient
    })

  } catch (error) {
    console.error('Patient info fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch patient information' },
      { status: 500 }
    )
  }
}
