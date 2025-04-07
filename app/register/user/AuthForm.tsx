// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function AuthForm() {
//   const router = useRouter()

//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setMessage('')

//     try {
//       const res = await fetch('/api/register/user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         // ✅ Redirect to login page after successful registration
//         router.push('/login')
//       } else {
//         setMessage(data.message || 'Registration failed')
//       }
//     } catch  {
//       setMessage('Server error. Please try again later.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//         className="w-full px-4 py-2 border rounded"
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="w-full px-4 py-2 border rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="w-full px-4 py-2 border rounded"
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         {loading ? 'Registering...' : 'Register'}
//       </button>

//       {message && (
//         <p className="text-red-600 text-sm text-center mt-2">{message}</p>
//       )}
//     </form>
//   )
// }







'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AuthForm() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/register/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Registration successful!')
        router.push('/login')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch {
      toast.error('Server error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 rounded transition hover:bg-blue-700 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}