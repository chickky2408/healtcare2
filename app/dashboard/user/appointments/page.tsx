

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'



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

// export default function AppointmentsPage() {
//   // Removed unused user state
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const router = useRouter()


//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')

//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')
//     // Removed setUser as user state is no longer used

//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.appointments) setAppointments(data.appointments)
//       })
//   }, [router])

//   const cancelAppointment = async (id: string) => {
//     const confirmed = confirm('Cancel this appointment?')
//     if (!confirmed) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })

//     if (res.ok) {
//       setAppointments(appointments.filter((a) => a.id !== id))
//     }
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
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








// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import ConfirmModal from '@/components/ConfirmModal'

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

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [selectedId, setSelectedId] = useState<string | null>(null)
//   const router = useRouter()

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
//         if (data.appointments) setAppointments(data.appointments)
//       })
//   }, [router])

//   const handleCancel = async () => {
//     if (!selectedId) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: selectedId }),
//     })

//     if (res.ok) {
//       setAppointments((prev) => prev.filter((a) => a.id !== selectedId))
//       alert('Appointment cancelled.')
//     }

//     setShowConfirm(false)
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p>
//                   🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
//                 </p>
//                 <p>📋 Treatment: <b>{a.type}</b></p>
//                 <div className="mt-2 flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => {
//                       setSelectedId(a.id)
//                       setShowConfirm(true)
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* ✅ Confirm Modal */}
//       <ConfirmModal
//         isOpen={showConfirm}
//         onClose={() => setShowConfirm(false)}
//         onConfirm={handleCancel}
//         message="Are you sure you want to cancel this appointment?"
//       />
//     </div>
//   )
// }



// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import ConfirmModal from '@/components/ConfirmModal'
// import DetailModal from '@/components/DetailModal'

// // import type { Appointment } from '@/types/appointment'




// export type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     name: string
//     specialty: string
//   }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [selectedId, setSelectedId] = useState<string | null>(null)

//   const [showDetail, setShowDetail] = useState(false)
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

//   const router = useRouter()

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
//         if (data.appointments) setAppointments(data.appointments)
//       })
//   }, [router])

//   const handleCancel = async () => {
//     if (!selectedId) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: selectedId }),
//     })

//     if (res.ok) {
//       setAppointments((prev) => prev.filter((a) => a.id !== selectedId))
//     }

//     setShowConfirm(false)
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p>
//                   🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
//                 </p>
//                 <p>📋 Treatment: <b>{a.type}</b></p>
//                 <div className="mt-2 flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() =>
//                       router.push(`/dashboard/user/appointments/edit/${a.id}`)
//                     }
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => {
//                       setSelectedId(a.id)
//                       setShowConfirm(true)
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
//                     onClick={() => {
//                       setSelectedAppointment(a)
//                       setShowDetail(true)
//                     }}
//                   >
//                     Detail
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Cancel confirm */}
//       <ConfirmModal
//         isOpen={showConfirm}
//         onClose={() => setShowConfirm(false)}
//         onConfirm={handleCancel}
//         message="Are you sure you want to cancel this appointment?"
//       />

//       {/* Detail popup */}
//       {selectedAppointment && (
//         <DetailModal
//           isOpen={showDetail}
//           onClose={() => {
//             setSelectedAppointment(null)
//             setShowDetail(false)
//           }}
//           appointment={selectedAppointment}
//         />
//       )}
//     </div>
//   )
// }



//2 may 2024

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import ConfirmModal from '@/components/ConfirmModal'

// export type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     name: string
//     specialty: string
//   }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [selectedId, setSelectedId] = useState<string | null>(null)

//   const router = useRouter()

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
//         if (data.appointments) setAppointments(data.appointments)
//       })
//   }, [router])

//   const handleCancel = async () => {
//     if (!selectedId) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: selectedId }),
//     })

//     if (res.ok) {
//       setAppointments((prev) => prev.filter((a) => a.id !== selectedId))
//     }

//     setShowConfirm(false)
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p>
//                   🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
//                 </p>
//                 <p>📋 Treatment: <b>{a.type}</b></p>
//                 <div className="mt-2 flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() =>
//                       router.push(`/dashboard/user/appointments/edit/${a.id}`)
//                     }
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => {
//                       setSelectedId(a.id)
//                       setShowConfirm(true)
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
//                     onClick={() =>
//                       router.push(`/dashboard/user/telemedicine/${a.id}`)
//                     }
//                   >
//                     Detail
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <ConfirmModal
//         isOpen={showConfirm}
//         onClose={() => setShowConfirm(false)}
//         onConfirm={handleCancel}
//         message="Are you sure you want to cancel this appointment?"
//       />
//     </div>
//   )
// }



// new theme

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import { 
//   Calendar,
//   Clock,
//   User,
//   ArrowLeft,
//   Plus,
//   Edit3,
//   Trash2,
//   Eye,
//   Heart,
//   Shield,
//   Star,
//   Video,
//   Sparkles,
//   UserCheck,
//   Stethoscope,
//   CalendarDays,
//   Search,
//   Filter,
//   CheckCircle,
//   AlertTriangle
// } from 'lucide-react'

// export type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     name: string
//     specialty: string
//   }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterStatus, setFilterStatus] = useState('all') // all, upcoming, past
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [selectedId, setSelectedId] = useState<string | null>(null)
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')

//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')

//     fetchAppointments(parsed.email)
//   }, [router])

//   const fetchAppointments = async (email: string) => {
//     try {
//       const response = await fetch('/api/appointments/user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       })
//       const data = await response.json()
//       if (data.appointments) {
//         setAppointments(data.appointments)
//         setFilteredAppointments(data.appointments)
//       }
//     } catch (error) {
//       console.error('Failed to fetch appointments:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     let filtered = appointments

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(appointment => 
//         appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         appointment.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     // Status filter
//     const now = new Date()
//     if (filterStatus === 'upcoming') {
//       filtered = filtered.filter(appointment => new Date(`${appointment.date}T${appointment.time}`) >= now)
//     } else if (filterStatus === 'past') {
//       filtered = filtered.filter(appointment => new Date(`${appointment.date}T${appointment.time}`) < now)
//     }

//     setFilteredAppointments(filtered)
//   }, [appointments, searchTerm, filterStatus])

//   const handleCancel = async () => {
//     if (!selectedId) return

//     try {
//       const res = await fetch('/api/appointments/delete', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id: selectedId }),
//       })

//       if (res.ok) {
//         setAppointments(prev => prev.filter(a => a.id !== selectedId))
//       }
//     } catch (error) {
//       console.error('Failed to cancel appointment:', error)
//     } finally {
//       setShowConfirm(false)
//       setSelectedId(null)
//       setSelectedAppointment(null)
//     }
//   }

//   const openCancelModal = (appointment: Appointment) => {
//     setSelectedId(appointment.id)
//     setSelectedAppointment(appointment)
//     setShowConfirm(true)
//   }

//   const treatmentIcons = {
//     'VIDEO_CALL': { icon: Video, color: 'from-green-500 to-emerald-500', label: 'Video Call' },
//     'CLEANING': { icon: Sparkles, color: 'from-blue-500 to-cyan-500', label: 'Cleaning' },
//     'ORTHODONTIC': { icon: UserCheck, color: 'from-purple-500 to-pink-500', label: 'Orthodontic' },
//     'AI_DIAGNOSIS': { icon: Heart, color: 'from-orange-500 to-red-500', label: 'AI Diagnosis' }
//   }

//   const getStatusColor = (date: string, time: string) => {
//     const appointmentDateTime = new Date(`${date}T${time}`)
//     const now = new Date()
//     return appointmentDateTime >= now ? 'text-green-400' : 'text-gray-400'
//   }

//   const getStatusLabel = (date: string, time: string) => {
//     const appointmentDateTime = new Date(`${date}T${time}`)
//     const now = new Date()
//     return appointmentDateTime >= now ? 'Upcoming' : 'Past'
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center">
//         <motion.div
//           className="text-center text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <motion.div
//             className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           />
//           <p className="text-xl font-semibold">Loading your appointments...</p>
//         </motion.div>
//       </div>
//     )
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
//       </div>

//       {/* Main Content Container */}
//       <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Header */}
//           <motion.div
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.button
//               onClick={() => router.push('/dashboard/user')}
//               className="group flex items-center gap-3 text-blue-200 hover:text-white transition-colors duration-300 mb-8 mx-auto"
//               whileHover={{ x: -5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
//               <span className="font-medium">Back to Dashboard</span>
//             </motion.button>

//             <div className="flex items-center justify-center gap-6 mb-8">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-lg">
//                 <CalendarDays className="w-10 h-10 text-white" />
//               </div>
              
//               <div className="text-left">
//                 <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
//                   Your Appointments
//                 </h1>
//                 <p className="text-xl text-blue-100">
//                   Manage your healthcare schedule
//                 </p>
//               </div>
//             </div>

//             <motion.button
//               onClick={() => router.push('/booking')}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Plus className="w-5 h-5" />
//               Book New Appointment
//             </motion.button>
//           </motion.div>

//           {/* Search and Filter Section */}
//           <motion.div
//             className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-lg mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             <div className="flex flex-col lg:flex-row gap-4">
//               {/* Search */}
//               <div className="flex-1 relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
//                 <input
//                   type="text"
//                   placeholder="Search appointments..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
//                 />
//               </div>

//               {/* Filter */}
//               <div className="relative">
//                 <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm appearance-none"
//                 >
//                   <option value="all" className="bg-gray-800">All Appointments</option>
//                   <option value="upcoming" className="bg-gray-800">Upcoming</option>
//                   <option value="past" className="bg-gray-800">Past</option>
//                 </select>
//               </div>
//             </div>
//           </motion.div>

//           {/* Appointments List */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {filteredAppointments.length === 0 ? (
//               <motion.div
//                 className="text-center py-16"
//                 variants={itemVariants}
//               >
//                 <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
//                   <Calendar className="w-12 h-12 text-blue-500" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-3">
//                   {searchTerm || filterStatus !== 'all' ? 'No matching appointments' : 'No appointments yet'}
//                 </h3>
//                 <p className="text-blue-200 mb-8 max-w-md mx-auto">
//                   {searchTerm || filterStatus !== 'all' 
//                     ? 'Try adjusting your search or filter criteria.' 
//                     : 'Ready to start your healthcare journey? Book your first appointment with our expert team.'}
//                 </p>
//                 {(!searchTerm && filterStatus === 'all') && (
//                   <motion.button
//                     onClick={() => router.push('/booking')}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Plus className="w-5 h-5" />
//                     Book Your First Appointment
//                   </motion.button>
//                 )}
//               </motion.div>
//             ) : (
//               <div className="space-y-6">
//                 {filteredAppointments.map((appointment, index) => {
//                   const treatmentInfo = treatmentIcons[appointment.type as keyof typeof treatmentIcons] || treatmentIcons.VIDEO_CALL
//                   const TreatmentIcon = treatmentInfo.icon
                  
//                   return (
//                     <motion.div
//                       key={appointment.id}
//                       variants={itemVariants}
//                       className="bg-white/10 backdrop-blur-lg p-6 lg:p-8 rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
//                       whileHover={{ y: -2 }}
//                     >
//                       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                         <div className="flex-1">
//                           <div className="flex items-start gap-4 mb-4">
//                             <div className={`w-14 h-14 bg-gradient-to-r ${treatmentInfo.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
//                               <TreatmentIcon className="w-7 h-7 text-white" />
//                             </div>
                            
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center gap-3 mb-2">
//                                 <h3 className="text-xl font-bold text-white">{treatmentInfo.label}</h3>
//                                 <span className={`text-sm font-medium ${getStatusColor(appointment.date, appointment.time)}`}>
//                                   {getStatusLabel(appointment.date, appointment.time)}
//                                 </span>
//                               </div>
                              
//                               <div className="flex items-center gap-4 text-blue-100 mb-3">
//                                 <div className="flex items-center gap-2">
//                                   <Calendar className="w-4 h-4" />
//                                   <span className="font-medium">
//                                     {new Date(appointment.date).toLocaleDateString('en-US', {
//                                       weekday: 'long',
//                                       year: 'numeric',
//                                       month: 'long',
//                                       day: 'numeric'
//                                     })}
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   <Clock className="w-4 h-4" />
//                                   <span className="font-medium">{appointment.time}</span>
//                                 </div>
//                               </div>
                              
//                               <div className="flex items-center gap-3 text-blue-100">
//                                 <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
//                                   <Stethoscope className="w-5 h-5 text-white" />
//                                 </div>
//                                 <div>
//                                   <p className="font-bold text-white">Dr. {appointment.doctor.name}</p>
//                                   <p className="text-sm text-blue-200">{appointment.doctor.specialty}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex gap-3 flex-shrink-0">
//                           <motion.button
//                             onClick={() => router.push(`/dashboard/user/appointments/edit/${appointment.id}`)}
//                             className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-amber-100 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-amber-400/30"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <Edit3 className="w-4 h-4" />
//                             <span className="hidden sm:inline">Edit</span>
//                           </motion.button>
                          
//                           <motion.button
//                             onClick={() => openCancelModal(appointment)}
//                             className="bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-red-100 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-red-400/30"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             <span className="hidden sm:inline">Cancel</span>
//                           </motion.button>
                          
//                           <motion.button
//                             onClick={() => router.push(`/dashboard/user/telemedicine/${appointment.id}`)}
//                             className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-blue-100 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-blue-400/30"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <Eye className="w-4 h-4" />
//                             <span className="hidden sm:inline">Details</span>
//                           </motion.button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )
//                 })}
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       <AnimatePresence>
//         {showConfirm && selectedAppointment && (
//           <motion.div
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md w-full"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             >
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <AlertTriangle className="w-8 h-8 text-white" />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-4">Cancel Appointment</h3>
                
//                 <div className="bg-white/10 rounded-2xl p-4 mb-6 text-left">
//                   <p className="text-blue-100 mb-2">
//                     <strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}
//                   </p>
//                   <p className="text-blue-100 mb-2">
//                     <strong>Time:</strong> {selectedAppointment.time}
//                   </p>
//                   <p className="text-blue-100">
//                     <strong>Doctor:</strong> Dr. {selectedAppointment.doctor.name}
//                   </p>
//                 </div>
                
//                 <p className="text-blue-100 mb-8">
//                   Are you sure you want to cancel this appointment? This action cannot be undone.
//                 </p>
                
//                 <div className="flex gap-4">
//                   <motion.button
//                     onClick={() => setShowConfirm(false)}
//                     className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 border border-white/20"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Keep Appointment
//                   </motion.button>
                  
//                   <motion.button
//                     onClick={handleCancel}
//                     className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Yes, Cancel
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Global Styles */}
//       <style jsx global>{`
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


//blue 

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Heart,
  Shield,
  Star,
  Video,
  Sparkles,
  UserCheck,
  Stethoscope,
  CalendarDays,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: {
    name: string
    specialty: string
  }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')

    const parsed: User = JSON.parse(stored)
    if (parsed.role !== 'USER') return router.push('/login')

    fetchAppointments(parsed.email)
  }, [router])

  const fetchAppointments = async (email: string) => {
    try {
      const response = await fetch('/api/appointments/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (data.appointments) {
        setAppointments(data.appointments)
        setFilteredAppointments(data.appointments)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = appointments

    if (searchTerm) {
      filtered = filtered.filter(appointment => 
        appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // const now = new Date()
    // if (filterStatus === 'upcoming') {
    //   filtered = filtered.filter(appointment => new Date(`${appointment.date}T${appointment.time}`) >= now)
    // } else if (filterStatus === 'past') {
    //   filtered = filtered.filter(appointment => new Date(`${appointment.date}T${appointment.time}`) < now)
    // }

    // setFilteredAppointments(filtered)

    // Status filter
    const now = new Date()
    if (filterStatus === 'upcoming') {
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date)
        const [hours, minutes] = appointment.time.split(':').map(Number)
        appointmentDate.setHours(hours, minutes, 0, 0)
        return appointmentDate > now
      })
    } else if (filterStatus === 'past') {
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date)
        const [hours, minutes] = appointment.time.split(':').map(Number)
        appointmentDate.setHours(hours, minutes, 0, 0)
        return appointmentDate <= now
      })
    }

    // Sort by date (nearest first)
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date)
      const [hoursA, minutesA] = a.time.split(':').map(Number)
      dateA.setHours(hoursA, minutesA, 0, 0)

      const dateB = new Date(b.date)
      const [hoursB, minutesB] = b.time.split(':').map(Number)
      dateB.setHours(hoursB, minutesB, 0, 0)

      return dateA.getTime() - dateB.getTime()
    })

    setFilteredAppointments(filtered)


  }, [appointments, searchTerm, filterStatus])

  const handleCancel = async () => {
    if (!selectedId) return

    try {
      const res = await fetch('/api/appointments/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedId }),
      })

      if (res.ok) {
        setAppointments(prev => prev.filter(a => a.id !== selectedId))
      }
    } catch (error) {
      console.error('Failed to cancel appointment:', error)
    } finally {
      setShowConfirm(false)
      setSelectedId(null)
      setSelectedAppointment(null)
    }
  }

  const openCancelModal = (appointment: Appointment) => {
    setSelectedId(appointment.id)
    setSelectedAppointment(appointment)
    setShowConfirm(true)
  }

  const treatmentIcons = {
    'VIDEO_CALL': { icon: Video, color: 'from-green-500 to-emerald-500', label: 'Video Call' },
    'CLEANING': { icon: Sparkles, color: 'from-blue-500 to-cyan-500', label: 'Cleaning' },
    'ORTHODONTIC': { icon: UserCheck, color: 'from-indigo-500 to-blue-500', label: 'Orthodontic' },
    'AI_DIAGNOSIS': { icon: Heart, color: 'from-orange-500 to-red-500', label: 'AI Diagnosis' }
  }

  // const getStatusColor = (date: string, time: string) => {
  //   const appointmentDateTime = new Date(`${date}T${time}`)
  //   const now = new Date()
  //   return appointmentDateTime >= now ? 'text-green-400' : 'text-gray-400'
  // }

  // const getStatusLabel = (date: string, time: string) => {
  //   const appointmentDateTime = new Date(`${date}T${time}`)
  //   const now = new Date()
  //   return appointmentDateTime >= now ? 'Upcoming' : 'Past'
  // }


  const getStatusColor = (date: string, time: string) => {
    const appointmentDate = new Date(date)
    const [hours, minutes] = time.split(':').map(Number)
    appointmentDate.setHours(hours, minutes, 0, 0)
    
    const now = new Date()
    return appointmentDate > now ? 'text-green-400' : 'text-gray-400'
  }
  
  const getStatusLabel = (date: string, time: string) => {
    const appointmentDate = new Date(date)
    const [hours, minutes] = time.split(':').map(Number)
    appointmentDate.setHours(hours, minutes, 0, 0)

    const now = new Date()
    return appointmentDate > now ? 'Upcoming' : 'Past'
  }

  const isPastAppointment = (date: string, time: string) => {
    const appointmentDate = new Date(date)
    const [hours, minutes] = time.split(':').map(Number)
    appointmentDate.setHours(hours, minutes, 0, 0)

    const now = new Date()
    return appointmentDate <= now
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-xl font-semibold">Loading your appointments...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"></div>
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-transparent"
          animate={{ 
            background: [
              "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
              "linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.1), transparent)",
              "linear-gradient(225deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
              "linear-gradient(315deg, transparent, rgba(96, 165, 250, 0.1), transparent)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-1/4 right-1/3 text-white/10 text-6xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-white/10 text-6xl"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-20 h-20" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={() => router.push('/dashboard/user')}
              className="group flex items-center gap-3 text-blue-200 hover:text-white transition-colors duration-300 mb-8 mx-auto"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </motion.button>

            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-lg">
                <CalendarDays className="w-10 h-10 text-white" />
              </div>
              
              <div className="text-left">
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
                  Your Appointments
                </h1>
                <p className="text-xl text-blue-100">
                  Manage your healthcare schedule
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => router.push('/booking')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Book New Appointment
            </motion.button>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm appearance-none"
                >
                  <option value="all" className="bg-gray-800">All Appointments</option>
                  <option value="upcoming" className="bg-gray-800">Upcoming Appointments</option>
                  <option value="past" className="bg-gray-800">Past Appointments</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Appointments List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredAppointments.length === 0 ? (
              <motion.div
                className="text-center py-16"
                variants={itemVariants}
              >
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                  <Calendar className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {searchTerm || filterStatus !== 'all' ? 'No matching appointments' : 'No appointments yet'}
                </h3>
                <p className="text-blue-200 mb-8 max-w-md mx-auto">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'Ready to start your healthcare journey? Book your first appointment with our expert team.'}
                </p>
                {(!searchTerm && filterStatus === 'all') && (
                  <motion.button
                    onClick={() => router.push('/booking')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                    Book Your First Appointment
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredAppointments.map((appointment, index) => {
                  const treatmentInfo = treatmentIcons[appointment.type as keyof typeof treatmentIcons] || treatmentIcons.VIDEO_CALL
                  const TreatmentIcon = treatmentInfo.icon
                  const isPast = isPastAppointment(appointment.date, appointment.time)

                  return (
                    <motion.div
                      key={appointment.id}
                      variants={itemVariants}
                      className={`bg-white/10 backdrop-blur-lg p-6 lg:p-8 rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 ${isPast ? 'opacity-75' : ''}`}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-14 h-14 bg-gradient-to-r ${treatmentInfo.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${isPast ? 'opacity-60' : ''}`}>
                              <TreatmentIcon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-xl font-bold text-white ${isPast ? 'line-through opacity-70' : ''}`}>
                                  {treatmentInfo.label}
                                </h3>
                                <span className={`text-sm font-medium ${getStatusColor(appointment.date, appointment.time)}`}>
                                  {getStatusLabel(appointment.date, appointment.time)}
                                </span>
                              </div>

                              <div className={`flex items-center gap-4 text-blue-100 mb-3 ${isPast ? 'line-through opacity-60' : ''}`}>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-medium">
                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-medium">{appointment.time}</span>
                                </div>
                              </div>

                              <div className={`flex items-center gap-3 text-blue-100 ${isPast ? 'line-through opacity-60' : ''}`}>
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Stethoscope className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-bold text-white">{appointment.doctor.name}</p>
                                  <p className="text-sm text-blue-200">{appointment.doctor.specialty}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 flex-shrink-0">
                          {!isPast && appointment.payment?.status !== 'SUCCESSFUL' && (
                            <motion.button
                              onClick={() => router.push(`/dashboard/user/appointments/edit/${appointment.id}`)}
                              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-amber-100 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-amber-400/30"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>
                          )}

                          <motion.button
                            onClick={() => openCancelModal(appointment)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-red-100 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-red-400/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            onClick={() => router.push(`/dashboard/user/telemedicine/${appointment.id}`)}
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-blue-100 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-blue-400/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Eye className="w-4 h-4" />
                            {/* <span className="hidden sm:inline">Details</span> */}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && selectedAppointment && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Cancel Appointment</h3>
                
                <div className="bg-white/10 rounded-2xl p-4 mb-6 text-left">
                  <p className="text-blue-100 mb-2">
                    <strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-blue-100 mb-2">
                    <strong>Time:</strong> {selectedAppointment.time}
                  </p>
                  <p className="text-blue-100">
                    <strong>Doctor:</strong> Dr. {selectedAppointment.doctor.name}
                  </p>
                </div>
                
                <p className="text-blue-100 mb-8">
                  Are you sure you want to cancel this appointment? This action cannot be undone.
                </p>
                
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Keep Appointment
                  </motion.button>
                  
                  <motion.button
                    onClick={handleCancel}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes, Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background:rgb(235, 237, 241);
        }
      `}</style>
    </div>
  )
}