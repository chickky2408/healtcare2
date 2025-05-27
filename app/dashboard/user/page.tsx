

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { treatmentPrices } from '@/lib/treatmentPrices'
// import { QRCodeCanvas } from 'qrcode.react'
// import NotificationBell from './components/NotificationBell'
// import { differenceInCalendarDays, parseISO } from 'date-fns'

// type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: { name: string; specialty: string }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function UserDashboardPage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
//   const [showAlert, setShowAlert] = useState(false)
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

//         // ✅ ตรวจสอบนัดวันนี้
//         const today = new Date()
//         const hasTodayAppointment = data.appointments.some((a: Appointment) => {
//           const appointmentDate = parseISO(a.date)
//           return differenceInCalendarDays(appointmentDate, today) === 0
//         })

//         if (hasTodayAppointment) {
//           setShowAlert(true)
//           const audio = new Audio('/alert.wav')
//           audio.play().catch(err => console.error('Audio error:', err))
//         }
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
//     <div className="flex min-h-screen bg-blue-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
//         <h2 className="text-2xl font-bold mb-8">🦷 HealthCare+</h2>
//         <nav className="space-y-3 text-sm">
//           <button onClick={() => router.push('/dashboard/user/appointments')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded">
//             🗓️ Appointments
//           </button>
//           <button onClick={() => router.push('/dashboard/user/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
//             🎥 Telemedicine
//           </button>
//           <button onClick={() => router.push('/dashboard/user/ai-analysis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
//             🤖 AI Analysis
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {user && (
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-blue-900">Welcome, {user.name}!</h1>
//               <p className="text-sm text-gray-600">Email: {user.email}</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold uppercase">
//                 {user.name[0]}
//               </div>
//               <div className="flex gap-4 items-center">
//                 <NotificationBell userId={user.id} />
//                 <span>{user.name}</span>
//               </div>
//               <button
//                 onClick={() => {
//                   localStorage.removeItem('user')
//                   router.push('/login')
//                 }}
//                 className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
//               >
//                 ⏏ Logout
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ✅ แจ้งเตือนเมื่อมีนัดวันนี้ */}
//         {showAlert && (
//           <div className="bg-yellow-200 text-red-800 px-4 py-2 rounded shadow mb-4 text-center font-bold animate-bounce">
//             🔔 You have an appointment today!
//           </div>
//         )}

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-blue-800">Your Appointments</h2>
//           <button
//             onClick={() => router.push('/booking')}
//             className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded"
//           >
//             ➕ Add Appointment
//           </button>
//         </div>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map((a) => (
//               <div key={a.id} className="bg-white rounded-lg shadow p-4">
//                 <p className="text-blue-800 font-semibold">
//                   📅 {new Date(a.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {a.time}
//                 </p>
//                 <p className="mt-1">🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})</p>
//                 <p className="text-sm text-gray-500">📋 {a.type}</p>
//                 <p className="text-sm text-gray-700">💸 {treatmentPrices[a.type] || 0} THB</p>
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                     className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => cancelAppointment(a.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => setSelectedAppointment(a)}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
//                   >
//                     QR Payment
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* QR Modal */}
//         {selectedAppointment && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 animate-fade-in">
//               <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
//               <div className="flex justify-center">
//                 <QRCodeCanvas
//                   value={`00020101021129370016A000000677010111011300660123456789802TH5303764540612.005802TH6304ABCD`}
//                   size={180}
//                   className="max-w-full h-auto"
//                 />
//               </div>
//               <p className="mt-2 text-gray-600">💳 {treatmentPrices[selectedAppointment.type] || 0} THB</p>
//               <button
//                 onClick={() => setSelectedAppointment(null)}
//                 className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }



// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { differenceInCalendarDays, parseISO } from 'date-fns'
// import { QRCodeCanvas } from 'qrcode.react'
// import { treatmentPrices } from '@/lib/treatmentPrices'
// import { CalendarDays, Video, BrainCog, LogOut, Menu, X } from 'lucide-react'
// import NotificationBell from './components/NotificationBell'
// import { motion, AnimatePresence } from 'framer-motion'

// interface Appointment {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: { name: string; specialty: string }
// }

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function UserDashboardPage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
//   const [showAlert, setShowAlert] = useState(false)
//   const [showSidebar, setShowSidebar] = useState(false)
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
//         const today = new Date()
//         const hasTodayAppointment = data.appointments.some((a: Appointment) => {
//           const appointmentDate = parseISO(a.date)
//           return differenceInCalendarDays(appointmentDate, today) === 0
//         })

//         if (hasTodayAppointment) {
//           setShowAlert(true)
//           const audio = new Audio('/alert.wav')
//           audio.play().catch(() => {})
//         }
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
//     <div className="flex min-h-screen bg-blue-50">
//       {/* Sidebar (Desktop + Mobile Drawer) */}
//       <AnimatePresence>
//         {showSidebar && (
//           <motion.aside
//             initial={{ x: '-100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '-100%' }}
//             className="fixed inset-y-0 left-0 w-64 bg-blue-700 text-white p-6 z-50 md:static md:translate-x-0"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">🦷 HealthCare+</h2>
//               <button onClick={() => setShowSidebar(false)} className="md:hidden">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <nav className="space-y-3 text-sm">
//               <button onClick={() => router.push('/dashboard/user/appointments')} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-blue-600">
//                 <CalendarDays className="w-4 h-4" /> Appointments
//               </button>
//               <button onClick={() => router.push('/dashboard/user/telemedicine')} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-blue-600">
//                 <Video className="w-4 h-4" /> Telemedicine
//               </button>
//               <button onClick={() => router.push('/dashboard/user/ai-analysis')} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-blue-600">
//                 <BrainCog className="w-4 h-4" /> AI Analysis
//               </button>
//             </nav>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:p-10 w-full">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-blue-900">Welcome, {user?.name}!</h1>
//             <p className="text-sm text-gray-600">Email: {user?.email}</p>
//           </div>
//           <div className="hidden md:flex items-center gap-3">
//             <NotificationBell userId={user?.id || ''} />
//             <button
//               onClick={() => {
//                 localStorage.removeItem('user')
//                 router.push('/login')
//               }}
//               className="flex items-center gap-2 border px-3 py-1 rounded hover:bg-gray-100 text-sm"
//             >
//               <LogOut className="w-4 h-4" /> Logout
//             </button>
//           </div>
//           <button onClick={() => setShowSidebar(true)} className="md:hidden">
//             <Menu className="w-6 h-6 text-blue-700" />
//           </button>
//         </div>

//         {showAlert && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-yellow-200 text-red-800 px-4 py-2 rounded shadow mb-4 text-center font-bold animate-bounce"
//           >
//             🔔 You have an appointment today!
//           </motion.div>
//         )}

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-blue-800">Your Appointments</h2>
//           <button
//             onClick={() => router.push('/booking')}
//             className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded"
//           >
//             ➕ Add Appointment
//           </button>
//         </div>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map((a) => (
//               <motion.div
//                 key={a.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-lg shadow p-4"
//               >
//                 <p className="text-blue-800 font-semibold">
//                   📅 {new Date(a.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {a.time}
//                 </p>
//                 <p className="mt-1">🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})</p>
//                 <p className="text-sm text-gray-500">📋 {a.type}</p>
//                 <p className="text-sm text-gray-700">💸 {treatmentPrices[a.type] || 0} THB</p>
//                 <div className="mt-3 flex gap-2">
//                   <button onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded text-sm">
//                     Edit
//                   </button>
//                   <button onClick={() => cancelAppointment(a.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm">
//                     Cancel
//                   </button>
//                   <button onClick={() => setSelectedAppointment(a)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm">
//                     QR Payment
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         <AnimatePresence>
//         {selectedAppointment && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//     <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm text-center animate-fade-in">
//       <h3 className="text-xl font-semibold mb-4 text-gray-800">Scan to Pay</h3>

//       <div className="flex justify-center mb-2">
//         <QRCodeCanvas
//           value={`00020101021129370016A000000677010111011300660123456789802TH5303764540612.005802TH6304ABCD`}
//           size={200}
//           className="max-w-full h-auto"
//         />
//       </div>

//       <p className="mt-2 text-gray-700 text-sm flex justify-center items-center gap-2">
//         💰 <span className="font-semibold">{treatmentPrices[selectedAppointment.type] || 0} THB</span>
//       </p>

//       <div className="mt-4 flex justify-center gap-3">
//         <button
//           onClick={() => {
//             navigator.clipboard.writeText(
//               treatmentPrices[selectedAppointment.type]?.toString() || '0'
//             )
//             alert('Amount copied to clipboard')
//           }}
//           className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded-lg"
//         >
//           Copy Amount
//         </button>

//         <button
//           onClick={() => setSelectedAppointment(null)}
//           className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-4 py-2 rounded-lg transition"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//         </AnimatePresence>
//       </main>
//     </div>
//   )
// }





'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { treatmentPrices } from '@/lib/treatmentPrices'
import { QRCodeCanvas } from 'qrcode.react'
import NotificationBell from './components/NotificationBell'
import { differenceInCalendarDays, parseISO } from 'date-fns'
import { motion } from 'framer-motion'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  doctor: {
    id: string
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

export default function UserDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showAlert, setShowAlert] = useState(false)
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
        const today = new Date()
        const hasTodayAppointment = data.appointments.some((a: Appointment) => {
          const appointmentDate = parseISO(a.date)
          return differenceInCalendarDays(appointmentDate, today) === 0
        })
        if (hasTodayAppointment) {
          setShowAlert(true)
          const audio = new Audio('/alert.wav')
          audio.play().catch(err => console.error('Audio error:', err))
        }
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
    <div className="flex min-h-screen bg-blue-50">
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
        <h2 className="text-2xl font-bold mb-8">🦷 HealthCare+</h2>
        <nav className="space-y-3 text-sm">
          <button onClick={() => router.push('/dashboard/user/appointments')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded">
            🗓️ Appointments
          </button>
          <button onClick={() => router.push('/dashboard/user/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🎥 Telemedicine
          </button>
          <button onClick={() => router.push('/dashboard/user/ai-analysis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🤖 AI Analysis
          </button>
          <button onClick={() => router.push('/dashboard/user/profile')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🙍‍♂️ My Profile
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {user && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Welcome, {user.name}!</h1>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold uppercase">
                {user.name[0]}
              </div>
              <NotificationBell userId={user.id} />
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/login')
                }}
                className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
              >
                ⏏ Logout
              </button>
            </div>
          </div>
        )}

        {showAlert && (
          <div className="bg-yellow-200 text-red-800 px-4 py-2 rounded shadow mb-4 text-center font-bold animate-bounce">
            🔔 You have an appointment today!
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800">Your Appointments</h2>
          <button
            onClick={() => router.push('/booking')}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded"
          >
            ➕ Add Appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-blue-800 font-semibold text-lg flex items-center gap-2">
                      📅 {new Date(a.date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })} at {a.time}
                    </h3>
                    <p className="text-gray-800 text-sm">
                      🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})
                    </p>
                    <p className="text-gray-600 text-sm">📋 {a.type}</p>
                    <p className="text-gray-700 font-medium mt-1">💸 {treatmentPrices[a.type] || 0} THB</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => cancelAppointment(a.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
                    >
                      ❌ Cancel
                    </button>
                    <button
                      onClick={() => setSelectedAppointment(a)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
                    >
                      💳 QR Pay
                    </button>

                    <button
                      onClick={() => router.push(`/dashboard/user/chat/${a.doctor.id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
                    >
                      💬 Chat
                    </button>


                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
              <div className="flex justify-center">
                <QRCodeCanvas
                  value={`00020101021129370016A000000677010111011300660123456789802TH53037645406${treatmentPrices[selectedAppointment.type] || 0}.005802TH6304ABCD`}
                  size={180}
                  className="max-w-full h-auto"
                />
              </div>
              <p className="mt-2 text-gray-600">💳 {treatmentPrices[selectedAppointment.type] || 0} THB</p>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}





