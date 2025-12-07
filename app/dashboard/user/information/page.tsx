'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User as UserIcon, Mail, Phone, Calendar, Activity, Weight,
  Heart, AlertCircle, Scissors, FileText, ArrowLeft, Shield,
  Clock, MapPin
} from 'lucide-react'
import { useApp } from '@/app/contexts/AppContext'

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  phoneNumber?: string
  gender?: string
  dateOfBirth?: string
  age?: number
  weight?: number
  allergies?: string
  profileImage?: string
  image?: string
  hasDentalSurgery?: boolean
  dentalSurgeryDetails?: string
  previousDentalDiseases?: string
  dentalTreatmentHistory?: string
  createdAt: string
}

export default function UserInformationPage() {
  const { t } = useApp()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const stored = localStorage.getItem('user')
      if (!stored) {
        router.push('/login')
        return
      }

      const user = JSON.parse(stored)

      try {
        const res = await fetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        })

        const data = await res.json()

        if (data.success) {
          setUserProfile(data.user)
        } else {
          console.error('Failed to fetch profile')
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const InfoCard = ({ icon: Icon, label, value, fullWidth = false }: {
    icon: any
    label: string
    value: string | number | undefined | null
    fullWidth?: boolean
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow ${
        fullWidth ? 'col-span-full' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="text-blue-600" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-lg font-semibold text-gray-800 break-words">
            {value || 'Not provided'}
          </p>
        </div>
      </div>
    </motion.div>
  )

  const SectionHeader = ({ icon: Icon, title, description }: {
    icon: any
    title: string
    description: string
  }) => (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
        <Icon className="text-white" size={28} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-gray-600 font-medium">Loading your information...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Failed to load profile information</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not provided'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatGender = (gender?: string) => {
    if (!gender) return 'Not specified'
    return t(`gender.${gender}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
              {userProfile.profileImage || userProfile.image ? (
                <img
                  src={userProfile.profileImage || userProfile.image}
                  alt={userProfile.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <span className="text-4xl font-bold">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userProfile.name}</h1>
              <p className="text-blue-100 text-lg">{userProfile.email}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-blue-100">
                <Clock size={16} />
                <span>Member since {formatDate(userProfile.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Personal Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
        >
          <SectionHeader
            icon={UserIcon}
            title="Personal Information"
            description="Your basic profile details"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard icon={UserIcon} label="Full Name" value={userProfile.name} />
            <InfoCard icon={Mail} label="Email Address" value={userProfile.email} />
            <InfoCard
              icon={Phone}
              label="Phone Number"
              value={userProfile.phoneNumber || userProfile.phone}
            />
            <InfoCard icon={MapPin} label="Gender" value={formatGender(userProfile.gender)} />
            <InfoCard icon={Calendar} label="Date of Birth" value={formatDate(userProfile.dateOfBirth)} />
            <InfoCard icon={Activity} label="Age" value={userProfile.age ? `${userProfile.age} years` : undefined} />
            <InfoCard icon={Weight} label="Weight" value={userProfile.weight ? `${userProfile.weight} kg` : undefined} />
          </div>
        </motion.div>

        {/* Medical Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
        >
          <SectionHeader
            icon={Heart}
            title="Medical Information"
            description="Important health details for your care"
          />

          <div className="grid grid-cols-1 gap-6">
            <InfoCard
              icon={AlertCircle}
              label="Allergies"
              value={userProfile.allergies}
              fullWidth
            />
          </div>
        </motion.div>

        {/* Dental History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md p-8 border border-blue-100"
        >
          <SectionHeader
            icon={Shield}
            title="Dental History"
            description="Your dental health background"
          />

          <div className="space-y-6">
            {/* Dental Surgery Status */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scissors className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Dental Surgery History</p>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      userProfile.hasDentalSurgery
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {userProfile.hasDentalSurgery ? 'Has had dental surgery' : 'No dental surgery'}
                    </span>
                  </div>
                  {userProfile.hasDentalSurgery && userProfile.dentalSurgeryDetails && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">Surgery Details:</p>
                      <p className="text-gray-800 whitespace-pre-wrap">{userProfile.dentalSurgeryDetails}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Previous Dental Diseases */}
            {userProfile.previousDentalDiseases && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="text-red-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">Previous Dental Diseases</p>
                    <p className="text-gray-800 whitespace-pre-wrap">{userProfile.previousDentalDiseases}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Dental Treatment History */}
            {userProfile.dentalTreatmentHistory && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">Treatment History</p>
                    <p className="text-gray-800 whitespace-pre-wrap">{userProfile.dentalTreatmentHistory}</p>
                  </div>
                </div>
              </div>
            )}

            {!userProfile.previousDentalDiseases && !userProfile.dentalTreatmentHistory && !userProfile.hasDentalSurgery && (
              <div className="text-center py-8">
                <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No dental history recorded</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <Shield className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Information Sharing</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                This information is securely stored and will be accessible to your assigned doctors
                to provide you with the best possible care. Your data is protected and only shared
                with authorized healthcare professionals involved in your treatment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
