

//add alert notification

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// interface Appointment {
//   id: string
//   date: string
//   time: string
//   type: string
//   patientName: string
//   patientEmail: string
//   symptoms?: string
// }

// interface Doctor {
//   id: string
//   name: string
//   email: string
//   role: string
//   meetLink?: string
// }

// export default function DoctorDashboardPage() {
//   const [doctor, setDoctor] = useState<Doctor | null>(null)
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [reminderShown, setReminderShown] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')
//     const parsed: Doctor = JSON.parse(stored)
//     if (parsed.role !== 'DOCTOR') return router.push('/login')

//     setDoctor(parsed)

//     fetch('/api/appointments/doctor', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then(res => res.json())
//       .then(data => setAppointments(data.appointments))
//   }, [router])

//   // Reminder for upcoming appointment (within 2 hours)
//   useEffect(() => {
//     if (!appointments.length || reminderShown) return

//     const now = new Date()
//     appointments.forEach(app => {
//       const appDate = new Date(app.date + 'T' + app.time)
//       const diff = (appDate.getTime() - now.getTime()) / (1000 * 60 * 60) // in hours
//       if (diff > 0 && diff <= 2) {
//         alert(`Reminder: You have an upcoming appointment at ${app.time}`)
//         setReminderShown(true)
//       }
//     })
//   }, [appointments, reminderShown])

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
//         <h2 className="text-2xl font-bold mb-8">🩺 HealthCare+</h2>
//         <nav className="space-y-3 text-sm">
//           <button onClick={() => router.push('/dashboard/doctor')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded hover:bg-white/20">
//             📅 Appointments
//           </button>
//           <button onClick={() => router.push('/dashboard/doctor/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
//             🎥 Telemedicine
//           </button>
//           <button onClick={() => router.push('/dashboard/doctor/diagnosis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
//             🧠 AI Analysis
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {doctor && (
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-blue-900">Welcome,  {doctor.name}!</h1>
//               <p className="text-sm text-gray-600">Email: {doctor.email}</p>
//             </div>
//             <button
//               onClick={() => {
//                 localStorage.removeItem('user')
//                 router.push('/login')
//               }}
//               className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
//             >
//               ⏏ Logout
//             </button>
//           </div>
//         )}

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-blue-800"> Today Appointments</h2>
//         </div>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments scheduled yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map(a => (
//               <div key={a.id} className="bg-white rounded-lg shadow p-4 animate-fade-in">
//                 <p className="text-blue-800 font-semibold">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p className="mt-1">👤 {a.patientName} ({a.patientEmail})</p>
//                 <p className="text-sm">📋 Treatment: {a.type}</p>
//                 <p className="text-sm">📝 Symptoms: {a.symptoms || 'N/A'}</p>
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => router.push(`/dashboard/doctor/appointments/edit/${a.id}`)}
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
//                   onClick={() => router.push(`/dashboard/doctor/telemedicine/${a.id}`)}
//                   className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1 rounded text-sm"
//                   >
//                     Detail
//                   </button>

//                   <button
//                     onClick={() => router.push(`/dashboard/doctor/chat/${a.id}`)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm font-semibold"
//                   >
//                     💬 Chat
//                   </button>
                  
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }







// new theme 


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar,
  Clock,
  User,
  Bell,
  X,
  Menu,
  LogOut,
  Video,
  Brain,
  Edit3,
  Trash2,
  Eye,
  MessageSquare,
  Heart,
  Shield,
  Star,
  Stethoscope,
  Activity,
  Users,
  CheckCircle,
  AlertTriangle,
  Phone
} from 'lucide-react'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  patientName: string
  patientEmail: string
  symptoms?: string
}

interface Doctor {
  id: string
  name: string
  email: string
  role: string
  meetLink?: string
}

interface NotificationData {
  id: string
  type: 'reminder' | 'info' | 'warning'
  message: string
  appointment?: Appointment
}

export default function DoctorDashboardPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed: Doctor = JSON.parse(stored)
    if (parsed.role !== 'DOCTOR') return router.push('/login')

    setDoctor(parsed)
    fetchAppointments(parsed.email)
  }, [router])

  const fetchAppointments = async (email: string) => {
    try {
      console.log('🔍 Fetching appointments for doctor:', email)
      const response = await fetch('/api/appointments/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      console.log('📊 API Response:', data)
      console.log('📋 Appointments count:', data.appointments?.length || 0)

      // เรียงลำดับจากใกล้ที่สุดไปไกลที่สุด
      const sorted = (data.appointments || []).sort((a: Appointment, b: Appointment) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`).getTime()
        const dateTimeB = new Date(`${b.date}T${b.time}`).getTime()
        return dateTimeA - dateTimeB
      })

      console.log('✅ Sorted appointments:', sorted.length)
      setAppointments(sorted)
      checkUpcomingAppointments(sorted)
    } catch (error) {
      console.error('❌ Failed to fetch appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  // Enhanced notification system
  const checkUpcomingAppointments = (appointments: Appointment[]) => {
    const now = new Date()
    const upcomingNotifications: NotificationData[] = []

    appointments.forEach(app => {
      const appDateTime = new Date(`${app.date}T${app.time}`)
      const diffInMinutes = (appDateTime.getTime() - now.getTime()) / (1000 * 60)
      
      if (diffInMinutes > 0 && diffInMinutes <= 120) { // Within 2 hours
        let type: 'reminder' | 'info' | 'warning' = 'reminder'
        let message = ''
        
        if (diffInMinutes <= 15) {
          type = 'warning'
          message = `Appointment starting in ${Math.round(diffInMinutes)} minutes with ${app.patientName}`
        } else if (diffInMinutes <= 60) {
          type = 'warning'
          message = `Appointment in 1 hour with ${app.patientName}`
        } else {
          type = 'reminder'
          message = `Upcoming appointment at ${app.time} with ${app.patientName}`
        }
        
        upcomingNotifications.push({
          id: `reminder-${app.id}`,
          type,
          message,
          appointment: app
        })
      }
    })

    if (upcomingNotifications.length > 0) {
      setNotifications(upcomingNotifications)
    }
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const cancelAppointment = async (id: string, patientName: string) => {
    try {
      const res = await fetch('/api/appointments/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      
      if (res.ok) {
        setAppointments(prev => prev.filter(a => a.id !== id))
        // Add success notification
        setNotifications(prev => [...prev, {
          id: `cancel-${id}`,
          type: 'info',
          message: `Appointment with ${patientName} has been cancelled`
        }])
      }
    } catch (error) {
      console.error('Failed to cancel appointment:', error)
    }
  }

  const menuItems = [
    {
      icon: Calendar,
      label: 'Appointments',
      path: '/dashboard/doctor',
      active: true
    },
    {
      icon: Video,
      label: 'Telemedicine',
      path: '/dashboard/doctor/telemedicine',
      active: false
    },
    {
      icon: Brain,
      label: 'AI Analysis',
      path: '/dashboard/doctor/diagnosis',
      active: false
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle
      case 'info': return CheckCircle
      default: return Bell
    }
  }

  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'warning': return 'from-orange-500 to-red-500 text-orange-100'
      case 'info': return 'from-green-500 to-emerald-500 text-green-100'
      default: return 'from-blue-500 to-purple-500 text-blue-100'
    }
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
          <p className="text-xl font-semibold">Loading your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => {
          const NotificationIcon = getNotificationIcon(notification.type)
          const colors = getNotificationColors(notification.type)
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.8 }}
              className={`fixed top-4 right-4 z-50 bg-gradient-to-r ${colors} px-6 py-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-lg max-w-md`}
            >
              <div className="flex items-start gap-3">
                <NotificationIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{notification.message}</p>
                  {notification.appointment && (
                    <p className="text-xs opacity-90 mt-1">
                      {notification.appointment.type} - {notification.appointment.time}
                    </p>
                  )}
                </div>
                <motion.button
                  onClick={() => dismissNotification(notification.id)}
                  className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 flex justify-between items-center relative z-40">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HealthCare+
          </h1>
        </motion.div>
        
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-blue-500 text-white shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-30 w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 lg:flex flex-col transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Sidebar Header */}
          <div className="hidden lg:flex items-center gap-3 p-8 border-b border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HealthCare+
              </h1>
              <p className="text-sm text-gray-500">Doctor Portal</p>
            </div>
          </div>

          {/* Doctor Info */}
          {doctor && (
            <motion.div
              className="p-6 border-b border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.email}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 p-6">
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group border ${
                    item.active 
                      ? 'bg-blue-500/20 border-blue-400/50 text-blue-700' 
                      : 'bg-white/50 hover:bg-white/80 backdrop-blur-sm border-white/20 hover:border-white/40'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    item.active ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-6 border-t border-white/10">
            <motion.button
              onClick={() => {
                localStorage.removeItem('user')
                router.push('/login')
              }}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-300 border border-red-200 hover:border-red-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </motion.button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 relative z-10">
          {/* Welcome Section */}
          {doctor && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black mb-3">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      Welcome back,
                    </span>
                    <br />
                    <span className="text-gray-800">{doctor.name}!</span>
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Ready to provide excellent care today?
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: Calendar, label: 'Appointments Today', value: appointments.length, color: 'blue' },
              { icon: Users, label: 'Total Number of Patients', value: new Set(appointments.map(a => a.patientEmail)).size, color: 'green' },
              { icon: Activity, label: 'Currently Active', value: notifications.filter(n => n.type === 'warning').length, color: 'purple' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${
                    stat.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                    stat.color === 'green' ? 'from-green-500 to-emerald-500' :
                    'from-purple-500 to-pink-500'
                  } rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Appointments Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {(() => {
              const now = new Date()
              console.log('🕐 Current time:', now.toISOString())

              const upcomingAppointments = appointments.filter(apt => {
                const aptDateTime = new Date(`${apt.date}T${apt.time}`)
                console.log(`Checking appointment: ${apt.date} ${apt.time} -> ${aptDateTime >= now ? 'UPCOMING' : 'PAST'}`)
                return aptDateTime >= now
              })
              const pastAppointments = appointments.filter(apt => {
                const aptDateTime = new Date(`${apt.date}T${apt.time}`)
                return aptDateTime < now
              })

              console.log('⏰ Upcoming appointments:', upcomingAppointments.length)
              console.log('📅 Past appointments:', pastAppointments.length)

              return (
                <>
                  {/* Upcoming Appointments */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-black text-gray-800">Upcoming Appointments</h2>
                      {upcomingAppointments.length > 0 && (
                        <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                          {upcomingAppointments.length} {upcomingAppointments.length === 1 ? 'appointment' : 'appointments'}
                        </span>
                      )}
                    </div>

                    {upcomingAppointments.length === 0 ? (
                      <motion.div
                        className="text-center py-16"
                        variants={itemVariants}
                      >
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Calendar className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Upcoming Appointments</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                          Your schedule is clear. This is an excellent opportunity to catch up on administrative tasks or take a well-deserved break.
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-6">
                        {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    variants={itemVariants}
                    className="bg-white/60 backdrop-blur-lg p-6 lg:p-8 rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <User className="w-7 h-7 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{appointment.patientName}</h3>
                            
                            <div className="flex items-center gap-4 text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">
                                  {new Date(appointment.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{appointment.time}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-gray-600">
                              <p><span className="font-medium">Email:</span> {appointment.patientEmail}</p>
                              <p><span className="font-medium">Treatment:</span> {appointment.type}</p>
                              {appointment.symptoms && (
                                <p><span className="font-medium">Symptoms:</span> {appointment.symptoms}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 flex-shrink-0">
                        <motion.button
                          onClick={() => router.push(`/dashboard/doctor/appointments/edit/${appointment.id}`)}
                          className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-amber-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => cancelAppointment(appointment.id, appointment.patientName)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-red-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Cancel</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => router.push(`/dashboard/doctor/telemedicine/${appointment.id}`)}
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-blue-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Details</span>
                        </motion.button>

                        <motion.button
                          onClick={() => router.push(`/dashboard/doctor/chat/${appointment.id}`)}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-green-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span className="hidden sm:inline">Chat</span>
                        </motion.button>

                        <motion.button
                          onClick={() => router.push(`/dashboard/doctor/patient/${encodeURIComponent(appointment.patientEmail)}`)}
                          className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-purple-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <User className="w-4 h-4" />
                          <span className="hidden sm:inline">Patient Info</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Past Appointments */}
                  {pastAppointments.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black text-gray-500">Past Appointments</h2>
                        <span className="bg-gray-400 text-white px-4 py-2 rounded-full font-semibold text-sm">
                          {pastAppointments.length} completed
                        </span>
                      </div>

                      <div className="space-y-6 opacity-60">
                        {pastAppointments.map((appointment, index) => (
                          <motion.div
                            key={appointment.id}
                            variants={itemVariants}
                            className="bg-gray-100/60 backdrop-blur-lg p-6 lg:p-8 rounded-3xl border border-gray-200 shadow"
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                              <div className="flex-1">
                                <div className="flex items-start gap-4">
                                  <div className="w-14 h-14 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <User className="w-7 h-7 text-white" />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">{appointment.patientName}</h3>

                                    <div className="flex items-center gap-4 text-gray-500 mb-3">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span className="font-medium">
                                          {new Date(appointment.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'short',
                                            day: 'numeric'
                                          })}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span className="font-medium">{appointment.time}</span>
                                      </div>
                                    </div>

                                    <div className="space-y-2 text-gray-500">
                                      <p><span className="font-medium">Email:</span> {appointment.patientEmail}</p>
                                      <p><span className="font-medium">Treatment:</span> {appointment.type}</p>
                                      {appointment.symptoms && (
                                        <p><span className="font-medium">Symptoms:</span> {appointment.symptoms}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-3 flex-shrink-0">
                                <span className="bg-gray-300 text-gray-600 px-4 py-3 rounded-xl font-semibold border border-gray-400 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Completed
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </motion.div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

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




















