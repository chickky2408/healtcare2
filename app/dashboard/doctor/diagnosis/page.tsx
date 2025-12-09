


// 'use client'

// import useSWR from 'swr'
// import axios from 'axios'

// type DiagnosisType = {
//   id: string
//   imagePath: string
//   result: string
//   confidence: number
//   createdAt: string
//   user: {
//     name: string
//     email: string
//   }
// }

// const fetcher = (url: string) => axios.get(url).then(res => res.data)

// export default function DoctorDiagnosisPage() {
//   const { data, error } = useSWR('/api/doctor/diagnosis', fetcher)

//   if (error) 
    
//     return <div>Invalid...</div>
//   if (!data) 
//     return <div>Loading Result...</div>
  
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">ผลวิเคราะห์ด้วย AI ของผู้ป่วย</h1>
//       <div className="grid gap-4">
//         {data.map((item: DiagnosisType) => (
//           <div key={item.id} className="border p-4 rounded-lg shadow">
//             <p><strong>User:</strong> {item.user?.name} ({item.user?.email})</p>
//             <p><strong>Result:</strong> {item.result}</p>
//             <p><strong>Confidence:</strong> {item.confidence.toFixed(2)}%</p>
//             <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
//             <p><strong>Image:</strong></p>
//             <img
//               src={`/uploads/${item.imagePath}`}
//               alt="Dental AI Image"
//               className="w-full max-w-xs mt-2 rounded-md border"
//             />
//             </div>
//         ))}
        
//       </div>
//     </div>
//   )
// }




'use client'

import useSWR from 'swr'
import axios from 'axios'
import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, Download, ZoomIn } from 'lucide-react'

type DiagnosisType = {
  id: string
  imagePath: string
  result: string
  confidence: number
  createdAt: string
  user: {
    name: string
    email: string
  }
}

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export default function DoctorDiagnosisPage() {
  const { data, error } = useSWR('/api/doctor/diagnosis', fetcher)
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set())

  // Group diagnoses by user email
  const groupedData = useMemo(() => {
    if (!data) return {}

    return data.reduce((acc: Record<string, DiagnosisType[]>, item: DiagnosisType) => {
      const email = item.user?.email || 'unknown'
      if (!acc[email]) {
        acc[email] = []
      }
      acc[email].push(item)
      return acc
    }, {})
  }, [data])

  const toggleUser = (email: string) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(email)) {
        newSet.delete(email)
      } else {
        newSet.add(email)
      }
      return newSet
    })
  }

  if (error) return <div className="text-red-500 p-6">❌ Failed to load diagnosis data.</div>
  if (!data) return <div className="p-6">Loading results...</div>

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">🧠 AI Analysis of Patient</h1>

      <div className="space-y-4">
        {Object.entries(groupedData).map(([email, diagnoses]) => {
          const isExpanded = expandedUsers.has(email)
          const user = diagnoses[0]?.user

          return (
            <div key={email} className="bg-white rounded-2xl shadow-lg border overflow-hidden">
              {/* User Header */}
              <button
                onClick={() => toggleUser(email)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user?.name?.[0] || '?'}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900">{user?.name || 'Unknown User'}</h3>
                    <p className="text-sm text-gray-600">{email}</p>
                  </div>
                  <span className="ml-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {diagnoses.length} {diagnoses.length === 1 ? 'analysis' : 'analyses'}
                  </span>
                </div>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </button>

              {/* Diagnoses Grid */}
              {isExpanded && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {diagnoses.map((item: DiagnosisType) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl shadow hover:shadow-lg border hover:scale-[1.02] transition-all duration-300"
                      >
                        <div className="p-4 space-y-2">
                          <p className="text-sm"><strong>🧾 Result:</strong> <span className="text-blue-700">{item.result}</span></p>
                          <p className="text-sm"><strong>📈 Confidence:</strong> {item.confidence.toFixed(2)}%</p>
                          <p className="text-sm text-gray-500"><strong>🗓️ Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                          <p className="text-sm font-semibold">🖼️ Image:</p>
                          <div className="relative group">
                            <img
                              src={item.imagePath}
                              alt="Dental AI"
                              className="mt-2 rounded-xl border w-full object-cover h-48"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/placeholder-dental.png'
                              }}
                            />
                            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <a
                                href={item.imagePath}
                                download={`diagnosis-${item.id}.jpg`}
                                className="text-xs bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                Download
                              </a>
                              <a
                                href={item.imagePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-1"
                              >
                                <ZoomIn className="w-3 h-3" />
                                Zoom
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}




// 7 Oct 2025


