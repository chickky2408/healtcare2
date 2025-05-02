// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/db'

// export async function POST(req: NextRequest) {
//     const body = await req.json()
//     const { imagePath, result, confidence, userId } = body
  
//     console.log("📥 AI DIAGNOSIS INPUT:", body)
  
//     try {
//       const saved = await prisma.diagnosis.create({
//         data: {
//           imagePath,
//           result,
//           confidence,
//           userId,
//           appointmentId: body.appointmentId,
//         }
//       })
//       return NextResponse.json(saved)
//     } catch (err) {
//       console.error("❌ Error saving diagnosis:", err)
//       return NextResponse.json({ error: 'Failed to save diagnosis' }, { status: 500 })
//     }
//   }




import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imagePath, result, confidence, userId, appointmentId } = body

    if (!userId || !imagePath || !result) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const diagnosis = await prisma.diagnosis.create({
      data: {
        imagePath,
        result,
        confidence,
        userId,
        appointmentId,
      },
    })

    return NextResponse.json(diagnosis)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save diagnosis' }, { status: 500 })
  }
}