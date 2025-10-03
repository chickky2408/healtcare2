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





'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield,
  Users,
  Calendar,
  Activity,
  Settings,
  BarChart3,
  UserCheck,
  Stethoscope,
  Menu,
  X,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  TrendingUp,
  Heart,
  Star,
  Clock,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

interface Admin {
  name: string
  email: string
  role: string
}

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const user = JSON.parse(stored)
      if (user.role !== 'ADMIN') {
        router.push('/login')
      } else {
        setAdmin(user)
      }
    } else {
      router.push('/login')
    }
    setLoading(false)
  }, [router])

  const menuItems = [
    {
      id: 'overview',
      icon: BarChart3,
      label: 'Overview',
      description: 'System statistics and insights'
    },
    {
      id: 'users',
      icon: Users,
      label: 'User Management',
      description: 'Manage patients and staff'
    },
    {
      id: 'appointments',
      icon: Calendar,
      label: 'Appointments',
      description: 'View all appointments'
    },
    {
      id: 'doctors',
      icon: Stethoscope,
      label: 'Doctors',
      description: 'Manage medical staff'
    },
    {
      id: 'analytics',
      icon: TrendingUp,
      label: 'Analytics',
      description: 'Reports and analytics'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      description: 'System configuration'
    }
  ]

  // Mock data for demonstration
  const statsData = [
    { icon: Users, label: 'Total Patients', value: '2,847', change: '+12%', color: 'blue' },
    { icon: Stethoscope, label: 'Active Doctors', value: '24', change: '+2', color: 'green' },
    { icon: Calendar, label: 'Today\'s Appointments', value: '156', change: '+8%', color: 'purple' },
    { icon: Activity, label: 'System Health', value: '99.9%', change: 'Excellent', color: 'emerald' }
  ]

  const recentActivities = [
    { id: 1, type: 'appointment', message: 'New appointment booked by John Doe', time: '2 minutes ago', icon: Calendar },
    { id: 2, type: 'user', message: 'Dr. Sarah Johnson joined the system', time: '15 minutes ago', icon: UserCheck },
    { id: 3, type: 'system', message: 'System backup completed successfully', time: '1 hour ago', icon: Shield },
    { id: 4, type: 'appointment', message: 'Appointment cancelled by Jane Smith', time: '2 hours ago', icon: Calendar },
    { id: 5, type: 'user', message: 'New patient registration: Mike Wilson', time: '3 hours ago', icon: Users }
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
          <p className="text-xl font-semibold">Loading admin dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!admin) {
    return null
  }

  const renderOverviewContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${
                stat.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                stat.color === 'green' ? 'from-green-500 to-emerald-500' :
                stat.color === 'purple' ? 'from-purple-500 to-pink-500' :
                'from-emerald-500 to-green-500'
              } rounded-2xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <motion.div
        variants={itemVariants}
        className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-500" />
          Recent Activities
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                activity.type === 'appointment' ? 'bg-blue-500/20 text-blue-600' :
                activity.type === 'user' ? 'bg-green-500/20 text-green-600' :
                'bg-purple-500/20 text-purple-600'
              }`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )

  const renderPlaceholderContent = (title: string, description: string) => (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Settings className="w-12 h-12 text-blue-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      <motion.button
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5" />
        Coming Soon
      </motion.button>
    </motion.div>
  )

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

      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 flex justify-between items-center relative z-40">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HealthCare+ Admin
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HealthCare+
              </h1>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Admin Info */}
          <motion.div
            className="p-6 border-b border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {admin.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{admin.name}</h3>
                <p className="text-sm text-gray-500">System Administrator</p>
                <p className="text-xs text-gray-400">{admin.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Menu Items */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group border ${
                    activeTab === item.id 
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
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 group-hover:from-blue-400 group-hover:to-purple-400'
                  }`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-700 group-hover:text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600">{item.description}</p>
                  </div>
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
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl lg:text-5xl font-black mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back, {admin.name}. Here's what's happening in your healthcare system today.
            </p>
          </motion.div>

          {/* Tab Content */}
          <div className="relative">
            {activeTab === 'overview' && renderOverviewContent()}
            {activeTab === 'users' && renderPlaceholderContent('User Management', 'Manage all system users, patients, and their permissions.')}
            {activeTab === 'appointments' && renderPlaceholderContent('Appointment Management', 'View and manage all appointments across the system.')}
            {activeTab === 'doctors' && renderPlaceholderContent('Doctor Management', 'Manage medical staff, schedules, and profiles.')}
            {activeTab === 'analytics' && renderPlaceholderContent('Analytics & Reports', 'View detailed reports and system analytics.')}
            {activeTab === 'settings' && renderPlaceholderContent('System Settings', 'Configure system settings and preferences.')}
          </div>
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