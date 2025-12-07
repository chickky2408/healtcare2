// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'

// type Appointment = {
//   id: string
//   patientName: string
//   patientEmail: string
//   date: string
//   time: string
//   type: string
//   symptoms?: string
//   doctor?: {
//     name: string
//     specialty: string
//     meetLink?: string
//   }
// }

// export default function TelemedicinePage() {
//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [loading, setLoading] = useState(true)
//   const params = useParams()
//   const router = useRouter()

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       const appointmentId = params?.appointmentId as string
//       try {
//         const res = await fetch(`/api/appointments/${appointmentId}`)
//         const data = await res.json()
//         setAppointment(data)
//       } catch (error) {
//         console.error('Failed to fetch appointment:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAppointment()
//   }, [params])

//   if (loading) {
//     return <div className="p-6 text-center text-gray-600">Loading...</div>
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-blue-700 mb-4">Appointment Details</h1>

//         {appointment ? (
//           <>
//             <p><strong>Patient:</strong> {appointment.patientName}</p>
//             <p><strong>Email:</strong> {appointment.patientEmail}</p>
//             {appointment.doctor ? (
//               <p><strong>Doctor:</strong> Dr. {appointment.doctor.name} ({appointment.doctor.specialty})</p>
//             ) : (
//               <p className="text-red-500">Doctor data not available</p>
//             )}
//             <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
//             <p><strong>Time:</strong> {appointment.time}</p>
//             <p><strong>Treatment:</strong> {appointment.type}</p>
//             <p><strong>Symptoms:</strong> {appointment.symptoms || 'N/A'}</p>

//             {appointment.doctor?.meetLink ? (
//               <a
//                 href={appointment.doctor.meetLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
//               >
//                 Join Video Call
//               </a>
//             ) : (
//               <p className="mt-4 text-red-500">No Meet link available</p>
//             )}
//           </>
//         ) : (
//           <p className="text-red-500">Appointment not found.</p>
//         )}

//         <button
//           onClick={() => router.back()}
//           className="mt-4 text-sm text-gray-600 hover:underline"
//         >
//           ← Back
//         </button>
//       </div>
//     </div>
//   )
// }



// 📄 File: app/dashboard/user/telemedicine/[appointmentId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Appointment {
  id: string
  patientName: string
  patientEmail: string
  doctor?: {
    name: string
    specialty: string
    meetLink?: string
  }
  date: string
  time: string
  type: string
  symptom: string
}

export default function TelemedicineDetailPage() {
  const { appointmentId } = useParams<{ appointmentId: string }>()
  const router = useRouter()
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    if (!appointmentId) return

    fetch(`/api/appointments/${appointmentId}`)
      .then(res => res.json())
      .then(data => setAppointment(data))
      .catch(err => console.error(err))
  }, [appointmentId])

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Appointment Details</h2>

        {appointment ? (
          <div className="space-y-2">
            <p><strong>Patient:</strong> {appointment.patientName}</p>
            <p><strong>Email:</strong> {appointment.patientEmail}</p>
            {appointment.doctor ? (
              <p><strong>Doctor:</strong> Dr. {appointment.doctor.name} ({appointment.doctor.specialty})</p>
            ) : (
              <p className="text-red-500">Doctor data not available</p>
            )}
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Treatment:</strong> {appointment.type}</p>
            <p><strong>Symptoms:</strong> {appointment.symptom}</p>
            {appointment.doctor?.meetLink ? (
              <a
                href={appointment.doctor.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
              >
                Join Video Call
              </a>
            ) : (
              <p className="text-red-500 mt-2">No Meet link available</p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading appointment data...</p>
        )}

        <button
          onClick={() => router.back()}
          className="mt-6 text-sm text-gray-600 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
