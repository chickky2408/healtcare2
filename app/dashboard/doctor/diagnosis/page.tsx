// 'use client'
// import useSWR from 'swr'
// import axios from 'axios'


// type DiagnosisType = {
//     id: string
//     imagePath: string
//     result: string
//     confidence: number
//     createdAt: string
//   }
  
  

// const fetcher = (url: string) => axios.get(url).then(res => res.data)

// export default function DiagnosisListPage() {
//   const { data, error } = useSWR<DiagnosisType[]>('/api/diagnosis', fetcher)

//   if (error) return <div>โหลดไม่สำเร็จ</div>
//   if (!data) return <div>กำลังโหลด...</div>

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">ผลวิเคราะห์จาก AI</h1>
//       {data.map((item: DiagnosisType) => (
//         <div key={item.id} className="border rounded p-4 mb-3 bg-white shadow">
//           <p><strong>ผลวิเคราะห์:</strong> {item.result}</p>
//           <p><strong>ความมั่นใจ:</strong> {item.confidence}</p>
//           <p className="text-sm text-gray-500">ภาพ: {item.imagePath}</p>
//           <p className="text-sm text-gray-400">วันที่: {new Date(item.createdAt).toLocaleString()}</p>
//         </div>
//       ))}
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

  if (error) return <div>เกิดข้อผิดพลาด</div>
  if (!data) return <div>กำลังโหลดผลวิเคราะห์...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ผลวิเคราะห์ด้วย AI ของผู้ป่วย</h1>
      <div className="grid gap-4">
        {data.map((item: DiagnosisType) => (
          <div key={item.id} className="border p-4 rounded-lg shadow">
            <p><strong>ผู้ป่วย:</strong> {item.user?.name} ({item.user?.email})</p>
            <p><strong>ผลวิเคราะห์:</strong> {item.result}</p>
            <p><strong>ความมั่นใจ:</strong> {item.confidence.toFixed(2)}</p>
            <p><strong>วันที่:</strong> {new Date(item.createdAt).toLocaleString()}</p>
            <img
              src={`/uploads/${item.imagePath}`}
              alt="X-ray"
              className="mt-2 rounded max-w-sm border"
            />
          </div>
        ))}
      </div>
    </div>
  )
}