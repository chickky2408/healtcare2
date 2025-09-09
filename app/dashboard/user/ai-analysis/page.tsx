
// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'

// export default function AiAnalysisPage() {
//   const router = useRouter()
//   const [allowed, setAllowed] = useState(false)
//   const [result, setResult] = useState('')
//   const [images, setImages] = useState<File[]>([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')

//     if (!user?.email) {
//       alert('Please log in again as userId is not found.')
//       router.push('/login')
//       return
//     }

//     const fetchPermission = async () => {
//       try {
//         const res = await fetch(`/api/user/appointments?userEmail=${user.email}`)
//         const data = await res.json()
//         if (data.length > 0) {
//           setAllowed(true)
//         } else {
//           alert('Please book an AI analysis before use.')
//           router.push('/dashboard/user')
//         }
//       } catch (err) {
//         console.error(err)
//         alert('An authentication error occurred.')
//         router.push('/dashboard/user')
//       }
//     }

//     fetchPermission()
//   }, [router])

//   const handleSubmit = async () => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')
//     if (!user?.id) {
//       alert('Please log in again as userId is not found.')
//       return
//     }

//     if (images.length === 0) {
//       alert('Please select an image file first.')
//       return
//     }

//     setLoading(true)

//     const formData = new FormData()
//     formData.append('image', images[0])

//     try {
//       const res = await axios.post('/api/ai/analyze', formData)
//       setResult(res.data.result)

//       await axios.post('/api/diagnosis/save', {
//         imagePath: images[0].name,
//         result: res.data.result,
//         confidence: res.data.confidence,
//         userId: user.id,
//       })
//     } catch (error) {
//       alert('An error occurred during analysis.')
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!allowed) {
//     return <div className="p-6">Checking access rights...</div>
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">🧠 Teeth AI Analysis</h1>
//       <p className="mb-4 text-gray-600">Please add your Image</p>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImages(Array.from(e.target.files || []))}
//         className="mb-4"
//       />

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md"
//       >
//         {loading ? 'Analyzing...' : 'Analyze with AI'}
//       </button>

//       {result && (
//         <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
//           <strong>Analysis Result:</strong> {result}
//         </div>
//       )}
//     </div>
//   )
// }





//original

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'

// export default function AiAnalysisPage() {
//   const router = useRouter()
//   const [allowed, setAllowed] = useState(false)
//   const [result, setResult] = useState('')
//   const [confidence, setConfidence] = useState(0)
//   const [images, setImages] = useState<File[]>([])
//   const [preview, setPreview] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')
//     if (!user?.email) {
//       alert('Please log in again.')
//       router.push('/login')
//       return
//     }

//     const checkEligibility = async () => {
//       const res = await fetch(`/api/user/appointments?userEmail=${user.email}`)
//       const data = await res.json()
//       if (data.length > 0) setAllowed(true)
//       else {
//         alert('Please book an AI analysis appointment first.')
//         router.push('/dashboard/user')
//       }
//     }

//     checkEligibility()
//   }, [router])

//   const handleSubmit = async () => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')
//     if (!user?.id || images.length === 0) {
//       alert('Please select an image file.')
//       return
//     }

//     setLoading(true)
//     const formData = new FormData()
//     formData.append('image', images[0])

//     try {
//       const res = await axios.post('/api/ai/analyze', formData)
//       setResult(res.data.result)
//       setConfidence(res.data.confidence)

//       await axios.post('/api/diagnosis/save', {
//         imagePath: images[0].name,
//         result: res.data.result,
//         confidence: res.data.confidence,
//         userId: user.id,
//       })
//     } catch (err) {
//       alert('Error during analysis')
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!allowed) return <div className="p-6 text-center text-gray-500">Checking permission...</div>

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
//       <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full animate-fade-in">
//         <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">🧠 Teeth AI Analysis</h1>
//         <p className="text-gray-600 mb-6 text-center">Upload a clear image of your teeth (upper/lower)</p>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const fileList = Array.from(e.target.files || [])
//             setImages(fileList)
//             if (fileList[0]) setPreview(URL.createObjectURL(fileList[0]))
//           }}
//           className="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
//         >
//           {loading ? 'Analyzing...' : 'Analyze with AI'}
//         </button>

//         {result && (
//           <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded-lg text-center">
//             <h2 className="text-lg font-semibold text-green-700 mb-2">🧾 Analysis Result</h2>
//             <p className="text-gray-800"><strong>Diagnosis:</strong> {result}</p>
//             <p className="text-gray-800"><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
//             {preview && (
//               <div className="mt-4">
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="rounded-md shadow-md max-h-60 mx-auto hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }





// new theme
// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import { motion } from 'framer-motion'
// import { Brain, Upload, Image as ImageIcon, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

// export default function AiAnalysisPage() {
//   const router = useRouter()
//   const [allowed, setAllowed] = useState(false)
//   const [result, setResult] = useState('')
//   const [confidence, setConfidence] = useState(0)
//   const [images, setImages] = useState<File[]>([])
//   const [preview, setPreview] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')
//     if (!user?.email) {
//       alert('Please log in again.')
//       router.push('/login')
//       return
//     }
//     const checkEligibility = async () => {
//       const res = await fetch(`/api/user/appointments?userEmail=${user.email}`)
//       const data = await res.json()
//       if (data.length > 0) setAllowed(true)
//       else {
//         alert('Please book an AI analysis appointment first.')
//         router.push('/dashboard/user')
//       }
//     }
//     checkEligibility()
//   }, [router])

//   const handleSubmit = async () => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')
//     if (!user?.id || images.length === 0) {
//       alert('Please select an image file.')
//       return
//     }

//     setLoading(true)
//     setMsg(null)

//     const formData = new FormData()
//     formData.append('image', images[0])

//     try {
//       const res = await axios.post('/api/ai/analyze', formData)
//       setResult(res.data.result)
//       setConfidence(res.data.confidence)

//       await axios.post('/api/diagnosis/save', {
//         imagePath: images[0].name,
//         result: res.data.result,
//         confidence: res.data.confidence,
//         userId: user.id,
//       })
//       setMsg({ type: 'success', text: 'Analysis completed & saved' })
//     } catch (err: any) {
//       console.error(err)
//       setMsg({ type: 'error', text: 'Error during analysis' })
//       alert('Error during analysis')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!allowed) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-blue-100 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
//         Checking permission...
//       </div>
//     )
//   }

//   const container = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
//   }
//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 16 } },
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800" />

//       {/* Floating glows */}
//       <div className="absolute inset-0 opacity-30 pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-24 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
//           animate={{ x: [0, 90, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
//           transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
//         />
//         <motion.div
//           className="absolute bottom-24 right-24 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl"
//           animate={{ x: [0, -100, 0], y: [0, 60, 0], scale: [1, 0.85, 1] }}
//           transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <motion.div
//             className="text-center mb-10"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <button
//               onClick={() => router.back()}
//               className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 mx-auto"
//             >
//               <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//               <span className="font-medium">Back</span>
//             </button>

//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-5 shadow-lg">
//               <Brain className="w-10 h-10 text-white" />
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-black text-white">Teeth AI Analysis</h1>
//             <p className="text-blue-100 mt-2">Upload a clear image of your teeth (upper/lower)</p>
//           </motion.div>

//           {/* Card */}
//           <motion.div variants={container} initial="hidden" animate="visible" className="relative">
//             <motion.div
//               variants={item}
//               className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/20 shadow-2xl"
//             >
//               <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-20 blur" />

//               {/* Alert */}
//               {msg && (
//                 <motion.div
//                   variants={item}
//                   className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl border ${
//                     msg.type === 'success'
//                       ? 'bg-green-500/15 border-green-400/30 text-green-100'
//                       : 'bg-red-500/15 border-red-400/30 text-red-100'
//                   }`}
//                 >
//                   {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
//                   <span>{msg.text}</span>
//                 </motion.div>
//               )}

//               {/* Uploader */}
//               <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-center mb-6">
//                 <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer transition font-medium">
//                   <Upload className="w-5 h-5" />
//                   Choose File
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => {
//                       const fileList = Array.from(e.target.files || [])
//                       setImages(fileList)
//                       if (fileList[0]) setPreview(URL.createObjectURL(fileList[0]))
//                     }}
//                   />
//                 </label>
//                 <span className="text-blue-100 text-sm">{images[0]?.name || 'No file chosen'}</span>
//               </motion.div>

//               {/* Preview + CTA */}
//               <div className="grid md:grid-cols-2 gap-8">
//                 <motion.div variants={item} className="bg-white/10 rounded-2xl p-4 border border-white/20">
//                   {preview ? (
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="rounded-xl shadow-lg max-h-80 w-full object-contain"
//                     />
//                   ) : (
//                     <div className="h-40 flex flex-col items-center justify-center text-blue-200">
//                       <ImageIcon className="w-10 h-10 mb-2" />
//                       <span className="text-sm">Image preview will appear here</span>
//                     </div>
//                   )}
//                 </motion.div>

//                 <motion.div variants={item} className="flex flex-col justify-between gap-4">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 shadow-lg transition"
//                   >
//                     <Brain className="w-5 h-5" />
//                     {loading ? 'Analyzing...' : 'Analyze with AI'}
//                   </button>

//                   {result && (
//                     <div className="bg-green-500/15 border border-green-400/30 rounded-2xl p-4 text-green-100">
//                       <h2 className="font-semibold mb-2">Analysis Result</h2>
//                       <p className="mb-1"><strong>Diagnosis:</strong> {result}</p>
//                       <p className="mb-3">
//                         <strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%
//                       </p>
//                       {/* Progress bar */}
//                       <div className="w-full h-2 rounded bg-white/20 overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
//                           style={{ width: `${Math.min(100, Math.max(0, confidence * 100))}%` }}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Global scrollbar */}
//       <style jsx global>{`
//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: rgba(255,255,255,0.08); }
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





// fix bug 

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Brain, Upload, Image as ImageIcon, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

export default function AiAnalysisPage() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  const [result, setResult] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [images, setImages] = useState<File[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user?.email) {
      alert('Please log in again.')
      router.push('/login')
      return
    }
    const checkEligibility = async () => {
      const res = await fetch(`/api/user/appointments?userEmail=${user.email}`)
      const data = await res.json()
      if (data.length > 0) setAllowed(true)
      else {
        alert('Please book an AI analysis appointment first.')
        router.push('/dashboard/user')
      }
    }
    checkEligibility()
  }, [router])

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user?.id || images.length === 0) {
      alert('Please select an image file.')
      return
    }

    setLoading(true)
    setMsg(null)

    const formData = new FormData()
    formData.append('image', images[0])

    try {
      const res = await axios.post('/api/ai/analyze', formData)
      setResult(res.data.result)
      setConfidence(res.data.confidence)

      await axios.post('/api/diagnosis/save', {
        imagePath: res.data.imagePath || images[0].name,
        result: res.data.result,
        confidence: res.data.confidence,
        userId: user.id,
      })
      setMsg({ type: 'success', text: 'Analysis completed & saved' })
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        err?.message ||
        'Unknown error'
      alert('Error during analysis: ' + detail)
      setMsg({ type: 'error', text: String(detail) })
      console.error(err?.response?.data || err)
    } finally {
      setLoading(false)
    }
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-100 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        Checking permission...
      </div>
    )
  }

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 16 } } }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800" />
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div className="absolute top-20 left-24 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
          animate={{ x: [0, 90, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-24 right-24 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 60, 0], scale: [1, 0.85, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => router.back()} className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 mx-auto">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-5 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white">Teeth AI Analysis</h1>
            <p className="text-blue-100 mt-2">Upload a clear image of your teeth (upper/lower)</p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="visible" className="relative">
            <motion.div variants={item} className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/20 shadow-2xl">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-20 blur" />

              {msg && (
                <motion.div variants={item}
                  className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                    msg.type === 'success'
                      ? 'bg-green-500/15 border-green-400/30 text-green-100'
                      : 'bg-red-500/15 border-red-400/30 text-red-100'
                  }`}>
                  {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span>{msg.text}</span>
                </motion.div>
              )}

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer transition font-medium">
                  <Upload className="w-5 h-5" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const fileList = Array.from(e.target.files || [])
                      setImages(fileList)
                      if (fileList[0]) setPreview(URL.createObjectURL(fileList[0]))
                    }}
                  />
                </label>
                <span className="text-blue-100 text-sm">{images[0]?.name || 'No file chosen'}</span>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={item} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  {preview ? (
                    <img src={preview} alt="Preview" className="rounded-xl shadow-lg max-h-80 w-full object-contain" />
                  ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-blue-200">
                      <ImageIcon className="w-10 h-10 mb-2" />
                      <span className="text-sm">Image preview will appear here</span>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={item} className="flex flex-col justify-between gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 shadow-lg transition">
                    <Brain className="w-5 h-5" />
                    {loading ? 'Analyzing...' : 'Analyze with AI'}
                  </button>

                  {result && (
                    <div className="bg-green-500/15 border border-green-400/30 rounded-2xl p-4 text-green-100">
                      <h2 className="font-semibold mb-2">Analysis Result</h2>
                      <p className="mb-1"><strong>Diagnosis:</strong> {result}</p>
                      <p className="mb-3"><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
                      <div className="w-full h-2 rounded bg-white/20 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: `${Math.min(100, Math.max(0, confidence * 100))}%` }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.08); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #3b82f6, #8b5cf6); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #2563eb, #7c3aed); }
      `}</style>
    </div>
  )
}