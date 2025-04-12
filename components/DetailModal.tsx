

///ver2


'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
// import { Appointment } from '@/types/appointment'

type Appointment = {
  id: string
  date: string
  time: string
  type: 'VIDEO_CALL' | 'AI_DIAGNOSIS' | 'IN_PERSON'
  doctor: { id: string; name: string; specialty: string }
  patientName: string
  patientEmail: string
  symptoms?: string
}

type DetailModalProps = {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment
}

export default function DetailModal({
  isOpen,
  onClose,
  appointment,
}: DetailModalProps) {
  const isVideoCall = appointment.type === 'VIDEO_CALL'
  const isAiAnalysis = appointment.type === 'AI_DIAGNOSIS'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Appointment Details
                </Dialog.Title>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p><b>Patient:</b> {appointment.patientName}</p>
                  <p><b>Email:</b> {appointment.patientEmail}</p>
                  <p><b>Doctor:</b> {appointment.doctor.name} ({appointment.doctor.specialty})</p>
                  <p><b>Date:</b> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p><b>Time:</b> {appointment.time}</p>
                  <p><b>Treatment:</b> {appointment.type}</p>
                  <p><b>Symptoms:</b> {appointment.symptoms || 'N/A'}</p>
                </div>

                <div className="mt-4 flex gap-3">
                  {isVideoCall && (
                    <Link
                      href={`/telemedicine/${appointment.doctor.id}`}
                      className="text-sm text-blue-600 underline"
                    >
                      Join Video Call
                    </Link>
                  )}

                  {isAiAnalysis && (
                    <Link
                      href="/ai-analysis"
                      className="text-sm text-green-600 underline"
                    >
                      Go to AI Diagnosis
                    </Link>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
