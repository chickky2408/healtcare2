'use client'

import { useEffect, useState } from 'react'

export default function BookingPage() {
    //if <any[]> have issues , use this solution  below
    type Doctor = {
        id: string
        name: string
        specialty: string
      }
      
  const [doctors, setDoctors] = useState<Doctor[]>([])
  
  //if <any[]> have issues , use this solution above


  const [selectedDoctor, setSelectedDoctor] = useState<string>('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')

  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Load doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await fetch('/api/doctors')
      const data = await res.json()
      setDoctors(data.doctors)
    }
    fetchDoctors()

    const stored = localStorage.getItem('user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    if (!selectedDoctor || !date || !time || !user) {
      setMessage('Please complete all fields')
      return
    }

    const res = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: selectedDoctor,
        date,
        time,
        patientName: user.name,
        patientEmail: user.email,
        type: 'CLEANING',
      })
    })

    const result = await res.json()
    if (res.ok) {
      setMessage('✅ Appointment booked successfully!')
    } else {
      setMessage(result.message || '❌ Booking failed.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">📅 Book an Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Doctor</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">-- Select --</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Select Date</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Select Time</label>
            <input
              type="time"
              className="w-full border px-3 py-2 rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </form>

        {message && <p className="mt-4 text-center text-blue-700">{message}</p>}

        <a href="/dashboard/user" className="block text-center mt-4 text-sm text-blue-600 underline">
          ← Back to Dashboard
        </a>
      </div>
    </div>
  )
}
