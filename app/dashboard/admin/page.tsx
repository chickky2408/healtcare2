'use client'

import { useEffect, useState } from 'react'

export default function AdminDashboardPage() {
  interface Admin {
    name: string
    email: string
    role: string
  }

  const [admin, setAdmin] = useState<Admin | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const user = JSON.parse(stored)
      if (user.role !== 'ADMIN') {
        window.location.href = '/login'
      } else {
        setAdmin(user)
      }
    } else {
      window.location.href = '/login'
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome, Admin</h1>
      {admin && (
        <div className="bg-white p-4 rounded shadow text-gray-700">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
        </div>
      )}
    </div>
  )
}