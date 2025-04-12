'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AppointmentDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  interface Appointment {
    date: string
    time: string
    doctor: {
      name: string
      specialty: string
    }
    patientName: string
    patientEmail: string
    type: 'VIDEO_CALL' | 'AI_DIAGNOSIS' | string
    symptoms?: string
  }

  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/appointments/${id}`)
        const data = await res.json()
        if (res.ok) {
          setAppointment(data)
        } else {
          setError(data.message || 'Failed to load appointment')
        }
      } catch {
        setError('Error loading appointment')
      }
    }
    fetchAppointment()
  }, [id])

  if (error) {
    return <p className="text-center text-red-500 mt-10">❌ {error}</p>
  }

  if (!appointment) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Appointment Detail
        </h1>

        <div className="space-y-4">
          <p><span className="font-semibold">📅 Date:</span> {appointment.date} at {appointment.time}</p>
          <p><span className="font-semibold">🧑‍⚕️ Doctor:</span> {appointment.doctor.name} ({appointment.doctor.specialty})</p>
          <p><span className="font-semibold">👤 Patient:</span> {appointment.patientName} ({appointment.patientEmail})</p>
          <p><span className="font-semibold">📋 Treatment Type:</span> {appointment.type}</p>
          <p><span className="font-semibold">🤒 Symptoms:</span> {appointment.symptoms || 'N/A'}</p>
        </div>

        {(appointment.type === 'VIDEO_CALL') && (
          <Link href="/telemedicine" className="block mt-6 text-center text-blue-600 font-semibold underline">
            Join Video Call
          </Link>
        )}

        {(appointment.type === 'AI_DIAGNOSIS') && (
          <Link href="/ai-analysis" className="block mt-6 text-center text-purple-600 font-semibold underline">
            Go to AI Analysis
          </Link>
        )}

        <div className="text-center mt-6">
          <button onClick={() => router.push('/dashboard/user/appointments')} className="text-sm text-blue-500 hover:underline">
            ← Back to Appointments
          </button>
        </div>
      </div>
    </div>
  )
}
