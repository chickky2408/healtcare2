// app/doctor/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DoctorRedirect() {
  const router = useRouter()

  useEffect(() => {
    // สมมุติหลัง login เก็บ doctor id ใน localStorage
    const user = localStorage.getItem('user')
    if (!user) return router.push('/login')

    const parsed = JSON.parse(user)
    if (parsed.role !== 'DOCTOR') return router.push('/login')

    router.push(`/dashboard/doctor`) // หรือ path จริงของหมอ
  }, [router])

  return <p className="text-center mt-10">Loading doctor dashboard...</p>
}