

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
//         interface Appointment {
//           id: string;
//           date: string;
//           time: string;
//           type: string;
//         }

//         const appointment = data.appointments?.find((a: Appointment) => a.id === id)
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







// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

// type Appointment = {
//   id: string
//   date: string
//   time: string
//   type: string
//   symptoms: string
//   doctorId: string
// }

// export default function EditAppointmentPage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [type, setType] = useState('')
//   const [symptoms, setSymptoms] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])

//   const todayDate = new Date().toISOString().split('T')[0]

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       const res = await fetch(`/api/appointments/${id}`)
//       const data = await res.json()
//       setAppointment(data.appointment)
//       setDate(data.appointment.date)
//       setTime(data.appointment.time)
//       setType(data.appointment.type)
//       setSymptoms(data.appointment.symptoms)
//     }

//     fetchAppointment()
//   }, [id])

//   useEffect(() => {
//     const fetchAvailable = async () => {
//       if (appointment?.doctorId && date) {
//         const res = await fetch('/api/appointments/available', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ doctorId: appointment.doctorId, date })
//         })
//         const data = await res.json()
//         setAvailableTimes(data.availableTimes || [])
//       }
//     }

//     fetchAvailable()
//   }, [appointment?.doctorId, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const res = await fetch('/api/appointments/update', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, date, time, type, symptoms })
//     })

//     if (res.ok) {
//       router.push('/dashboard/user?updated=true')
//     } else {
//       alert('❌ Failed to update appointment')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-yellow-50 flex justify-center items-center p-6">
//       <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">Edit Appointment</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label>Date:</label>
//             <input
//               type="date"
//               value={date}
//               min={todayDate}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label>Time:</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//               required
//             >
//               <option value="">-- Select Time --</option>
//               {generateTimeSlots().map((t) => {
//                 const isBooked = availableTimes.includes(t) === false
//                 const isPast = date === todayDate && isPastDateTime(date, t)
//                 return (
//                   <option key={t} value={t} disabled={isBooked || isPast}>
//                     {t}
//                   </option>
//                 )
//               })}
//             </select>
//           </div>

//           <div>
//             <label>Treatment Type:</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full border px-4 py-2 rounded"
//               required
//             >
//               <option value="">-- Select Treatment --</option>
//               <option value="VIDEO_CALL">VIDEO_CALL</option>
//               <option value="CLEANING">CLEANING</option>
//               <option value="ORTHODONTIC">ORTHODONTIC</option>
//               <option value="AI_DIAGNOSIS">AI_DIAGNOSIS</option>
//             </select>
//           </div>

//           <div>
//             <label>Symptoms:</label>
//             <textarea
//               className="w-full border px-3 py-2 rounded resize-none"
//               rows={3}
//               value={symptoms}
//               onChange={(e) => setSymptoms(e.target.value)}
//               placeholder="Describe any symptoms..."
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-yellow-600 text-white font-semibold py-2 rounded hover:bg-yellow-700 transition"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }






'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

export default function EditAppointmentPage() {
  const { id } = useParams()
  const router = useRouter()

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [type, setType] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [doctorId, setDoctorId] = useState('')
  const [message, setMessage] = useState('')

  const todayDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`/api/appointments/${id}`)
      const data = await res.json()
      if (res.ok) {
        setDate(data.date)
        setTime(data.time)
        setType(data.type)
        setDoctorId(data.doctorId)
      } else {
        setMessage('❌ Failed to load appointment')
      }
    }
    fetchDetails()
  }, [id])

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (doctorId && date) {
        const res = await fetch('/api/appointments/available', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doctorId, date }),
        })
        const data = await res.json()
        setAvailableTimes(data.availableTimes || [])
      }
    }
    fetchAvailableTimes()
  }, [doctorId, date])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/appointments/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, date, time, type }),
    })
    const result = await res.json()
    if (res.ok) router.push('/dashboard/user?edit=success')
    else setMessage(result.message || '❌ Update failed.')
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-6 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Edit Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Date:</label>
            <input
              type="date"
              value={date}
              min={todayDate}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Time:</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Select Time --</option>
              {generateTimeSlots().map((t) => {
                const isCurrentTime = t === time // เวลาเดิมที่ user เคยจองไว้
                const isBooked = availableTimes.includes(t) === false && !isCurrentTime
                const isPast = date === todayDate && isPastDateTime(date, t) && !isCurrentTime
                return (
                  <option key={t} value={t} disabled={isBooked || isPast}>
                    {t}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Treatment Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Select Treatment --</option>
              <option value="VIDEO_CALL">Video Call</option>
              <option value="CLEANING">Cleaning</option>
              <option value="ORTHODONTIC">Orthodontic</option>
              <option value="AI_DIAGNOSIS">AI Diagnosis</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
          >
            Save Changes
          </button>

          {message && <p className="text-center text-red-500 mt-3">{message}</p>}
        </form>
      </div>
    </div>
  )
}
