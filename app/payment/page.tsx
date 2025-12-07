'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  ArrowLeft,
  Image as ImageIcon,
  Building2,
  User,
  Hash
} from 'lucide-react'
import { useApp } from '../contexts/AppContext'

type Payment = {
  id: string
  amount: number
  status: string
  slipImagePath: string | null
  paidAt: string | null
  appointment: {
    type: string
    date: string
    time: string
    doctor: {
      name: string
      specialty: string
    }
  }
}

type BankDetails = {
  bankName: string
  accountNumber: string
  accountName: string
}

function PaymentPageContent() {
  const { t } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('appointmentId')

  const [payment, setPayment] = useState<Payment | null>(null)
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (appointmentId) {
      fetchOrCreatePayment()
    }
  }, [appointmentId])

  const fetchOrCreatePayment = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId })
      })

      const data = await res.json()
      if (res.ok) {
        setPayment(data.payment)
        setBankDetails(data.bankDetails)
      } else {
        setMessage(data.error || 'Failed to load payment')
      }
    } catch (error) {
      setMessage('Error loading payment')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size exceeds 5MB')
        return
      }

      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setMessage('Please select an image file (JPG, PNG, WEBP)')
        return
      }

      setSelectedFile(file)
      setMessage('')
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadSlip = async () => {
    if (!selectedFile || !payment) return

    try {
      setUploading(true)
      setMessage('')

      const formData = new FormData()
      formData.append('paymentId', payment.id)
      formData.append('slip', selectedFile)

      const res = await fetch('/api/payment/upload-slip', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (res.ok) {
        setPayment(data.payment)
        setMessage('✅ Payment successful! Waiting for admin verification')
        setSelectedFile(null)
        setPreviewUrl(null)

        // Show success message and offer to return to Dashboard
        setTimeout(() => {
          if (confirm('Payment successful! Would you like to return to the dashboard?')) {
            router.push('/dashboard/user')
          }
        }, 1500)
      } else {
        setMessage(data.error || 'Upload failed')
      }
    } catch (error) {
      setMessage('Upload error occurred')
    } finally {
      setUploading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; icon: any; label: string }> = {
      PENDING: { bg: 'bg-yellow-500/20 border-yellow-400', text: 'text-yellow-200', icon: Clock, label: 'Pending Payment' },
      PAID: { bg: 'bg-blue-500/20 border-blue-400', text: 'text-blue-200', icon: Clock, label: 'Under Review' },
      SUCCESSFUL: { bg: 'bg-green-500/20 border-green-400', text: 'text-green-200', icon: CheckCircle, label: 'Payment Successful' },
      REJECTED: { bg: 'bg-red-500/20 border-red-400', text: 'text-red-200', icon: AlertCircle, label: 'Rejected' }
    }

    const badge = badges[status] || badges.PENDING
    const Icon = badge.icon

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        <span className="font-semibold">{badge.label}</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-red-500/20 border border-red-400 rounded-2xl p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-200 text-lg">{message || 'Payment information not found'}</p>
          <button
            onClick={() => router.push('/dashboard/user')}
            className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.button
          onClick={() => router.push('/dashboard/user')}
          className="flex items-center gap-2 text-blue-200 hover:text-white mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 space-y-6"
        >
          {/* Title & Status */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Payment</h1>
              <p className="text-blue-200">Please complete payment to confirm your booking</p>
            </div>
            {getStatusBadge(payment.status)}
          </div>

          {/* Appointment Info */}
          <div className="bg-white/10 rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white mb-4">Booking Details</h2>
            <div className="grid md:grid-cols-2 gap-4 text-blue-100">
              <div>
                <p className="text-sm text-blue-300">Doctor</p>
                <p className="font-semibold">Dr. {payment.appointment.doctor.name}</p>
                <p className="text-sm">{payment.appointment.doctor.specialty}</p>
              </div>
              <div>
                <p className="text-sm text-blue-300">Treatment Type</p>
                <p className="font-semibold">{t(`treatment.${payment.appointment.type}`)}</p>
              </div>
              <div>
                <p className="text-sm text-blue-300">Date & Time</p>
                <p className="font-semibold">
                  {new Date(payment.appointment.date).toLocaleDateString('en-US')} at {payment.appointment.time}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-300">Amount</p>
                <p className="text-3xl font-bold text-white">
                  {payment.amount.toLocaleString('en-US')} ฿
                </p>
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          {payment.status === 'PENDING' && bankDetails && (
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-400/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                Bank Account for Transfer
              </h2>
              <div className="space-y-4 bg-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-300" />
                  <div>
                    <p className="text-sm text-blue-200">Bank</p>
                    <p className="text-lg font-bold text-white">{bankDetails.bankName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-blue-300" />
                  <div>
                    <p className="text-sm text-blue-200">Account Number</p>
                    <p className="text-2xl font-bold text-white tracking-wider">{bankDetails.accountNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-300" />
                  <div>
                    <p className="text-sm text-blue-200">Account Name</p>
                    <p className="text-lg font-bold text-white">{bankDetails.accountName}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-400/50 rounded-xl">
                <p className="text-yellow-200 text-sm">
                  💡 <strong>Instructions:</strong> Please transfer <span className="font-bold">{payment.amount.toLocaleString('en-US')} baht</span> and upload the payment slip below
                </p>
              </div>
            </div>
          )}

          {/* Upload Slip Section */}
          {(payment.status === 'PENDING' || payment.status === 'REJECTED') && (
            <div className="bg-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Upload className="w-6 h-6" />
                Upload Payment Slip
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-white/50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="slip-upload"
                  />
                  <label
                    htmlFor="slip-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <ImageIcon className="w-16 h-16 text-blue-300" />
                    <div>
                      <p className="text-white font-semibold">Click to Upload Slip</p>
                      <p className="text-blue-200 text-sm">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  </label>
                </div>

                {previewUrl && (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Slip preview"
                      className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl(null)
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {selectedFile && (
                  <motion.button
                    onClick={handleUploadSlip}
                    disabled={uploading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {uploading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Confirm Payment
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          )}

          {/* Already Paid */}
          {payment.slipImagePath && (
            <div className="bg-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Your Payment Slip</h2>
              <img
                src={payment.slipImagePath}
                alt="Payment slip"
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
              />
              {payment.status === 'PAID' && (
                <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/50 rounded-xl text-center">
                  <Clock className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                  <p className="text-blue-200">
                    ✅ <strong>Slip Uploaded Successfully!</strong><br />
                    Waiting for admin verification...
                  </p>
                </div>
              )}
              {payment.status === 'SUCCESSFUL' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-400/50 rounded-xl text-center">
                  <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-2" />
                  <p className="text-green-200">
                    🎉 <strong>Payment Successful!</strong><br />
                    Your booking has been confirmed
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded-2xl border flex items-center gap-3 ${
                message.includes('successful') || message.includes('Successfully') || message.includes('✅')
                  ? 'bg-green-500/20 border-green-400 text-green-200'
                  : 'bg-red-500/20 border-red-400 text-red-200'
              }`}
            >
              {message.includes('successful') || message.includes('Successfully') || message.includes('✅') ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p>{message}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  )
}
