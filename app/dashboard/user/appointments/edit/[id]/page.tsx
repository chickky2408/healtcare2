

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter, useParams } from 'next/navigation'

// const treatmentOptions = ['VIDEO_CALL', 'CLEANING', 'ORTHODONTIC', 'AI_DIAGNOSIS']

// export default function EditAppointmentPage() {
//   const router = useRouter()
//   const params = useParams()
//   const id = params.id as string

//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [type, setType] = useState('')
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         interface Appointment {
//           id: string;
//           date: string;
//           time: string;
//           type: string;
//         }

//         const appointment = data.appointments?.find((a: Appointment) => a.id === id)
//         if (!appointment) return router.push('/dashboard/user/appointments')
//         setDate(appointment.date?.split('T')[0])
//         setTime(appointment.time)
//         setType(appointment.type)
//         setLoading(false)
//       })
//   }, [id, router])

//   const handleUpdate = async () => {
//     const res = await fetch('/api/appointments/update', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, date, time, type }),
//     })

//     if (res.ok) {
//       alert('Appointment updated!')
//       router.push('/dashboard/user/appointments')
//     } else {
//       alert('Failed to update')
//     }
//   }

//   if (loading) return <p className="p-6">Loading...</p>

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-yellow-50">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <h1 className="text-xl font-bold mb-4 text-yellow-700">Edit Appointment</h1>

//         <div className="space-y-4">
//           <label className="block">
//             <span>Date:</span>
//             <input
//               type="date"
//               className="w-full border rounded px-3 py-2"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </label>

//           <label className="block">
//             <span>Time:</span>
//             <input
//               type="time"
//               className="w-full border rounded px-3 py-2"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//             />
//           </label>

//           <label className="block">
//             <span>Treatment Type:</span>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//             >
//               {treatmentOptions.map(opt => (
//                 <option key={opt} value={opt}>{opt}</option>
//               ))}
//             </select>
//           </label>

//           <button
//             onClick={handleUpdate}
//             className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }







// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

// type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   symptoms: string
//   doctorId: string
// }

// export default function EditAppointmentPage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [type, setType] = useState('')
//   const [symptoms, setSymptoms] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])

//   const todayDate = new Date().toISOString().split('T')[0]

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       const res = await fetch(`/api/appointments/${id}`)
//       const data = await res.json()
//       setAppointment(data.appointment)
//       setDate(data.appointment.date)
//       setTime(data.appointment.time)
//       setType(data.appointment.type)
//       setSymptoms(data.appointment.symptoms)
//     }

//     fetchAppointment()
//   }, [id])

//   useEffect(() => {
//     const fetchAvailable = async () => {
//       if (appointment?.doctorId && date) {
//         const res = await fetch('/api/appointments/available', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ doctorId: appointment.doctorId, date })
//         })
//         const data = await res.json()
//         setAvailableTimes(data.availableTimes || [])
//       }
//     }

//     fetchAvailable()
//   }, [appointment?.doctorId, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const res = await fetch('/api/appointments/update', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, date, time, type, symptoms })
//     })

//     if (res.ok) {
//       router.push('/dashboard/user?updated=true')
//     } else {
//       alert('❌ Failed to update appointment')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-yellow-50 flex justify-center items-center p-6">
//       <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">Edit Appointment</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label>Date:</label>
//             <input
//               type="date"
//               value={date}
//               min={todayDate}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label>Time:</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//               required
//             >
//               <option value="">-- Select Time --</option>
//               {generateTimeSlots().map((t) => {
//                 const isBooked = availableTimes.includes(t) === false
//                 const isPast = date === todayDate && isPastDateTime(date, t)
//                 return (
//                   <option key={t} value={t} disabled={isBooked || isPast}>
//                     {t}
//                   </option>
//                 )
//               })}
//             </select>
//           </div>

//           <div>
//             <label>Treatment Type:</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//               required
//             >
//               <option value="">-- Select Treatment --</option>
//               <option value="VIDEO_CALL">VIDEO_CALL</option>
//               <option value="CLEANING">CLEANING</option>
//               <option value="ORTHODONTIC">ORTHODONTIC</option>
//               <option value="AI_DIAGNOSIS">AI_DIAGNOSIS</option>
//             </select>
//           </div>

//           <div>
//             <label>Symptoms:</label>
//             <textarea
//               className="w-full border px-3 py-2 rounded resize-none"
//               rows={3}
//               value={symptoms}
//               onChange={(e) => setSymptoms(e.target.value)}
//               placeholder="Describe any symptoms..."
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-yellow-600 text-white font-semibold py-2 rounded hover:bg-yellow-700 transition"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }





//original


// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useParams } from 'next/navigation'
// import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

// export default function EditAppointmentPage() {
//   const { id } = useParams()
//   const router = useRouter()

//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [type, setType] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])
//   const [doctorId, setDoctorId] = useState('')
//   const [message, setMessage] = useState('')

//   const todayDate = new Date().toISOString().split('T')[0]

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const res = await fetch(`/api/appointments/${id}`)
//       const data = await res.json()
//       if (res.ok) {
//         setDate(data.date)
//         setTime(data.time)
//         setType(data.type)
//         setDoctorId(data.doctorId)
//       } else {
//         setMessage('❌ Failed to load appointment')
//       }
//     }
//     fetchDetails()
//   }, [id])

//   useEffect(() => {
//     const fetchAvailableTimes = async () => {
//       if (doctorId && date) {
//         const res = await fetch('/api/appointments/available', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ doctorId, date }),
//         })
//         const data = await res.json()
//         setAvailableTimes(data.availableTimes || [])
//       }
//     }
//     fetchAvailableTimes()
//   }, [doctorId, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const res = await fetch('/api/appointments/update', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, date, time, type }),
//     })
//     const result = await res.json()
//     if (res.ok) router.push('/dashboard/user?edit=success')
//     else setMessage(result.message || '❌ Update failed.')
//   }

//   return (
//     <div className="min-h-screen bg-yellow-50 p-6 flex justify-center items-center">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Edit Appointment</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Date:</label>
//             <input
//               type="date"
//               value={date}
//               min={todayDate}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Time:</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="">-- Select Time --</option>
//               {generateTimeSlots().map((t) => {
//                 const isCurrentTime = t === time // เวลาเดิมที่ user เคยจองไว้
//                 const isBooked = availableTimes.includes(t) === false && !isCurrentTime
//                 const isPast = date === todayDate && isPastDateTime(date, t) && !isCurrentTime
//                 return (
//                   <option key={t} value={t} disabled={isBooked || isPast}>
//                     {t}
//                   </option>
//                 )
//               })}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Treatment Type:</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="">-- Select Treatment --</option>
//               <option value="VIDEO_CALL">Video Call</option>
//               <option value="CLEANING">Cleaning</option>
//               <option value="ORTHODONTIC">Orthodontic</option>
//               <option value="AI_DIAGNOSIS">AI Diagnosis</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
//           >
//             Save Changes
//           </button>

//           {message && <p className="text-center text-red-500 mt-3">{message}</p>}
//         </form>
//       </div>
//     </div>
//   )
// }




//new theme

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useParams } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { 
//   Calendar,
//   Clock,
//   Edit3,
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
//   Save,
//   Heart,
//   Shield,
//   Star,
//   Video,
//   Sparkles,
//   UserCheck,
//   Stethoscope
// } from 'lucide-react'
// import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

// export default function EditAppointmentPage() {
//   const { id } = useParams()
//   const router = useRouter()

//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [type, setType] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])
//   const [doctorId, setDoctorId] = useState('')
//   const [doctorName, setDoctorName] = useState('')
//   const [doctorSpecialty, setDoctorSpecialty] = useState('')
//   const [originalTime, setOriginalTime] = useState('')
//   const [message, setMessage] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [initialLoading, setInitialLoading] = useState(true)

//   const todayDate = new Date().toISOString().split('T')[0]

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await fetch(`/api/appointments/${id}`)
//         const data = await res.json()
//         if (res.ok) {
//           setDate(data.date)
//           setTime(data.time)
//           setOriginalTime(data.time)
//           setType(data.type)
//           setDoctorId(data.doctorId)
//           setDoctorName(data.doctor?.name || '')
//           setDoctorSpecialty(data.doctor?.specialty || '')
//         } else {
//           setMessage('Failed to load appointment details')
//         }
//       } catch (error) {
//         setMessage('Error loading appointment')
//       } finally {
//         setInitialLoading(false)
//       }
//     }
//     fetchDetails()
//   }, [id])

//   useEffect(() => {
//     const fetchAvailableTimes = async () => {
//       if (doctorId && date) {
//         try {
//           const res = await fetch('/api/appointments/available', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ doctorId, date }),
//           })
//           const data = await res.json()
//           setAvailableTimes(data.availableTimes || [])
//         } catch (error) {
//           console.error('Failed to fetch available times:', error)
//         }
//       }
//     }
//     fetchAvailableTimes()
//   }, [doctorId, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!date || !time || !type) {
//       setMessage('Please fill in all required fields')
//       return
//     }

//     setLoading(true)
//     setMessage('')

//     try {
//       const res = await fetch('/api/appointments/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id, date, time, type }),
//       })
      
//       const result = await res.json()
      
//       if (res.ok) {
//         setMessage('Appointment updated successfully! Redirecting...')
//         setTimeout(() => router.push('/dashboard/user?edit=success'), 2000)
//       } else {
//         setMessage(result.message || 'Update failed. Please try again.')
//       }
//     } catch (error) {
//       setMessage('Server error. Please try again later.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const treatmentOptions = [
//     { value: 'VIDEO_CALL', label: 'Video Consultation', icon: Video, color: 'from-green-500 to-emerald-500' },
//     { value: 'CLEANING', label: 'Dental Cleaning', icon: Sparkles, color: 'from-blue-500 to-cyan-500' },
//     { value: 'ORTHODONTIC', label: 'Orthodontic Care', icon: UserCheck, color: 'from-purple-500 to-pink-500' },
//     { value: 'AI_DIAGNOSIS', label: 'AI Diagnosis', icon: Heart, color: 'from-orange-500 to-red-500' }
//   ]

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

//   const selectedTreatment = treatmentOptions.find(t => t.value === type)

//   if (initialLoading) {
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
//           <p className="text-xl font-semibold">Loading appointment details...</p>
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
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-3xl">
          
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

//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl mb-6 shadow-lg">
//               <Edit3 className="w-10 h-10 text-white" />
//             </div>
            
//             <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
//               Edit Appointment
//             </h1>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Modify your appointment details
//             </p>
//           </motion.div>

//           {/* Current Appointment Info */}
//           {doctorName && (
//             <motion.div
//               className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-lg mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
//                   <Stethoscope className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-white font-bold text-lg">Current Appointment</h3>
//                   <p className="text-blue-200">Dr. {doctorName} - {doctorSpecialty}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Edit Form */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="relative"
//           >
//             {/* Glassmorphism Card */}
//             <motion.div
//               className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 shadow-2xl"
//               variants={itemVariants}
//             >
//               {/* Gradient Border Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 rounded-3xl blur opacity-20 -z-10"></div>
              
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Date and Time Selection */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {/* Date */}
//                   <motion.div variants={itemVariants} className="space-y-3">
//                     <label className="flex items-center gap-3 text-white font-bold text-lg">
//                       <Calendar className="w-5 h-5 text-blue-300" />
//                       Select New Date
//                     </label>
//                     <input
//                       type="date"
//                       value={date}
//                       min={todayDate}
//                       onChange={(e) => setDate(e.target.value)}
//                       className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                       required
//                     />
//                   </motion.div>

//                   {/* Time */}
//                   <motion.div variants={itemVariants} className="space-y-3">
//                     <label className="flex items-center gap-3 text-white font-bold text-lg">
//                       <Clock className="w-5 h-5 text-blue-300" />
//                       Select New Time
//                     </label>
//                     <select
//                       value={time}
//                       onChange={(e) => setTime(e.target.value)}
//                       className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                       required
//                     >
//                       <option value="" className="bg-gray-800 text-white">-- Select Time --</option>
//                       {generateTimeSlots().map((t) => {
//                         const isCurrentTime = t === originalTime
//                         const isBooked = !availableTimes.includes(t) && !isCurrentTime
//                         const isPast = date === todayDate && isPastDateTime(date, t) && !isCurrentTime
//                         const isDisabled = isBooked || isPast
//                         return (
//                           <option 
//                             key={t} 
//                             value={t} 
//                             disabled={isDisabled}
//                             className={`bg-gray-800 ${isDisabled ? 'text-gray-500' : 'text-white'}`}
//                           >
//                             {t} {isCurrentTime ? '(Current)' : isBooked ? '(Booked)' : isPast ? '(Past)' : ''}
//                           </option>
//                         )
//                       })}
//                     </select>
//                   </motion.div>
//                 </div>

//                 {/* Treatment Selection */}
//                 <motion.div variants={itemVariants} className="space-y-4">
//                   <label className="flex items-center gap-3 text-white font-bold text-lg">
//                     <Heart className="w-5 h-5 text-blue-300" />
//                     Treatment Type
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {treatmentOptions.map((treatment) => (
//                       <motion.button
//                         key={treatment.value}
//                         type="button"
//                         onClick={() => setType(treatment.value)}
//                         className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
//                           type === treatment.value
//                             ? 'border-amber-400 bg-amber-400/20 shadow-lg'
//                             : 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40'
//                         }`}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <div className={`w-12 h-12 bg-gradient-to-r ${treatment.color} rounded-xl flex items-center justify-center shadow-lg`}>
//                           <treatment.icon className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="text-left">
//                           <h3 className="font-bold text-white">{treatment.label}</h3>
//                           <p className="text-sm text-blue-200">Professional care</p>
//                         </div>
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>

//                 {/* Changes Summary */}
//                 {(date || time || type) && (
//                   <motion.div
//                     variants={itemVariants}
//                     className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4"
//                   >
//                     <h3 className="text-white font-bold text-lg flex items-center gap-2">
//                       <Edit3 className="w-5 h-5 text-amber-400" />
//                       Updated Details
//                     </h3>
//                     <div className="space-y-2 text-blue-100">
//                       {doctorName && (
//                         <p><strong>Doctor:</strong> Dr. {doctorName} ({doctorSpecialty})</p>
//                       )}
//                       {selectedTreatment && (
//                         <p><strong>Treatment:</strong> {selectedTreatment.label}</p>
//                       )}
//                       {date && (
//                         <p><strong>New Date:</strong> {new Date(date).toLocaleDateString('en-US', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}</p>
//                       )}
//                       {time && (
//                         <p><strong>New Time:</strong> {time}</p>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Submit Button */}
//                 <motion.button
//                   variants={itemVariants}
//                   type="submit"
//                   disabled={loading}
//                   className="w-full relative group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <span className="relative z-10">
//                     {loading ? (
//                       <div className="flex items-center justify-center gap-3">
//                         <motion.div
//                           className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         />
//                         Saving Changes...
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center gap-3">
//                         <Save className="w-6 h-6" />
//                         Save Changes
//                       </div>
//                     )}
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </motion.button>
//               </form>

//               {/* Message Display */}
//               {message && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`mt-8 p-4 rounded-2xl border flex items-center gap-3 ${
//                     message.includes('successful') 
//                       ? 'bg-green-500/20 border-green-400/50 text-green-200' 
//                       : 'bg-red-500/20 border-red-400/50 text-red-200'
//                   }`}
//                 >
//                   {message.includes('successful') ? (
//                     <CheckCircle className="w-5 h-5" />
//                   ) : (
//                     <AlertCircle className="w-5 h-5" />
//                   )}
//                   <p className="font-medium">{message}</p>
//                 </motion.div>
//               )}
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Global Styles */}
//       <style jsx global>{`
//         /* Custom input autofill styles */
//         input:-webkit-autofill,
//         input:-webkit-autofill:hover,
//         input:-webkit-autofill:focus,
//         select:-webkit-autofill,
//         select:-webkit-autofill:hover,
//         select:-webkit-autofill:focus {
//           -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset !important;
//           -webkit-text-fill-color: white !important;
//           transition: background-color 5000s ease-in-out 0s;
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
//         ::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//         }
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #f59e0b, #ea580c);
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #d97706, #c2410c);
//         }
//       `}</style>
//     </div>
//   )
// }





// blue

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Clock,
  Edit3,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Save,
  Heart,
  Shield,
  Star,
  Video,
  Sparkles,
  UserCheck,
  Stethoscope
} from 'lucide-react'
import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

export default function EditAppointmentPage() {
  const { id } = useParams()
  const router = useRouter()

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [type, setType] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [doctorId, setDoctorId] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [doctorSpecialty, setDoctorSpecialty] = useState('')
  const [originalTime, setOriginalTime] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const todayDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/appointments/${id}`)
        const data = await res.json()
        if (res.ok) {
          setDate(data.date)
          setTime(data.time)
          setOriginalTime(data.time)
          setType(data.type)
          setDoctorId(data.doctorId)
          setDoctorName(data.doctor?.name || '')
          setDoctorSpecialty(data.doctor?.specialty || '')
        } else {
          setMessage('Failed to load appointment details')
        }
      } catch (error) {
        setMessage('Error loading appointment')
      } finally {
        setInitialLoading(false)
      }
    }
    fetchDetails()
  }, [id])

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (doctorId && date) {
        try {
          const res = await fetch('/api/appointments/available', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId, date }),
          })
          const data = await res.json()
          setAvailableTimes(data.availableTimes || [])
        } catch (error) {
          console.error('Failed to fetch available times:', error)
        }
      }
    }
    fetchAvailableTimes()
  }, [doctorId, date])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !type) {
      setMessage('Please fill in all required fields')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/appointments/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, date, time, type }),
      })
      
      const result = await res.json()
      
      if (res.ok) {
        setMessage('Appointment updated successfully! Redirecting...')
        setTimeout(() => router.push('/dashboard/user?edit=success'), 2000)
      } else {
        setMessage(result.message || 'Update failed. Please try again.')
      }
    } catch (error) {
      setMessage('Server error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const treatmentOptions = [
    { value: 'VIDEO_CALL', label: 'Video Consultation', icon: Video, color: 'from-green-500 to-emerald-500' },
    { value: 'CLEANING', label: 'Dental Cleaning', icon: Sparkles, color: 'from-blue-500 to-cyan-500' },
    { value: 'ORTHODONTIC', label: 'Orthodontic Care', icon: UserCheck, color: 'from-indigo-500 to-blue-500' },
    { value: 'AI_DIAGNOSIS', label: 'AI Diagnosis', icon: Heart, color: 'from-orange-500 to-red-500' }
  ]

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

  const selectedTreatment = treatmentOptions.find(t => t.value === type)

  if (initialLoading) {
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
          <p className="text-xl font-semibold">Loading appointment details...</p>
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
        <motion.div
          className="absolute top-3/4 right-1/4 text-white/10 text-6xl"
          animate={{ 
            x: [0, 25, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-12 h-12" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          
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

            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-3xl mb-6 shadow-lg">
              <Edit3 className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Edit Appointment
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Modify your appointment details
            </p>
          </motion.div>

          {/* Current Appointment Info */}
          {doctorName && (
            <motion.div
              className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Current Appointment</h3>
                  <p className="text-blue-200">{doctorName} - {doctorSpecialty}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Edit Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 shadow-2xl"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-3xl blur opacity-20 -z-10"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="flex items-center gap-3 text-white font-bold text-lg">
                      <Calendar className="w-5 h-5 text-blue-300" />
                      Select New Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={todayDate}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="flex items-center gap-3 text-white font-bold text-lg">
                      <Clock className="w-5 h-5 text-blue-300" />
                      Select New Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                      required
                    >
                      <option value="" className="bg-gray-800 text-white">-- Select Time --</option>
                      {generateTimeSlots().map((t) => {
                        const isCurrentTime = t === originalTime
                        const isBooked = !availableTimes.includes(t) && !isCurrentTime
                        const isPast = date === todayDate && isPastDateTime(date, t) && !isCurrentTime
                        const isDisabled = isBooked || isPast
                        return (
                          <option 
                            key={t} 
                            value={t} 
                            disabled={isDisabled}
                            className={`bg-gray-800 ${isDisabled ? 'text-gray-500' : 'text-white'}`}
                          >
                            {t} {isCurrentTime ? '(Current)' : isBooked ? '(Booked)' : isPast ? '(Past)' : ''}
                          </option>
                        )
                      })}
                    </select>
                  </motion.div>
                </div>

                {/* Treatment Selection */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <label className="flex items-center gap-3 text-white font-bold text-lg">
                    <Heart className="w-5 h-5 text-blue-300" />
                    Treatment Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {treatmentOptions.map((treatment) => (
                      <motion.button
                        key={treatment.value}
                        type="button"
                        onClick={() => setType(treatment.value)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                          type === treatment.value
                            ? 'border-amber-400 bg-amber-400/20 shadow-lg'
                            : 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${treatment.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <treatment.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-white">{treatment.label}</h3>
                          <p className="text-sm text-blue-200">Professional care</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Changes Summary */}
                {(date || time || type) && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4"
                  >
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-amber-400" />
                      Updated Details
                    </h3>
                    <div className="space-y-2 text-blue-100">
                      {doctorName && (
                        <p><strong>Doctor:</strong> {doctorName} ({doctorSpecialty})</p>
                      )}
                      {selectedTreatment && (
                        <p><strong>Treatment:</strong> {selectedTreatment.label}</p>
                      )}
                      {date && (
                        <p><strong>New Date:</strong> {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      )}
                      {time && (
                        <p><strong>New Time:</strong> {time}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={loading}
                  className="w-full relative group bg-amber-500 hover:bg-amber-600 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Saving Changes...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Save className="w-6 h-6" />
                        Save Changes
                      </div>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </form>

              {/* Message Display */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-8 p-4 rounded-2xl border flex items-center gap-3 ${
                    message.includes('successful') 
                      ? 'bg-green-500/20 border-green-400/50 text-green-200' 
                      : 'bg-red-500/20 border-red-400/50 text-red-200'
                  }`}
                >
                  {message.includes('successful') ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <p className="font-medium">{message}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </div>
  )
}