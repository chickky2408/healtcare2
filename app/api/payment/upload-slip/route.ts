import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const paymentId = formData.get('paymentId') as string
    const file = formData.get('slip') as File

    if (!paymentId || !file) {
      return NextResponse.json(
        { error: 'Payment ID and slip file are required' },
        { status: 400 }
      )
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    // ตรวจสอบ payment และดึงข้อมูล appointment + doctor
    const payment = await (prisma as any).payment.findUnique({
      where: { id: paymentId },
      include: {
        appointment: {
          include: {
            doctor: {
              select: {
                name: true,
                specialty: true
              }
            }
          }
        }
      }
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // แปลงไฟล์เป็น base64 เพื่อเก็บใน database
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // อัปเดต payment ด้วย base64 string
    const updatedPayment = await (prisma as any).payment.update({
      where: { id: paymentId },
      data: {
        slipImagePath: dataUrl,
        status: 'PAID',
        paidAt: new Date()
      }
    })

    return NextResponse.json({
      payment: {
        ...updatedPayment,
        appointment: {
          type: payment.appointment.type,
          date: payment.appointment.date,
          time: payment.appointment.time,
          doctor: payment.appointment.doctor
        }
      },
      message: 'Payment slip uploaded successfully'
    })

  } catch (error) {
    console.error('Error uploading slip:', error)
    return NextResponse.json(
      { error: 'Failed to upload slip' },
      { status: 500 }
    )
  }
}
