'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  role: 'USER' | 'DOCTOR' | 'ADMIN'
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return router.push('/login')
    const parsed: User = JSON.parse(storedUser)
    if (parsed.role !== 'USER') return router.push('/login')
    setUser(parsed)
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600 mb-6">Role: {user.role}</p>

        <a
          href="/dashboard/user/appointments"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Manage My Appointments
        </a>

        <a
          href="/booking"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
        ➕ Book New Appointment
        </a>


      </div>
    </div>
  )
}