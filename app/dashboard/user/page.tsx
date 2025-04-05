'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  role: 'USER' | 'DOCTOR' | 'ADMIN'
}

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

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return router.push('/login')
    const parsed: User = JSON.parse(storedUser)
    if (parsed.role !== 'USER') return router.push('/login')
    setUser(parsed)

    // fetch appointments
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

  if (!user) return null

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Welcome, {user.name}
        </h1>
        <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>

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
                <p>📋 Treatment: <b>{a.type}</b></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}