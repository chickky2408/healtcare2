"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function UserProfilePage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [allergies, setAllergies] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const user = JSON.parse(stored)
    setName(user.name || "")
    // Add API to fetch user profile if needed
  }, [router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const stored = localStorage.getItem('user')
    if (!stored) return
  
    const { id } = JSON.parse(stored)
    const res = await fetch('/api/user/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, phone, allergies, image }),
    })
  
    const data = await res.json()
    if (data.success) {
      alert('Profile updated successfully')
    } else {
      alert('Update failed: ' + data.message)
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">👤 My Profile</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div className="flex items-center gap-4">
          {preview ? (
            <img src={preview} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-500">
              {name[0] || "U"}
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Allergy history"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image || ''}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </main>
  )
}
