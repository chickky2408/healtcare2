'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditUserPage() {
  const { id } = useParams()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('USER')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setName(data.name)
          setEmail(data.email)
          setRole(data.role)
        }
      })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role })
    })

    if (res.ok) {
      router.push('/dashboard/admin/users')
    } else {
      setError('Update failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Edit User</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 border rounded">
              <option value="USER">USER</option>
              <option value="DOCTOR">DOCTOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
