// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'

// type Appointment = {
//   id: string
//   patientName: string
//   patientEmail: string
//   date: string
//   time: string
//   type: string
//   symptoms?: string
//   doctor?: {
//     name: string
//     specialty: string
//     meetLink?: string
//   }
// }

// export default function TelemedicinePage() {
//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [loading, setLoading] = useState(true)
//   const params = useParams()
//   const router = useRouter()

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       const appointmentId = params?.appointmentId as string
//       try {
//         const res = await fetch(`/api/appointments/${appointmentId}`)
//         const data = await res.json()
//         setAppointment(data)
//       } catch (error) {
//         console.error('Failed to fetch appointment:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAppointment()
//   }, [params])

//   if (loading) {
//     return <div className="p-6 text-center text-gray-600">Loading...</div>
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-blue-700 mb-4">Appointment Details</h1>

//         {appointment ? (
//           <>
//             <p><strong>Patient:</strong> {appointment.patientName}</p>
//             <p><strong>Email:</strong> {appointment.patientEmail}</p>
//             {appointment.doctor ? (
//               <p><strong>Doctor:</strong> Dr. {appointment.doctor.name} ({appointment.doctor.specialty})</p>
//             ) : (
//               <p className="text-red-500">Doctor data not available</p>
//             )}
//             <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
//             <p><strong>Time:</strong> {appointment.time}</p>
//             <p><strong>Treatment:</strong> {appointment.type}</p>
//             <p><strong>Symptoms:</strong> {appointment.symptoms || 'N/A'}</p>

//             {appointment.doctor?.meetLink ? (
//               <a
//                 href={appointment.doctor.meetLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
//               >
//                 Join Video Call
//               </a>
//             ) : (
//               <p className="mt-4 text-red-500">No Meet link available</p>
//             )}
//           </>
//         ) : (
//           <p className="text-red-500">Appointment not found.</p>
//         )}

//         <button
//           onClick={() => router.back()}
//           className="mt-4 text-sm text-gray-600 hover:underline"
//         >
//           ← Back
//         </button>
//       </div>
//     </div>
//   )
// }



// 📄 File: app/dashboard/user/telemedicine/[appointmentId]/page.tsx
// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'

// interface Appointment {
//   id: string
//   patientName: string
//   patientEmail: string
//   doctor?: {
//     name: string
//     specialty: string
//     meetLink?: string
//   }
//   date: string
//   time: string
//   type: string
//   symptom: string
// }

// export default function TelemedicineDetailPage() {
//   const { appointmentId } = useParams<{ appointmentId: string }>()
//   const router = useRouter()
//   const [appointment, setAppointment] = useState<Appointment | null>(null)

//   useEffect(() => {
//     if (!appointmentId) return

//     fetch(`/api/appointments/${appointmentId}`)
//       .then(res => res.json())
//       .then(data => setAppointment(data))
//       .catch(err => console.error(err))
//   }, [appointmentId])

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-12">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-blue-700 mb-4">Appointment Details</h2>

//         {appointment ? (
//           <div className="space-y-2">
//             <p><strong>Patient:</strong> {appointment.patientName}</p>
//             <p><strong>Email:</strong> {appointment.patientEmail}</p>
//             {appointment.doctor ? (
//               <p><strong>Doctor:</strong> Dr. {appointment.doctor.name} ({appointment.doctor.specialty})</p>
//             ) : (
//               <p className="text-red-500">Doctor data not available</p>
//             )}
//             <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
//             <p><strong>Time:</strong> {appointment.time}</p>
//             <p><strong>Treatment:</strong> {appointment.type}</p>
//             <p><strong>Symptoms:</strong> {appointment.symptom}</p>
//             {appointment.doctor?.meetLink ? (
//               <a
//                 href={appointment.doctor.meetLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
//               >
//                 Join Video Call
//               </a>
//             ) : (
//               <p className="text-red-500 mt-2">No Meet link available</p>
//             )}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">Loading appointment data...</p>
//         )}

//         <button
//           onClick={() => router.back()}
//           className="mt-6 text-sm text-gray-600 hover:underline"
//         >
//           ← Back
//         </button>
//       </div>
//     </div>
//   )
// }





//new theme

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Clock,
  User,
  Mail,
  ArrowLeft,
  Video,
  Sparkles,
  UserCheck,
  Heart,
  Shield,
  Star,
  Stethoscope,
  Phone,
  MessageSquare,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  MapPin
} from 'lucide-react'

interface Appointment {
  id: string
  patientName: string
  patientEmail: string
  doctor?: {
    name: string
    specialty: string
    meetLink?: string
  }
  date: string
  time: string
  type: string
  symptom: string
}

export default function TelemedicineDetailPage() {
  const { appointmentId } = useParams<{ appointmentId: string }>()
  const router = useRouter()
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!appointmentId) return

    fetch(`/api/appointments/${appointmentId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch appointment')
        return res.json()
      })
      .then(data => {
        setAppointment(data)
        setError(null)
      })
      .catch(err => {
        console.error('Error fetching appointment:', err)
        setError('Failed to load appointment details')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [appointmentId])

  const copyMeetLink = async () => {
    if (appointment?.doctor?.meetLink) {
      try {
        await navigator.clipboard.writeText(appointment.doctor.meetLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy link:', err)
      }
    }
  }

  const treatmentIcons = {
    'VIDEO_CALL': { icon: Video, color: 'from-green-500 to-emerald-500', label: 'Video Consultation' },
    'CLEANING': { icon: Sparkles, color: 'from-blue-500 to-cyan-500', label: 'Dental Cleaning' },
    'ORTHODONTIC': { icon: UserCheck, color: 'from-purple-500 to-pink-500', label: 'Orthodontic Care' },
    'AI_DIAGNOSIS': { icon: Heart, color: 'from-orange-500 to-red-500', label: 'AI Diagnosis' }
  }

  const getAppointmentStatus = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const diffInHours = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 0) return { label: 'Completed', color: 'text-gray-400', bgColor: 'bg-gray-500/20' }
    if (diffInHours <= 1) return { label: 'Starting Soon', color: 'text-orange-400', bgColor: 'bg-orange-500/20' }
    return { label: 'Upcoming', color: 'text-green-400', bgColor: 'bg-green-500/20' }
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
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center">
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

  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center px-4">
        <motion.div
          className="text-center text-white max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Unable to Load Appointment</h2>
          <p className="text-blue-100 mb-8">{error || 'Appointment not found'}</p>
          <motion.button
            onClick={() => router.push('/dashboard/user/appointments')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Appointments
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const treatmentInfo = treatmentIcons[appointment.type as keyof typeof treatmentIcons] || treatmentIcons.VIDEO_CALL
  const TreatmentIcon = treatmentInfo.icon
  const status = getAppointmentStatus(appointment.date, appointment.time)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Multi-layer Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800"></div>
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent"
          animate={{ 
            background: [
              "linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
              "linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
              "linear-gradient(225deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
              "linear-gradient(315deg, transparent, rgba(59, 130, 246, 0.1), transparent)"
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
          className="absolute bottom-32 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Medical Icons Floating */}
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

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={() => router.back()}
              className="group flex items-center gap-3 text-blue-200 hover:text-white transition-colors duration-300 mb-8 mx-auto"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Back to Appointments</span>
            </motion.button>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-6 shadow-lg">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Appointment Details
            </h1>
            <p className="text-xl text-blue-100">
              Complete information about your appointment
            </p>
          </motion.div>

          {/* Appointment Details Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Glassmorphism Card */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 shadow-2xl"
              variants={itemVariants}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-3xl blur opacity-20 -z-10"></div>
              
              {/* Status Badge */}
              <motion.div
                variants={itemVariants}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.bgColor} ${status.color} font-semibold mb-8`}
              >
                <div className={`w-2 h-2 rounded-full ${status.color.replace('text-', 'bg-')}`}></div>
                {status.label}
              </motion.div>

              {/* Treatment Info */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-6 mb-10"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${treatmentInfo.color} rounded-3xl flex items-center justify-center shadow-lg`}>
                  <TreatmentIcon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">{treatmentInfo.label}</h2>
                  <p className="text-blue-200 text-lg">Professional healthcare service</p>
                </div>
              </motion.div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Patient Information */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-300" />
                    Patient Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Patient Name</p>
                        <p className="text-white font-semibold text-lg">{appointment.patientName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Email Address</p>
                        <p className="text-white font-semibold">{appointment.patientEmail}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Appointment Information */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-300" />
                    Appointment Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-300" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Date</p>
                        <p className="text-white font-semibold text-lg">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Time</p>
                        <p className="text-white font-semibold text-lg">{appointment.time}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Doctor Information */}
              {appointment.doctor && (
                <motion.div variants={itemVariants} className="bg-white/10 rounded-3xl p-6 mb-10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-300" />
                    Your Doctor
                  </h3>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">Dr. {appointment.doctor.name}</h4>
                      <p className="text-blue-200 text-lg">{appointment.doctor.specialty}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Symptoms/Notes */}
              {appointment.symptom && (
                <motion.div variants={itemVariants} className="bg-white/10 rounded-3xl p-6 mb-10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-300" />
                    Symptoms & Notes
                  </h3>
                  <p className="text-blue-100 text-lg leading-relaxed">{appointment.symptom}</p>
                </motion.div>
              )}

              {/* Video Call Section */}
              {appointment.doctor?.meetLink ? (
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-3xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Ready for Your Video Call?</h3>
                  <p className="text-green-100 mb-8">Join your consultation with Dr. {appointment.doctor.name}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href={appointment.doctor.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 justify-center"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Video className="w-6 h-6" />
                      Join Video Call
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    
                    <motion.button
                      onClick={copyMeetLink}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="bg-amber-500/20 border border-amber-400/30 rounded-3xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Video Call Not Available</h3>
                  <p className="text-amber-100">
                    The video call link for this appointment is not yet available. 
                    Please check back closer to your appointment time or contact support.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  )
}






// 4 Oct 2025


