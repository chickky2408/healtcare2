//อันนี้ใช้งานได้


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface Appointment {
//   id: string;
//   date: string;
//   time: string;
//   type: string;
//   patientName: string;
//   patientEmail: string;
//   symptoms?: string;
// }

// interface Doctor {
//   id: string;
//   name: string;
//   email: string;
//   specialty: string;
//   meetLink?: string;
// }

// export default function DoctorDashboard() {
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [appointments, setAppointments] = useState<Appointment[] | null>(null);
//   const [newLink, setNewLink] = useState("");
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (!stored) return router.push("/login");
//     const parsed = JSON.parse(stored);
//     if (parsed.role !== "DOCTOR") return router.push("/login");
//     setDoctor(parsed);

//     fetch("/api/appointments/doctor", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: parsed.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => setAppointments(data.appointments))
//       .catch(() => setAppointments([]));
//   }, [router]);

//   const updateMeetLink = async () => {
//     if (!doctor) return;
//     const res = await fetch("/api/doctors/update-meet-link", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: doctor.email, meetLink: newLink }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setMessage("✅ Link updated!");
//       setDoctor({ ...doctor, meetLink: newLink });
//     } else {
//       setMessage(data.message || "❌ Failed to update");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-blue-50">
//       <aside className="w-64 bg-white p-6 shadow-lg">
//         <h2 className="text-2xl font-bold text-blue-700 mb-6">
//           🩺 Dr. {doctor?.name}
//         </h2>
//         <p className="text-sm text-gray-500 mb-2">{doctor?.specialty}</p>
//         <p className="text-sm text-gray-500 mb-4">{doctor?.email}</p>
//         <button
//           onClick={() => {
//             localStorage.removeItem("user");
//             router.push("/login");
//           }}
//           className="text-red-600 text-sm hover:underline"
//         >
//           Logout
//         </button>
//       </aside>

//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-semibold text-blue-800 mb-6">
//           Your Appointments
//         </h1>

//         <div className="mb-6">
//           <label className="block mb-2 font-medium text-gray-700">
//             Google Meet Link
//           </label>
//           <input
//             type="text"
//             value={newLink}
//             onChange={(e) => setNewLink(e.target.value)}
//             className="border px-4 py-2 rounded w-full"
//             placeholder="Enter new Google Meet link"
//           />
//           <button
//             onClick={updateMeetLink}
//             className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//           >
//             Update Link
//           </button>
//           {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
//         </div>

//         {appointments === null ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : appointments.length === 0 ? (
//           <p className="text-gray-600">No upcoming appointments.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map((a) => (
//               <div key={a.id} className="bg-white rounded shadow p-4">
//                 <p className="font-semibold text-blue-700">
//                   📅 {new Date(a.date).toLocaleDateString()} at {a.time}
//                 </p>
//                 <p className="text-sm">👤 {a.patientName} ({a.patientEmail})</p>
//                 <p className="text-sm">🩺 Treatment: {a.type}</p>
//                 <p className="text-sm">📝 Symptoms: {a.symptoms || "N/A"}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }






'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/ConfirmModal'

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
  specialty: string
  meetLink?: string
}

export default function DoctorDashboardPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [newLink, setNewLink] = useState('')
  const [message, setMessage] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const parsed = JSON.parse(stored)
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

  const cancelAppointment = async () => {
    if (!selectedId) return
    const res = await fetch('/api/appointments/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId }),
    })
    if (res.ok) {
      setAppointments(prev => prev.filter(a => a.id !== selectedId))
    }
    setShowConfirm(false)
  }

  const handleUpdateMeetLink = async () => {
    if (!doctor) return
    const res = await fetch('/api/doctors/update-meet-link', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: doctor.email, meetLink: newLink }),
    })
    const data = await res.json()
    if (res.ok) {
      setMessage('✅ Google Meet link updated successfully')
      setDoctor({ ...doctor, meetLink: newLink })
    } else {
      setMessage(data.message || '❌ Failed to update Meet link')
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8 space-y-4">
        <h2 className="text-2xl font-bold">🩺 Dr. {doctor?.name}</h2>
        <nav className="space-y-3 text-sm">
          <button onClick={() => router.push('/dashboard/doctor')} className="w-full text-left bg-white/10 px-3 py-2 rounded hover:bg-white/20">📅 Appointments</button>
          <button onClick={() => router.push('/telemedicine')} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">🎥 Video Call</button>
          <button onClick={() => router.push('/ai-analysis')} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">🧠 AI Analysis</button>
        </nav>
        <button onClick={() => { localStorage.removeItem('user'); router.push('/login') }} className="mt-10 text-red-300 text-sm hover:underline">⏏ Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Your Appointments</h1>
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">🔗 Google Meet Link</label>
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter Meet link"
            className="w-full border px-4 py-2 rounded"
          />
          <button
            onClick={handleUpdateMeetLink}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Update Link
          </button>
          {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments scheduled yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-blue-800 font-semibold">📅 {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                  <p className="text-sm">👤 {a.patientName} ({a.patientEmail})</p>
                  <p className="text-sm">📋 {a.type}</p>
                  <p className="text-sm">📝 {a.symptoms || 'N/A'}</p>
                </div>
                <div className="flex gap-2 self-end">
                  <button
                    onClick={() => router.push(`/dashboard/doctor/appointments/edit/${a.id}`)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(a.id)
                      setShowConfirm(true)
                    }}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={cancelAppointment}
        message="Are you sure you want to cancel this appointment?"
      />
    </div>
  )
}