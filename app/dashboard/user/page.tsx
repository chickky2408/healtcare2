

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: { name: string; specialty: string }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function UserDashboardPage() {
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
      .then(data => setAppointments(data.appointments))
  }, [router])

  const cancelAppointment = async (id: string) => {
    if (!confirm('Cancel this appointment?')) return
    const res = await fetch('/api/appointments/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      alert('Cancelled')
      setAppointments(prev => prev.filter(a => a.id !== id))
    }
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
        <h2 className="text-2xl font-bold mb-8">🦷 DentalEase</h2>
        <nav className="space-y-3 text-sm">
          <button onClick={() => router.push('/dashboard/user/appointments')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded hover:bg-white/20">
            🗓️ Appointments
          </button>
          <button onClick={() => router.push('/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🩺 Telemedicine
          </button>
          <button onClick={() => router.push('/ai-analysis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🤖 AI Analysis
          </button>
          <button className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            📁 Medical Records
          </button>
          <button className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            💊 Prescriptions
          </button>
          <button className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        {user && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Welcome, {user.name}!</h1>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold uppercase">
                {user.name[0]}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/login')
                }}
                className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
              >
                ⏏ Logout
              </button>
            </div>
          </div>
        )}

        {/* Appointments Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800">Your Appointments</h2>
          <button
            onClick={() => router.push('/booking')}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded"
          >
            ➕ Add Appointment
          </button>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white rounded-lg shadow p-4">
                <p className="text-blue-800 font-semibold">
                  📅 {new Date(a.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {a.time}
                </p>
                <p className="mt-1">🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})</p>
                <p className="text-sm text-gray-500">📋 {a.type}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => cancelAppointment(a.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}








