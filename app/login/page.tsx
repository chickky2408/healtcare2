
// LoginPage.tsx
// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setMessage('')
//     setLoading(true)

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()
//       if (res.ok) {
//         localStorage.setItem('user', JSON.stringify(data.user))
//         localStorage.setItem('userId', data.user.id)  //add new line 3 may 2024

//         const role = data.user.role
//         if (role === 'USER') {
//           router.push('/dashboard/user')
//         } else if (role === 'DOCTOR') {
//           router.push('/dashboard/doctor')
//         } else if (role === 'ADMIN') {
//           router.push('/dashboard/admin')
//         } else {
//           router.push('/dashboard')
//         }
//       } else {
//         setMessage(data.message || 'Login failed')
//       }
//     } catch {
//       setMessage('Server error. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-lg"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 tracking-tight">Login</h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <motion.input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             whileFocus={{ scale: 1.02 }}
//             transition={{ duration: 0.2 }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <motion.input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             whileFocus={{ scale: 1.02 }}
//             transition={{ duration: 0.2 }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </motion.button>
//         </form>

//         {message && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-red-600 text-sm text-center mt-4"
//           >
//             {message}
//           </motion.p>
//         )}

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don’t have an account?{' '}
//           <a href="/register/user" className="text-blue-600 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </motion.div>
//     </div>
//   )
// }






//ver2 

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, User, Lock, Mail, ArrowLeft, Heart, Shield, Star } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('userId', data.user.id)

        const role = data.user.role
        if (role === 'USER') {
          router.push('/dashboard/user')
        } else if (role === 'DOCTOR') {
          router.push('/dashboard/doctor')
        } else if (role === 'ADMIN') {
          router.push('/dashboard/admin')
        } else {
          router.push('/dashboard')
        }
      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch {
      setMessage('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-lg"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Welcome Content */}
          <motion.div
            className="hidden lg:block text-white space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Back Button */}
            <motion.button
              onClick={() => router.push('/')}
              className="group flex items-center gap-3 text-blue-200 hover:text-white transition-colors duration-300 mb-8"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </motion.button>

            <div className="space-y-4">
              <motion.h1
                className="text-5xl font-black leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Welcome Back
                </span>
                <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  to HealthCare+
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-blue-100 leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your health journey continues here. Access your personalized healthcare dashboard and manage your wellness with confidence.
              </motion.p>
            </div>

            {/* Feature highlights */}
            <motion.div
              className="space-y-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Heart, text: "Personalized Care Plans" },
                { icon: Shield, text: "Secure Health Records" },
                { icon: Star, text: "Expert Medical Team" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-blue-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-blue-300" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Glassmorphism Card */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
              variants={itemVariants}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-3xl blur opacity-20 -z-10"></div>
              
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Sign In</h2>
                <p className="text-blue-100 font-medium">Access your healthcare dashboard</p>
              </motion.div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-14 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </motion.div>

                {/* Login Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={loading}
                  className="w-full relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Signing in...
                      </div>
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </form>

              {/* Error Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl"
                >
                  <p className="text-red-200 text-sm text-center font-medium">{message}</p>
                </motion.div>
              )}

              {/* Register Link */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-8 pt-6 border-t border-white/20"
              >
                <p className="text-blue-100 font-medium">
                  New to HealthCare+?{' '}
                  <motion.a
                    href="/register/user"
                    className="text-white hover:text-blue-300 transition-colors duration-300 font-bold relative group"
                    whileHover={{ y: -1 }}
                  >
                    Create Account
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                </p>
              </motion.div>

              {/* Mobile Back Button */}
              <motion.button
                onClick={() => router.push('/')}
                className="lg:hidden w-full mt-6 flex items-center justify-center gap-2 text-blue-200 hover:text-white transition-colors duration-300 py-3 border border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/10"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Home</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        /* Custom input autofill styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
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