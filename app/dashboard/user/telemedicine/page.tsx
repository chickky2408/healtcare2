'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: {
    id: string
    name: string
    specialty: string
    meetLink?: string
  }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function TelemedicinePage() {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed: User = JSON.parse(stored)
    if (parsed.role !== 'USER') return router.push('/login')

    setUser(parsed)

    fetch('/api/appointments/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then(res => res.json())
      .then(data => {
        const telemedicineAppointments = data.appointments.filter(
          (a: Appointment) => a.type === 'VIDEO_CALL'
        )
        setAppointments(telemedicineAppointments)
      })
  }, [router])

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
        <h2 className="text-2xl font-bold mb-8">🦷 HealthCare+</h2>
        <nav className="space-y-3 text-sm">
          <button onClick={() => router.push('/dashboard/user/appointments')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🗓️ Appointments
          </button>
          <button onClick={() => router.push('/dashboard/user/telemedicine')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded">
            🎥 Telemedicine
          </button>
          <button onClick={() => router.push('/dashboard/user/ai-analysis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🤖 AI Analysis
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {user && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Telemedicine Appointments</h1>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
          </div>
        )}

        {/* Appointment List */}
        {appointments.length === 0 ? (
          <p className="text-gray-500">No telemedicine appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white rounded-lg shadow p-4">
                <p className="text-blue-800 font-semibold">
                  📅 {new Date(a.date).toLocaleDateString()} at {a.time}
                </p>
                <p className="mt-1">🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})</p>
                <p className="text-sm text-gray-500">📋 {a.type}</p>
                {a.doctor.meetLink ? (
                  <a
                    href={a.doctor.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded"
                  >
                    Join Video Call
                  </a>
                ) : (
                  <p className="text-red-500 text-sm mt-2">No Meet link available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}