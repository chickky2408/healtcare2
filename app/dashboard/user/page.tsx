

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



//ver1

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { treatmentPrices } from '@/lib/treatmentPrices'
// import { QRCodeCanvas } from 'qrcode.react'
// import NotificationBell from './components/NotificationBell'
// import { differenceInCalendarDays, parseISO } from 'date-fns'
// import { motion } from 'framer-motion'

// interface Appointment {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     id: string
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
//           <button onClick={() => router.push('/dashboard/user/profile')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
//             🙍‍♂️ My Profile
//           </button>
//         </nav>
//       </aside>

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
//               <NotificationBell userId={user.id} />
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
//               <motion.div
//                 key={a.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                   <div className="space-y-1">
//                     <h3 className="text-blue-800 font-semibold text-lg flex items-center gap-2">
//                       📅 {new Date(a.date).toLocaleDateString(undefined, {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                       })} at {a.time}
//                     </h3>
//                     <p className="text-gray-800 text-sm">
//                       🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})
//                     </p>
//                     <p className="text-gray-600 text-sm">📋 {a.type}</p>
//                     <p className="text-gray-700 font-medium mt-1">💸 {treatmentPrices[a.type] || 0} THB</p>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                       className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => cancelAppointment(a.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                     >
//                       ❌ Cancel
//                     </button>
//                     <button
//                       onClick={() => setSelectedAppointment(a)}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                     >
//                       💳 QR Pay
//                     </button>

//                     <button
//                       onClick={() => router.push(`/dashboard/user/chat/${a.doctor.id}`)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                     >
//                       💬 Chat
//                     </button>


//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {selectedAppointment && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 animate-fade-in">
//               <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
//               <div className="flex justify-center">
//                 <QRCodeCanvas
//                   value={`00020101021129370016A000000677010111011300660123456789802TH53037645406${treatmentPrices[selectedAppointment.type] || 0}.005802TH6304ABCD`}
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




//ver2

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { Eye, EyeOff, User, Lock, Mail, ArrowLeft, Heart, Shield, Star, UserPlus, Check } from 'lucide-react'

// export default function RegisterUserPage() {
//   const router = useRouter()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setMessage('')
    
//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match')
//       return
//     }
    
//     if (password.length < 6) {
//       setMessage('Password must be at least 6 characters')
//       return
//     }

//     setLoading(true)

//     try {
//       const res = await fetch('/api/register/user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setMessage('Registration successful! Redirecting to login...')
//         setTimeout(() => {
//           router.push('/login')
//         }, 2000)
//       } else {
//         setMessage(data.message || 'Registration failed')
//       }
//     } catch {
//       setMessage('Server error. Please try again later.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Multi-layer Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800"></div>
      
//       {/* Animated Background Overlay */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent"
//           animate={{ 
//             background: [
//               "linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
//               "linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
//               "linear-gradient(225deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
//               "linear-gradient(315deg, transparent, rgba(59, 130, 246, 0.1), transparent)"
//             ]
//           }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         />
//       </div>

//       {/* Floating Geometric Shapes */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
//           animate={{ 
//             x: [0, 100, 0],
//             y: [0, -50, 0],
//             scale: [1, 1.2, 1]
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-32 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"
//           animate={{ 
//             x: [0, -80, 0],
//             y: [0, 60, 0],
//             scale: [1, 0.8, 1]
//           }}
//           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-lg"
//           animate={{ 
//             rotate: [0, 360],
//             scale: [1, 1.5, 1]
//           }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//         />
        
//         {/* Medical Icons Floating */}
//         <motion.div
//           className="absolute top-1/4 right-1/3 text-white/10 text-6xl"
//           animate={{ 
//             y: [0, -20, 0],
//             rotate: [0, 10, 0]
//           }}
//           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <Heart className="w-16 h-16" />
//         </motion.div>
//         <motion.div
//           className="absolute bottom-1/4 left-1/3 text-white/10 text-6xl"
//           animate={{ 
//             y: [0, 30, 0],
//             rotate: [0, -15, 0]
//           }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <Shield className="w-20 h-20" />
//         </motion.div>
//         <motion.div
//           className="absolute top-3/4 right-1/4 text-white/10 text-6xl"
//           animate={{ 
//             x: [0, 25, 0],
//             y: [0, -15, 0]
//           }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <Star className="w-12 h-12" />
//         </motion.div>
//       </div>

//       {/* Main Content Container */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
//         <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          
//           {/* Left Side - Welcome Content */}
//           <motion.div
//             className="hidden lg:block text-white space-y-6"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             {/* Back Button */}
//             <motion.button
//               onClick={() => router.push('/')}
//               className="group flex items-center gap-3 text-blue-200 hover:text-white transition-colors duration-300 mb-8"
//               whileHover={{ x: -5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
//               <span className="font-medium">Back to Home</span>
//             </motion.button>

//             <div className="space-y-4">
//               <motion.h1
//                 className="text-5xl font-black leading-tight"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
//                   Join HealthCare+
//                 </span>
//                 <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
//                   Community
//                 </span>
//               </motion.h1>
              
//               <motion.p
//                 className="text-xl text-blue-100 leading-relaxed max-w-md"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 Begin your healthcare journey with us. Create your account to access personalized care, expert consultations, and comprehensive health management tools.
//               </motion.p>
//             </div>

//             {/* Benefits list */}
//             <motion.div
//               className="space-y-4 mt-8"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               {[
//                 { icon: UserPlus, text: "Quick & Easy Registration" },
//                 { icon: Shield, text: "Secure Data Protection" },
//                 { icon: Heart, text: "24/7 Healthcare Access" },
//                 { icon: Star, text: "Premium Medical Services" }
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex items-center gap-3 text-blue-100"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.8 + index * 0.1 }}
//                 >
//                   <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
//                     <item.icon className="w-4 h-4 text-blue-300" />
//                   </div>
//                   <span className="font-medium">{item.text}</span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Right Side - Register Form */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="relative"
//           >
//             {/* Glassmorphism Card */}
//             <motion.div
//               className="relative bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
//               variants={itemVariants}
//             >
//               {/* Gradient Border Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-3xl blur opacity-20 -z-10"></div>
              
//               {/* Header */}
//               <motion.div variants={itemVariants} className="text-center mb-8">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
//                   <UserPlus className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
//                 <p className="text-blue-100 font-medium">Register as Healthcare User</p>
//               </motion.div>

//               {/* Register Form */}
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Full Name Field */}
//                 <motion.div variants={itemVariants} className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-blue-300" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                   />
//                 </motion.div>

//                 {/* Email Field */}
//                 <motion.div variants={itemVariants} className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-blue-300" />
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="Enter your email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                   />
//                 </motion.div>

//                 {/* Password Field */}
//                 <motion.div variants={itemVariants} className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-blue-300" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Create a password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="w-full pl-12 pr-14 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-white transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </motion.div>

//                 {/* Confirm Password Field */}
//                 <motion.div variants={itemVariants} className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-blue-300" />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                     className="w-full pl-12 pr-14 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-white transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </motion.div>

//                 {/* Register Button */}
//                 <motion.button
//                   variants={itemVariants}
//                   type="submit"
//                   disabled={loading}
//                   className="w-full relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <span className="relative z-10">
//                     {loading ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <motion.div
//                           className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         />
//                         Creating Account...
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center gap-2">
//                         <UserPlus className="w-5 h-5" />
//                         Create Account
//                       </div>
//                     )}
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </motion.button>
//               </form>

//               {/* Message Display */}
//               {message && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`mt-6 p-4 rounded-xl border ${
//                     message.includes('successful') 
//                       ? 'bg-green-500/20 border-green-400/50 text-green-200' 
//                       : 'bg-red-500/20 border-red-400/50 text-red-200'
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     {message.includes('successful') && <Check className="w-4 h-4" />}
//                     <p className="text-sm font-medium">{message}</p>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Login Link */}
//               <motion.div
//                 variants={itemVariants}
//                 className="text-center mt-8 pt-6 border-t border-white/20"
//               >
//                 <p className="text-blue-100 font-medium">
//                   Already have an account?{' '}
//                   <motion.a
//                     href="/login"
//                     className="text-white hover:text-blue-300 transition-colors duration-300 font-bold relative group"
//                     whileHover={{ y: -1 }}
//                   >
//                     Sign In
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
//                   </motion.a>
//                 </p>
//               </motion.div>

//               {/* Mobile Back Button */}
//               <motion.button
//                 onClick={() => router.push('/')}
//                 className="lg:hidden w-full mt-6 flex items-center justify-center gap-2 text-blue-200 hover:text-white transition-colors duration-300 py-3 border border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/10"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span className="font-medium">Back to Home</span>
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Global Styles */}
//       <style jsx global>{`
//         /* Custom input autofill styles */
//         input:-webkit-autofill,
//         input:-webkit-autofill:hover,
//         input:-webkit-autofill:focus {
//           -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset !important;
//           -webkit-text-fill-color: white !important;
//           transition: background-color 5000s ease-in-out 0s;
//         }
        
//         /* Smooth scrolling */
//         html {
//           scroll-behavior: smooth;
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
//         ::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//         }
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #2563eb, #7c3aed);
//         }
//       `}</style>
//     </div>
//   )
// }




//ver3

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { treatmentPrices } from '@/lib/treatmentPrices';
// import { QRCodeCanvas } from 'qrcode.react';
// import NotificationBell from './components/NotificationBell';
// import { differenceInCalendarDays, parseISO } from 'date-fns';
// import { motion } from 'framer-motion';

// interface Appointment {
//   id: string;
//   date: string;
//   time: string;
//   type: string;
//   doctor: { id: string; name: string; specialty: string };
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// export default function UserDashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [selected, setSelected] = useState<Appointment | null>(null);
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     if (!stored) return router.push('/login');
//     const parsed: User = JSON.parse(stored);
//     if (parsed.role !== 'USER') return router.push('/login');
//     setUser(parsed);

//     (async () => {
//       const res = await fetch('/api/appointments/user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: parsed.email }),
//       });
//       const data = await res.json();
//       setAppointments(data.appointments || []);
//       const today = new Date();
//       const hasToday = (data.appointments || []).some((a: Appointment) => {
//         const d = parseISO(a.date);
//         return differenceInCalendarDays(d, today) === 0;
//       });
//       if (hasToday) {
//         setShowAlert(true);
//         new Audio('/alert.wav').play().catch(() => {});
//       }
//     })();
//   }, [router]);

//   const cancelAppointment = async (id: string) => {
//     if (!confirm('Cancel this appointment?')) return;
//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     });
//     if (res.ok) setAppointments((p) => p.filter((x) => x.id !== id));
//     else alert('Failed to cancel. Please try again.');
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* On-brand background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800" />
//       <div className="absolute inset-0 opacity-25">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" />
//       </div>

//       <div className="relative z-10 flex min-h-screen">
//         {/* Sidebar */}
//         <aside className="hidden md:block w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
//           <h2 className="text-2xl font-extrabold text-white mb-8">🦷 HealthCare+</h2>
//           <nav className="space-y-2">
//             <button
//               onClick={() => router.push('/dashboard/user/appointments')}
//               className="w-full text-left px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
//             >
//               🗓️ Appointments
//             </button>
//             <button
//               onClick={() => router.push('/dashboard/user/telemedicine')}
//               className="w-full text-left px-4 py-2 rounded-xl text-blue-100 hover:bg-white/10"
//             >
//               🎥 Telemedicine
//             </button>
//             <button
//               onClick={() => router.push('/dashboard/user/ai-analysis')}
//               className="w-full text-left px-4 py-2 rounded-xl text-blue-100 hover:bg-white/10"
//             >
//               🤖 AI Analysis
//             </button>
//             <button
//               onClick={() => router.push('/dashboard/user/profile')}
//               className="w-full text-left px-4 py-2 rounded-xl text-blue-100 hover:bg-white/10"
//             >
//               🙍‍♂️ My Profile
//             </button>
//           </nav>
//         </aside>

//         {/* Main */}
//         <main className="flex-1 p-6 md:p-10">
//           {user && (
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-black text-white">
//                   Welcome, {user.name}!
//                 </h1>
//                 <p className="text-blue-200 text-sm">Email: {user.email}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold uppercase">
//                   {user.name[0]}
//                 </div>
//                 <NotificationBell userId={user.id} />
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem('user');
//                     router.push('/login');
//                   }}
//                   className="px-3 py-1.5 rounded-xl bg-white/10 text-blue-100 hover:bg-white/20"
//                 >
//                   ⏏ Logout
//                 </button>
//               </div>
//             </div>
//           )}

//           {showAlert && (
//             <div className="mb-4 text-center">
//               <div className="inline-block bg-yellow-300/90 text-red-900 font-bold px-4 py-2 rounded-xl shadow">
//                 🔔 You have an appointment today!
//               </div>
//             </div>
//           )}

//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-white">Your Appointments</h2>
//             <button
//               onClick={() => router.push('/booking')}
//               className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl"
//             >
//               ➕ Add Appointment
//             </button>
//           </div>

//           {appointments.length === 0 ? (
//             <p className="text-blue-100">No appointments found.</p>
//           ) : (
//             <div className="space-y-4">
//               {appointments.map((a) => (
//                 <motion.div
//                   key={a.id}
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.25 }}
//                   className="bg-white/10 backdrop-blur-xl border border-white/15 p-5 rounded-2xl shadow hover:bg-white/15"
//                 >
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div className="space-y-1 text-blue-50">
//                       <h3 className="font-semibold text-lg text-white">
//                         📅{' '}
//                         {new Date(a.date).toLocaleDateString(undefined, {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                         })}{' '}
//                         at {a.time}
//                       </h3>
//                       <p className="text-blue-100 text-sm">
//                         🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})
//                       </p>
//                       <p className="text-blue-200 text-sm">📋 {a.type}</p>
//                       <p className="text-white font-medium mt-1">
//                         💸 {treatmentPrices[a.type] || 0} THB
//                       </p>
//                     </div>

//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                         className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button
//                         onClick={() => cancelAppointment(a.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                       >
//                         ❌ Cancel
//                       </button>
//                       <button
//                         onClick={() => setSelected(a)}
//                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                       >
//                         💳 QR Pay
//                       </button>
//                       <button
//                         onClick={() => router.push(`/dashboard/user/chat/${a.doctor.id}`)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
//                       >
//                         💬 Chat
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}

//           {selected && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//               <div className="bg-white p-6 rounded-2xl shadow-2xl text-center w-80">
//                 <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
//                 <div className="flex justify-center">
//                   <QRCodeCanvas
//                     value={`00020101021129370016A000000677010111011300660123456789802TH53037645406${
//                       treatmentPrices[selected.type] || 0
//                     }.005802TH6304ABCD`}
//                     size={180}
//                   />
//                 </div>
//                 <p className="mt-2 text-gray-700">
//                   💳 {treatmentPrices[selected.type] || 0} THB
//                 </p>
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="mt-4 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-xl"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }



//ver4 - blue

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { treatmentPrices } from '@/lib/treatmentPrices';
import { QRCodeCanvas } from 'qrcode.react';
import NotificationBell from './components/NotificationBell';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Calendar, Video, Brain, User as UserIcon,
  LogOut, Plus, Edit, Trash2, CreditCard, MessageCircle,
  Clock, Bell, Home, FileText
} from 'lucide-react';
import ThemeLanguageToggle from '@/app/components/ThemeLanguageToggle';
import { useApp } from '../../contexts/AppContext';

interface Payment {
  id: string;
  status: 'PENDING' | 'PAID' | 'SUCCESSFUL' | 'REJECTED' | 'REFUNDED';
  amount: number;
  slipImagePath?: string;
  paidAt?: string;
  verifiedAt?: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  doctor: { id: string; name: string; specialty: string };
  payment?: Payment;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  image?: string;
}

export default function UserDashboardPage() {
  const router = useRouter();
  const { t, theme } = useApp();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'appointments' | 'payments'>('appointments');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return router.push('/login');
    const parsed: User = JSON.parse(stored);
    if (parsed.role !== 'USER') return router.push('/login');

    (async () => {
      // Fetch full user profile including profileImage
      const profileRes = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsed.email }),
      });
      const profileData = await profileRes.json();

      console.log('Profile Data:', profileData);
      console.log('Profile Image:', profileData?.user?.profileImage);

      if (profileData.success && profileData.user) {
        const userWithImage: User = {
          ...parsed,
          profileImage: profileData.user.profileImage,
          image: profileData.user.image
        };
        console.log('User with image:', userWithImage);
        setUser(userWithImage);
      } else {
        setUser(parsed);
      }

      // Fetch appointments
      const res = await fetch('/api/appointments/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsed.email }),
      });
      const data = await res.json();
      setAppointments(data.appointments || []);
      const today = new Date();
      const hasToday = (data.appointments || []).some((a: Appointment) => {
        const d = parseISO(a.date);
        return differenceInCalendarDays(d, today) === 0;
      });
      if (hasToday) {
        setShowAlert(true);
        new Audio('/alert.wav').play().catch(() => {});
      }
    })();
  }, [router]);

  const cancelAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    const res = await fetch('/api/appointments/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setAppointments((p) => p.filter((x) => x.id !== id));
      alert('Appointment cancelled successfully');
    } else {
      alert('Failed to cancel. Please try again.');
    }
  };

  const isPastAppointment = (date: string, time: string) => {
    const appointmentDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    appointmentDate.setHours(hours, minutes, 0, 0);

    const now = new Date();
    return appointmentDate <= now;
  };

  const getPaymentStatusBadge = (payment?: Payment) => {
    if (!payment) {
      return (
        <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
          ยังไม่ชำระ
        </span>
      );
    }

    switch (payment.status) {
      case 'PENDING':
        return (
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            Pending Payment
          </span>
        );
      case 'PAID':
        return (
          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            Under Review
          </span>
        );
      case 'SUCCESSFUL':
        return (
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            Paid Successfully
          </span>
        );
      case 'REJECTED':
        return (
          <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            Rejected
          </span>
        );
      case 'REFUNDED':
        return (
          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            💰 Refunded
          </span>
        );
      default:
        return null;
    }
  };

  const handlePaymentClick = (appointment: Appointment) => {
    router.push(`/payment?appointmentId=${appointment.id}`);
  };

  const menuItems = [
    { icon: Home, label: t('menu.dashboard'), path: '/dashboard/user', active: true },
    { icon: Calendar, label: t('menu.appointmentsDetail'), path: '/dashboard/user/appointments' },
    { icon: Video, label: t('menu.telemedicine'), path: '/dashboard/user/telemedicine' },
    { icon: Brain, label: t('menu.aiAnalysis'), path: '/ai-analysis' },
    { icon: FileText, label: t('menu.myInformation'), path: '/dashboard/user/information' },
    { icon: UserIcon, label: t('menu.myProfile'), path: '/dashboard/user/profile' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always visible on desktop */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-full sm:w-80 md:w-72
        bg-white dark:bg-slate-800 shadow-2xl md:shadow-xl
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">H+</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{t('common.healthcarePlus')}</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* User Profile Card */}
          {user && (
            <div className="p-6 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                {(user.image || user.profileImage) ? (
                  <img
                    src={user.image || user.profileImage}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 dark:text-gray-100 truncate text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                  transition-all duration-200 group
                  ${item.active
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400'
                  }
                `}
                whileHover={{ x: item.active ? 0 : 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <item.icon size={20} className={item.active ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-700">
            <button
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-xl transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">{t('menu.logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-800 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {t('dashboard.welcome')}, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('common.manage')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeLanguageToggle />
              {user && <NotificationBell userId={user.id} />}
            </div>
          </div>
        </header>

        {/* Alert Banner */}
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 text-white px-4 py-3 text-center font-semibold shadow-lg flex items-center justify-center gap-2"
          >
            <Bell size={20} />
            {t('common.today')}
          </motion.div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-blue-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{t('dashboard.totalAppointments')}</p>
                  <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">{appointments.length}</p>
                </div>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Calendar className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-green-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{t('dashboard.upcoming')}</p>
                  <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                    {/* {appointments.filter(a => new Date(`${a.date}T${a.time}`) > new Date()).length} */}
                    {appointments.filter(a => {
                      // แยกเอาแค่วันที่ (ตัดเวลาออก)
                      const dateOnly = a.date.split('T')[0] // 2025-10-07
                      // รวมวันที่กับเวลา
                      const appointmentDateTime = new Date(`${dateOnly}T${a.time}:00`)
                      const now = new Date()
                      return appointmentDateTime > now
                    }).length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="text-green-600 dark:text-green-400" size={28} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-shadow"
            >
              <p className="text-sm text-blue-100 dark:text-blue-200 mb-3 font-medium">{t('dashboard.quickAction')}</p>
              <button
                onClick={() => router.push('/booking')}
                className="flex items-center gap-2 bg-white dark:bg-slate-100 text-blue-600 dark:text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-white transition-colors w-full justify-center"
              >
                <Plus size={20} />
                {t('dashboard.bookNew')}
              </button>
            </motion.div>
          </div>

          {/* Appointments List */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-white dark:from-slate-700 dark:to-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('dashboard.appointments')} & Payments</h2>
                <button
                  onClick={() => router.push('/booking')}
                  className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">{t('dashboard.addAppointment')}</span>
                </button>
              </div>

              {/* View Mode Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('appointments')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'appointments'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-500'
                  }`}
                >
                  {t('appointments.all')}
                </button>
                <button
                  onClick={() => setViewMode('payments')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'payments'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-500'
                  }`}
                >
                  {t('dashboard.paymentHistory')}
                </button>
              </div>
            </div>

            <div className="p-6">
              {viewMode === 'appointments' ? (
                appointments.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="text-gray-400 dark:text-gray-500" size={40} />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{t('dashboard.noAppointments')}</p>
                    <button
                      onClick={() => router.push('/booking')}
                      className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-md"
                    >
                      {t('dashboard.bookFirst')}
                    </button>
                  </div>
                ) : (
                <div className="space-y-4">
                  {appointments
                    .filter(a => !isPastAppointment(a.date, a.time))
                    .map((a, index) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="group bg-gradient-to-br from-blue-50 to-white dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                              <Calendar className="text-white" size={22} />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                  {new Date(a.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                                <span className="bg-blue-600 dark:bg-blue-700 text-white text-sm px-3 py-1 rounded-full font-semibold">
                                  {a.time}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-200 font-semibold text-base">
                                {a.doctor.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{a.doctor.specialty}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-15">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm px-3 py-1.5 rounded-full font-medium">
                              {a.type}
                            </span>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm px-3 py-1.5 rounded-full font-semibold">
                              {treatmentPrices[a.type] || 0} THB
                            </span>
                            {getPaymentStatusBadge(a.payment)}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
                            className="flex items-center gap-2 bg-amber-500 dark:bg-amber-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors shadow-sm hover:shadow-md"
                          >
                            <Edit size={18} />
                            <span className="hidden sm:inline">{t('appointments.edit')}</span>
                          </button>
                          <button
                            onClick={() => cancelAppointment(a.id)}
                            className="flex items-center gap-2 bg-rose-500 dark:bg-rose-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-rose-600 dark:hover:bg-rose-500 transition-colors shadow-sm hover:shadow-md"
                          >
                            <Trash2 size={18} />
                            <span className="hidden sm:inline">{t('appointments.cancel')}</span>
                          </button>
                          <button
                            onClick={() => handlePaymentClick(a)}
                            className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm hover:shadow-md"
                          >
                            <CreditCard size={18} />
                            <span className="hidden sm:inline">{t('appointments.payment')}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
              ) : (
                // Payment History View
                <div className="space-y-4">
                  {appointments.filter(a => a.payment).length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CreditCard className="text-gray-400 dark:text-gray-500" size={40} />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Payment History Not Found</p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">ชำระเงินสำหรับการนัดหมายของคุณเพื่อดูประวัติได้ที่นี่</p>
                    </div>
                  ) : (
                    appointments.filter(a => a.payment).map((a, index) => (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="group bg-gradient-to-br from-blue-50 to-white dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                <CreditCard className="text-white" size={22} />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    {new Date(a.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                  <span className="bg-blue-600 dark:bg-blue-700 text-white text-sm px-3 py-1 rounded-full font-semibold">
                                    {a.time}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-200 font-semibold text-base">
                                  {a.doctor.name} - {a.doctor.specialty}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{a.type}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-15">
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm px-3 py-1.5 rounded-full font-semibold">
                                Payment Total: {a.payment?.amount || treatmentPrices[a.type] || 0} Baht
                              </span>
                              {getPaymentStatusBadge(a.payment)}
                              {a.payment?.paidAt && (
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1.5 rounded-full font-medium">
                                  Payment Time: {new Date(a.payment.paidAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              )}
                              {a.payment?.verifiedAt && (
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm px-3 py-1.5 rounded-full font-medium">
                                  Approved Time: {new Date(a.payment.verifiedAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {a.payment?.slipImagePath && (
                              <button
                                onClick={() => window.open(a.payment!.slipImagePath!, '_blank')}
                                className="flex items-center gap-2 bg-purple-500 dark:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-purple-600 dark:hover:bg-purple-600 transition-colors shadow-sm hover:shadow-md"
                              >
                                View Slip
                              </button>
                            )}
                            <button
                              onClick={() => handlePaymentClick(a)}
                              className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
                            >
                              <CreditCard size={18} />
                              View Detail
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* QR Payment Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">Scan to Pay</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Use your banking app to scan</p>
            <div className="flex justify-center bg-gray-50 dark:bg-slate-700 p-6 rounded-xl mb-6">
              <QRCodeCanvas
                value={`00020101021129370016A000000677010111011300660123456789802TH53037645406${
                  treatmentPrices[selected.type] || 0
                }.005802TH6304ABCD`}
                size={200}
                level="H"
              />
            </div>
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {treatmentPrices[selected.type] || 0} THB
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selected.type}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}