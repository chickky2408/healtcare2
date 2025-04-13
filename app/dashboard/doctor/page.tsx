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
  symptoms?: string
}

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedDoctor = localStorage.getItem('user') // doctor ถูกเก็บแบบเดียวกับ user
    if (!storedDoctor) return router.push('/login')

    const parsed = JSON.parse(storedDoctor)
    if (parsed.role !== 'DOCTOR') return router.push('/login')

    fetch('/api/appointments/doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctorId: parsed.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) setAppointments(data.appointments)
      })
  }, [router])

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Doctor Dashboard</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((a) => (
              <li key={a.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                <p><b>🧑 Patient:</b> {a.patientName} ({a.patientEmail})</p>
                <p><b>📅 Date:</b> {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                <p><b>📋 Treatment:</b> {a.type}</p>
                <p><b>📝 Symptoms:</b> {a.symptoms || 'N/A'}</p>

                <div className="mt-3 flex gap-2">
                  {a.type === 'VIDEO_CALL' && (
                    <a
                      href={`/telemedicine/${a.id}`}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      📞 Join Video Call
                    </a>
                  )}

                  {a.type === 'AI_DIAGNOSIS' && (
                    <a
                      href={`/ai-analysis`}
                      className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                    >
                      🧠 View AI Analysis
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}