
// This is a React component for a user registration form.

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { motion } from 'framer-motion'

// export default function AuthForm() {
//   const router = useRouter()

//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await fetch('/api/register/user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         toast.success('Registration successful!')
//         router.push('/login')
//       } else {
//         toast.error(data.message || 'Registration failed')
//       }
//     } catch {
//       toast.error('Server error. Please try again later.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
//     >
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
//           Register as User
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded"
//           />
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded"
//           />
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded"
//           />

//           <motion.button
//             whileTap={{ scale: 0.98 }}
//             whileHover={{ scale: 1.01 }}
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-blue-600 text-white py-2 rounded transition hover:bg-blue-700 ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </motion.button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </motion.div>
//   )
// }





// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { motion } from 'framer-motion'

// export default function AuthForm() {
//   const router = useRouter()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await fetch('/api/register/user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         toast.success('Registration successful!')
//         router.push('/login')
//       } else {
//         toast.error(data.message || 'Registration failed')
//       }
//     } catch {
//       toast.error('Server error. Please try again later.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4 py-8"
//     >
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-sm">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
//           🦷 Register as User
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />

//           <motion.button
//             whileTap={{ scale: 0.98 }}
//             whileHover={{ scale: 1.01 }}
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </motion.button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 font-semibold hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </motion.div>
//   )
// }




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


//ver3 - blue theme

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, User, Lock, Mail, ArrowLeft, Heart, Shield, Star, UserPlus, Check, Phone } from 'lucide-react'

export default function RegisterUserPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [allergies, setAllergies] = useState('')

  // Dental history fields
  const [hasDentalSurgery, setHasDentalSurgery] = useState<string>('')
  const [dentalSurgeryDetails, setDentalSurgeryDetails] = useState('')
  const [previousDentalDiseases, setPreviousDentalDiseases] = useState('')
  const [dentalTreatmentHistory, setDentalTreatmentHistory] = useState('')
  // const [drugAllergies, setDrugAllergies] = useState('')
  // const [currentSymptoms, setCurrentSymptoms] = useState('')
  // const [chronicDiseases, setChronicDiseases] = useState('')
  // const [foodAllergies, setFoodAllergies] = useState('')
  // const [drugAllergies, setDrugAllergies] = useState('')
  // const [currentSymptoms, setCurrentSymptoms] = useState('')
  // const [chronicDiseases, setChronicDiseases] = useState('')
  // const [foodAllergies, setFoodAllergies] = useState('')
  // const [drugAllergies, setDrugAllergies] = useState('')
  // const [currentSymptoms, setCurrentSymptoms] = useState('')
  // const [chronicDiseases, setChronicDiseases] = useState('')
  // const [foodAllergies, setFoodAllergies] = useState('')
  // const [drugAllergies, setDrugAllergies] = useState('')
  // const [currentSymptoms, setCurrentSymptoms] = useState('')
  // const [chronicDiseases, setChronicDiseases] = useState('')
  // const [foodAllergies, setFoodAllergies] = useState('')
  // const [drugAllergies, setDrugAllergies] = useState('')
  // const [currentSymptoms, setCurrentSymptoms] = useState('')
  // const [chronicDiseases, setChronicDiseases] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/register/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          username,
          phoneNumber,
          gender,
          dateOfBirth,
          age: age ? parseInt(age) : undefined,
          weight: weight ? parseFloat(weight) : undefined,
          height: height ? parseFloat(height) : undefined,
          allergies,
          // Dental history
          hasDentalSurgery: hasDentalSurgery === 'yes',
          dentalSurgeryDetails: hasDentalSurgery === 'yes' ? dentalSurgeryDetails : null,
          previousDentalDiseases,
          dentalTreatmentHistory
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Registration successful! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setMessage(data.message || 'Registration failed')
      }
    } catch {
      setMessage('Server error. Please try again later.')
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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Side - Welcome Content */}
          <motion.div
            className="hidden lg:block text-white space-y-6 lg:sticky lg:top-8"
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
                <span className="block text-white">
                  Join HealthCare+
                </span>
                <span className="block text-blue-300">
                  Community
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-blue-100 leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Begin your healthcare journey with us. Create your account to access personalized care, expert consultations, and comprehensive health management tools.
              </motion.p>
            </div>

            {/* Benefits list */}
            <motion.div
              className="space-y-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: UserPlus, text: "Quick & Easy Registration" },
                { icon: Shield, text: "Secure Data Protection" },
                { icon: Heart, text: "24/7 Healthcare Access" },
                { icon: Star, text: "Premium Medical Services" }
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

          {/* Right Side - Register Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Glassmorphism Card */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl border border-white/20 shadow-2xl max-h-[85vh] overflow-y-auto"
              variants={itemVariants}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-3xl blur opacity-20 -z-10"></div>
              
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                  <UserPlus className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-1">Create Account</h2>
                <p className="text-blue-100 text-sm">Register as Healthcare User</p>
              </motion.div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Account Information Section */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-400 rounded-full"></div>
                    Account Information
                  </h3>

                  {/* Full Name */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />
                  </div>

                  {/* Username */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />
                  </div>

                  {/* Password & Confirm Password - 2 columns on desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-blue-300" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-blue-300" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Personal Information Section */}
                <motion.div variants={itemVariants} className="space-y-4 pt-2">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-cyan-400 rounded-full"></div>
                    Personal Information
                  </h3>

                  {/* Phone Number */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />
                  </div>

                  {/* Gender & DOB - 2 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    >
                      <option value="" className="bg-blue-800">Select Gender</option>
                      <option value="male" className="bg-blue-800">Male</option>
                      <option value="female" className="bg-blue-800">Female</option>
                      <option value="other" className="bg-blue-800">Other</option>
                    </select>

                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />
                  </div>

                  {/* Age & Weight - 2 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />

                    <input
                      type="number"
                      placeholder="Weight (kg)"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />
                  </div>

                  {/* Height */}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Height (cm)"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    />
                  </div>
                </motion.div>

                {/* Medical Information Section */}
                <motion.div variants={itemVariants} className="space-y-4 pt-2">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-red-400 rounded-full"></div>
                    Medical Information
                  </h3>

                  <textarea
                    placeholder="Allergies (if any)"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 resize-none"
                  />
                </motion.div>

                {/* Dental History Section */}
                <motion.div variants={itemVariants} className="space-y-4 pt-2">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-green-400 rounded-full"></div>
                    Dental History
                  </h3>

                  {/* Have you had dental surgery? */}
                  <div className="relative">
                    <label className="block text-blue-100 text-sm font-medium mb-2">Have you had dental surgery before?</label>
                    <select
                      value={hasDentalSurgery}
                      onChange={(e) => setHasDentalSurgery(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    >
                      <option value="" className="bg-blue-800">Select an option</option>
                      <option value="yes" className="bg-blue-800">Yes</option>
                      <option value="no" className="bg-blue-800">No</option>
                    </select>
                  </div>

                  {/* Dental Surgery Details - Conditional */}
                  {hasDentalSurgery === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="relative"
                    >
                      <label className="block text-blue-100 text-sm font-medium mb-2">Surgery Details</label>
                      <textarea
                        placeholder="e.g., wisdom teeth extraction, root canal, implants"
                        value={dentalSurgeryDetails}
                        onChange={(e) => setDentalSurgeryDetails(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 resize-none"
                      />
                    </motion.div>
                  )}

                  {/* Previous Dental Diseases & Treatment History - 2 columns on larger screens */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-blue-100 text-sm font-medium mb-2">Previous Dental Diseases</label>
                      <textarea
                        placeholder="e.g., cavities, gum disease (optional)"
                        value={previousDentalDiseases}
                        onChange={(e) => setPreviousDentalDiseases(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 resize-none"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-blue-100 text-sm font-medium mb-2">Treatment History</label>
                      <textarea
                        placeholder="e.g., braces, fillings, crowns (optional)"
                        value={dentalTreatmentHistory}
                        onChange={(e) => setDentalTreatmentHistory(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 resize-none"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Register Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={loading}
                  className="w-full relative group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3.5 px-6 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      <span>Create Account</span>
                    </div>
                  )}
                </motion.button>
              </form>

              {/* Message Display */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3.5 rounded-xl border ${
                    message.includes('successful')
                      ? 'bg-green-500/20 border-green-400/50 text-green-200'
                      : 'bg-red-500/20 border-red-400/50 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {message.includes('successful') && <Check className="w-4 h-4" />}
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                </motion.div>
              )}

              {/* Login Link */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-6 pt-5 border-t border-white/20"
              >
                <p className="text-blue-100 text-sm">
                  Already have an account?{' '}
                  <motion.a
                    href="/login"
                    className="text-white hover:text-blue-300 transition-colors duration-300 font-bold relative group"
                    whileHover={{ y: -1 }}
                  >
                    Sign In
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                </p>
              </motion.div>

              {/* Mobile Back Button */}
              <motion.button
                onClick={() => router.push('/')}
                className="lg:hidden w-full mt-5 flex items-center justify-center gap-2 text-blue-200 hover:text-white transition-colors duration-300 py-3 border border-white/20 rounded-xl backdrop-blur-sm hover:bg-white/10"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium text-sm">Back to Home</span>
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
        
        /* Custom scrollbar for form */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #60a5fa, #3b82f6);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #3b82f6, #2563eb);
        }

        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 rgba(255, 255, 255, 0.05);
        }

        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}
