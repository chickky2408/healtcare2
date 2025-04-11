
// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'


// export default function BookingPage() {
//   type Doctor = {
//     id: string
//     name: string
//     specialty: string
//   }

//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState('')
// //   const [selectedType, setSelectedType] = useState('')
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [availableTimes, setAvailableTimes] = useState<string[]>([])
//   const [message, setMessage] = useState('')
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null)
//   const [symptoms, setSymptoms] = useState('')
//   const [type, setType] = useState('')
//   // Removed unused type and setType state variables
  

//   const router = useRouter()

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const res = await fetch('/api/doctors')
//       const data = await res.json()
//       setDoctors(data.doctors)
//     }
//     fetchDoctors()

//     const stored = localStorage.getItem('user')
//     if (stored) setUser(JSON.parse(stored))
//   }, [])

//   useEffect(() => {
//     const fetchAvailableTimes = async () => {
//       if (selectedDoctor && date) {
//         const res = await fetch('/api/appointments/available', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ doctorId: selectedDoctor, date })
//         })
//         const data = await res.json()
//         setAvailableTimes(data.availableTimes || [])
//       }
//     }
//     fetchAvailableTimes()
//   }, [selectedDoctor, date])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!selectedDoctor || !date || !time || !user || !type) {
//       return setMessage('❗ Please complete all fields')
//     }
//     const res = await fetch('/api/appointments/book', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         doctorId: selectedDoctor,
//         date,
//         time,
//         patientName: user.name,
//         patientEmail: user.email,
//         type,
//         symptoms,
//       })
//     })
//     const result = await res.json()
//     if (res.ok) router.push('/dashboard/user?success=true')
//     else setMessage(result.message || '❌ Booking failed.')
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-start md:items-center">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl animate-fade-in">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">📅 Book an Appointment</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Doctor</label>
//             <select
//               value={selectedDoctor}
//               onChange={(e) => setSelectedDoctor(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">-- Select --</option>
//               {doctors.map((d) => (
//                 <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Select Treatment</label>
//             <select
//                 className="w-full border px-3 py-2 rounded"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//             >
//                 <option value="">-- Select Treatment --</option>
//                 <option value="VIDEO_CALL">Video Call</option>
//                 <option value="CLEANING">Cleaning</option>
//                 <option value="ORTHODONTIC">Orthodontic</option>
//                 <option value="AI_DIAGNOSIS">AI Diagnosis</option>
//             </select>
//         </div>

//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Select Time</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">-- Select Time --</option>
//               {availableTimes.map((t, idx) => (
//                 <option key={idx} value={t}>{t}</option>
//               ))}
//             </select>
//           </div>


//           <div>
//             <label className="block mb-1 font-medium">Symptoms / Concerns</label>
//             <textarea
//                 className="w-full border px-3 py-2 rounded resize-none"
//                 rows={3}
//                 placeholder="Describe your symptoms or concerns..."
//                 value={symptoms}
//                 onChange={(e) => setSymptoms(e.target.value)}
//             />
//           </div>


//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
//           >
//             Confirm Booking
//           </button>
//         </form>
//         {message && <p className="text-center mt-4 text-red-500 font-medium">{message}</p>}

//         <div className="text-center mt-6">
//           <a href="/dashboard/user" className="text-sm text-blue-500 hover:underline">← Back to Dashboard</a>
//         </div>
//       </div>
//     </div>
//   )
// }












'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { generateTimeSlots, isPastDateTime } from '@/lib/timeUtils'

type Doctor = {
  id: string
  name: string
  specialty: string
}

export default function BookingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [symptoms, setSymptoms] = useState('')
  const router = useRouter()

  const todayDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await fetch('/api/doctors')
      const data = await res.json()
      setDoctors(data.doctors)
    }
    fetchDoctors()

    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (selectedDoctor && date) {
        const res = await fetch('/api/appointments/available', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doctorId: selectedDoctor, date })
        })
        const data = await res.json()
        setAvailableTimes(data.availableTimes || [])
      }
    }
    fetchAvailableTimes()
  }, [selectedDoctor, date])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDoctor || !date || !time || !user || !type) {
      return setMessage('❗ Please complete all fields')
    }

    const res = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: selectedDoctor,
        date,
        time,
        patientName: user.name,
        patientEmail: user.email,
        type,
        symptoms,
      })
    })
    const result = await res.json()
    if (res.ok) router.push('/dashboard/user?success=true')
    else setMessage(result.message || '❌ Booking failed.')
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-start md:items-center">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">📅 Book an Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Doctor */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">-- Select --</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>

          {/* Treatment */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Treatment</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">-- Select Treatment --</option>
              <option value="VIDEO_CALL">Video Call</option>
              <option value="CLEANING">Cleaning</option>
              <option value="ORTHODONTIC">Orthodontic</option>
              <option value="AI_DIAGNOSIS">AI Diagnosis</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Date</label>
            <input
              type="date"
              value={date}
              min={todayDate}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">-- Select Time --</option>
              {generateTimeSlots().map((t) => {
                const isBooked = !availableTimes.includes(t)
                const isPast = date === todayDate && isPastDateTime(date, t)
                return (
                  <option key={t} value={t} disabled={isBooked || isPast}>
                    {t}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Symptoms / Concerns</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full border px-4 py-2 rounded resize-none"
              rows={3}
              placeholder="Describe your symptoms or concerns..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-red-500 font-medium">{message}</p>
        )}

        <div className="text-center mt-6">
          <a href="/dashboard/user" className="text-sm text-blue-500 hover:underline">← Back to Dashboard</a>
        </div>
      </div>
    </div>
  )
}