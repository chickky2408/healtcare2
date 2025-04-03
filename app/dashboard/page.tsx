'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // ❌ ยังไม่ได้ login
      router.push('/login')
    }
  }, [])

  if (!user) return null // หรือแสดง loading...

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6">
          You are now logged in with email: <span className="font-medium">{user.email}</span>
        </p>
        <button
          onClick={() => {
            localStorage.removeItem('user')
            router.push('/login')
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}