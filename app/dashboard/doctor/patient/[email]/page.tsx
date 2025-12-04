'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User as UserIcon, Mail, Phone, Calendar, Activity, Weight,
  Heart, AlertCircle, Scissors, FileText, ArrowLeft, Shield,
  Clock, MapPin, Stethoscope, ClipboardList
} from 'lucide-react'

interface PatientProfile {
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
  surgeryHistory?: Array<{
    id: string
    surgeryType: string
    surgeryDate?: string
    hospital?: string
    notes?: string
    createdAt: string
  }>
  diagnoses?: Array<{
    id: string
    result: string
    confidence: number
    createdAt: string
    explanation?: string
    findings?: string
  }>
}

export default function DoctorPatientInfoPage() {
  const router = useRouter()
  const params = useParams()
  const patientEmail = decodeURIComponent(params.email as string)

  const [patient, setPatient] = useState<PatientProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const stored = localStorage.getItem('user')
      if (!stored) {
        router.push('/login')
        return
      }

      const user = JSON.parse(stored)
      if (user.role !== 'DOCTOR') {
        router.push('/dashboard/doctor')
        return
      }

      try {
        const res = await fetch('/api/doctor/patient-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patientEmail }),
        })

        const data = await res.json()

        if (data.success) {
          setPatient(data.patient)
        } else {
          setError(data.message || 'Failed to load patient information')
        }
      } catch (err) {
        console.error('Error fetching patient info:', err)
        setError('Failed to load patient information')
      } finally {
        setLoading(false)
      }
    }

    fetchPatientInfo()
  }, [router, patientEmail])

  const InfoCard = ({ icon: Icon, label, value, fullWidth = false, colorClass = 'bg-blue-100 text-blue-600' }: {
    icon: any
    label: string
    value: string | number | undefined | null
    fullWidth?: boolean
    colorClass?: string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow ${
        fullWidth ? 'col-span-full' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon size={24} />
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
          <p className="text-gray-600 font-medium">Loading patient information...</p>
        </div>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Patient</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase().replace('_', ' ')
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
              {patient.profileImage || patient.image ? (
                <img
                  src={patient.profileImage || patient.image}
                  alt={patient.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <span className="text-4xl font-bold">
                  {patient.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{patient.name}</h1>
                <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                  Patient
                </span>
              </div>
              <p className="text-blue-100 text-lg">{patient.email}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-blue-100">
                <Clock size={16} />
                <span>Patient since {formatDate(patient.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Doctor Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <Stethoscope className="flex-shrink-0 mt-1" size={28} />
            <div>
              <h3 className="font-bold text-xl mb-2">Medical Professional View</h3>
              <p className="text-blue-100 leading-relaxed">
                You are viewing this patient's complete medical record. All information displayed here is
                confidential and should be used solely for providing medical care. Please ensure HIPAA
                compliance when handling this data.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Personal Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
        >
          <SectionHeader
            icon={UserIcon}
            title="Personal Information"
            description="Patient demographics and contact details"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard icon={UserIcon} label="Full Name" value={patient.name} />
            <InfoCard icon={Mail} label="Email Address" value={patient.email} />
            <InfoCard
              icon={Phone}
              label="Phone Number"
              value={patient.phoneNumber || patient.phone}
            />
            <InfoCard icon={MapPin} label="Gender" value={formatGender(patient.gender)} />
            <InfoCard icon={Calendar} label="Date of Birth" value={formatDate(patient.dateOfBirth)} />
            <InfoCard icon={Activity} label="Age" value={patient.age ? `${patient.age} years` : undefined} />
            <InfoCard icon={Weight} label="Weight" value={patient.weight ? `${patient.weight} kg` : undefined} />
          </div>
        </motion.div>

        {/* Medical Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-red-100"
        >
          <SectionHeader
            icon={Heart}
            title="Medical Alerts"
            description="Critical information for patient safety"
          />

          <div className="grid grid-cols-1 gap-6">
            <InfoCard
              icon={AlertCircle}
              label="Known Allergies"
              value={patient.allergies}
              fullWidth
              colorClass="bg-red-100 text-red-600"
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
            description="Complete dental health background"
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
                      patient.hasDentalSurgery
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {patient.hasDentalSurgery ? 'Has had dental surgery' : 'No dental surgery'}
                    </span>
                  </div>
                  {patient.hasDentalSurgery && patient.dentalSurgeryDetails && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">Surgery Details:</p>
                      <p className="text-gray-800 whitespace-pre-wrap">{patient.dentalSurgeryDetails}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Previous Dental Diseases */}
            {patient.previousDentalDiseases && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">Previous Dental Diseases</p>
                    <p className="text-gray-800 whitespace-pre-wrap">{patient.previousDentalDiseases}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Dental Treatment History */}
            {patient.dentalTreatmentHistory && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">Treatment History</p>
                    <p className="text-gray-800 whitespace-pre-wrap">{patient.dentalTreatmentHistory}</p>
                  </div>
                </div>
              </div>
            )}

            {!patient.previousDentalDiseases && !patient.dentalTreatmentHistory && !patient.hasDentalSurgery && (
              <div className="text-center py-8 bg-white rounded-xl">
                <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No dental history recorded</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Previous Diagnoses */}
        {patient.diagnoses && patient.diagnoses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
          >
            <SectionHeader
              icon={ClipboardList}
              title="Previous Diagnoses"
              description="AI-assisted diagnosis history"
            />

            <div className="space-y-4">
              {patient.diagnoses.map((diagnosis, index) => (
                <div key={diagnosis.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{diagnosis.result}</h4>
                      <p className="text-sm text-gray-500">{formatDate(diagnosis.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      diagnosis.confidence >= 0.8
                        ? 'bg-green-100 text-green-700'
                        : diagnosis.confidence >= 0.6
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {(diagnosis.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  {diagnosis.findings && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-600 mb-1">Findings:</p>
                      <p className="text-gray-800">{diagnosis.findings}</p>
                    </div>
                  )}
                  {diagnosis.explanation && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Explanation:</p>
                      <p className="text-gray-800">{diagnosis.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Surgery History */}
        {patient.surgeryHistory && patient.surgeryHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
          >
            <SectionHeader
              icon={Scissors}
              title="Surgery History"
              description="Complete surgical procedure records"
            />

            <div className="space-y-4">
              {patient.surgeryHistory.map((surgery) => (
                <div key={surgery.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-800">{surgery.surgeryType}</h4>
                    <span className="text-sm text-gray-500">{formatDate(surgery.surgeryDate)}</span>
                  </div>
                  {surgery.hospital && (
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Hospital:</span> {surgery.hospital}
                    </p>
                  )}
                  {surgery.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600 mb-1">Notes:</p>
                      <p className="text-gray-800">{surgery.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
