// 'use client'

// import { useEffect, useState } from 'react'

// export default function AdminDashboardPage() {
//   interface Admin {
//     name: string
//     email: string
//     role: string
//   }

//   const [admin, setAdmin] = useState<Admin | null>(null)

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (stored) {
//       const user = JSON.parse(stored)
//       if (user.role !== 'ADMIN') {
//         window.location.href = '/login'
//       } else {
//         setAdmin(user)
//       }
//     } else {
//       window.location.href = '/login'
//     }
//   }, [])

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome, Admin</h1>
//       {admin && (
//         <div className="bg-white p-4 rounded shadow text-gray-700">
//           <p><strong>Name:</strong> {admin.name}</p>
//           <p><strong>Email:</strong> {admin.email}</p>
//         </div>
//       )}
//     </div>
//   )
// }



//8 Oct 2025

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import { 
//   Shield,
//   Users,
//   Calendar,
//   Activity,
//   Settings,
//   BarChart3,
//   UserCheck,
//   Stethoscope,
//   Menu,
//   X,
//   LogOut,
//   Plus,
//   Edit,
//   Trash2,
//   Search,
//   Filter,
//   TrendingUp,
//   Heart,
//   Star,
//   Clock,
//   Mail,
//   Phone,
//   MapPin
// } from 'lucide-react'

// interface Admin {
//   name: string
//   email: string
//   role: string
// }

// export default function AdminDashboardPage() {
//   const [admin, setAdmin] = useState<Admin | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState('overview')
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (stored) {
//       const user = JSON.parse(stored)
//       if (user.role !== 'ADMIN') {
//         router.push('/login')
//       } else {
//         setAdmin(user)
//       }
//     } else {
//       router.push('/login')
//     }
//     setLoading(false)
//   }, [router])

//   const menuItems = [
//     {
//       id: 'overview',
//       icon: BarChart3,
//       label: 'Overview',
//       description: 'System statistics and insights'
//     },
//     {
//       id: 'users',
//       icon: Users,
//       label: 'User Management',
//       description: 'Manage patients and staff'
//     },
//     {
//       id: 'appointments',
//       icon: Calendar,
//       label: 'Appointments',
//       description: 'View all appointments'
//     },
//     {
//       id: 'doctors',
//       icon: Stethoscope,
//       label: 'Doctors',
//       description: 'Manage medical staff'
//     },
//     {
//       id: 'analytics',
//       icon: TrendingUp,
//       label: 'Analytics',
//       description: 'Reports and analytics'
//     },
//     {
//       id: 'settings',
//       icon: Settings,
//       label: 'Settings',
//       description: 'System configuration'
//     }
//   ]

//   // Mock data for demonstration
//   const statsData = [
//     { icon: Users, label: 'Total Patients', value: '2,847', change: '+12%', color: 'blue' },
//     { icon: Stethoscope, label: 'Active Doctors', value: '24', change: '+2', color: 'green' },
//     { icon: Calendar, label: 'Today\'s Appointments', value: '156', change: '+8%', color: 'purple' },
//     { icon: Activity, label: 'System Health', value: '99.9%', change: 'Excellent', color: 'emerald' }
//   ]

//   const recentActivities = [
//     { id: 1, type: 'appointment', message: 'New appointment booked by John Doe', time: '2 minutes ago', icon: Calendar },
//     { id: 2, type: 'user', message: 'Dr. Sarah Johnson joined the system', time: '15 minutes ago', icon: UserCheck },
//     { id: 3, type: 'system', message: 'System backup completed successfully', time: '1 hour ago', icon: Shield },
//     { id: 4, type: 'appointment', message: 'Appointment cancelled by Jane Smith', time: '2 hours ago', icon: Calendar },
//     { id: 5, type: 'user', message: 'New patient registration: Mike Wilson', time: '3 hours ago', icon: Users }
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
//           <p className="text-xl font-semibold">Loading admin dashboard...</p>
//         </motion.div>
//       </div>
//     )
//   }

//   if (!admin) {
//     return null
//   }

//   const renderOverviewContent = () => (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-8"
//     >
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statsData.map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             variants={itemVariants}
//             className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
//             whileHover={{ y: -5 }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`w-12 h-12 bg-gradient-to-r ${
//                 stat.color === 'blue' ? 'from-blue-500 to-cyan-500' :
//                 stat.color === 'green' ? 'from-green-500 to-emerald-500' :
//                 stat.color === 'purple' ? 'from-purple-500 to-pink-500' :
//                 'from-emerald-500 to-green-500'
//               } rounded-2xl flex items-center justify-center shadow-lg`}>
//                 <stat.icon className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-green-600">{stat.change}</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
//             <p className="text-gray-600 font-medium">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Recent Activities */}
//       <motion.div
//         variants={itemVariants}
//         className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-lg"
//       >
//         <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//           <Activity className="w-6 h-6 text-blue-500" />
//           Recent Activities
//         </h3>
//         <div className="space-y-4">
//           {recentActivities.map((activity, index) => (
//             <motion.div
//               key={activity.id}
//               className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/20"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
//                 activity.type === 'appointment' ? 'bg-blue-500/20 text-blue-600' :
//                 activity.type === 'user' ? 'bg-green-500/20 text-green-600' :
//                 'bg-purple-500/20 text-purple-600'
//               }`}>
//                 <activity.icon className="w-5 h-5" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium text-gray-800">{activity.message}</p>
//                 <p className="text-sm text-gray-500">{activity.time}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   )

//   const renderPlaceholderContent = (title: string, description: string) => (
//     <motion.div
//       className="text-center py-16"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
//         <Settings className="w-12 h-12 text-blue-500" />
//       </div>
//       <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
//       <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
//       <motion.button
//         className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Plus className="w-5 h-5" />
//         Coming Soon
//       </motion.button>
//     </motion.div>
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
//       {/* Background decorations */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-20 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"
//           animate={{ 
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3]
//           }}
//           transition={{ duration: 8, repeat: Infinity }}
//         />
//         <motion.div
//           className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"
//           animate={{ 
//             scale: [1.2, 1, 1.2],
//             opacity: [0.2, 0.4, 0.2]
//           }}
//           transition={{ duration: 10, repeat: Infinity }}
//         />
//       </div>

//       {/* Mobile Header */}
//       <div className="lg:hidden bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 flex justify-between items-center relative z-40">
//         <motion.div
//           className="flex items-center gap-3"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
//             <Shield className="w-4 h-4 text-white" />
//           </div>
//           <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             HealthCare+ Admin
//           </h1>
//         </motion.div>
        
//         <motion.button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="p-2 rounded-xl bg-blue-500 text-white shadow-lg"
//           whileTap={{ scale: 0.95 }}
//         >
//           {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </motion.button>
//       </div>

//       <div className="flex">
//         {/* Sidebar */}
//         <motion.aside
//           className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-30 w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 lg:flex flex-col transition-transform duration-300 ${
//             sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           {/* Sidebar Header */}
//           <div className="hidden lg:flex items-center gap-3 p-8 border-b border-white/10">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
//               <Shield className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 HealthCare+
//               </h1>
//               <p className="text-sm text-gray-500">Admin Panel</p>
//             </div>
//           </div>

//           {/* Admin Info */}
//           <motion.div
//             className="p-6 border-b border-white/10"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                 {admin.name.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h3 className="font-bold text-gray-800">{admin.name}</h3>
//                 <p className="text-sm text-gray-500">System Administrator</p>
//                 <p className="text-xs text-gray-400">{admin.email}</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Menu Items */}
//           <nav className="flex-1 p-6">
//             <div className="space-y-2">
//               {menuItems.map((item, index) => (
//                 <motion.button
//                   key={item.id}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group border ${
//                     activeTab === item.id 
//                       ? 'bg-blue-500/20 border-blue-400/50 text-blue-700' 
//                       : 'bg-white/50 hover:bg-white/80 backdrop-blur-sm border-white/20 hover:border-white/40'
//                   }`}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.1 * index }}
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
//                     activeTab === item.id 
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
//                       : 'bg-gradient-to-r from-gray-400 to-gray-500 group-hover:from-blue-400 group-hover:to-purple-400'
//                   }`}>
//                     <item.icon className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="text-left flex-1">
//                     <p className="font-semibold text-gray-700 group-hover:text-gray-900">{item.label}</p>
//                     <p className="text-xs text-gray-500 group-hover:text-gray-600">{item.description}</p>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
//           </nav>

//           {/* Logout Button */}
//           <div className="p-6 border-t border-white/10">
//             <motion.button
//               onClick={() => {
//                 localStorage.removeItem('user')
//                 router.push('/login')
//               }}
//               className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-300 border border-red-200 hover:border-red-300"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <LogOut className="w-5 h-5" />
//               <span className="font-semibold">Logout</span>
//             </motion.button>
//           </div>
//         </motion.aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 lg:p-12 relative z-10">
//           {/* Welcome Section */}
//           <motion.div
//             className="mb-12"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             <h1 className="text-4xl lg:text-5xl font-black mb-3">
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
//                 Admin Dashboard
//               </span>
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Welcome back, {admin.name}. Here's what's happening in your healthcare system today.
//             </p>
//           </motion.div>

//           {/* Tab Content */}
//           <div className="relative">
//             {activeTab === 'overview' && renderOverviewContent()}
//             {activeTab === 'users' && renderPlaceholderContent('User Management', 'Manage all system users, patients, and their permissions.')}
//             {activeTab === 'appointments' && renderPlaceholderContent('Appointment Management', 'View and manage all appointments across the system.')}
//             {activeTab === 'doctors' && renderPlaceholderContent('Doctor Management', 'Manage medical staff, schedules, and profiles.')}
//             {activeTab === 'analytics' && renderPlaceholderContent('Analytics & Reports', 'View detailed reports and system analytics.')}
//             {activeTab === 'settings' && renderPlaceholderContent('System Settings', 'Configure system settings and preferences.')}
//           </div>
//         </main>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSidebarOpen(false)}
//           />
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


//manage appointment 

// 'use client'

// import { useEffect, useState } from 'react'

// export default function AdminAppointmentsPage() {
//   interface Appointment {
//     id: string;
//     patientName: string;
//     patientEmail: string;
//     doctor?: {
//       name: string;
//     };
//     date: string;
//     time: string;
//     type: string;
//   }

//   const [appointments, setAppointments] = useState<Appointment[]>([])

//   useEffect(() => {
//     fetchAppointments()
//   }, [])

//   const fetchAppointments = async () => {
//     const res = await fetch('/api/admin/appointments')
//     const data = await res.json()
//     setAppointments(data)
//   }

//   const handleDelete = async (id: string) => {
//     const confirm = window.confirm('Are you sure you want to delete this appointment?')
//     if (!confirm) return

//     const res = await fetch(`/api/appointments/${id}`, {
//       method: 'DELETE',
//     })

//     if (res.ok) {
//       // ลบออกจาก state โดยไม่ต้อง reload
//       setAppointments(prev => prev.filter(a => a.id !== id))
//     } else {
//       alert('❌ Failed to delete appointment')
//     }
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-blue-700">📅 All Patient Appointments</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Patient</th>
//               <th className="px-4 py-2 text-left">Doctor</th>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Time</th>
//               <th className="px-4 py-2 text-left">Type</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((a) => (
//               <tr key={a.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{a.patientName} ({a.patientEmail})</td>
//                 <td className="px-4 py-2">{a.doctor?.name}</td>
//                 <td className="px-4 py-2">{a.date}</td>
//                 <td className="px-4 py-2">{a.time}</td>
//                 <td className="px-4 py-2">{a.type}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleDelete(a.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }




//8 Oct 2025

// 'use client'

// import { useEffect, useState } from 'react'
// import { Users, UserPlus, Edit, Trash2, Stethoscope, Mail, Phone, X } from 'lucide-react'

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   createdAt?: string
// }

// interface Doctor {
//   id: string
//   name: string
//   specialty: string
//   email: string
//   phone: string
//   image?: string
//   _count?: {
//     appointments: number
//   }
// }

// interface FormData {
//   name: string
//   email: string
//   password: string
//   role: string
//   specialty: string
//   phone: string
//   image: string
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('users')
//   const [users, setUsers] = useState<User[]>([])
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [showModal, setShowModal] = useState(false)
//   const [modalType, setModalType] = useState('')
//   const [selectedItem, setSelectedItem] = useState<User | Doctor | null>(null)

//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: '',
//     role: 'USER',
//     specialty: '',
//     phone: '',
//     image: ''
//   })

//   useEffect(() => {
//     fetchUsers()
//     fetchDoctors()
//   }, [])

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('/api/admin/users')
//       const data = await res.json()
//       setUsers(data)
//     } catch (error) {
//       console.error('Error fetching users:', error)
//     }
//   }

//   const fetchDoctors = async () => {
//     try {
//       // ใช้ API ที่มีอยู่แล้ว
//       const res = await fetch('/api/admin/doctors')
//       const data = await res.json()
//       // ถ้า response เป็น { doctors: [...] } ให้ใช้ data.doctors
//       // ถ้า response เป็น [...] ตรงๆ ให้ใช้ data
//       setDoctors(Array.isArray(data) ? data : data.doctors || [])
//     } catch (error) {
//       console.error('Error fetching doctors:', error)
//     }
//   }

//   const openModal = (type: string, item: User | Doctor | null = null) => {
//     setModalType(type)
//     setSelectedItem(item)
//     if (item) {
//       setFormData({
//         name: item.name || '',
//         email: item.email || '',
//         password: '',
//         role: 'role' in item ? item.role : 'USER',
//         specialty: 'specialty' in item ? item.specialty : '',
//         phone: 'phone' in item ? item.phone : '',
//         image: 'image' in item ? item.image || '' : ''
//       })
//     } else {
//       setFormData({
//         name: '',
//         email: '',
//         password: '',
//         role: 'USER',
//         specialty: '',
//         phone: '',
//         image: ''
//       })
//     }
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setModalType('')
//     setSelectedItem(null)
//   }

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.email) {
//       alert('⚠️ Please fill in all required fields')
//       return
//     }

//     if (modalType === 'addUser' && !formData.password) {
//       alert('⚠️ Password is required')
//       return
//     }
    
//     try {
//       if (modalType === 'addUser') {
//         const res = await fetch('/api/admin/users', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             password: formData.password,
//             role: formData.role
//           })
//         })
//         if (res.ok) {
//           fetchUsers()
//           closeModal()
//           alert('✅ User created successfully!')
//         } else {
//           const error = await res.json()
//           alert('❌ ' + error.error)
//         }
//       } else if (modalType === 'editUser' && selectedItem) {
//         // ใช้ API ที่มีอยู่แล้ว: /api/admin/users/[id]
//         const res = await fetch(`/api/admin/users/${selectedItem.id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             role: formData.role
//           })
//         })
//         if (res.ok) {
//           fetchUsers()
//           closeModal()
//           alert('✅ User updated successfully!')
//         } else {
//           alert('❌ Failed to update user')
//         }
//       } else if (modalType === 'addDoctor') {
//         const res = await fetch('/api/admin/doctors', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name: formData.name,
//             specialty: formData.specialty,
//             email: formData.email,
//             phone: formData.phone,
//             image: formData.image || 'https://via.placeholder.com/150'
//           })
//         })
//         if (res.ok) {
//           fetchDoctors()
//           closeModal()
//           alert('✅ Doctor created successfully!')
//         } else {
//           alert('❌ Failed to create doctor')
//         }
//       } else if (modalType === 'editDoctor' && selectedItem) {
//         const res = await fetch(`/api/admin/doctors/${selectedItem.id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name: formData.name,
//             specialty: formData.specialty,
//             email: formData.email,
//             phone: formData.phone,
//             image: formData.image
//           })
//         })
//         if (res.ok) {
//           fetchDoctors()
//           closeModal()
//           alert('✅ Doctor updated successfully!')
//         } else {
//           alert('❌ Failed to update doctor')
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error)
//       alert('❌ An error occurred')
//     }
//   }

//   const handleDeleteUser = async (id: string) => {
//     if (!window.confirm('⚠️ Are you sure you want to delete this user?')) return
    
//     try {
//       const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
//       if (res.ok) {
//         fetchUsers()
//         alert('✅ User deleted successfully!')
//       } else {
//         alert('❌ Failed to delete user')
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error)
//       alert('❌ An error occurred')
//     }
//   }

//   const handleDeleteDoctor = async (id: string) => {
//     if (!window.confirm('⚠️ Are you sure you want to delete this doctor? All related appointments will be deleted.')) return
    
//     try {
//       const res = await fetch(`/api/admin/doctors/${id}`, { method: 'DELETE' })
//       if (res.ok) {
//         fetchDoctors()
//         alert('✅ Doctor deleted successfully!')
//       } else {
//         alert('❌ Failed to delete doctor')
//       }
//     } catch (error) {
//       console.error('Error deleting doctor:', error)
//       alert('❌ An error occurred')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">🏥 Admin Dashboard</h1>
//           <p className="text-gray-600">Manage users and doctors in your healthcare system</p>
//         </div>

//         <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
//           <button
//             onClick={() => setActiveTab('users')}
//             className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
//               activeTab === 'users'
//                 ? 'bg-blue-600 text-white shadow-lg'
//                 : 'bg-white text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             <Users className="w-5 h-5" />
//             <span>Users</span>
//             <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{users.length}</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('doctors')}
//             className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
//               activeTab === 'doctors'
//                 ? 'bg-purple-600 text-white shadow-lg'
//                 : 'bg-white text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             <Stethoscope className="w-5 h-5" />
//             <span>Doctors</span>
//             <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{doctors.length}</span>
//           </button>
//         </div>

//         {activeTab === 'users' && (
//           <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <h2 className="text-xl md:text-2xl font-bold text-gray-800">👥 User Management</h2>
//               <button
//                 onClick={() => openModal('addUser')}
//                 className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto justify-center shadow-md hover:shadow-lg"
//               >
//                 <UserPlus className="w-5 h-5" />
//                 Add User
//               </button>
//             </div>

//             <div className="overflow-x-auto -mx-4 md:mx-0">
//               <div className="inline-block min-w-full align-middle">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                       <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                       <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                       <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {users.length === 0 ? (
//                       <tr>
//                         <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
//                           No users found. Click "Add User" to create one.
//                         </td>
//                       </tr>
//                     ) : (
//                       users.map((user) => (
//                         <tr key={user.id} className="hover:bg-gray-50">
//                           <td className="px-4 md:px-6 py-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold flex-shrink-0">
//                                 {user.name?.charAt(0).toUpperCase()}
//                               </div>
//                               <span className="font-medium text-gray-900">{user.name}</span>
//                             </div>
//                           </td>
//                           <td className="px-4 md:px-6 py-4 text-gray-600 text-sm">{user.email}</td>
//                           <td className="px-4 md:px-6 py-4">
//                             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               user.role === 'ADMIN' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                             }`}>
//                               {user.role}
//                             </span>
//                           </td>
//                           <td className="px-4 md:px-6 py-4">
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => openModal('editUser', user)}
//                                 className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-all"
//                                 title="Edit user"
//                               >
//                                 <Edit className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteUser(user.id)}
//                                 className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-all"
//                                 title="Delete user"
//                               >
//                                 <Trash2 className="w-5 h-5" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'doctors' && (
//           <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <h2 className="text-xl md:text-2xl font-bold text-gray-800">👨‍⚕️ Doctor Management</h2>
//               <button
//                 onClick={() => openModal('addDoctor')}
//                 className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all w-full sm:w-auto justify-center shadow-md hover:shadow-lg"
//               >
//                 <UserPlus className="w-5 h-5" />
//                 Add Doctor
//               </button>
//             </div>

//             {doctors.length === 0 ? (
//               <div className="text-center py-12">
//                 <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">No doctors found.</p>
//                 <p className="text-gray-400 text-sm">Click "Add Doctor" to create one.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {doctors.map((doctor) => (
//                   <div key={doctor.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-purple-200">
//                     <div className="flex justify-between items-start mb-4">
//                       <img
//                         src={doctor.image || 'https://via.placeholder.com/150'}
//                         alt={doctor.name}
//                         className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
//                       />
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => openModal('editDoctor', doctor)}
//                           className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-all"
//                           title="Edit doctor"
//                         >
//                           <Edit className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteDoctor(doctor.id)}
//                           className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-all"
//                           title="Delete doctor"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
//                     <p className="text-purple-600 font-semibold mb-3">{doctor.specialty}</p>
//                     <div className="space-y-2 text-sm text-gray-600">
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-4 h-4 flex-shrink-0" />
//                         <span className="break-all">{doctor.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 flex-shrink-0" />
//                         <span>{doctor.phone}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl md:text-2xl font-bold text-gray-800">
//                 {modalType === 'addUser' && '➕ Add New User'}
//                 {modalType === 'editUser' && '✏️ Edit User'}
//                 {modalType === 'addDoctor' && '➕ Add New Doctor'}
//                 {modalType === 'editDoctor' && '✏️ Edit Doctor'}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-all">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="email@example.com"
//                 />
//               </div>

//               {modalType === 'addUser' && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
//                   <input
//                     type="password"
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter password"
//                   />
//                 </div>
//               )}

//               {(modalType === 'addUser' || modalType === 'editUser') && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
//                   <select
//                     value={formData.role}
//                     onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="USER">USER</option>
//                     <option value="ADMIN">ADMIN</option>
//                   </select>
//                 </div>
//               )}

//               {(modalType === 'addDoctor' || modalType === 'editDoctor') && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Specialty *</label>
//                     <input
//                       type="text"
//                       value={formData.specialty}
//                       onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="e.g. Cardiologist, Pediatrician"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
//                     <input
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="089-123-4567"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
//                     <input
//                       type="url"
//                       value={formData.image}
//                       onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="https://example.com/image.jpg"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Leave empty for default placeholder</p>
//                   </div>
//                 </>
//               )}

//               <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                 <button
//                   onClick={handleSubmit}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
//                 >
//                   {modalType.startsWith('add') ? '✨ Create' : '💾 Update'}
//                 </button>
//                 <button
//                   onClick={closeModal}
//                   className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




// app/admin/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Users, UserPlus, Edit, Trash2, Stethoscope, Mail, Phone, X } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  createdAt?: string
}

interface Doctor {
  id: string
  name: string
  specialty: string
  email: string
  phone?: string
  image?: string
}

interface FormData {
  name: string
  email: string
  password: string
  specialty: string
  phone: string
  image: string
}

interface Appointment {
  id: string
  patientName: string
  patientEmail: string
  date: string
  time: string
  type: string
  symptoms: string
  doctor: {
    name: string
    specialty: string
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState<User[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedItem, setSelectedItem] = useState<User | Doctor | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    specialty: '',
    phone: '',
    image: ''
  })

  useEffect(() => {
    fetchUsers()
    fetchDoctors()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors')
      const data = await res.json()
      setDoctors(Array.isArray(data) ? data : data.doctors || [])
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
  }

  const openModal = (type: string, item: User | Doctor | null = null) => {
    setModalType(type)
    setSelectedItem(item)
    if (item) {
      setFormData({
        name: item.name || '',
        email: item.email || '',
        password: '',
        specialty: 'specialty' in item ? item.specialty : '',
        phone: 'phone' in item ? item.phone || '' : '',
        image: 'image' in item ? item.image || '' : ''
      })
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        specialty: '',
        phone: '',
        image: ''
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
    setSelectedItem(null)
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert('⚠️ Please fill in all required fields')
      return
    }
    
    try {
      if (modalType === 'addUser') {
        if (!formData.password) {
          alert('⚠️ Password is required')
          return
        }
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        })
        if (res.ok) {
          fetchUsers()
          closeModal()
          alert('✅ User created successfully!')
        } else {
          const error = await res.json()
          alert('❌ ' + error.error)
        }
      } else if (modalType === 'editUser' && selectedItem) {
        const updatePayload: any = {
          name: formData.name,
          email: formData.email
        }
        if (formData.password && formData.password.trim() !== '') {
          updatePayload.password = formData.password
        }
        const res = await fetch(`/api/users/${selectedItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        })
        if (res.ok) {
          fetchUsers()
          closeModal()
          alert('✅ User updated successfully!')
        } else {
          alert('❌ Failed to update user')
        }
      } else if (modalType === 'addDoctor') {
        const res = await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            specialty: formData.specialty,
            email: formData.email,
            phone: formData.phone || '000-000-0000',
            password: formData.password || 'defaultpassword123',
            availableTimes: {}
          })
        })
        if (res.ok) {
          fetchDoctors()
          closeModal()
          alert('✅ Doctor created successfully!')
        } else {
          alert('❌ Failed to create doctor')
        }
      } else if (modalType === 'editDoctor' && selectedItem) {
        const res = await fetch(`/api/doctors/${selectedItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            specialty: formData.specialty,
            email: formData.email,
            phone: formData.phone
          })
        })
        if (res.ok) {
          fetchDoctors()
          closeModal()
          alert('✅ Doctor updated successfully!')
        } else {
          alert('❌ Failed to update doctor')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ An error occurred')
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this user?')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchUsers()
        alert('✅ User deleted successfully!')
      } else {
        alert('❌ Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('❌ An error occurred')
    }
  }

  const handleDeleteDoctor = async (id: string) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this doctor?')) return
    try {
      const res = await fetch(`/api/doctors/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchDoctors()
        alert('✅ Doctor deleted successfully!')
      } else {
        alert('❌ Failed to delete doctor')
      }
    } catch (error) {
      console.error('Error deleting doctor:', error)
      alert('❌ An error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">🏥 Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and doctors in your healthcare system</p>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{users.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'doctors'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            <span>Doctors</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{doctors.length}</span>
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">👥 User Management</h2>
              <button
                onClick={() => openModal('addUser')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto justify-center shadow-md hover:shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                Add User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No users found. Click "Add User" to create one.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal('editUser', user)}
                              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">👨‍⚕️ Doctor Management</h2>
              <button
                onClick={() => openModal('addDoctor')}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all w-full sm:w-auto justify-center shadow-md hover:shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                Add Doctor
              </button>
            </div>

            {doctors.length === 0 ? (
              <div className="text-center py-12">
                <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No doctors found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="border rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-2xl">
                        {doctor.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal('editDoctor', doctor)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDoctor(doctor.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                    <p className="text-purple-600 font-semibold mb-3">{doctor.specialty}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="break-all">{doctor.email}</span>
                      </div>
                      {doctor.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{doctor.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {modalType === 'addUser' && '➕ Add New User'}
                {modalType === 'editUser' && '✏️ Edit User'}
                {modalType === 'addDoctor' && '➕ Add New Doctor'}
                {modalType === 'editDoctor' && '✏️ Edit Doctor'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              {(modalType === 'addUser' || modalType === 'addDoctor') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              )}

              {modalType === 'editUser' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Leave empty to keep current"
                  />
                </div>
              )}

              {(modalType === 'addDoctor' || modalType === 'editDoctor') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialty *</label>
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g. Cardiologist"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="089-123-4567"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {modalType.startsWith('add') ? '✨ Create' : '💾 Update'}
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}






