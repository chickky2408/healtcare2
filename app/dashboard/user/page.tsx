



// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { treatmentPrices } from '@/lib/treatmentPrices'
// import { QRCodeCanvas } from 'qrcode.react'
// import NotificationBell from './components/NotificationBell'


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

// export default function UserDashboardPage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const stored = localStorage.getItem('user')
//     if (!stored) return router.push('/login')
//     const parsed: User = JSON.parse(stored)
//     if (parsed.role !== 'USER') return router.push('/login')

//     setUser(parsed)

//     fetch('/api/appointments/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then(res => res.json())
//       .then(data => setAppointments(data.appointments))
//   }, [router])

//   const cancelAppointment = async (id: string) => {
//     if (!confirm('Cancel this appointment?')) return
//     const res = await fetch('/api/appointments/delete', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     })
//     if (res.ok) {
//       alert('Cancelled')
//       setAppointments(prev => prev.filter(a => a.id !== id))
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-blue-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
//         <h2 className="text-2xl font-bold mb-8">🦷 HealthCare+</h2>
//         <nav className="space-y-3 text-sm">
//           <button onClick={() => router.push('/dashboard/user/appointments')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded">
//             🗓️ Appointments
//           </button>
//           <button onClick={() => router.push('/dashboard/user/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
//             🎥 Telemedicine
//           </button>
//           <button onClick={() => router.push('/dashboard/user/ai-analysis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
//             🤖 AI Analysis
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {user && (
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-blue-900">Welcome, {user.name}!</h1>
//               <p className="text-sm text-gray-600">Email: {user.email}</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold uppercase">
//                 {user.name[0]}
//               </div>

//               <div className="flex gap-4 items-center">
//               <NotificationBell userId={user.id} />
//               <span>{user.name}</span>
              
//               </div>





//               <button
//                 onClick={() => {
//                   localStorage.removeItem('user')
//                   router.push('/login')
//                 }}
//                 className="border px-3 py-1 rounded hover:bg-gray-100 text-sm"
//               >
//                 ⏏ Logout
//               </button>


              


//             </div>
//           </div>
//         )}

//         {/* Appointments Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-blue-800">Your Appointments</h2>
//           <button
//             onClick={() => router.push('/booking')}
//             className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded"
//           >
//             ➕ Add Appointment
//           </button>
//         </div>

//         {/* Appointments List */}
//         {appointments.length === 0 ? (
//           <p className="text-gray-500">No appointments found.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map((a) => (
//               <div key={a.id} className="bg-white rounded-lg shadow p-4">
//                 <p className="text-blue-800 font-semibold">
//                   📅 {new Date(a.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {a.time}
//                 </p>
//                 <p className="mt-1">🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})</p>
//                 <p className="text-sm text-gray-500">📋 {a.type}</p>
//                 <p className="text-sm text-gray-700">💸 {treatmentPrices[a.type] || 0} THB</p>
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
//                     className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => cancelAppointment(a.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => setSelectedAppointment(a)}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
//                   >
//                     QR Payment
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* QR Modal */}
//         {selectedAppointment && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 animate-fade-in">
//               <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
//               {/* <QRCodeCanvas value={`Payment for ${selectedAppointment.type} - ${treatmentPrices[selectedAppointment.type] || 0} THB`} size={150} /> */}
//               <div className="flex justify-center">
//              <QRCodeCanvas
//               value={`00020101021129370016A000000677010111011300660123456789802TH5303764540612.005802TH6304ABCD`}
//               size={180}
//               className="max-w-full h-auto"
//             />
//               </div>
//               <p className="mt-2 text-gray-600">💳 {treatmentPrices[selectedAppointment.type] || 0} THB</p>
//               <button
//                 onClick={() => setSelectedAppointment(null)}
//                 className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }






'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { treatmentPrices } from '@/lib/treatmentPrices'
import { QRCodeCanvas } from 'qrcode.react'
import NotificationBell from './components/NotificationBell'
import { differenceInCalendarDays, parseISO } from 'date-fns'

type Appointment = {
  id: string
  date: string
  time: string
  type: string
  doctor: { name: string; specialty: string }
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function UserDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed: User = JSON.parse(stored)
    if (parsed.role !== 'USER') return router.push('/login')

    setUser(parsed)

    fetch('/api/appointments/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email }),
    })
      .then(res => res.json())
      .then(data => {
        setAppointments(data.appointments)

        // ✅ ตรวจสอบนัดวันนี้
        const today = new Date()
        const hasTodayAppointment = data.appointments.some((a: Appointment) => {
          const appointmentDate = parseISO(a.date)
          return differenceInCalendarDays(appointmentDate, today) === 0
        })

        if (hasTodayAppointment) {
          setShowAlert(true)
          const audio = new Audio('/alert.wav')
          audio.play().catch(err => console.error('Audio error:', err))
        }
      })
  }, [router])

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
        <h2 className="text-2xl font-bold mb-8">🦷 HealthCare+</h2>
        <nav className="space-y-3 text-sm">
          <button onClick={() => router.push('/dashboard/user/appointments')} className="block w-full text-left font-medium bg-white/10 px-3 py-2 rounded">
            🗓️ Appointments
          </button>
          <button onClick={() => router.push('/dashboard/user/telemedicine')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🎥 Telemedicine
          </button>
          <button onClick={() => router.push('/dashboard/user/ai-analysis')} className="block w-full text-left hover:bg-white/20 px-3 py-2 rounded">
            🤖 AI Analysis
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {user && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Welcome, {user.name}!</h1>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold uppercase">
                {user.name[0]}
              </div>
              <div className="flex gap-4 items-center">
                <NotificationBell userId={user.id} />
                <span>{user.name}</span>
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
          </div>
        )}

        {/* ✅ แจ้งเตือนเมื่อมีนัดวันนี้ */}
        {showAlert && (
          <div className="bg-yellow-200 text-red-800 px-4 py-2 rounded shadow mb-4 text-center font-bold animate-bounce">
            🔔 You have an appointment today!
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800">Your Appointments</h2>
          <button
            onClick={() => router.push('/booking')}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded"
          >
            ➕ Add Appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white rounded-lg shadow p-4">
                <p className="text-blue-800 font-semibold">
                  📅 {new Date(a.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {a.time}
                </p>
                <p className="mt-1">🧑‍⚕️ Dr. {a.doctor.name} ({a.doctor.specialty})</p>
                <p className="text-sm text-gray-500">📋 {a.type}</p>
                <p className="text-sm text-gray-700">💸 {treatmentPrices[a.type] || 0} THB</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/user/appointments/edit/${a.id}`)}
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
                    onClick={() => setSelectedAppointment(a)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
                  >
                    QR Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QR Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
              <div className="flex justify-center">
                <QRCodeCanvas
                  value={`00020101021129370016A000000677010111011300660123456789802TH5303764540612.005802TH6304ABCD`}
                  size={180}
                  className="max-w-full h-auto"
                />
              </div>
              <p className="mt-2 text-gray-600">💳 {treatmentPrices[selectedAppointment.type] || 0} THB</p>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}