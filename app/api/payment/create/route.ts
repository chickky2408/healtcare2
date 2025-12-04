import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculatePrice, BANK_DETAILS } from '@/lib/paymentUtils'

export async function POST(req: NextRequest) {
  try {
    const { appointmentId } = await req.json()

    console.log('[Payment Create] Received appointmentId:', appointmentId)

    if (!appointmentId) {
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      )
    }

    // หา Appointment พร้อมข้อมูล doctor
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        payment: true,
        doctor: {
          select: {
            name: true,
            specialty: true
          }
        }
      }
    }) as any

    console.log('[Payment Create] Found appointment:', appointment ? 'Yes' : 'No')

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }

    // ถ้ามี payment อยู่แล้ว ให้ส่งกลับพร้อมข้อมูลธนาคารและ appointment
    if (appointment.payment) {
      console.log('[Payment Create] Payment already exists')
      return NextResponse.json({
        payment: {
          ...appointment.payment,
          appointment: {
            type: appointment.type,
            date: appointment.date,
            time: appointment.time,
            doctor: appointment.doctor
          }
        },
        bankDetails: BANK_DETAILS,
        message: 'Payment already exists'
      })
    }

    // คำนวณราคา
    const amount = calculatePrice(appointment.type)
    console.log('[Payment Create] Calculated amount:', amount, 'for type:', appointment.type)

    // สร้าง Payment record (ไม่มี QR Code แล้ว)
    const payment = await (prisma as any).payment.create({
      data: {
        appointmentId,
        amount,
        status: 'PENDING'
      }
    })

    console.log('[Payment Create] Payment created:', payment.id)

    return NextResponse.json({
      payment: {
        ...payment,
        appointment: {
          type: appointment.type,
          date: appointment.date,
          time: appointment.time,
          doctor: appointment.doctor
        }
      },
      bankDetails: BANK_DETAILS,
      message: 'Payment created successfully'
    })

  } catch (error: any) {
    console.error('[Payment Create] Error:', error)
    console.error('[Payment Create] Error message:', error?.message)
    console.error('[Payment Create] Error stack:', error?.stack)
    return NextResponse.json(
      {
        error: 'Failed to create payment',
        details: error?.message || 'Unknown error',
        code: error?.code
      },
      { status: 500 }
    )
  }
}
