
// ✅ Admin Dashboard
// app/dashboard/admin/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return router.push('/login')
    const parsed = JSON.parse(storedUser)
    if (parsed.role !== 'ADMIN') return router.push('/login')
    setUser(parsed)
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen flex justify-center items-center bg-red-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-700">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome Admin {user.name}</p>
      </div>
    </div>
  )
}
