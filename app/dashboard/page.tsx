// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import logo from '@/images/loco.png'

// export default function UserDashboard() {
//   const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user')
//     if (!storedUser) return router.push('/login')
//     const parsed = JSON.parse(storedUser)
//     if (parsed.role !== 'USER') return router.push('/login')
//     setUser(parsed)
//   }, [router])

//   if (!user) return null

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center px-50 py-20">
//       <div className="bg-white shadow-xl rounded-3xl p-10 max-w-2xl w-full text-center animate-fade-in">
        
//         <div className="flex justify-center mb-4">
//           <Image src={logo} alt="Clinic Logo" width={400} height={400} className="" />
//         </div>
//         <h1 className="text-3xl font-extrabold text-blue-700 mb-1">Welcome, {user.name}!</h1>
//         <p className="text-gray-600 mb-6 text-sm sm:text-base">You are now logged in with email: {user.email}</p>

//         <div className="space-y-4 w-full max-w-md mx-auto">
//           <button
//             onClick={() => router.push('/booking')}
//             className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow"
//           >
//             Book Appointment
//           </button>
//           <button
//             onClick={() => router.push('/dashboard/user/appointments')}
//             className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow"
//           >
//             Manage My Appointments
//           </button>
//           <button
//             onClick={() => router.push('/telemedicine')}
//             className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-all duration-200 shadow"
//           >
//             Telemedicine
//           </button>
//           <button
//             onClick={() => router.push('/ai-analysis')}
//             className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-all duration-200 shadow"
//           >
//             AI Dental Analysis
//           </button>
//         </div>

//         <button
//           onClick={() => {
//             localStorage.removeItem('user')
//             router.push('/login')
//           }}
//           className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition duration-200"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }





'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: { name: string; specialty: string }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function UserDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed: User = JSON.parse(stored)
    if (parsed.role !== 'USER') return router.push('/login')

    setUser(parsed)

    fetch('/api/appointments/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then(res => res.json())
      .then(data => setAppointments(data.appointments))
  }, [router])

  const cancelAppointment = async (id: string) => {
    if (!confirm('Cancel this appointment?')) return
    const res = await fetch('/api/appointments/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      alert('Cancelled')
      setAppointments(prev => prev.filter(a => a.id !== id))
    }
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">DentalEase</h2>
        <ul className="space-y-4">
          <li>
            <button onClick={() => router.push('/dashboard/user/appointments')} className="text-left w-full text-blue-600 hover:underline">
              📅 Appointments
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/telemedicine')} className="text-left w-full text-blue-600 hover:underline">
              🩺 Telemedicine
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/ai-analysis')} className="text-left w-full text-blue-600 hover:underline">
              🤖 AI Analysis
            </button>
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        {user && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Welcome, {user.name}!</h1>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4 text-blue-700">Your Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(a => (
              <div key={a.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">📅 {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                  <p className="font-medium">🧑‍⚕️ {a.doctor.name} ({a.doctor.specialty})</p>
                  <p>📋 {a.type}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => cancelAppointment(a.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}