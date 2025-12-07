import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const {
    name,
    email,
    password,
    username,
    phoneNumber,
    gender,
    dateOfBirth,
    age,
    weight,
    height,
    allergies,
    hasDentalSurgery,
    dentalSurgeryDetails,
    previousDentalDiseases,
    dentalTreatmentHistory
  } = await req.json()

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ message: 'Email is already in use' }, { status: 400 })
  }

  // Check if username already exists (if provided)
  if (username) {
    const existingUsername = await prisma.user.findUnique({ where: { username } })
    if (existingUsername) {
      return NextResponse.json({ message: 'Username is already in use' }, { status: 400 })
    }
  }

  // Check if phoneNumber already exists (if provided and schema has unique constraint)
  if (phoneNumber) {
    const existingPhone = await prisma.user.findUnique({ where: { phoneNumber } })
    if (existingPhone) {
      return NextResponse.json({ message: 'Phone number is already in use' }, { status: 400 })
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  // Convert gender to uppercase for enum
  const genderEnum = gender ? gender.toUpperCase() : null

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username: username || null,
      phoneNumber: phoneNumber || null,
      gender: genderEnum,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      age: age || null,
      weight: weight || null,
      height: height || null,
      allergies: allergies || null,
      // Dental history
      hasDentalSurgery: hasDentalSurgery || false,
      dentalSurgeryDetails: dentalSurgeryDetails || null,
      previousDentalDiseases: previousDentalDiseases || null,
      dentalTreatmentHistory: dentalTreatmentHistory || null
    },
  })

  return NextResponse.json({ message: 'Registration successful', user: newUser }, { status: 201 })
}