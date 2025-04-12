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






'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Doctor = {
  name: string
  specialty: string
  meetLink: string
}

export default function TelemedicinePage() {
  const { doctorId } = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    fetch(`/api/doctors/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data.doctor))
  }, [doctorId])

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading doctor info...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-purple-700">📞 Telemedicine Appointment</h1>
        <p className="text-gray-600">
          Doctor: <span className="font-semibold">{doctor.name}</span> ({doctor.specialty})
        </p>

        {doctor.meetLink ? (
          <>
            <p className="text-gray-500 text-sm">Click below to join your scheduled video call</p>
            <a
              href={doctor.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition mt-2"
            >
              Join Google Meet
            </a>
          </>
        ) : (
          <p className="text-red-500 font-medium mt-2">Doctor has not set a video link yet.</p>
        )}

        <div className="mt-4">
          <a href="/dashboard/user" className="text-sm text-blue-600 hover:underline">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}