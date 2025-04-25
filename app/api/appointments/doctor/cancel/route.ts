import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Missing appointment ID' }, { status: 400 });
    }

    await prisma.appointment.delete({ where: { id } });

    return NextResponse.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json({ message: 'Failed to cancel appointment' }, { status: 500 });
  }
}