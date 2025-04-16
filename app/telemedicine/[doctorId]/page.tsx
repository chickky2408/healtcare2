// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'

// type Doctor = {
//   id: string
//   name: string
//   specialty: string
//   meetLink?: string
// }

// export default function TelemedicinePage() {
//   const { doctorId } = useParams()
//   const [doctor, setDoctor] = useState<Doctor | null>(null)

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       const res = await fetch(`/api/doctors/${doctorId}`)
//       const data = await res.json()
//       setDoctor(data.doctor)
//     }
//     fetchDoctor()
//   }, [doctorId])

//   if (!doctor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Loading...
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
//       <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
//         <h1 className="text-3xl font-bold text-purple-700 mb-4">📞 Video Call with Dr. {doctor.name}</h1>
//         <p className="mb-4 text-gray-600">Specialty: {doctor.specialty}</p>

//         {doctor.meetLink ? (
//           <a
//             href={doctor.meetLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
//           >
//             Join Google Meet
//           </a>
//         ) : (
//           <p className="text-red-500 font-semibold">No video call link available.</p>
//         )}

//         <div className="mt-6">
//           <a href="/dashboard/user" className="text-blue-500 hover:underline text-sm">
//             ← Back to Dashboard
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }






// 'use client'

// import { useParams } from 'next/navigation'
// import { useEffect, useState } from 'react'

// type Doctor = {
//   name: string
//   specialty: string
//   meetLink: string
// }

// export default function TelemedicinePage() {
//   const { doctorId } = useParams()
//   const [doctor, setDoctor] = useState<Doctor | null>(null)

//   useEffect(() => {
//     fetch(`/api/doctors/${doctorId}`)
//       .then((res) => res.json())
//       .then((data) => setDoctor(data.doctor))
//   }, [doctorId])

//   if (!doctor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading doctor info...
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
//         <h1 className="text-2xl font-bold text-purple-700">📞 Telemedicine Appointment</h1>
//         <p className="text-gray-600">
//           Doctor: <span className="font-semibold">{doctor.name}</span> ({doctor.specialty})
//         </p>

//         {doctor.meetLink ? (
//           <>
//             <p className="text-gray-500 text-sm">Click below to join your scheduled video call</p>
//             <a
//               href={doctor.meetLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition mt-2"
//             >
//               Join Google Meet
//             </a>
//           </>
//         ) : (
//           <p className="text-red-500 font-medium mt-2">Doctor has not set a video link yet.</p>
//         )}

//         <div className="mt-4">
//           <a href="/dashboard/user" className="text-sm text-blue-600 hover:underline">
//             ← Back to Dashboard
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }








'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  symptoms?: string
  doctor: {
    name: string
    specialty: string
    meetLink?: string
  }
}

interface User {
  name: string
  email: string
  role: string
}

export default function TelemedicinePage({ params }: { params: { doctorId: string } }) {
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed = JSON.parse(stored)
    setUser(parsed)

    fetch('/api/appointments/telemedicine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: parsed.email,
        doctorId: params.doctorId,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.appointment) setAppointment(data.appointment)
      })
  }, [params.doctorId, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Appointment Details</h2>
        {appointment ? (
          <div className="space-y-2">
            <p><strong>Patient:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Doctor:</strong> {appointment.doctor.name} ({appointment.doctor.specialty})</p>
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Treatment:</strong> {appointment.type}</p>
            <p><strong>Symptoms:</strong> {appointment.symptoms || 'N/A'}</p>

            {appointment.type === 'VIDEO_CALL' && appointment.doctor.meetLink && (
              <a
                href={appointment.doctor.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 block mt-2"
              >
                Join Video Call
              </a>
            )}
          </div>
        ) : (
          <p>Loading doctor info...</p>
        )}

        <button
          onClick={() => router.back()}
          className="mt-6 text-sm text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}






