



// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'

// interface Appointment {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     name: string
//     specialty: string
//   }
// }

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// //playAlert sound

// const playAlertSound = () => {
//   const audio = new Audio('/alert.wav')
//   audio.play()
// }

// const checkUpcomingAppointments = (appointments: Appointment[]) => {
//   const now = new Date()
//   const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
//   const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000)

//   const upcoming = appointments.filter((a) => {
//     const apptDateTime = new Date(`${a.date}T${a.time}`)
//     return apptDateTime >= oneHourLater && apptDateTime <= twoHoursLater
//   })

//   if (upcoming.length > 0) {
//     playAlertSound()
//     alert(`🔔 You have ${upcoming.length} appointment(s) within the next 1–2 hours.`)
//   }
// }

// export default function UserDashboardPage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')
//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')

//     setUser(parsed)

//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         setAppointments(data.appointments)
//         checkUpcomingAppointments(data.appointments)  // Check for upcoming appointments
//       })
//   }, [router])

//   const cancelAppointment = async (id: string) => {
//     if (!confirm('Cancel this appointment?')) return
//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })
//     if (res.ok) {
//       alert('Cancelled')
//       setAppointments(prev => prev.filter(a => a.id !== id))
//     }
//   }

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-blue-50">
//       {/* Sidebar */}
//       <div className="w-full md:w-64 bg-white shadow-md p-6 flex md:flex-col justify-between md:justify-start items-center md:items-start md:space-y-6 space-x-4 md:space-x-0">
//         <h2 className="text-2xl font-bold text-blue-700 mb-2 md:mb-8">HealthCare+</h2>
//         <ul className="flex md:flex-col gap-4 w-full">
//           <li>
//             <button onClick={() => router.push('/booking')} className="w-full text-left text-blue-600 hover:underline">
//               ➕ Book Appointment
//             </button>
//           </li>
//           <li>
//             <button onClick={() => router.push('/dashboard/user/appointments')} className="w-full text-left text-blue-600 hover:underline">
//               📅 Appointments
//             </button>
//           </li>
//           <li>
//             <button onClick={() => router.push('/telemedicine')} className="w-full text-left text-blue-600 hover:underline">
//               🩺 Telemedicine
//             </button>
//           </li>
//           <li>
//             <button onClick={() => router.push('/ai-analysis')} className="w-full text-left text-blue-600 hover:underline">
//               🤖 AI Analysis
//             </button>
//           </li>
//         </ul>
//         <button
//           className="mt-4 md:mt-auto text-red-600 hover:underline"
//           onClick={() => {
//             localStorage.removeItem('user')
//             router.push('/login')
//           }}
//         >
//           📕 Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 md:p-10">
//         {user && (
//           <div className="mb-6">
//             <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Welcome, {user.name}!</h1>
//             <p className="text-sm text-gray-600">Email: {user.email}</p>
//           </div>
//         )}

//         <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-700">Your Appointments</h2>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map(a => (
//               <motion.div
//                 key={a.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
//               >
//                 <div>
//                   <p className="text-sm text-gray-600">📅 {new Date(a.date).toLocaleDateString()} at {a.time}</p>
//                   <p className="font-medium">🧑‍⚕️ {a.doctor.name} ({a.doctor.specialty})</p>
//                   <p>📋 {a.type}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
//                     onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                     onClick={() => cancelAppointment(a.id)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//                     onClick={() => router.push(`/dashboard/user/appointments/${a.id}`)}
//                   >
//                     Detail
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }





'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  doctor: {
    name: string
    specialty: string
  }
}

interface User {
  id: string
  name: string
  email: string
  role: string
}

const playAlertSound = () => {
  const audio = new Audio('/alert.wav')
  audio.play()
}

const checkUpcomingAppointments = (appointments: Appointment[]) => {
  const now = new Date()
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000)

  const upcoming = appointments.filter((a) => {
    const apptDateTime = new Date(`${a.date}T${a.time}`)
    return apptDateTime >= oneHourLater && apptDateTime <= twoHoursLater
  })

  if (upcoming.length > 0) {
    playAlertSound()
    alert(`🔔 You have ${upcoming.length} appointment(s) within the next 1–2 hours.`)
  }
}

export default function UserDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
      .then(data => {
        setAppointments(data.appointments)
        checkUpcomingAppointments(data.appointments)
      })
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
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-50">
      {/* Sidebar toggle button for mobile */}
      <div className="p-4 bg-white shadow-md md:hidden flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-700">HealthCare+</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`md:flex flex-col w-full md:w-64 bg-white shadow-md p-6 space-y-6 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <h2 className="text-2xl font-bold text-blue-700 mb-2 md:mb-8">HealthCare+</h2>
        <ul className="flex md:flex-col gap-4 w-full">
          <li>
            <button onClick={() => router.push('/booking')} className="w-full text-left text-blue-600 hover:underline">
              ➕ Book Appointment
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/dashboard/user/appointments')} className="w-full text-left text-blue-600 hover:underline">
              📅 Appointments
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/telemedicine')} className="w-full text-left text-blue-600 hover:underline">
              🩺 Telemedicine
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/ai-analysis')} className="w-full text-left text-blue-600 hover:underline">
              🤖 AI Analysis
            </button>
          </li>
        </ul>
        <button
          className="mt-4 md:mt-auto text-red-600 hover:underline"
          onClick={() => {
            localStorage.removeItem('user')
            router.push('/login')
          }}
        >
          📕 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        {user && (
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Welcome, {user.name}!</h1>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
          </div>
        )}

        <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-700">Your Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(a => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <p className="text-sm text-gray-600">📅 {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                  <p className="font-medium">🧑‍⚕️ {a.doctor.name} ({a.doctor.specialty})</p>
                  <p>📋 {a.type}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                    onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => cancelAppointment(a.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    onClick={() => router.push(`/dashboard/user/appointments/${a.id}`)}
                  >
                    Detail
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}





