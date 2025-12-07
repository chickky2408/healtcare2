import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const doctors = await prisma.doctor.findMany()
  return NextResponse.json({ doctors })
}



//ver 2    //api/doctors/[id]/route.ts

// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const doctor = await prisma.doctor.findUnique({
//     where: { id: params.id },
//   })

//   if (!doctor) {
//     return NextResponse.json({ error: 'Doctor not found' }, { status: 404 })
//   }

//   return NextResponse.json({ doctor })
// }