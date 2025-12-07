


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

  if (error) return <div className="text-red-500 p-6">❌ Failed to load diagnosis data.</div>
  if (!data) return <div className="p-6">Loading results...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">🧠  AI Analysis of Patient</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item: DiagnosisType) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg border hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="p-4 space-y-1">
              <p className="text-sm text-gray-600"><strong>👤 User:</strong> {item.user?.name} ({item.user?.email})</p>
              <p className="text-sm"><strong>🧾 Result:</strong> <span className="text-blue-700">{item.result}</span></p>
              <p className="text-sm"><strong>📈 Confidence:</strong> {item.confidence.toFixed(2)}%</p>
              <p className="text-sm text-gray-500"><strong>🗓️ Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
              <p className="text-sm font-semibold">🖼️ Image:</p>
              <div className="relative">
                <img
                  src={`/uploads/${item.imagePath}`}
                  alt="Dental AI"
                  className="mt-2 rounded-xl border w-full object-cover h-40 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <a
                    href={`/uploads/${item.imagePath}`}
                    download
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    📥 Download
                  </a>
                  <a
                    href={`/uploads/${item.imagePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800"
                  >
                    🔍 Zoom
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
