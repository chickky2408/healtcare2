// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter, useParams } from 'next/navigation'

// const treatmentOptions = [
//   { value: 'VIDEO_CALL', label: 'Video Call' },
//   { value: 'CLEANING', label: 'Cleaning' },
//   { value: 'ORTHODONTIC', label: 'Orthodontic' },
//   { value: 'AI_DIAGNOSIS', label: 'AI Diagnosis' },
// ]

// export default function EditAppointmentPage() {
//   const router = useRouter()
//   const { id } = useParams()
//   const [loading, setLoading] = useState(true)
//   const [form, setForm] = useState({
//     date: '',
//     time: '',
//     type: '',
//   })
//   const [message, setMessage] = useState('')

//   useEffect(() => {
//     fetch(`/api/appointments/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setForm({
//           date: data.date,
//           time: data.time,
//           type: data.type,
//         })
//         setLoading(false)
//       })
//   }, [id])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setMessage('')

//     const res = await fetch('/api/appointments/doctor/edit', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, ...form }),
//     })

//     if (res.ok) {
//       router.push('/dashboard/doctor')
//     } else {
//       const data = await res.json()
//       setMessage(data.message || 'Failed to update appointment')
//     }
//   }

//   if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
//         <h1 className="text-2xl font-bold mb-6 text-blue-700">Edit Appointment</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Date</label>
//             <input
//               type="date"
//               name="date"
//               value={form.date}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Time</label>
//             <input
//               type="time"
//               name="time"
//               value={form.time}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Treatment Type</label>
//             <select
//               name="type"
//               value={form.type}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             >
//               <option value="">-- Select Treatment --</option>
//               {treatmentOptions.map(opt => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {message && <p className="text-red-500 text-sm">{message}</p>}

//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               onClick={() => router.push('/dashboard/doctor')}
//               className="text-sm text-gray-600 hover:underline"
//             >
//               ← Back
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }







// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// interface Appointment {
//   id: string;
//   date: string;
//   time: string;
//   type: string;
//   patientName: string;
//   patientEmail: string;
//   symptoms?: string;
//   doctorId: string;
// }

// export default function EditDoctorAppointmentPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [appointment, setAppointment] = useState<Appointment | null>(null);
//   const [type, setType] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/appointments/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setAppointment(data);
//         setType(data.type);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!appointment) return;
//     const res = await fetch("/api/appointments/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id: appointment.id, type }),
//     });
//     if (res.ok) {
//       setMessage("✅ Appointment updated!");
//       router.push("/dashboard/doctor?edit=success");
//     } else {
//       setMessage("❌ Failed to update appointment");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
//         <h1 className="text-2xl font-bold text-blue-800 mb-4">Edit Appointment</h1>
//         {loading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : (
//           <form onSubmit={handleUpdate} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Type</label>
//               <select
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 className="w-full px-4 py-2 border rounded"
//               >
//                 <option value="">-- Select --</option>
//                 <option value="VIDEO_CALL">Video Call</option>
//                 <option value="CLEANING">Cleaning</option>
//                 <option value="ORTHODONTIC">Orthodontic</option>
//                 <option value="AI_DIAGNOSIS">AI Diagnosis</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Save Changes
//             </button>
//             {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
//             <div>
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="text-sm text-gray-500 underline mt-4"
//               >
//                 ← Back
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }





'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Removed unused 'Appointment' interface

export default function EditDoctorAppointment() {
  const { id } = useParams()
  const router = useRouter()
  // Removed unused 'appointment' state variable
  const [type, setType] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`/api/appointments/${id}`)
      .then(res => res.json())
      .then(data => {
        // Removed setting 'appointment' as it is unused
        setType(data.type)
        setSymptoms(data.symptoms || '')
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, symptoms })
    })
    if (res.ok) {
      setMessage('✅ Updated successfully')
      router.push('/dashboard/doctor?edit=success')
    } else {
      setMessage('❌ Failed to update')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow rounded-lg p-6">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded shadow-md w-full max-w-md animate-fade-in">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Edit Appointment</h1>

        <label className="block mb-2 font-medium text-gray-700">Treatment Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        >
          <option value="VIDEO_CALL">Video Call</option>
          <option value="CLEANING">Cleaning</option>
          <option value="ORTHODONTIC">Orthodontic</option>
          <option value="AI_DIAGNOSIS">AI Diagnosis</option>
        </select>

        <label className="block mb-2 font-medium text-gray-700">Symptoms</label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows={3}
          className="w-full border px-4 py-2 rounded resize-none"
          placeholder="Describe symptoms or concerns..."
        />

        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}

        <div className="mt-4 flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/doctor')}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  )
}
