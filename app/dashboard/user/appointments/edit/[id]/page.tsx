// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter, useParams } from 'next/navigation'

// const treatmentOptions = ['VIDEO_CALL', 'CLEANING', 'ORTHODONTIC', 'AI_DIAGNOSIS']

// export default function EditAppointmentPage() {
//   const router = useRouter()
//   const params = useParams()
//   const id = params.id as string

//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [type, setType] = useState('')
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         const appointment = data.appointments?.find((a: any) => a.id === id)
//         if (!appointment) return router.push('/dashboard/user/appointments')
//         setDate(appointment.date?.split('T')[0])
//         setTime(appointment.time)
//         setType(appointment.type)
//         setLoading(false)
//       })
//   }, [id, router])

//   const handleUpdate = async () => {
//     const res = await fetch('/api/appointments/update', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, date, time, type }),
//     })

//     if (res.ok) {
//       alert('Appointment updated!')
//       router.push('/dashboard/user/appointments')
//     } else {
//       alert('Failed to update')
//     }
//   }

//   if (loading) return <p className="p-6">Loading...</p>

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-yellow-50">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <h1 className="text-xl font-bold mb-4 text-yellow-700">Edit Appointment</h1>

//         <div className="space-y-4">
//           <label className="block">
//             <span>Date:</span>
//             <input
//               type="date"
//               className="w-full border rounded px-3 py-2"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </label>

//           <label className="block">
//             <span>Time:</span>
//             <input
//               type="time"
//               className="w-full border rounded px-3 py-2"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//             />
//           </label>

//           <label className="block">
//             <span>Treatment Type:</span>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//             >
//               {treatmentOptions.map(opt => (
//                 <option key={opt} value={opt}>{opt}</option>
//               ))}
//             </select>
//           </label>

//           <button
//             onClick={handleUpdate}
//             className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }






'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

const treatmentOptions = ['VIDEO_CALL', 'CLEANING', 'ORTHODONTIC', 'AI_DIAGNOSIS']

export default function EditAppointmentPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/appointments/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        interface Appointment {
          id: string;
          date: string;
          time: string;
          type: string;
        }

        const appointment = data.appointments?.find((a: Appointment) => a.id === id)
        if (!appointment) return router.push('/dashboard/user/appointments')
        setDate(appointment.date?.split('T')[0])
        setTime(appointment.time)
        setType(appointment.type)
        setLoading(false)
      })
  }, [id, router])

  const handleUpdate = async () => {
    const res = await fetch('/api/appointments/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, date, time, type }),
    })

    if (res.ok) {
      alert('Appointment updated!')
      router.push('/dashboard/user/appointments')
    } else {
      alert('Failed to update')
    }
  }

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="min-h-screen flex justify-center items-center bg-yellow-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-yellow-700">Edit Appointment</h1>

        <div className="space-y-4">
          <label className="block">
            <span>Date:</span>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="block">
            <span>Time:</span>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <label className="block">
            <span>Treatment Type:</span>
            <select
              className="w-full border rounded px-3 py-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {treatmentOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <button
            onClick={handleUpdate}
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}