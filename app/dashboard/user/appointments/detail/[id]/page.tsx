// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import Link from 'next/link'

// export default function AppointmentDetailPage() {
//   const { id } = useParams()
//   const router = useRouter()
//   interface Appointment {
//     date: string
//     time: string
//     doctor: {
//       name: string
//       specialty: string
//     }
//     patientName: string
//     patientEmail: string
//     type: 'VIDEO_CALL' | 'AI_DIAGNOSIS' | string
//     symptoms?: string
//   }

//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       try {
//         const res = await fetch(`/api/appointments/${id}`)
//         const data = await res.json()
//         if (res.ok) {
//           setAppointment(data)
//         } else {
//           setError(data.message || 'Failed to load appointment')
//         }
//       } catch {
//         setError('Error loading appointment')
//       }
//     }
//     fetchAppointment()
//   }, [id])

//   if (error) {
//     return <p className="text-center text-red-500 mt-10">❌ {error}</p>
//   }

//   if (!appointment) {
//     return <p className="text-center mt-10">Loading...</p>
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
//           Appointment Detail
//         </h1>

//         <div className="space-y-4">
//           <p><span className="font-semibold">📅 Date:</span> {appointment.date} at {appointment.time}</p>
//           <p><span className="font-semibold">🧑‍⚕️ Doctor:</span> {appointment.doctor.name} ({appointment.doctor.specialty})</p>
//           <p><span className="font-semibold">👤 Patient:</span> {appointment.patientName} ({appointment.patientEmail})</p>
//           <p><span className="font-semibold">📋 Treatment Type:</span> {appointment.type}</p>
//           <p><span className="font-semibold">🤒 Symptoms:</span> {appointment.symptoms || 'N/A'}</p>
//         </div>

//         {(appointment.type === 'VIDEO_CALL') && (
//           <Link href="/telemedicine" className="block mt-6 text-center text-blue-600 font-semibold underline">
//             Join Video Call
//           </Link>
//         )}

//         {(appointment.type === 'AI_DIAGNOSIS') && (
//           <Link href="/ai-analysis" className="block mt-6 text-center text-purple-600 font-semibold underline">
//             Go to AI Analysis
//           </Link>
//         )}

//         <div className="text-center mt-6">
//           <button onClick={() => router.push('/dashboard/user/appointments')} className="text-sm text-blue-500 hover:underline">
//             ← Back to Appointments
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }




//blue

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Stethoscope, 
  FileText, 
  Video, 
  Brain, 
  Heart,
  Shield,
  Star
} from 'lucide-react'

export default function AppointmentDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  
  interface Appointment {
    date: string
    time: string
    doctor: {
      name: string
      specialty: string
      meetLink?: string
    }
    patientName: string
    patientEmail: string
    type: 'VIDEO_CALL' | 'AI_DIAGNOSIS' | 'CLEANING' | 'ORTHODONTIC' | string
    symptoms?: string
    payment?: {
      status: 'PENDING' | 'PAID' | 'SUCCESSFUL' | 'REJECTED' | 'REFUNDED'
    }
  }

  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/appointments/${id}`)
        const data = await res.json()
        if (res.ok) {
          setAppointment(data)
        } else {
          setError(data.message || 'Failed to load appointment')
        }
      } catch {
        setError('Error loading appointment')
      }
    }
    fetchAppointment()
  }, [id])

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'VIDEO_CALL': return Video
      case 'AI_DIAGNOSIS': return Brain
      case 'CLEANING': return Heart
      case 'ORTHODONTIC': return User
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'VIDEO_CALL': return 'from-green-500 to-emerald-500'
      case 'AI_DIAGNOSIS': return 'from-orange-500 to-red-500'
      case 'CLEANING': return 'from-blue-500 to-cyan-500'
      case 'ORTHODONTIC': return 'from-indigo-500 to-blue-500'
      default: return 'from-blue-500 to-blue-600'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/20 border border-red-400/50 text-red-200 p-6 rounded-2xl max-w-md text-center"
        >
          <p className="text-lg font-semibold">{error}</p>
          <button
            onClick={() => router.push('/dashboard/user/appointments')}
            className="mt-4 text-sm text-red-300 hover:text-white underline"
          >
            Back to Appointments
          </button>
        </motion.div>
      </div>
    )
  }

  if (!appointment) {
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

  const TypeIcon = getTypeIcon(appointment.type)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
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

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-1/4 right-1/3 text-white/10"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-white/10"
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-20 h-20" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={() => router.push('/dashboard/user/appointments')}
              className="group flex items-center gap-3 text-blue-200 hover:text-white transition-colors duration-300 mb-6 mx-auto"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Back to Appointments</span>
            </motion.button>

            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${getTypeColor(appointment.type)} rounded-3xl mb-6 shadow-lg`}>
              <TypeIcon className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
              Appointment Details
            </h1>
            <p className="text-xl text-blue-100">
              Complete information about your appointment
            </p>
          </motion.div>

          {/* Details Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/20 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-3xl blur opacity-20 -z-10" />
              
              <div className="space-y-6">
                {/* Date & Time */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">Date & Time</h3>
                      <p className="text-blue-100">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-100 font-semibold">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Doctor */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">Doctor</h3>
                      <p className="text-blue-100 font-semibold">Dr. {appointment.doctor.name}</p>
                      <p className="text-blue-200 text-sm mt-1">{appointment.doctor.specialty}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Patient */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">Patient Information</h3>
                      <p className="text-blue-100 font-semibold">{appointment.patientName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Mail className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-200 text-sm">{appointment.patientEmail}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Treatment Type */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(appointment.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">Treatment Type</h3>
                      <p className="text-blue-100 font-semibold">{appointment.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Symptoms */}
                {appointment.symptoms && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white/10 border border-white/20 rounded-2xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">Symptoms / Concerns</h3>
                        <p className="text-blue-100">{appointment.symptoms}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                {appointment.type === 'VIDEO_CALL' && (
                  <motion.button
                    onClick={() => router.push('/dashboard/user/telemedicine')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Video className="w-6 h-6" />
                    Go to Video Consultation
                  </motion.button>
                )}

                {appointment.type === 'AI_DIAGNOSIS' && (
                  <motion.button
                    onClick={() => router.push('/ai-analysis')}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Brain className="w-6 h-6" />
                    Go to AI Analysis
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

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
          background: #2563eb;
        }
      `}</style>
    </div>
  )
}