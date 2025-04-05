// ✅ User Dashboard
// app/dashboard/user/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return router.push('/login')
    const parsed = JSON.parse(storedUser)
    if (parsed.role !== 'USER') return router.push('/login')
    setUser(parsed)
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-blue-700">User Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {user.name}</p>
      </div>
    </div>
  )
} 

