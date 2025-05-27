'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Doctor {
  id: string
  name: string
  email: string
  specialty: string
  meetLink?: string
  appointments?: Appointment[]
}

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  patient: {
    name: string
    email: string
  }
}

export default function DoctorDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const user = JSON.parse(stored)
    if (user.role !== 'ADMIN') return router.push('/login')

    fetch(`/api/admin/doctors/${params.id}`)
      .then(res => res.json())
      .then(data => setDoctor(data))
  }, [params.id, router])

  if (!doctor) return <div className="p-6">Loading doctor data...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">👩‍⚕️ Doctor Detail</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Meet Link:</strong> {doctor.meetLink || 'N/A'}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">🗓️ Appointments</h2>
      {doctor.appointments && doctor.appointments.length > 0 ? (
        <div className="space-y-4">
          {doctor.appointments.map((a) => (
            <div key={a.id} className="bg-gray-100 rounded p-4">
              <p><strong>Date:</strong> {a.date} at {a.time}</p>
              <p><strong>Type:</strong> {a.type}</p>
              <p><strong>Patient:</strong> {a.patient.name} ({a.patient.email})</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No appointments found.</p>
      )}

      <Link
        href="/dashboard/admin/doctors"
        className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back to Doctors
      </Link>
    </div>
  )
}
