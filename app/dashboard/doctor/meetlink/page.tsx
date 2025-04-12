'use client'

import { useEffect, useState } from 'react'

export default function DoctorMeetLinkPage() {
  const [link, setLink] = useState('')
  const [doctorId, setDoctorId] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setDoctorId(parsed.id)
      fetch(`/api/doctors/${parsed.id}`)
        .then((res) => res.json())
        .then((data) => {
          setLink(data.doctor.meetLink || '')
        })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/doctors/${doctorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetLink: link }),
    })

    if (res.ok) {
      setMessage('✅ Meet link saved successfully!')
    } else {
      setMessage('❌ Failed to save meet link.')
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Set Your Google Meet Link</h1>
        <input
          type="text"
          placeholder="https://meet.google.com/xxx-xxxx-xxx"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Link
        </button>
        {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
      </form>
    </div>
  )
}