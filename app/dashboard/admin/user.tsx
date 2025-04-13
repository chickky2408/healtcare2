// ✅ แสดง user ทั้งหมด (User / Doctor)

// app/dashboard/admin/users.tsx
'use client'

import { useEffect, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([])
  const [doctors, setDoctors] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
        setDoctors(data.doctors)
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">👥 All Users</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">ทั่วไป (Users)</h2>
          {users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <ul className="divide-y border rounded-md overflow-hidden">
              {users.map((u) => (
                <li key={u.id} className="p-3 hover:bg-blue-50 flex justify-between">
                  <span>{u.name} ({u.email})</span>
                  <span className="text-sm text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600 mb-2">หมอ (Doctors)</h2>
          {doctors.length === 0 ? (
            <p className="text-gray-500">No doctors found.</p>
          ) : (
            <ul className="divide-y border rounded-md overflow-hidden">
              {doctors.map((d) => (
                <li key={d.id} className="p-3 hover:bg-green-50 flex justify-between">
                  <span>{d.name} ({d.email})</span>
                  <span className="text-sm text-gray-400">{new Date(d.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}