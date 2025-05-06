// DELETE user
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error){
    console.error('Failed to delete user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}