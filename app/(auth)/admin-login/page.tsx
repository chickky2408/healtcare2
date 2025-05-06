// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function AdminLoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setMessage('')

//     const res = await fetch('/api/login/admin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await res.json()
//     if (res.ok) {
//       localStorage.setItem('user', JSON.stringify(data.user))
//       router.push('/dashboard/admin')
//     } else {
//       setMessage(data.message || 'Login failed')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
//         <h1 className="text-2xl font-bold text-center text-blue-700">Admin Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Login
//         </button>
//         {message && <p className="text-center text-red-500 text-sm">{message}</p>}
//       </form>
//     </div>
//   )
// }











// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function AdminLoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')
  

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setMessage('')

//     const res = await fetch('/api/login/admin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await res.json()
//     if (res.ok) {
//       localStorage.setItem('user', JSON.stringify(data.user))
//       router.push('/dashboard/admin')
//     } else {
//       setMessage(data.message || 'Login failed')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
//         <h1 className="text-2xl font-bold text-center text-blue-700">Admin Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Login
//         </button>
//         {message && <p className="text-center text-red-500 text-sm">{message}</p>}
//       </form>
//     </div>
//   )
// }





'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const res = await fetch('/api/login/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/dashboard/admin')
    } else {
      setMessage(data.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center text-blue-700">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
        {message && <p className="text-center text-red-500 text-sm">{message}</p>}
      </form>
    </div>
  )
}
