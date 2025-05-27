// // app/api/login/admin/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/db'

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json()

//   const admin = await prisma.admin.findUnique({
//     where: { email }
//   })

//   if (!admin || admin.password !== password) {
//     return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
//   }

//   return NextResponse.json({ user: { id: admin.id, name: admin.name, email: admin.email, role: 'ADMIN' } })
// }


// File: app/api/login/admin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    const admin = await prisma.admin.findFirst({
      where: {
        email,
        password, // In real apps, you should hash & compare passwords securely
      },
    })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: 'ADMIN',
    })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
