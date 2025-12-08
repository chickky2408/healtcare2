'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Brain, Upload, Image as ImageIcon, ArrowLeft, CheckCircle, AlertCircle, Camera } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

type AnalysisResult = {
  label: string
  confidence: number
  findings: string[]
  explanation: string
  imagePath?: string
}

type Msg = { type: 'success' | 'error'; text: string } | null

export default function AiAnalysisPage() {
  const { t } = useApp()
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<Msg>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)

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

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      })
      setStream(mediaStream)
      if (videoRef) {
        videoRef.srcObject = mediaStream
      }
      setShowCamera(true)
    } catch (err) {
      alert('Cannot access camera. Please allow camera permission.')
      console.error(err)
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  // Capture photo from camera
  const capturePhoto = () => {
    if (!videoRef || !canvasRef) return

    const context = canvasRef.getContext('2d')
    if (!context) return

    canvasRef.width = videoRef.videoWidth
    canvasRef.height = videoRef.videoHeight
    context.drawImage(videoRef, 0, 0)

    canvasRef.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' })
        setImages([file])
        setPreview(URL.createObjectURL(file))
        setResult(null)
        setMsg(null)
        stopCamera()
      }
    }, 'image/jpeg', 0.9)
  }

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-gray-900 dark:text-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-white mx-auto mb-4"></div>
          <p>{t('ai.checkingPermission')}</p>
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
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-blue-900 dark:via-purple-900 dark:to-blue-800" />
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
              className="group flex items-center gap-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-white transition-colors mb-6 mx-auto"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">{t('Back to Dashboard')}</span>
            </button>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-5 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2">{t('ai.title')}</h1>
            <p className="text-gray-700 dark:text-blue-100 max-w-2xl mx-auto">
              {t('')}
            </p>

            <div className="mt-4 max-w-3xl mx-auto bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-400 dark:border-yellow-400/30 rounded-xl p-3 text-yellow-900 dark:text-yellow-100 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-left">
                <strong>{t('ai.disclaimer')}:</strong> {t('')}
              </p>
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="visible" className="relative">
            <motion.div
              variants={item}
              className="relative bg-white/90 dark:bg-white/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-gray-200 dark:border-white/20 shadow-2xl"
            >
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 opacity-20 blur" />

              {msg && (
                <motion.div
                  variants={item}
                  className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                    msg.type === 'success'
                      ? 'bg-green-100 dark:bg-green-500/15 border-green-400 dark:border-green-400/30 text-green-800 dark:text-green-100'
                      : 'bg-red-100 dark:bg-red-500/15 border-red-400 dark:border-red-400/30 text-red-800 dark:text-red-100'
                  }`}
                >
                  {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span>{msg.text}</span>
                </motion.div>
              )}

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-center mb-8">
                <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-100 dark:bg-white/10 hover:bg-blue-200 dark:hover:bg-white/20 border border-blue-300 dark:border-white/20 text-blue-900 dark:text-white cursor-pointer transition font-medium">
                  <Upload className="w-5 h-5" />
                  {t('Choose Image')}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                </label>

                <button
                  onClick={startCamera}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-100 dark:bg-green-500/20 hover:bg-green-200 dark:hover:bg-green-500/30 border border-green-300 dark:border-green-400/30 text-green-900 dark:text-green-100 transition font-medium disabled:opacity-50"
                >
                  <Camera className="w-5 h-5" />
                  {t('Take Photo')}
                </button>

                <span className="text-gray-700 dark:text-blue-100 text-sm">
                  {images[0]?.name || t('No File Chosen')}
                </span>
              </motion.div>

              {/* Camera Modal */}
              {showCamera && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-2xl w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Take a Photo</h3>
                      <button
                        onClick={stopCamera}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="relative bg-black rounded-2xl overflow-hidden mb-4">
                      <video
                        ref={(ref) => {
                          setVideoRef(ref)
                          if (ref && stream) {
                            ref.srcObject = stream
                            ref.play()
                          }
                        }}
                        autoPlay
                        playsInline
                        className="w-full h-auto"
                      />
                    </div>

                    <canvas ref={setCanvasRef} className="hidden" />

                    <button
                      onClick={capturePhoto}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Capture Photo
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={item} className="bg-gray-50 dark:bg-white/10 rounded-2xl p-4 border border-gray-200 dark:border-white/20">
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
                    <div className="h-80 flex flex-col items-center justify-center text-gray-500 dark:text-blue-200">
                      <ImageIcon className="w-16 h-16 mb-4" />
                      <span className="text-sm">{t('Image Preview')}</span>
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
                    {loading ? t('ai.analyzing') : t('Analyze Button')}
                  </button>

                  {result && (
                    <div className="bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/20 rounded-2xl p-6 text-gray-900 dark:text-white">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        {t('Analysis Result')}
                      </h2>

                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-600 dark:text-blue-200 text-sm">{t('AI Diagnosis')}</p>
                          <p className="text-lg font-semibold">{result.label.replace(/_/g, ' ')}</p>
                        </div>

                        <div>
                          <p className="text-gray-600 dark:text-blue-200 text-sm mb-1">{t('ai.confidence')}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-gray-300 dark:bg-white/20 overflow-hidden">
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
                            <p className="text-gray-600 dark:text-blue-200 text-sm mb-2">{t('ai.findings')}</p>
                            <ul className="space-y-1 text-sm">
                              {result.findings.map((finding, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                  <span>{finding}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {result.explanation && (
                          <div>
                            <p className="text-gray-600 dark:text-blue-200 text-sm mb-2">{t('Explanation')}</p>
                            <p className="text-sm leading-relaxed text-gray-700 dark:text-blue-50/90">
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