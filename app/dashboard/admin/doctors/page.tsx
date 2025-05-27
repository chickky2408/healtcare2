'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Doctor {
  id: string
  name: string
  email: string
  specialty: string
  meetLink?: string | null
}

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/doctors')
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-6">Loading doctor data...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">👩‍⚕️ All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-blue-800">🩺 {doc.name}</h2>
            <p className="text-gray-600 text-sm">📧 {doc.email}</p>
            <p className="text-gray-600 text-sm">🧑‍🔬 Specialty: {doc.specialty}</p>
            {doc.meetLink && (
              <p className="text-gray-600 text-sm truncate">🔗 Meet: {doc.meetLink}</p>
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => router.push(`/dashboard/admin/doctors/${doc.id}`)}
                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
              >
                View Detail
              </button>
              <button
                className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
