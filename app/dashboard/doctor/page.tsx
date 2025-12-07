

//add alert notification

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  patientName: string
  patientEmail: string
  symptoms?: string
}

interface Doctor {
  id: string
  name: string
  email: string
  role: string
  meetLink?: string
}

export default function DoctorDashboardPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [reminderShown, setReminderShown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed: Doctor = JSON.parse(stored)
    if (parsed.role !== 'DOCTOR') return router.push('/login')

    setDoctor(parsed)

    fetch('/api/appointments/doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then(res => res.json())
      .then(data => setAppointments(data.appointments))
  }, [router])

  // Reminder for upcoming appointment (within 2 hours)
  useEffect(() => {
    if (!appointments.length || reminderShown) return

    const now = new Date()
    appointments.forEach(app => {
      const appDate = new Date(app.date + 'T' + app.time)
      const diff = (appDate.getTime() - now.getTime()) / (1000 * 60 * 60) // in hours
      if (diff > 0 && diff <= 2) {
        alert(`Reminder: You have an upcoming appointment at ${app.time}`)
        setReminderShown(true)
      }
    })
  }, [appointments, reminderShown])

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
        <h2 className="text-2xl font-bold mb-8">🩺 HealthCare+</h2>
        <nav className="space-y-3 text-sm">
          <button onClick={() => router.push('/dashboard/doctor')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded hover:bg-white/20">
            📅 Appointments
          </button>
          <button onClick={() => router.push('/dashboard/doctor/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🎥 Telemedicine
          </button>
          <button onClick={() => router.push('/dashboard/doctor/diagnosis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🧠 AI Analysis
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {doctor && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Welcome,  {doctor.name}!</h1>
              <p className="text-sm text-gray-600">Email: {doctor.email}</p>
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
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800"> Today Appointments</h2>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(a => (
              <div key={a.id} className="bg-white rounded-lg shadow p-4 animate-fade-in">
                <p className="text-blue-800 font-semibold">
                  📅 {new Date(a.date).toLocaleDateString()} at {a.time}
                </p>
                <p className="mt-1">👤 {a.patientName} ({a.patientEmail})</p>
                <p className="text-sm">📋 Treatment: {a.type}</p>
                <p className="text-sm">📝 Symptoms: {a.symptoms || 'N/A'}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/doctor/appointments/edit/${a.id}`)}
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

                  <button
                  onClick={() => router.push(`/dashboard/doctor/telemedicine/${a.id}`)}
                  className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1 rounded text-sm"
                  >
                    Detail
                  </button>

                  <button
                    onClick={() => router.push(`/dashboard/doctor/chat/${a.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm font-semibold"
                  >
                    💬 Chat
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




















