

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'



// type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: { name: string; specialty: string }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AppointmentsPage() {
//   // Removed unused user state
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const router = useRouter()


//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')

//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')
//     // Removed setUser as user state is no longer used

//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.appointments) setAppointments(data.appointments)
//       })
//   }, [router])

//   const cancelAppointment = async (id: string) => {
//     const confirmed = confirm('Cancel this appointment?')
//     if (!confirmed) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })

//     if (res.ok) {
//       setAppointments(appointments.filter((a) => a.id !== id))
//     }
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p>
//                   🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
//                 </p>
//                 <p>
//                   📋 Treatment: <b>{a.type}</b>
//                 </p>
//                 <div className="mt-2 space-x-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => cancelAppointment(a.id)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }








// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import ConfirmModal from '@/components/ConfirmModal'

// type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: { name: string; specialty: string }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [selectedId, setSelectedId] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')

//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')

//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.appointments) setAppointments(data.appointments)
//       })
//   }, [router])

//   const handleCancel = async () => {
//     if (!selectedId) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: selectedId }),
//     })

//     if (res.ok) {
//       setAppointments((prev) => prev.filter((a) => a.id !== selectedId))
//       alert('Appointment cancelled.')
//     }

//     setShowConfirm(false)
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p>
//                   🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
//                 </p>
//                 <p>📋 Treatment: <b>{a.type}</b></p>
//                 <div className="mt-2 flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => {
//                       setSelectedId(a.id)
//                       setShowConfirm(true)
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* ✅ Confirm Modal */}
//       <ConfirmModal
//         isOpen={showConfirm}
//         onClose={() => setShowConfirm(false)}
//         onConfirm={handleCancel}
//         message="Are you sure you want to cancel this appointment?"
//       />
//     </div>
//   )
// }



// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import ConfirmModal from '@/components/ConfirmModal'
// import DetailModal from '@/components/DetailModal'

// // import type { Appointment } from '@/types/appointment'




// export type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   doctor: {
//     name: string
//     specialty: string
//   }
// }

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [selectedId, setSelectedId] = useState<string | null>(null)

//   const [showDetail, setShowDetail] = useState(false)
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')

//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')

//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.appointments) setAppointments(data.appointments)
//       })
//   }, [router])

//   const handleCancel = async () => {
//     if (!selectedId) return

//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: selectedId }),
//     })

//     if (res.ok) {
//       setAppointments((prev) => prev.filter((a) => a.id !== selectedId))
//     }

//     setShowConfirm(false)
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-6">
//           Your Appointments
//         </h1>

//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {appointments.map((a) => (
//               <li key={a.id} className="border p-4 rounded-md shadow-sm">
//                 <p className="text-sm text-gray-600">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p>
//                   🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
//                 </p>
//                 <p>📋 Treatment: <b>{a.type}</b></p>
//                 <div className="mt-2 flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() =>
//                       router.push(`/dashboard/user/appointments/edit/${a.id}`)
//                     }
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => {
//                       setSelectedId(a.id)
//                       setShowConfirm(true)
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
//                     onClick={() => {
//                       setSelectedAppointment(a)
//                       setShowDetail(true)
//                     }}
//                   >
//                     Detail
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Cancel confirm */}
//       <ConfirmModal
//         isOpen={showConfirm}
//         onClose={() => setShowConfirm(false)}
//         onConfirm={handleCancel}
//         message="Are you sure you want to cancel this appointment?"
//       />

//       {/* Detail popup */}
//       {selectedAppointment && (
//         <DetailModal
//           isOpen={showDetail}
//           onClose={() => {
//             setSelectedAppointment(null)
//             setShowDetail(false)
//           }}
//           appointment={selectedAppointment}
//         />
//       )}
//     </div>
//   )
// }



//2 may 2024

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/ConfirmModal'

export type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: {
    name: string
    specialty: string
  }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')

    const parsed: User = JSON.parse(stored)
    if (parsed.role !== 'USER') return router.push('/login')

    fetch('/api/appointments/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) setAppointments(data.appointments)
      })
  }, [router])

  const handleCancel = async () => {
    if (!selectedId) return

    const res = await fetch('/api/appointments/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId }),
    })

    if (res.ok) {
      setAppointments((prev) => prev.filter((a) => a.id !== selectedId))
    }

    setShowConfirm(false)
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Your Appointments
        </h1>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((a) => (
              <li key={a.id} className="border p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">
                  📅 {new Date(a.date).toLocaleDateString()} at {a.time}
                </p>
                <p>
                  🧑‍⚕️ <b>{a.doctor.name}</b> ({a.doctor.specialty})
                </p>
                <p>📋 Treatment: <b>{a.type}</b></p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() =>
                      router.push(`/dashboard/user/appointments/edit/${a.id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                      setSelectedId(a.id)
                      setShowConfirm(true)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
                    onClick={() =>
                      router.push(`/dashboard/user/telemedicine/${a.id}`)
                    }
                  >
                    Detail
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleCancel}
        message="Are you sure you want to cancel this appointment?"
      />
    </div>
  )
}