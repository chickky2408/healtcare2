'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  DollarSign,
  Filter,
  Download
} from 'lucide-react'
import { useApp } from '@/app/contexts/AppContext'

type Payment = {
  id: string
  amount: number
  status: string
  slipImagePath: string | null
  paidAt: string | null
  verifiedAt: string | null
  verifiedBy: string | null
  rejectionReason: string | null
  createdAt: string
  appointment: {
    id: string
    patientName: string
    patientEmail: string
    type: string
    date: string
    time: string
    doctor: {
      name: string
      specialty: string
    }
  }
}

export default function AdminPaymentsPage() {
  const { t } = useApp()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (admin) {
      const adminData = JSON.parse(admin)
      setAdminEmail(adminData.email)
    }
    fetchPayments()
  }, [filter])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const url = filter === 'all'
        ? '/api/admin/payments'
        : `/api/admin/payments?status=${filter.toUpperCase()}`

      const res = await fetch(url)
      const data = await res.json()
      setPayments(data.payments || [])
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (paymentId: string, status: string) => {
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId,
          status,
          rejectionReason: status === 'REJECTED' ? rejectionReason : null,
          adminEmail
        })
      })

      if (res.ok) {
        fetchPayments()
        setShowModal(false)
        setSelectedPayment(null)
        setRejectionReason('')
      }
    } catch (error) {
      console.error('Error updating payment:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      PENDING: { bg: 'bg-yellow-100 text-yellow-800', text: 'Pending Payment' },
      PAID: { bg: 'bg-blue-100 text-blue-800', text: 'Under Review' },
      SUCCESSFUL: { bg: 'bg-green-100 text-green-800', text: 'Successful' },
      REJECTED: { bg: 'bg-red-100 text-red-800', text: 'Rejected' }
    }
    const badge = badges[status] || badges.PENDING
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.bg}`}>
        {badge.text}
      </span>
    )
  }

  const filteredPayments = payments.filter(p =>
    filter === 'all' ? true : p.status === filter.toUpperCase()
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Management</h1>
          <p className="text-gray-600">Review and manage payment slips</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="w-5 h-5 text-gray-500" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'paid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Under Review
            </button>
            <button
              onClick={() => setFilter('successful')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'successful'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Successful
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'rejected'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Payments</p>
                <p className="text-3xl font-bold text-gray-900">{payments.length}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Under Review</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {payments.filter(p => p.status === 'PAID').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Successful</p>
                <p className="text-3xl font-bold text-green-600">
                  {payments.filter(p => p.status === 'SUCCESSFUL').length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-3xl font-bold text-red-600">
                  {payments.filter(p => p.status === 'REJECTED').length}
                </p>
              </div>
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Treatment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{payment.appointment.patientName}</p>
                        <p className="text-sm text-gray-500">{payment.appointment.patientEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{t(`treatment.${payment.appointment.type}`)}</p>
                        <p className="text-sm text-gray-500">Dr. {payment.appointment.doctor.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {payment.amount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                      </p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedPayment(payment)
                          setShowModal(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

              {/* Patient Info */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-semibold">{selectedPayment.appointment.patientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold">{selectedPayment.appointment.patientEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Treatment</p>
                    <p className="font-semibold">{t(`treatment.${selectedPayment.appointment.type}`)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Amount</p>
                    <p className="text-xl font-bold text-blue-600">
                      {selectedPayment.amount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Slip */}
              {selectedPayment.slipImagePath && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Slip</h3>
                  <img
                    src={selectedPayment.slipImagePath}
                    alt="Payment slip"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                  />
                </div>
              )}

              {/* Rejection Reason Input */}
              {selectedPayment.status === 'PAID' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason (optional)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter reason if rejecting..."
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                {selectedPayment.status === 'PAID' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(selectedPayment.id, 'SUCCESSFUL')}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      ✅ Approve Payment
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedPayment.id, 'REJECTED')}
                      className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      ❌ Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedPayment(null)
                    setRejectionReason('')
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
