
// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'


// export default function BookingPage() {
//   type Doctor = {
//     id: string
//     name: string
//     specialty: string
//   }

//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState('')
// //   const [selectedType, setSelectedType] = useState('')
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])
//   const [message, setMessage] = useState('')
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null)
//   const [symptoms, setSymptoms] = useState('')
//   const [type, setType] = useState('')
//   // Removed unused type and setType state variables
  

//   const router = useRouter()

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const res = await fetch('/api/doctors')
//       const data = await res.json()
//       setDoctors(data.doctors)
//     }
//     fetchDoctors()

//     const stored = localStorage.getItem('user')
//     if (stored) setUser(JSON.parse(stored))
//   }, [])

//   useEffect(() => {
//     const fetchAvailableTimes = async () => {
//       if (selectedDoctor && date) {
//         const res = await fetch('/api/appointments/available', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ doctorId: selectedDoctor, date })
//         })
//         const data = await res.json()
//         setAvailableTimes(data.availableTimes || [])
//       }
//     }
//     fetchAvailableTimes()
//   }, [selectedDoctor, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!selectedDoctor || !date || !time || !user || !type) {
//       return setMessage('❗ Please complete all fields')
//     }
//     const res = await fetch('/api/appointments/book', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         doctorId: selectedDoctor,
//         date,
//         time,
//         patientName: user.name,
//         patientEmail: user.email,
//         type,
//         symptoms,
//       })
//     })
//     const result = await res.json()
//     if (res.ok) router.push('/dashboard/user?success=true')
//     else setMessage(result.message || '❌ Booking failed.')
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-start md:items-center">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl animate-fade-in">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">📅 Book an Appointment</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Doctor</label>
//             <select
//               value={selectedDoctor}
//               onChange={(e) => setSelectedDoctor(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">-- Select --</option>
//               {doctors.map((d) => (
//                 <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Select Treatment</label>
//             <select
//                 className="w-full border px-3 py-2 rounded"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//             >
//                 <option value="">-- Select Treatment --</option>
//                 <option value="VIDEO_CALL">Video Call</option>
//                 <option value="CLEANING">Cleaning</option>
//                 <option value="ORTHODONTIC">Orthodontic</option>
//                 <option value="AI_DIAGNOSIS">AI Diagnosis</option>
//             </select>
//         </div>

//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Time</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">-- Select Time --</option>
//               {availableTimes.map((t, idx) => (
//                 <option key={idx} value={t}>{t}</option>
//               ))}
//             </select>
//           </div>


//           <div>
//             <label className="block mb-1 font-medium">Symptoms / Concerns</label>
//             <textarea
//                 className="w-full border px-3 py-2 rounded resize-none"
//                 rows={3}
//                 placeholder="Describe your symptoms or concerns..."
//                 value={symptoms}
//                 onChange={(e) => setSymptoms(e.target.value)}
//             />
//           </div>


//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
//           >
//             Confirm Booking
//           </button>
//         </form>
//         {message && <p className="text-center mt-4 text-red-500 font-medium">{message}</p>}

//         <div className="text-center mt-6">
//           <a href="/dashboard/user" className="text-sm text-blue-500 hover:underline">← Back to Dashboard</a>
//         </div>
//       </div>
//     </div>
//   )
// }










//original

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

// type Doctor = {
//   id: string
//   name: string
//   specialty: string
// }

// export default function BookingPage() {
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState('')
//   const [type, setType] = useState('')
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])
//   const [message, setMessage] = useState('')
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null)
//   const [symptoms, setSymptoms] = useState('')
//   const router = useRouter()

//   const todayDate = new Date().toISOString().split('T')[0]

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const res = await fetch('/api/doctors')
//       const data = await res.json()
//       setDoctors(data.doctors)
//     }
//     fetchDoctors()

//     const stored = localStorage.getItem('user')
//     if (stored) setUser(JSON.parse(stored))
//   }, [])

//   useEffect(() => {
//     const fetchAvailableTimes = async () => {
//       if (selectedDoctor && date) {
//         const res = await fetch('/api/appointments/available', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ doctorId: selectedDoctor, date })
//         })
//         const data = await res.json()
//         setAvailableTimes(data.availableTimes || [])
//       }
//     }
//     fetchAvailableTimes()
//   }, [selectedDoctor, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!selectedDoctor || !date || !time || !user || !type) {
//       return setMessage('❗ Please complete all fields')
//     }

//     const res = await fetch('/api/appointments/book', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         doctorId: selectedDoctor,
//         date,
//         time,
//         patientName: user.name,
//         patientEmail: user.email,
//         type,
//         symptoms,
//       })
//     })
//     const result = await res.json()
//     if (res.ok) router.push('/dashboard/user?success=true')
//     else setMessage(result.message || '❌ Booking failed.')
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-start md:items-center">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl animate-fade-in">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">📅 Book an Appointment</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Doctor */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Doctor</label>
//             <select
//               value={selectedDoctor}
//               onChange={(e) => setSelectedDoctor(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//             >
//               <option value="">-- Select --</option>
//               {doctors.map((d) => (
//                 <option key={d.id} value={d.id}>
//                   {d.name} ({d.specialty})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Treatment */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Treatment</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//             >
//               <option value="">-- Select Treatment --</option>
//               <option value="VIDEO_CALL">Video Call</option>
//               <option value="CLEANING">Cleaning</option>
//               <option value="ORTHODONTIC">Orthodontic</option>
//               <option value="AI_DIAGNOSIS">AI Diagnosis</option>
//             </select>
//           </div>

//           {/* Date */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Date</label>
//             <input
//               type="date"
//               value={date}
//               min={todayDate}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//             />
//           </div>

//           {/* Time */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Time</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//             >
//               <option value="">-- Select Time --</option>
//               {generateTimeSlots().map((t) => {
//                 const isBooked = !availableTimes.includes(t)
//                 const isPast = date === todayDate && isPastDateTime(date, t)
//                 return (
//                   <option key={t} value={t} disabled={isBooked || isPast}>
//                     {t}
//                   </option>
//                 )
//               })}
//             </select>
//           </div>

//           {/* Symptoms */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Symptoms / Concerns</label>
//             <textarea
//               value={symptoms}
//               onChange={(e) => setSymptoms(e.target.value)}
//               className="w-full border px-4 py-2 rounded resize-none"
//               rows={3}
//               placeholder="Describe your symptoms or concerns..."
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
//           >
//             Confirm Booking
//           </button>
//         </form>

//         {message && (
//           <p className="text-center mt-4 text-red-500 font-medium">{message}</p>
//         )}

//         <div className="text-center mt-6">
//           <a href="/dashboard/user" className="text-sm text-blue-500 hover:underline">← Back to Dashboard</a>
//         </div>
//       </div>
//     </div>
//   )
// }




// new template

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { 
//   Calendar,
//   Clock,
//   User,
//   Stethoscope,
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
//   Heart,
//   Shield,
//   Star,
//   Video,
//   Sparkles,
//   UserCheck,
//   MessageSquare
// } from 'lucide-react'
// import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

// type Doctor = {
//   id: string
//   name: string
//   specialty: string
// }

// export default function BookingPage() {
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState('')
//   const [type, setType] = useState('')
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])
//   const [message, setMessage] = useState('')
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null)
//   const [symptoms, setSymptoms] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [currentStep, setCurrentStep] = useState(1)
//   const router = useRouter()

//   const todayDate = new Date().toISOString().split('T')[0]

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch('/api/doctors')
//         const data = await res.json()
//         setDoctors(data.doctors)
//       } catch (error) {
//         console.error('Failed to fetch doctors:', error)
//       }
//     }
//     fetchDoctors()

//     const stored = localStorage.getItem('user')
//     if (stored) setUser(JSON.parse(stored))
//   }, [])

//   useEffect(() => {
//     const fetchAvailableTimes = async () => {
//       if (selectedDoctor && date) {
//         try {
//           const res = await fetch('/api/appointments/available', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ doctorId: selectedDoctor, date })
//           })
//           const data = await res.json()
//           setAvailableTimes(data.availableTimes || [])
//         } catch (error) {
//           console.error('Failed to fetch available times:', error)
//         }
//       }
//     }
//     fetchAvailableTimes()
//   }, [selectedDoctor, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!selectedDoctor || !date || !time || !user || !type) {
//       return setMessage('Please complete all required fields')
//     }

//     setLoading(true)
//     setMessage('')

//     try {
//       const res = await fetch('/api/appointments/book', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           doctorId: selectedDoctor,
//           date,
//           time,
//           patientName: user.name,
//           patientEmail: user.email,
//           type,
//           symptoms,
//         })
//       })
      
//       const result = await res.json()
      
//       if (res.ok) {
//         setMessage('Appointment booked successfully! Redirecting...')
//         setTimeout(() => router.push('/dashboard/user?success=true'), 2000)
//       } else {
//         setMessage(result.message || 'Booking failed. Please try again.')
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
//   const selectedDoctorData = doctors.find(d => d.id === selectedDoctor)

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
//         <div className="w-full max-w-4xl">
          
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

//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-6 shadow-lg">
//               <Calendar className="w-10 h-10 text-white" />
//             </div>
            
//             <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
//               Book Your Appointment
//             </h1>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Schedule your consultation with our expert healthcare professionals
//             </p>
//           </motion.div>

//           {/* Booking Form */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="relative"
//           >
//             {/* Glassmorphism Card */}
//             <motion.div
//               className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-3xl mx-auto"
//               variants={itemVariants}
//             >
//               {/* Gradient Border Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-3xl blur opacity-20 -z-10"></div>
              
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Doctor Selection */}
//                 <motion.div variants={itemVariants} className="space-y-3">
//                   <label className="flex items-center gap-3 text-white font-bold text-lg">
//                     <Stethoscope className="w-5 h-5 text-blue-300" />
//                     Select Doctor
//                   </label>
//                   <select
//                     value={selectedDoctor}
//                     onChange={(e) => setSelectedDoctor(e.target.value)}
//                     className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                     required
//                   >
//                     <option value="" className="bg-gray-800 text-white">-- Select Doctor --</option>
//                     {doctors.map((doctor) => (
//                       <option key={doctor.id} value={doctor.id} className="bg-gray-800 text-white">
//                         Dr. {doctor.name} - {doctor.specialty}
//                       </option>
//                     ))}
//                   </select>
//                 </motion.div>

//                 {/* Treatment Selection */}
//                 <motion.div variants={itemVariants} className="space-y-4">
//                   <label className="flex items-center gap-3 text-white font-bold text-lg">
//                     <Heart className="w-5 h-5 text-blue-300" />
//                     Select Treatment
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {treatmentOptions.map((treatment) => (
//                       <motion.button
//                         key={treatment.value}
//                         type="button"
//                         onClick={() => setType(treatment.value)}
//                         className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
//                           type === treatment.value
//                             ? 'border-blue-400 bg-blue-400/20 shadow-lg'
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

//                 {/* Date and Time Selection */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {/* Date */}
//                   <motion.div variants={itemVariants} className="space-y-3">
//                     <label className="flex items-center gap-3 text-white font-bold text-lg">
//                       <Calendar className="w-5 h-5 text-blue-300" />
//                       Select Date
//                     </label>
//                     <input
//                       type="date"
//                       value={date}
//                       min={todayDate}
//                       onChange={(e) => setDate(e.target.value)}
//                       className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                       required
//                     />
//                   </motion.div>

//                   {/* Time */}
//                   <motion.div variants={itemVariants} className="space-y-3">
//                     <label className="flex items-center gap-3 text-white font-bold text-lg">
//                       <Clock className="w-5 h-5 text-blue-300" />
//                       Select Time
//                     </label>
//                     <select
//                       value={time}
//                       onChange={(e) => setTime(e.target.value)}
//                       className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                       required
//                     >
//                       <option value="" className="bg-gray-800 text-white">-- Select Time --</option>
//                       {generateTimeSlots().map((t) => {
//                         const isBooked = !availableTimes.includes(t)
//                         const isPast = date === todayDate && isPastDateTime(date, t)
//                         const isDisabled = isBooked || isPast
//                         return (
//                           <option 
//                             key={t} 
//                             value={t} 
//                             disabled={isDisabled}
//                             className={`bg-gray-800 ${isDisabled ? 'text-gray-500' : 'text-white'}`}
//                           >
//                             {t} {isBooked ? '(Booked)' : isPast ? '(Past)' : ''}
//                           </option>
//                         )
//                       })}
//                     </select>
//                   </motion.div>
//                 </div>

//                 {/* Symptoms */}
//                 <motion.div variants={itemVariants} className="space-y-3">
//                   <label className="flex items-center gap-3 text-white font-bold text-lg">
//                     <MessageSquare className="w-5 h-5 text-blue-300" />
//                     Symptoms / Concerns
//                     <span className="text-sm text-blue-200 font-normal">(Optional)</span>
//                   </label>
//                   <textarea
//                     value={symptoms}
//                     onChange={(e) => setSymptoms(e.target.value)}
//                     className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 resize-none"
//                     rows={4}
//                     placeholder="Please describe your symptoms, concerns, or reason for the appointment..."
//                   />
//                 </motion.div>

//                 {/* Booking Summary */}
//                 {(selectedDoctor || type || date || time) && (
//                   <motion.div
//                     variants={itemVariants}
//                     className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4"
//                   >
//                     <h3 className="text-white font-bold text-lg flex items-center gap-2">
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                       Booking Summary
//                     </h3>
//                     <div className="space-y-2 text-blue-100">
//                       {selectedDoctorData && (
//                         <p><strong>Doctor:</strong> Dr. {selectedDoctorData.name} ({selectedDoctorData.specialty})</p>
//                       )}
//                       {selectedTreatment && (
//                         <p><strong>Treatment:</strong> {selectedTreatment.label}</p>
//                       )}
//                       {date && (
//                         <p><strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}</p>
//                       )}
//                       {time && (
//                         <p><strong>Time:</strong> {time}</p>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Submit Button */}
//                 <motion.button
//                   variants={itemVariants}
//                   type="submit"
//                   disabled={loading}
//                   className="w-full relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
//                         Booking Appointment...
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center gap-3">
//                         <CheckCircle className="w-6 h-6" />
//                         Confirm Booking
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





// blue

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { 
//   Calendar,
//   Clock,
//   User,
//   Stethoscope,
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
//   Heart,
//   Shield,
//   Star,
//   Video,
//   Sparkles,
//   UserCheck,
//   MessageSquare
// } from 'lucide-react'
// import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

// type Doctor = {
//   id: string
//   name: string
//   specialty: string
// }

// export default function BookingPage() {
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState('')
//   const [type, setType] = useState('')
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])
//   const [message, setMessage] = useState('')
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null)
//   const [symptoms, setSymptoms] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [currentStep, setCurrentStep] = useState(1)
//   const router = useRouter()

//   const todayDate = new Date().toISOString().split('T')[0]

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch('/api/doctors')
//         const data = await res.json()
//         setDoctors(data.doctors)
//       } catch (error) {
//         console.error('Failed to fetch doctors:', error)
//       }
//     }
//     fetchDoctors()

//     const stored = localStorage.getItem('user')
//     if (stored) setUser(JSON.parse(stored))
//   }, [])

//   useEffect(() => {
//     const fetchAvailableTimes = async () => {
//       if (selectedDoctor && date) {
//         try {
//           const res = await fetch('/api/appointments/available', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ doctorId: selectedDoctor, date })
//           })
//           const data = await res.json()
//           setAvailableTimes(data.availableTimes || [])
//         } catch (error) {
//           console.error('Failed to fetch available times:', error)
//         }
//       }
//     }
//     fetchAvailableTimes()
//   }, [selectedDoctor, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!selectedDoctor || !date || !time || !user || !type) {
//       return setMessage('Please complete all required fields')
//     }

//     setLoading(true)
//     setMessage('')

//     try {
//       const res = await fetch('/api/appointments/book', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           doctorId: selectedDoctor,
//           date,
//           time,
//           patientName: user.name,
//           patientEmail: user.email,
//           type,
//           symptoms,
//         })
//       })
      
//       const result = await res.json()
      
//       if (res.ok) {
//         setMessage('Appointment booked successfully! Redirecting...')
//         setTimeout(() => router.push('/dashboard/user?success=true'), 2000)
//       } else {
//         setMessage(result.message || 'Booking failed. Please try again.')
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
//     { value: 'ORTHODONTIC', label: 'Orthodontic Care', icon: UserCheck, color: 'from-indigo-500 to-blue-500' },
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
//   const selectedDoctorData = doctors.find(d => d.id === selectedDoctor)
//   // const selectedTreatment = treatmentOptions?.find(t => t.value === type) || null;
//   // const selectedDoctorData = doctors?.find(d => d.id === selectedDoctor) || null;
  

  


//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Blue Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"></div>
      
//       {/* Animated Background Overlay */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-transparent"
//           animate={{ 
//             background: [
//               "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
//               "linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.1), transparent)",
//               "linear-gradient(225deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
//               "linear-gradient(315deg, transparent, rgba(96, 165, 250, 0.1), transparent)"
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
//           className="absolute bottom-32 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"
//           animate={{ 
//             x: [0, -80, 0],
//             y: [0, 60, 0],
//             scale: [1, 0.8, 1]
//           }}
//           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
//         />
        
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

//       {/* Main Content */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-4xl">
          
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

//             <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-6 shadow-lg">
//               <Calendar className="w-10 h-10 text-white" />
//             </div>
            
//             <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
//               Book Your Appointment
//             </h1>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Schedule your consultation with our expert healthcare professionals
//             </p>
//           </motion.div>

//           {/* Booking Form */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="relative"
//           >
//             <motion.div
//               className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-3xl mx-auto"
//               variants={itemVariants}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-3xl blur opacity-20 -z-10"></div>
              
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Doctor Selection */}
//                 <motion.div variants={itemVariants} className="space-y-3">
//                   <label className="flex items-center gap-3 text-white font-bold text-lg">
//                     <Stethoscope className="w-5 h-5 text-blue-300" />
//                     Select Doctor
//                   </label>
//                   <select
//                     value={selectedDoctor}
//                     onChange={(e) => setSelectedDoctor(e.target.value)}
//                     className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                     required
//                   >
//                     <option value="" className="bg-gray-800 text-white">-- Select Doctor --</option>
//                     {doctors.map((doctor) => (
//                       <option key={doctor.id} value={doctor.id} className="bg-gray-800 text-white">
//                         Dr. {doctor.name} - {doctor.specialty}
//                       </option>
//                     ))}
//                   </select>
//                 </motion.div>

//                 {/* Treatment Selection */}
//                 <motion.div variants={itemVariants} className="space-y-4">
//                   <label className="flex items-center gap-3 text-white font-bold text-lg">
//                     <Heart className="w-5 h-5 text-blue-300" />
//                     Select Treatment
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {treatmentOptions.map((treatment) => (
//                       <motion.button
//                         key={treatment.value}
//                         type="button"
//                         onClick={() => setType(treatment.value)}
//                         className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
//                           type === treatment.value
//                             ? 'border-blue-400 bg-blue-400/20 shadow-lg'
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

//                 {/* Date and Time */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <motion.div variants={itemVariants} className="space-y-3">
//                     <label className="flex items-center gap-3 text-white font-bold text-lg">
//                       <Calendar className="w-5 h-5 text-blue-300" />
//                       Select Date
//                     </label>
//                     <input
//                       type="date"
//                       value={date}
//                       min={todayDate}
//                       onChange={(e) => setDate(e.target.value)}
//                       className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                       required
//                     />
//                   </motion.div>

//                   <motion.div variants={itemVariants} className="space-y-3">
//                     <label className="flex items-center gap-3 text-white font-bold text-lg">
//                       <Clock className="w-5 h-5 text-blue-300" />
//                       Select Time
//                     </label>
//                     <select
//                       value={time}
//                       onChange={(e) => setTime(e.target.value)}
//                       className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
//                       required
//                     >
//                       <option value="" className="bg-gray-800 text-white">-- Select Time --</option>
//                       {generateTimeSlots().map((t) => {
//                         const isBooked = !availableTimes.includes(t)
//                         const isPast = date === todayDate && isPastDateTime(date, t)
//                         const isDisabled = isBooked || isPast
//                         return (
//                           <option 
//                             key={t} 
//                             value={t} 
//                             disabled={isDisabled}
//                             className={`bg-gray-800 ${isDisabled ? 'text-gray-500' : 'text-white'}`}
//                           >
//                             {t} {isBooked ? '(Booked)' : isPast ? '(Past)' : ''}
//                           </option>
//                         )
//                       })}
//                     </select>
//                   </motion.div>
//                 </div>

//                 {/* Symptoms */}
//                 <motion.div variants={itemVariants} className="space-y-3">
//                   <label className="flex items-center gap-3 text-white font-bold text-lg">
//                     <MessageSquare className="w-5 h-5 text-blue-300" />
//                     Symptoms / Concerns
//                     <span className="text-sm text-blue-200 font-normal">(Optional)</span>
//                   </label>
//                   <textarea
//                     value={symptoms}
//                     onChange={(e) => setSymptoms(e.target.value)}
//                     className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 resize-none"
//                     rows={4}
//                     placeholder="Please describe your symptoms, concerns, or reason for the appointment..."
//                   />
//                 </motion.div>

//                 {/* Booking Summary */}
//                 {(selectedDoctor || type || date || time) && (
//                   <motion.div
//                     variants={itemVariants}
//                     className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4"
//                   >
//                     <h3 className="text-white font-bold text-lg flex items-center gap-2">
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                       Booking Summary
//                     </h3>
//                     <div className="space-y-2 text-blue-100">
//                       {selectedDoctorData && (
//                         <p><strong>Doctor:</strong> Dr. {selectedDoctorData.name} ({selectedDoctorData.specialty})</p>
//                       )}
//                       {selectedTreatment && (
//                         <p><strong>Treatment:</strong> {selectedTreatment.label}</p>
//                       )}
//                       {date && (
//                         <p><strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}</p>
//                       )}
//                       {time && (
//                         <p><strong>Time:</strong> {time}</p>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Submit Button */}
//                 <motion.button
//                   variants={itemVariants}
//                   type="submit"
//                   disabled={loading}
//                   className="w-full relative group bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
//                         Booking Appointment...
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center gap-3">
//                         <CheckCircle className="w-6 h-6" />
//                         Confirm Booking
//                       </div>
//                     )}
//                   </span>
//                   <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

//       <style jsx global>{`
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
        
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
//         ::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//         }
//         ::-webkit-scrollbar-thumb {
//           background: #3b82f6;
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: #2563eb;
//         }
//       `}</style>
//     </div>
//   )
// }






'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Clock,
  User,
  Stethoscope,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Heart,
  Shield,
  Star,
  Video,
  Sparkles,
  UserCheck,
  MessageSquare
} from 'lucide-react'
import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

type Doctor = {
  id: string
  name: string
  specialty: string
}

export default function BookingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()

  const todayDate = new Date().toISOString().split('T')[0]

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const res = await fetch('/api/doctors')
  //       const data = await res.json()
  //       setDoctors(data.doctors)
  //     } catch (error) {
  //       console.error('Failed to fetch doctors:', error)
  //     }
  //   }
  //   fetchDoctors()

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('/api/doctors')
        const data = await res.json()
        
        // แก้ตรงนี้ - ตรวจสอบว่า data เป็น array หรือ object
        if (Array.isArray(data)) {
          setDoctors(data)  // ถ้าเป็น array ตรงๆ
        } else if (data.doctors) {
          setDoctors(data.doctors)  // ถ้าเป็น { doctors: [...] }
        } else {
          setDoctors([])  // ถ้าไม่มีให้เป็น empty array
        }
      } catch (error) {
        console.error('Failed to fetch doctors:', error)
        setDoctors([])  // กรณี error ให้เป็น empty array
      }
    }
    fetchDoctors()

    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (selectedDoctor && date) {
        try {
          const res = await fetch('/api/appointments/available', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId: selectedDoctor, date })
          })
          const data = await res.json()
          setAvailableTimes(data.availableTimes || [])
        } catch (error) {
          console.error('Failed to fetch available times:', error)
        }
      }
    }
    fetchAvailableTimes()
  }, [selectedDoctor, date])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDoctor || !date || !time || !user || !type) {
      return setMessage('Please complete all required fields')
    }

    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          date,
          time,
          patientName: user.name,
          patientEmail: user.email,
          type,
          symptoms,
        })
      })
      
      const result = await res.json()

      if (res.ok) {
        setMessage('Appointment booked successfully! Redirecting to payment...')
        // Redirect to payment page with appointment ID
        setTimeout(() => router.push(`/payment?appointmentId=${result.appointment.id}`), 1500)
      } else {
        setMessage(result.message || 'Booking failed. Please try again.')
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

  // const selectedTreatment = treatmentOptions.find(t => t.value === type)
  // const selectedDoctorData = doctors.find(d => d.id === selectedDoctor)
  const selectedTreatment = treatmentOptions?.find(t => t.value === type) || null
  const selectedDoctorData = doctors?.find(d => d.id === selectedDoctor) || null

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
        <div className="w-full max-w-4xl">
          
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

            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-6 shadow-lg">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Book Your Appointment
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Schedule your consultation with our expert healthcare professionals
            </p>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-3xl mx-auto"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-3xl blur opacity-20 -z-10"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Doctor Selection */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="flex items-center gap-3 text-white font-bold text-lg">
                    <Stethoscope className="w-5 h-5 text-blue-300" />
                    Select Doctor
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    required
                  >
                    <option value="" className="bg-gray-800 text-white">-- Select Doctor --</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id} className="bg-gray-800 text-white">
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Treatment Selection */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <label className="flex items-center gap-3 text-white font-bold text-lg">
                    <Heart className="w-5 h-5 text-blue-300" />
                    Select Treatment
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {treatmentOptions.map((treatment) => (
                      <motion.button
                        key={treatment.value}
                        type="button"
                        onClick={() => setType(treatment.value)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                          type === treatment.value
                            ? 'border-blue-400 bg-blue-400/20 shadow-lg'
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

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="flex items-center gap-3 text-white font-bold text-lg">
                      <Calendar className="w-5 h-5 text-blue-300" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={todayDate}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="flex items-center gap-3 text-white font-bold text-lg">
                      <Clock className="w-5 h-5 text-blue-300" />
                      Select Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                      required
                    >
                      <option value="" className="bg-gray-800 text-white">-- Select Time --</option>
                      {generateTimeSlots().map((t) => {
                        const isBooked = !availableTimes.includes(t)
                        const isPast = date === todayDate && isPastDateTime(date, t)
                        const isDisabled = isBooked || isPast
                        return (
                          <option 
                            key={t} 
                            value={t} 
                            disabled={isDisabled}
                            className={`bg-gray-800 ${isDisabled ? 'text-gray-500' : 'text-white'}`}
                          >
                            {t} {isBooked ? '(Booked)' : isPast ? '(Past)' : ''}
                          </option>
                        )
                      })}
                    </select>
                  </motion.div>
                </div>

                {/* Symptoms */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="flex items-center gap-3 text-white font-bold text-lg">
                    <MessageSquare className="w-5 h-5 text-blue-300" />
                    Symptoms / Concerns
                    <span className="text-sm text-blue-200 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 resize-none"
                    rows={4}
                    placeholder="Please describe your symptoms, concerns, or reason for the appointment..."
                  />
                </motion.div>

                {/* Booking Summary */}
                {(selectedDoctor || type || date || time) && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4"
                  >
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Booking Summary
                    </h3>
                    <div className="space-y-2 text-blue-100">
                      {selectedDoctorData && (
                        <p><strong>Doctor:</strong> Dr. {selectedDoctorData.name} ({selectedDoctorData.specialty})</p>
                      )}
                      {selectedTreatment && (
                        <p><strong>Treatment:</strong> {selectedTreatment.label}</p>
                      )}
                      {date && (
                        <p><strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      )}
                      {time && (
                        <p><strong>Time:</strong> {time}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={loading}
                  className="w-full relative group bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                        Booking Appointment...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-6 h-6" />
                        Confirm Booking
                      </div>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          background: #3b82f6;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  )
}