'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
        router.push('/login')
        return
      }
    
    // ✅ เช็คทั้ง null และ "undefined"
    if (!stored || stored === 'undefined') {
      router.push('/login')
      return
    }

    try {
      const user = JSON.parse(stored)

      if (user.role !== 'ADMIN') {
        router.push('/login')
        
      }
    } catch (error) {
      console.error('JSON parse error:', error)
      router.push('/login')
    }
  }, [router])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white px-6 py-8 space-y-4">
        <h2 className="text-2xl font-bold mb-6">🛠 Admin Panel</h2>
        <nav className="space-y-2 text-sm">
          <button onClick={() => router.push('/dashboard/admin/doctors')} className="block w-full text-left hover:bg-white/10 px-3 py-2 rounded">
            👨‍⚕️ View All Doctors
          </button>
          <button onClick={() => router.push('/dashboard/admin/appointments')} className="block w-full text-left hover:bg-white/10 px-3 py-2 rounded">
            📅 All Appointments
          </button>
          <button onClick={() => router.push('/dashboard/admin/users')} className="block w-full text-left hover:bg-white/10 px-3 py-2 rounded">
            👥 Manage Users
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 relative">

      <button
    onClick={() => {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      router.push('/login')
    }}
    className="absolute top-4 right-4 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
  >
    Logout
  </button>




        {children}
      </main>
      
    </div>
  )
}