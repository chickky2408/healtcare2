

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: {
    name: string
    specialty: string
  }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')

    const parsed: User = JSON.parse(stored)
    if (parsed.role !== 'USER') return router.push('/login')

    fetch('/api/appointments/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) setAppointments(data.appointments)
      })
  }, [router])

  const cancelAppointment = async (id: string) => {
    const confirmed = confirm('Cancel this appointment?')
    if (!confirmed) return

    const res = await fetch('/api/appointments/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      alert('Cancelled successfully.')
      setAppointments((prev) => prev.filter((a) => a.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Your Appointments
        </h1>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((a) => (
              <li key={a.id} className="border p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">
                  🕒 {new Date(a.date).toLocaleDateString()} at {a.time}
                </p>
                <p>
                  🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
                </p>
                <p>
                  📋 Treatment: <b>{a.type}</b>
                </p>
                <div className="mt-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => cancelAppointment(a.id)}
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}