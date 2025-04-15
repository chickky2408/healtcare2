// "use client"

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// // Appointment Type
// type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     name: string
//     specialty: string
//   }
// }

// // User Type
// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [upcoming, setUpcoming] = useState<Appointment | null>(null)
//   const [notified, setNotified] = useState(false)
//   const router = useRouter()

//   const playSound = () => {
//     const audio = new Audio('/alert.wav')
//     audio.play()
//     // audio.play().catch(err => console.error('Play sound failed:', err))
//   }

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')

//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')

//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.appointments) {
//           setAppointments(data.appointments)

//           const now = new Date()
//           const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)

//           const found = data.appointments.find((a: Appointment) => {
//             const dt = new Date(`${a.date}T${a.time}`)
//             return dt > now && dt <= oneHourLater
//           })

//           if (found && !notified) {
//             setUpcoming(found)
//             playSound()
//             setNotified(true)
//           }
//         }
//       })
//   }, [router, notified])

//   const cancelAppointment = async (id: string) => {
//     const confirmed = confirm('Cancel this appointment?')
//     if (!confirmed) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })

//     if (res.ok) {
//       alert('Cancelled successfully.')
//       setAppointments((prev) => prev.filter((a) => a.id !== id))
//     }
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {upcoming && (
//           <div className="animate-bounce bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6 shadow-md">
//             <p className="font-semibold text-lg">🔔 Upcoming Appointment!</p>
//             <p>
//               With <b>{upcoming.doctor.name}</b> at <b>{upcoming.time}</b> on{' '}
//               {new Date(upcoming.date).toLocaleDateString()}
//             </p>
//           </div>
//         )}

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   🕒 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p>
//                   🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
//                 </p>
//                 <p>
//                   📋 Treatment: <b>{a.type}</b>
//                 </p>
//                 <div className="mt-2 space-x-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => cancelAppointment(a.id)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }







// new ui 

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