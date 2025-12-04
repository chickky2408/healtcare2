import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

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

    // สร้างชื่อไฟล์ที่ไม่ซ้ำ
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '_')
    const filename = `slip_${timestamp}_${originalName}`

    // กำหนด path สำหรับเก็บไฟล์
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'slips')

    // สร้างโฟลเดอร์ถ้ายังไม่มี
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const filepath = path.join(uploadsDir, filename)

    // เขียนไฟล์
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // อัปเดต payment
    const updatedPayment = await (prisma as any).payment.update({
      where: { id: paymentId },
      data: {
        slipImagePath: `/uploads/slips/${filename}`,
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
