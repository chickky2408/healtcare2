'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Brain, Upload, Image as ImageIcon, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

type AnalysisResult = {
  label: string
  confidence: number
  findings: string[]
  explanation: string
  imagePath?: string
}

type Msg = { type: 'success' | 'error'; text: string } | null

export default function AiAnalysisPage() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<Msg>(null)

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
      if (Array.isArray(data) && data.length > 0) {
        setAllowed(true)
      } else {
        alert('Please book an AI analysis appointment first.')
        router.push('/dashboard/user')
      }
    }
    
    checkEligibility()
  }, [router])

  const handleSubmit = async () => {
    console.log('🔵 handleSubmit called!', { images })
    
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user?.id || images.length === 0) {
      alert('Please select an image file.')
      return
    }

    setLoading(true)
    setMsg(null)
    setResult(null) // Clear previous result

    const formData = new FormData()
    formData.append('images', images[0])

    try {
      console.log('🚀 Calling API...')
      
      const res = await axios.post('/api/ai/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      })

      console.log('✅ API Response:', res.data)

      const analysisResult = res.data?.results?.[0]
      if (!analysisResult) throw new Error('No analysis result returned')

      setResult(analysisResult)

      await axios.post('/api/diagnosis/save', {
        imagePath: analysisResult.imagePath || images[0].name,
        result: analysisResult.label,
        confidence: analysisResult.confidence,
        userId: user.id,
        explanation: analysisResult.explanation || null,
        findings: JSON.stringify(analysisResult.findings || []),
      })

      setMsg({ type: 'success', text: 'Analysis completed & saved successfully!' })
    } catch (err: any) {
      console.error('❌ Error:', err)
      const errorMsg = 
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Analysis failed. Please try again.'
      
      alert('Error: ' + errorMsg)
      setMsg({ type: 'error', text: errorMsg })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || [])
    if (fileList.length > 0) {
      const file = fileList[0]
      
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      setImages(fileList)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setMsg(null)
    }
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-100 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking permission...</p>
        </div>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 16 } },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800" />
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-20 left-24 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
          animate={{ x: [0, 90, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-24 right-24 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 60, 0], scale: [1, 0.85, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 mx-auto"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-5 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">Teeth AI Analysis</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Upload a clear photo of your teeth for AI-powered dental analysis
            </p>
            
            <div className="mt-4 max-w-3xl mx-auto bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-3 text-yellow-100 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-left">
                <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only. It does not replace professional dental diagnosis. Always consult a licensed dentist.
              </p>
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="visible" className="relative">
            <motion.div
              variants={item}
              className="relative bg-white/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/20 shadow-2xl"
            >
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-20 blur" />

              {msg && (
                <motion.div
                  variants={item}
                  className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                    msg.type === 'success'
                      ? 'bg-green-500/15 border-green-400/30 text-green-100'
                      : 'bg-red-500/15 border-red-400/30 text-red-100'
                  }`}
                >
                  {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span>{msg.text}</span>
                </motion.div>
              )}

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-center mb-8">
                <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer transition font-medium">
                  <Upload className="w-5 h-5" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                </label>
                <span className="text-blue-100 text-sm">
                  {images[0]?.name || 'No file chosen'}
                </span>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={item} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  {preview ? (
                    <div className="relative w-full h-80">
                      <Image 
                        src={preview} 
                        alt="Preview" 
                        fill 
                        className="rounded-xl shadow-lg object-contain" 
                        unoptimized 
                      />
                    </div>
                  ) : (
                    <div className="h-80 flex flex-col items-center justify-center text-blue-200">
                      <ImageIcon className="w-16 h-16 mb-4" />
                      <span className="text-sm">Image preview will appear here</span>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={item} className="flex flex-col gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || images.length === 0}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg transition"
                  >
                    <Brain className="w-5 h-5" />
                    {loading ? 'Analyzing...' : 'Analyze with AI'}
                  </button>

                  {result && (
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        Analysis Result
                      </h2>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-blue-200 text-sm">Diagnosis</p>
                          <p className="text-lg font-semibold">{result.label.replace(/_/g, ' ')}</p>
                        </div>
                        
                        <div>
                          <p className="text-blue-200 text-sm mb-1">Confidence</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                style={{ width: `${Math.min(100, result.confidence * 100)}%` }}
                              />
                            </div>
                            <span className="font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
                          </div>
                        </div>

                        {result.findings && result.findings.length > 0 && (
                          <div>
                            <p className="text-blue-200 text-sm mb-2">Findings</p>
                            <ul className="space-y-1 text-sm">
                              {result.findings.map((finding, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span>{finding}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {result.explanation && (
                          <div>
                            <p className="text-blue-200 text-sm mb-2">Explanation</p>
                            <p className="text-sm leading-relaxed text-blue-50/90">
                              {result.explanation}
                            </p>
                          </div>
                        )}
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