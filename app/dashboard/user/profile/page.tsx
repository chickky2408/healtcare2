// "use client"

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'

// export default function UserProfilePage() {
//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [allergies, setAllergies] = useState("")
//   const [image, setImage] = useState<string | null>(null)
//   const [preview, setPreview] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')
//     const user = JSON.parse(stored)
//     setName(user.name || "")
//     // Add API to fetch user profile if needed
//   }, [router])

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     setPreview(URL.createObjectURL(file))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const stored = localStorage.getItem('user')
//     if (!stored) return
  
//     const { id } = JSON.parse(stored)
//     const res = await fetch('/api/user/update', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, name, phone, allergies, image }),
//     })
  
//     const data = await res.json()
//     if (data.success) {
//       alert('Profile updated successfully')
//     } else {
//       alert('Update failed: ' + data.message)
//     }
//   }

//   return (
//     <main className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold text-blue-800 mb-6">👤 My Profile</h1>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-6 rounded-xl shadow space-y-4"
//       >
//         <div className="flex items-center gap-4">
//           {preview ? (
//             <img src={preview} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover" />
//           ) : (
//             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-500">
//               {name[0] || "U"}
//             </div>
//           )}
//           <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//           <textarea
//             placeholder="Allergy history"
//             value={allergies}
//             onChange={(e) => setAllergies(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={image || ''}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//         </form>
//       </motion.div>
//     </main>
//   )
// }



//new theme

// app/dashboard/user/profile/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  User as UserIcon,
  Phone as PhoneIcon,
  Shield,
  Image as ImageIcon,
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle,
  Heart,
} from "lucide-react"

export default function UserProfilePage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [allergies, setAllergies] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (!stored) {
      router.push("/login")
      return
    }
    const user = JSON.parse(stored)
    setName(user.name || "")
    // ถ้าต้องการ preload เบอร์/แพ้ยา/รูป ให้ fetch โปรไฟล์จริงจาก API ที่คุณมีอยู่ได้
  }, [router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    // หมายเหตุ: โค้ดเดิมเก็บ `image` เป็น URL string เท่านั้น
    // เราไม่อัปโหลดไฟล์ในฟังก์ชันนี้ เพื่อคงฟังก์ชันเดิมตามที่กำหนด
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    setSaving(true)

    const stored = localStorage.getItem("user")
    if (!stored) {
      setSaving(false)
      return
    }

    const { id } = JSON.parse(stored)
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, phone, allergies, image }),
      })
      const data = await res.json()
      if (data.success) {
        setMsg({ type: "success", text: "Profile updated successfully" })
      } else {
        setMsg({ type: "error", text: "Update failed: " + (data.message || "Unknown error") })
      }
    } catch (err: any) {
      setMsg({ type: "error", text: "Update failed: " + err?.message })
    } finally {
      setSaving(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800" />

      {/* Animated soft glows + floating icons (match telemedicine theme) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-24 left-16 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
          animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-28 right-16 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -90, 0], y: [0, 70, 0], scale: [1, 0.85, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 text-white/10"
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-white/10"
          animate={{ y: [0, 24, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-24 h-24" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 mx-auto"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-5 shadow-lg">
              <UserIcon className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white">My Profile</h1>
            <p className="text-blue-100 mt-2">Manage your personal information</p>
          </motion.div>

          {/* Card */}
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
              {/* subtle gradient border glow */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-20 blur" />

              {/* Avatar + Upload */}
              <motion.div variants={itemVariants} className="flex items-center gap-6 mb-8">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center ring-4 ring-white/20">
                    <span className="text-2xl font-bold text-white/80">{name?.[0]?.toUpperCase() || "U"}</span>
                  </div>
                )}

                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer transition">
                  <ImageIcon className="w-5 h-5" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </motion.div>

              {/* Alert message */}
              {msg && (
                <motion.div
                  variants={itemVariants}
                  className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                    msg.type === "success"
                      ? "bg-green-500/15 border-green-400/30 text-green-100"
                      : "bg-red-500/15 border-red-400/30 text-red-100"
                  }`}
                >
                  {msg.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{msg.text}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm text-blue-100 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-blue-300" />
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm text-blue-100 flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-blue-300" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                </motion.div>

                {/* Allergy history */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm text-blue-100 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-300" />
                    Allergy history
                  </label>
                  <textarea
                    placeholder="Allergy history"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                </motion.div>

                {/* Image URL */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm text-blue-100 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-blue-300" />
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://…"
                    value={image || ""}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                  <p className="text-xs text-blue-200/70">
                    {/* * ระบบยังคงพฤติกรรมเดิม: บันทึกเป็น URL ไม่อัปโหลดไฟล์จริง */}
                  </p>
                </motion.div>

                {/* Actions */}
                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={saving}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 shadow-lg transition"
                    whileHover={{ scale: saving ? 1 : 1.02, y: saving ? 0 : -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-5 h-5" />
                    {saving ? "Saving..." : "Save Changes"}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Global scrollbar styles (match theme) */}
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.08); }
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