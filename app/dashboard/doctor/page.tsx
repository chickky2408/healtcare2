



// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import ConfirmModal from '@/components/ConfirmModal'

// interface Appointment {
//   id: string
//   date: string
//   time: string
//   type: string
//   patientName: string
//   patientEmail: string
//   symptoms?: string
// }

// interface Doctor {
//   id: string
//   name: string
//   email: string
//   specialty: string
//   meetLink?: string
// }

// export default function DoctorDashboardPage() {
//   const [doctor, setDoctor] = useState<Doctor | null>(null)
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [newLink, setNewLink] = useState('')
//   const [message, setMessage] = useState('')
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [selectedId, setSelectedId] = useState<string | null>(null)

//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')
//     const parsed = JSON.parse(stored)
//     if (parsed.role !== 'DOCTOR') return router.push('/login')
//     setDoctor(parsed)

//     fetch('/api/appointments/doctor', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then(res => res.json())
//       .then(data => setAppointments(data.appointments))
//   }, [router])

//   const cancelAppointment = async () => {
//     if (!selectedId) return
//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: selectedId }),
//     })
//     if (res.ok) {
//       setAppointments(prev => prev.filter(a => a.id !== selectedId))
//     }
//     setShowConfirm(false)
//   }

//   const handleUpdateMeetLink = async () => {
//     if (!doctor) return
//     const res = await fetch('/api/doctors/update-meet-link', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: doctor.email, meetLink: newLink }),
//     })
//     const data = await res.json()
//     if (res.ok) {
//       setMessage('✅ Google Meet link updated successfully')
//       setDoctor({ ...doctor, meetLink: newLink })
//     } else {
//       setMessage(data.message || '❌ Failed to update Meet link')
//     }
//   }

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-blue-50">
//       {/* Sidebar */}
//       <aside className="w-full md:w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
//         <h2 className="text-2xl font-bold">🩺 Dr. {doctor?.name}</h2>
//         <nav className="space-y-3 text-sm">
//           <button onClick={() => router.push('/dashboard/doctor')} className="w-full text-left bg-white/10 px-3 py-2 rounded hover:bg-white/20">📅 Appointments</button>
//           <button onClick={() => router.push('/telemedicine')} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">🎥 Video Call</button>
//           <button onClick={() => router.push('/ai-analysis')} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">🧠 AI Analysis</button>
//         </nav>
//         <button onClick={() => { localStorage.removeItem('user'); router.push('/login') }} className="mt-10 text-red-300 text-sm hover:underline">⏏ Logout</button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:p-10">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-blue-800 mb-2">Your Appointments</h1>
//         </div>

//         <div className="mb-6">
//           <label className="block font-medium text-gray-700 mb-1">🔗 Google Meet Link</label>
//           <input
//             type="text"
//             value={newLink}
//             onChange={(e) => setNewLink(e.target.value)}
//             placeholder="Enter Meet link"
//             className="w-full border px-4 py-2 rounded"
//           />
//           <button
//             onClick={handleUpdateMeetLink}
//             className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//           >
//             Update Link
//           </button>
//           {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
//         </div>

//         {appointments.length === 0 ? (
//           <p className="text-gray-600">No appointments scheduled yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map((a) => (
//               <div key={a.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between gap-4">
//                 <div>
//                   <p className="text-blue-800 font-semibold">📅 {new Date(a.date).toLocaleDateString()} at {a.time}</p>
//                   <p className="text-sm">👤 {a.patientName} ({a.patientEmail})</p>
//                   <p className="text-sm">📋 {a.type}</p>
//                   <p className="text-sm">📝 {a.symptoms || 'N/A'}</p>
//                 </div>
//                 <div className="flex gap-2 self-end">
//                   <button
//                     onClick={() => router.push(`/dashboard/doctor/appointments/edit/${a.id}`)}
//                     className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       setSelectedId(a.id)
//                       setShowConfirm(true)
//                     }}
//                     className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Confirm Modal */}
//       <ConfirmModal
//         isOpen={showConfirm}
//         onClose={() => setShowConfirm(false)}
//         onConfirm={cancelAppointment}
//         message="Are you sure you want to cancel this appointment?"
//       />
//     </div>
//   )
// }




//add alert notification

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  patientName: string
  patientEmail: string
  symptoms?: string
}

interface Doctor {
  id: string
  name: string
  email: string
  role: string
  meetLink?: string
}

export default function DoctorDashboardPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [reminderShown, setReminderShown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed: Doctor = JSON.parse(stored)
    if (parsed.role !== 'DOCTOR') return router.push('/login')

    setDoctor(parsed)

    fetch('/api/appointments/doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then(res => res.json())
      .then(data => setAppointments(data.appointments))
  }, [router])

  // Reminder for upcoming appointment (within 2 hours)
  useEffect(() => {
    if (!appointments.length || reminderShown) return

    const now = new Date()
    appointments.forEach(app => {
      const appDate = new Date(app.date + 'T' + app.time)
      const diff = (appDate.getTime() - now.getTime()) / (1000 * 60 * 60) // in hours
      if (diff > 0 && diff <= 2) {
        alert(`Reminder: You have an upcoming appointment at ${app.time}`)
        setReminderShown(true)
      }
    })
  }, [appointments, reminderShown])

  const cancelAppointment = async (id: string) => {
    if (!confirm('Cancel this appointment?')) return
    const res = await fetch('/api/appointments/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      alert('Cancelled')
      setAppointments(prev => prev.filter(a => a.id !== id))
    }
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
        <h2 className="text-2xl font-bold mb-8">🩺 HealthCare+</h2>
        <nav className="space-y-3 text-sm">
          <button onClick={() => router.push('/dashboard/doctor')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded hover:bg-white/20">
            📅 Appointments
          </button>
          <button onClick={() => router.push('/dashboard/doctor/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🎥 Telemedicine
          </button>
          <button onClick={() => router.push('/ai-analysis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🧠 AI Analysis
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {doctor && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Welcome, Dr. {doctor.name}!</h1>
              <p className="text-sm text-gray-600">Email: {doctor.email}</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('user')
                router.push('/login')
              }}
              className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
            >
              ⏏ Logout
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800"> Today Appointments</h2>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(a => (
              <div key={a.id} className="bg-white rounded-lg shadow p-4 animate-fade-in">
                <p className="text-blue-800 font-semibold">
                  📅 {new Date(a.date).toLocaleDateString()} at {a.time}
                </p>
                <p className="mt-1">👤 {a.patientName} ({a.patientEmail})</p>
                <p className="text-sm">📋 Treatment: {a.type}</p>
                <p className="text-sm">📝 Symptoms: {a.symptoms || 'N/A'}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/doctor/appointments/edit/${a.id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => cancelAppointment(a.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>

                  <button
                  onClick={() => router.push(`/dashboard/doctor/telemedicine/${a.id}`)}
                  className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-1 rounded text-sm"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}




















