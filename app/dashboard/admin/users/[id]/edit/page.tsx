// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter, useParams } from 'next/navigation'
// import { motion } from 'framer-motion'
// import axios from 'axios'

// export default function EditUserPage() {
//   const router = useRouter()
//   const { id } = useParams()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (!id) return
//     axios.get(`/api/admin/users/${id}`).then((res) => {
//       setName(res.data.name)
//       setEmail(res.data.email)
//       setLoading(false)
//     }).catch(() => {
//       setMessage('User not found')
//       setLoading(false)
//     })
//   }, [id])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       await axios.put(`/api/admin/users/${id}/edit`, { name, email, password })
//       router.push('/dashboard/admin/users')
//     } catch {
//       setMessage('Failed to update user')
//     }
//   }

//   if (loading) return <div className="p-6">Loading...</div>

//   return (
//     <div className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-blue-700">Edit User</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 text-sm font-medium">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">New Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Save Changes
//         </motion.button>

//         {message && <p className="text-red-600 text-sm mt-2">{message}</p>}
//       </form>
//     </div>
//   )
// }






'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminEditUserPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/admin/users/${id}`)
      const data = await res.json()
      if (res.ok) {
        setName(data.name)
        setEmail(data.email)
      } else {
        setError(data.error || 'Failed to load user data')
      }
    }
    if (id) fetchUser()
  }, [id])

  const handleUpdate = async () => {
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const res = await fetch(`/api/admin/users/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/dashboard/admin/users'), 1500)
      } else {
        setError(data.error || 'Update failed')
      }
    } catch {
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Edit User</h1>

      <label className="block mb-2 font-medium">Name</label>
      <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 mb-4 border rounded" />

      <label className="block mb-2 font-medium">Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" />

      <label className="block mb-2 font-medium">New Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Update successful!</p>}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-6 py-2 rounded-md w-full"
      >
        {loading ? 'Updating...' : 'Update User'}
      </motion.button>
    </div>
  )
}
