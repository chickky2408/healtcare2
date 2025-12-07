// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { ReactNode } from 'react'

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) {
//         router.push('/login')
//         return
//       }
    
//     // ✅ เช็คทั้ง null และ "undefined"
//     if (!stored || stored === 'undefined') {
//       router.push('/login')
//       return
//     }

//     try {
//       const user = JSON.parse(stored)

//       if (user.role !== 'ADMIN') {
//         router.push('/login')
        
//       }
//     } catch (error) {
//       console.error('JSON parse error:', error)
//       router.push('/login')
//     }
//   }, [router])

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white px-6 py-8 space-y-4">
//         <h2 className="text-2xl font-bold mb-6">🛠 Admin Panel</h2>
//         <nav className="space-y-2 text-sm">
//           <button onClick={() => router.push('/dashboard/admin/doctors')} className="block w-full text-left hover:bg-white/10 px-3 py-2 rounded">
//             👨‍⚕️ View All Doctors
//           </button>
//           <button onClick={() => router.push('/dashboard/admin/appointments')} className="block w-full text-left hover:bg-white/10 px-3 py-2 rounded">
//             📅 All Appointments
//           </button>
//           <button onClick={() => router.push('/dashboard/admin/users')} className="block w-full text-left hover:bg-white/10 px-3 py-2 rounded">
//             👥 Manage Users
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 relative">

//       <button
//     onClick={() => {
//       localStorage.removeItem('user')
//       localStorage.removeItem('userId')
//       router.push('/login')
//     }}
//     className="absolute top-4 right-4 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//   >
//     Logout
//   </button>




//         {children}
//       </main>
      
//     </div>
//   )
// }









'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield,
  Users,
  Calendar,
  Stethoscope,
  Menu,
  X,
  LogOut,
  Settings,
  BarChart3,
  Bell,
  Heart,
  Star,
  User,
  ChevronDown
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored || stored === 'undefined') {
      router.push('/login')
      return
    }

    try {
      const userData = JSON.parse(stored)
      if (userData.role !== 'ADMIN') {
        router.push('/login')
        return
      }
      setUser(userData)
    } catch (error) {
      console.error('JSON parse error:', error)
      router.push('/login')
      return
    }
    
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    router.push('/login')
  }

  const menuItems = [
    {
      icon: Stethoscope,
      label: 'Doctors',
      path: '/dashboard/admin/doctors',
      description: 'Manage medical staff'
    },
    {
      icon: Calendar,
      label: 'Appointments',
      path: '/dashboard/admin/appointments',
      description: 'View all appointments'
    },
    {
      icon: Users,
      label: 'Users',
      path: '/dashboard/admin/users',
      description: 'Manage system users'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      path: '/dashboard/admin/analytics',
      description: 'System reports'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/dashboard/admin/settings',
      description: 'System configuration'
    }
  ]

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
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
          <p className="text-xl font-semibold">Loading admin panel...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return null
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
        
        {/* Floating Medical Icons */}
        <motion.div
          className="absolute top-1/4 right-1/4 text-blue-100/20 text-6xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/4 text-purple-100/20 text-6xl"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute top-2/3 right-1/3 text-blue-100/20 text-6xl"
          animate={{ 
            x: [0, 25, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-12 h-12" />
        </motion.div>
      </div>

      {/* Top Header */}
      <motion.header
        className="relative z-40 bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-blue-500 text-white shadow-lg"
              whileTap={{ scale: 0.95 }}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
            
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HealthCare+
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">Admin Panel</p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              className="relative p-3 rounded-xl bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Profile Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 rounded-xl bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl z-50"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">System Administrator</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Sign Out</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          variants={sidebarVariants}
          animate={sidebarOpen ? "open" : "closed"}
          className="fixed lg:relative lg:translate-x-0 inset-y-0 left-0 top-16 lg:top-0 z-30 w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 lg:flex flex-col"
        >
          {/* Sidebar Header - Only visible on desktop */}
          <div className="hidden lg:flex items-center gap-3 p-8 border-b border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-sm text-gray-500">System Management</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-6 pt-8 lg:pt-6">
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path)
                    setSidebarOpen(false) // Close sidebar on mobile after navigation
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 group border border-white/20 hover:border-white/40"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
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

          {/* Quick Actions */}
          <div className="p-6 border-t border-white/10">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-200/30">
              <h3 className="font-bold text-gray-800 mb-2">System Status</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 relative z-10">
          <div className="p-6 lg:p-12">
            {children}
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