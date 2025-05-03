'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Appointment = {
  patientName: string
  patientEmail: string
  date: string
  time: string
  type: string
  symptoms?: string
  doctor: {
    name: string
    specialty: string
    meetLink?: string
  }
}

export default function DoctorTelemedicineDetail() {
  const params = useParams()
  const router = useRouter()
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed = JSON.parse(stored)
    if (parsed.role !== 'DOCTOR') return router.push('/login')

    if (!params?.appointmentId) return

    fetch(`/api/appointments/${params.appointmentId}`)
      .then(res => res.json())
      .then(data => setAppointment(data))
  }, [params, router])

  if (!appointment) {
    return <p className="text-center p-8 text-gray-500">Loading...</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-blue-700 mb-4">Appointment Details</h1>
        <p><strong>Patient:</strong> {appointment.patientName}</p>
        <p><strong>Email:</strong> {appointment.patientEmail}</p>
        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Treatment:</strong> {appointment.type}</p>
        <p><strong>Symptoms:</strong> {appointment.symptoms || 'N/A'}</p>

        {/* {appointment.doctor?.meetLink ? (
          <a
            href={appointment.doctor.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Join Video Call
          </a>
        ) : (
          <p className="mt-4 text-red-500">No Meet link available</p>
        )} */}



        {appointment.type === 'VIDEO_CALL' && appointment.doctor?.meetLink ? (
          <a
            href={appointment.doctor.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Join Video Call
          </a>
        ) : (
          <p className="mt-4 text-red-500">No Meet link available</p>
        )}



      </div>
    </div>
  )
}