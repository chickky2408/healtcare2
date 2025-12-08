// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Calendar, Clock, Video, Copy, Check, AlertCircle, User, Mail } from 'lucide-react'

// type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     id: string
//     name: string
//     specialty: string
//     meetLink?: string
//   }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function TelemedicinePage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [copied, setCopied] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) {
//       router.push('/login')
//       return
//     }
    
//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') {
//       router.push('/login')
//       return
//     }

//     setUser(parsed)

//     // Fetch telemedicine appointments
//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         const telemedicineAppointments = data.appointments.filter(
//           (a: Appointment) => a.type === 'VIDEO_CALL'
//         )
//         // Get the next upcoming appointment
//         if (telemedicineAppointments.length > 0) {
//           setAppointment(telemedicineAppointments[0])
//         }
//         setLoading(false)
//       })
//       .catch(() => setLoading(false))
//   }, [router])

//   const handleCopyLink = () => {
//     if (appointment?.doctor?.meetLink) {
//       navigator.clipboard.writeText(appointment.doctor.meetLink)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     }
//   }

//   const handleJoinCall = () => {
//     if (appointment?.doctor?.meetLink) {
//       window.open(appointment.doctor.meetLink, '_blank')
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="animate-pulse text-blue-600 text-xl font-semibold">Loading...</div>
//       </div>
//     )
//   }

//   // No appointment found
//   if (!appointment) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
//         <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
//           <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <AlertCircle className="w-12 h-12 text-red-500" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">No Appointment Found</h1>
//           <p className="text-gray-600 mb-2 text-lg">
//             You need to book an appointment before accessing video call services.
//           </p>
//           <p className="text-gray-500 mb-8">
//             Please schedule a telemedicine appointment to use this feature.
//           </p>
//           <button 
//             onClick={() => router.push('/dashboard/user/appointments')}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
//           >
//             Book an Appointment
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // Format date for display
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="max-w-5xl w-full">
//         {/* Header Card */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Patient Info */}
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <User className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Patient Name</p>
//                   <p className="text-xl font-bold text-gray-800">{user?.name}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Mail className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Email Address</p>
//                   <p className="text-lg text-gray-700">{user?.email}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Appointment Details */}
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <Calendar className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Date</p>
//                   <p className="text-xl font-bold text-gray-800">{formatDate(appointment.date)}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                   <Clock className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 font-medium">Time</p>
//                   <p className="text-xl font-bold text-gray-800">{appointment.time}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Doctor Card */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
//           <div className="flex items-center space-x-4 mb-6">
//             <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
//               <span className="text-3xl">👨‍⚕️</span>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Your Doctor</p>
//               <h2 className="text-3xl font-bold text-gray-800">{appointment.doctor.name}</h2>
//               <p className="text-blue-600 font-medium">{appointment.doctor.specialty}</p>
//             </div>
//           </div>
//         </div>

//         Video Call Section
//         {appointment.doctor.meetLink ? (
//           <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
//             {/* Decorative Elements */}
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
//             <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
//             <div className="relative z-10">
//               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//                 <Video className="w-12 h-12 text-blue-600" />
//               </div>
              
//               <h1 className="text-4xl font-bold text-white mb-4">Ready for Your Video Call?</h1>
//               <p className="text-blue-100 text-lg mb-10">
//                 Join your consultation with {appointment.doctor.name}
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
//                 <button
//                   onClick={handleJoinCall}
//                   className="group w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
//                 >
//                   <Video className="w-5 h-5" />
//                   <span>Join Video Call</span>
//                 </button>

//                 <button
//                   onClick={handleCopyLink}
//                   className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border-2 border-white/30 flex items-center justify-center space-x-2"
//                 >
//                   {copied ? (
//                     <>
//                       <Check className="w-5 h-5" />
//                       <span>Copied!</span>
//                     </>
//                   ) : (
//                     <>
//                       <Copy className="w-5 h-5" />
//                       <span>Copy Link</span>
//                     </>
//                   )}
//                 </button>
//               </div>

//               <div className="mt-8 pt-8 border-t border-white/20">
//                 <p className="text-blue-100 text-sm mb-2">Meeting Link</p>
//                 <p className="text-white font-mono text-sm bg-white/10 rounded-lg px-4 py-2 inline-block backdrop-blur-sm break-all">
//                   {appointment.doctor.meetLink}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <AlertCircle className="w-12 h-12 text-orange-500" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">Video Call Not Available</h1>
//             <p className="text-gray-600 mb-2">
//               The video call link for this appointment is not yet available.
//             </p>
//             <p className="text-gray-500">
//               Please check back closer to your appointment time or contact support.
//             </p>
//           </div>
//         )}

//         {/* Info Footer */}
//         <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-100">
//           <p className="text-center text-gray-600 text-sm">
//             💡 <strong>Tip:</strong> Make sure your camera and microphone are working before joining the call. 
//             Please join the call a few minutes early to test your connection.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }



'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, Video, Copy, Check, AlertCircle, User, Mail } from 'lucide-react'

type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: {
    id: string
    name: string
    specialty: string
    meetLink?: string
  }
  payment?: {
    status: 'PENDING' | 'PAID' | 'SUCCESSFUL' | 'REJECTED' | 'REFUNDED'
  }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function TelemedicinePage() {
  const [user, setUser] = useState<User | null>(null)
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      router.push('/login')
      return
    }
    
    const parsed: User = JSON.parse(stored)
    if (parsed.role !== 'USER') {
      router.push('/login')
      return
    }

    setUser(parsed)

    // Fetch telemedicine appointments with successful payment
    fetch('/api/appointments/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then(res => res.json())
      .then(data => {
        const telemedicineAppointments = data.appointments.filter(
          (a: Appointment) => a.type === 'VIDEO_CALL'
        )
        // Get the next upcoming appointment
        if (telemedicineAppointments.length > 0) {
          setAppointment(telemedicineAppointments[0])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])

  const handleCopyLink = () => {
    if (appointment?.doctor?.meetLink) {
      navigator.clipboard.writeText(appointment.doctor.meetLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleJoinCall = () => {
    if (appointment?.doctor?.meetLink) {
      window.open(appointment.doctor.meetLink, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-pulse text-blue-600 text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  // No appointment found or payment not successful
  if (!appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Video Consultation Not Available</h1>
          <p className="text-gray-600 mb-2 text-lg">
            You need to book a video call appointment and complete payment first.
          </p>
          <p className="text-gray-500 mb-8">
            Please schedule a telemedicine appointment and ensure your payment is successful to access this feature.
          </p>
          <button
            onClick={() => router.push('/booking')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Book Video Call Appointment
          </button>
        </div>
      </div>
    )
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Patient Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Patient Name</p>
                  <p className="text-xl font-bold text-gray-800">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email Address</p>
                  <p className="text-lg text-gray-700">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Date</p>
                  <p className="text-xl font-bold text-gray-800">{formatDate(appointment.date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Time</p>
                  <p className="text-xl font-bold text-gray-800">{appointment.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">👨‍⚕️</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Your Doctor</p>
              <h2 className="text-3xl font-bold text-gray-800">{appointment.doctor.name}</h2>
              <p className="text-blue-600 font-medium">{appointment.doctor.specialty}</p>
            </div>
          </div>
        </div>

        Video Call Section
        {appointment.doctor.meetLink ? (
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Video className="w-12 h-12 text-blue-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">Are You Ready for Your Video Consultation?</h1>
              <p className="text-blue-100 text-lg mb-10">
                Join your medical consultation with {appointment.doctor.name}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  onClick={handleJoinCall}
                  className="group w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Video className="w-5 h-5" />
                  <span>Join Video Consultation</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border-2 border-white/30 flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-blue-100 text-sm mb-2">Meeting Link</p>
                <p className="text-white font-mono text-sm bg-white/10 rounded-lg px-4 py-2 inline-block backdrop-blur-sm break-all">
                  {appointment.doctor.meetLink}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Video Consultation Not Available</h1>
            <p className="text-gray-600 mb-2">
              The video consultation link for this appointment is not yet available.
            </p>
            <p className="text-gray-500">
              Please check back closer to your appointment time or contact our support team.
            </p>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <p className="text-center text-gray-600 text-sm">
            💡 <strong>Important Reminder:</strong> Please ensure your camera and microphone are working properly before joining the consultation.
            We recommend joining a few minutes early to test your internet connection.
          </p>
        </div>
      </div>
    </div>
  )
}





