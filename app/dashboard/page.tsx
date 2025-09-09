



//ver1

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
