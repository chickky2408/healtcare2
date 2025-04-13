'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: string
  patientName: string
  patientEmail: string
  date: string
  time: string
  type: string
  doctor: {
    name: string
    specialty: string
  }
  symptoms?: string
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')

    const parsed = JSON.parse(stored)
    if (parsed.role !== 'ADMIN') return router.push('/login')

    fetch('/api/appointments/all')
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) setAppointments(data.appointments)
      })
  }, [router])

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-yellow-700 mb-6">Admin Dashboard</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((a) => (
              <li key={a.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                <p><b>👤 Patient:</b> {a.patientName} ({a.patientEmail})</p>
                <p><b>🧑‍⚕️ Doctor:</b> {a.doctor.name} ({a.doctor.specialty})</p>
                <p><b>📅 Date:</b> {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                <p><b>📋 Type:</b> {a.type}</p>
                <p><b>📝 Symptoms:</b> {a.symptoms || 'N/A'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}