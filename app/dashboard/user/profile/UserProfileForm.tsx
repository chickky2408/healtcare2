'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import ProfileImageUpload from './ProfileImageUpload'

export default function UserProfileForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [allergies, setAllergies] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const user = JSON.parse(stored)
    setName(user.name || '')
    setPhone(user.phone || '')
    setAllergies(user.allergies || '')
    setImage(user.image || null)
    setPreview(user.image || null)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('allergies', allergies)
    if (image) formData.append('image', image)

    const res = await fetch('/api/user/update', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('Profile updated!')
      router.push('/dashboard/user')
    } else {
      alert('Failed to update profile.')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold text-blue-700 text-center">🧑‍💼 User Profile</h2>

      <ProfileImageUpload
        image={image}
        setImage={setImage}
        preview={preview}
        setPreview={setPreview}
      />

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Phone Number"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="text"
        value={allergies}
        onChange={e => setAllergies(e.target.value)}
        placeholder="Drug Allergy History"
        className="w-full px-4 py-2 border rounded"
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => router.push('/dashboard/user')}
          className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Back to Dashboard
        </button>
      </div>
    </motion.form>
  )
}

