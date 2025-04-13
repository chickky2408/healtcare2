'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Appointment = {
  id: string
  date: string
  time: string
  type: string
  symptoms?: string
  doctor: {
    name: string
    specialty: string
  }
}

export default function AdminUserAppointmentsPage() {
  const { id } = useParams()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    fetch(`/api/admin/users/${id}/appointments`)
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) setAppointments(data.appointments)
      })
  }, [id])

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Appointment History for User #{id}
        </h1>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((a) => (
              <li key={a.id} className="p-4 border rounded-md bg-gray-50">
                <p><b>📅 Date:</b> {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                <p><b>📋 Treatment:</b> {a.type}</p>
                <p><b>🩺 Doctor:</b> {a.doctor.name} ({a.doctor.specialty})</p>
                <p><b>📝 Symptoms:</b> {a.symptoms || 'N/A'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
