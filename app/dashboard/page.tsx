'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '@/images/loco.png'

export default function UserDashboard() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return router.push('/login')
    const parsed = JSON.parse(storedUser)
    if (parsed.role !== 'USER') return router.push('/login')
    setUser(parsed)
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-50 py-20">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-2xl w-full text-center animate-fade-in">
        
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="Clinic Logo" width={400} height={400} className="" />
        </div>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-1">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">You are now logged in with email: {user.email}</p>

        <div className="space-y-4 w-full max-w-md mx-auto">
          <button
            onClick={() => router.push('/booking')}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow"
          >
            Book Appointment
          </button>
          <button
            onClick={() => router.push('/dashboard/user/appointments')}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow"
          >
            Manage My Appointments
          </button>
          <button
            onClick={() => router.push('/telemedicine')}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-all duration-200 shadow"
          >
            Telemedicine
          </button>
          <button
            onClick={() => router.push('/ai-analysis')}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-all duration-200 shadow"
          >
            AI Dental Analysis
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('user')
            router.push('/login')
          }}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
