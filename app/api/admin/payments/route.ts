import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - ดูรายการ payments ทั้งหมด
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const where = status ? { status: status as any } : {}

    const payments = await prisma.payment.findMany({
      where,
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ payments })

  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

// PATCH - อัปเดตสถานะ payment
export async function PATCH(req: NextRequest) {
  try {
    const { paymentId, status, rejectionReason, adminEmail } = await req.json()

    if (!paymentId || !status) {
      return NextResponse.json(
        { error: 'Payment ID and status are required' },
        { status: 400 }
      )
    }

    const updateData: any = {
      status,
      updatedAt: new Date()
    }

    if (status === 'VERIFIED') {
      updateData.verifiedAt = new Date()
      updateData.verifiedBy = adminEmail
    }

    if (status === 'REJECTED' && rejectionReason) {
      updateData.rejectionReason = rejectionReason
    }

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: updateData,
      include: {
        appointment: true
      }
    })

    return NextResponse.json({
      payment,
      message: 'Payment status updated successfully'
    })

  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    )
  }
}
