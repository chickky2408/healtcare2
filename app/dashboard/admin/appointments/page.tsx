// 'use client'

// import { useEffect, useState } from 'react'

// export default function AdminAppointmentsPage() {
//   interface Appointment {
//     id: string;
//     user?: {
//       name: string;
//       email: string;
//     };
//     doctor?: {
//       name: string;
//     };
//     date: string;
//     time: string;
//     type: string;
//   }

//   const [appointments, setAppointments] = useState<Appointment[]>([])

//   useEffect(() => {
//     fetch('/api/admin/appointments')
//       .then(res => res.json())
//       .then(setAppointments)
//   }, [])

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-blue-700">📅 All Patient Appointments</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Patient</th>
//               <th className="px-4 py-2 text-left">Doctor</th>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Time</th>
//               <th className="px-4 py-2 text-left">Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((a) => (
//               <tr key={a.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{a.user?.name} ({a.user?.email})</td>
//                 <td className="px-4 py-2">{a.doctor?.name}</td>
//                 <td className="px-4 py-2">{a.date}</td>
//                 <td className="px-4 py-2">{a.time}</td>
//                 <td className="px-4 py-2">{a.type}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }



'use client'

import { useEffect, useState } from 'react'

export default function AdminAppointmentsPage() {
  interface Appointment {
    id: string;
    patientName: string;
    patientEmail: string;
    doctor?: {
      name: string;
    };
    date: string;
    time: string;
    type: string;
  }

  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const res = await fetch('/api/admin/appointments')
    const data = await res.json()
    setAppointments(data)
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this appointment?')
    if (!confirm) return

    const res = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      // ลบออกจาก state โดยไม่ต้อง reload
      setAppointments(prev => prev.filter(a => a.id !== id))
    } else {
      alert('❌ Failed to delete appointment')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">📅 All Patient Appointments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Doctor</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{a.patientName} ({a.patientEmail})</td>
                <td className="px-4 py-2">{a.doctor?.name}</td>
                <td className="px-4 py-2">{a.date}</td>
                <td className="px-4 py-2">{a.time}</td>
                <td className="px-4 py-2">{a.type}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}