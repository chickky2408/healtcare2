// 'use client'

// import { useEffect, useState } from 'react'

// type Account = {
//   id: string
//   name: string
//   email: string
// }

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<Account[]>([])
//   const [doctors, setDoctors] = useState<Account[]>([])

//   useEffect(() => {
//     fetch('/api/admin/users')
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data.users || [])
//         setDoctors(data.doctors || [])
//       })
//   }, [])

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-blue-600 mb-4">Admin - Users Management</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2 text-gray-700">👤 Users</h2>
//         {users.length === 0 ? (
//           <p className="text-sm text-gray-500">No users found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {users.map((user) => (
//               <li key={user.id} className="border rounded p-3 shadow">
//                 <p><b>Name:</b> {user.name}</p>
//                 <p><b>Email:</b> {user.email}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2 text-gray-700">🩺 Doctors</h2>
//         {doctors.length === 0 ? (
//           <p className="text-sm text-gray-500">No doctors found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {doctors.map((doc) => (
//               <li key={doc.id} className="border rounded p-3 shadow">
//                 <p><b>Name:</b> {doc.name}</p>
//                 <p><b>Email:</b> {doc.email}</p>
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
// import Link from 'next/link'

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// export default function AdminUserPage() {
//   const [users, setUsers] = useState<User[]>([])

//   useEffect(() => {
//     fetch('/api/admin/users')
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data.users)) {
//           setUsers(data.users)
//         } else {
//           console.error('Invalid data:', data)
//           setUsers([]) // fallback ป้องกัน crash
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching users:', err)
//         setUsers([]) // fallback กรณี error
//       })
//   }, [])

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this user?')) return

//     const res = await fetch(`/api/admin/users/${id}`, {
//       method: 'DELETE',
//     })

//     if (res.ok) {
//       setUsers(prev => prev.filter(user => user.id !== id))
//     }
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
//         <h1 className="text-2xl font-bold text-blue-700 mb-4">All Users & Doctors</h1>

//         <table className="w-full table-auto border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Email</th>
//               <th className="p-2">Role</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id} className="border-t text-center">
//                 <td className="p-2">{user.name}</td>
//                 <td className="p-2">{user.email}</td>
//                 <td className="p-2">{user.role}</td>
//                 <td className="p-2 space-x-2">
//                   <Link
//                     href={`/dashboard/admin/users/edit/${user.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                   <Link
//                     href={`/dashboard/admin/users/${user.id}/appointments`}
//                     className="text-green-600 hover:underline"
//                   >
//                     History
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }




// File: app/dashboard/admin/users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminUsersPage() {
  interface User {
    id: string
    name: string
    email: string
  }

  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  // Removed unused deleteUser function to resolve the error

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Manage Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-sm">📧 {user.email}</p>
              <div className="mt-3 space-x-2">
                <button
                  onClick={() => router.push(`/dashboard/admin/users/edit/${user.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                {/* <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button> */}

                <button
                  onClick={async () => {
                    const confirmed = confirm(`Are you sure you want to delete ${user.name}?`)
                    if (!confirmed) return

                    const res = await fetch(`/api/users/${user.id}`, {
                      method: 'DELETE',
                    })

                    if (res.ok) {
                      alert('User deleted successfully')
                      window.location.reload()
                    } else {
                      alert('Failed to delete user')
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>


                <button
                  onClick={() => router.push(`/dashboard/admin/users/${user.id}/appointments`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                >
                  View Appointments
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
