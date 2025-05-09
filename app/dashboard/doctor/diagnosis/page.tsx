


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

  if (error) 
    
    return <div>Invalid...</div>
  if (!data) 
    return <div>Loading Result...</div>
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ผลวิเคราะห์ด้วย AI ของผู้ป่วย</h1>
      <div className="grid gap-4">
        {data.map((item: DiagnosisType) => (
          <div key={item.id} className="border p-4 rounded-lg shadow">
            <p><strong>User:</strong> {item.user?.name} ({item.user?.email})</p>
            <p><strong>Result:</strong> {item.result}</p>
            <p><strong>Confidence:</strong> {item.confidence.toFixed(2)}%</p>
            <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
            <p><strong>Image:</strong></p>
            <img
              src={`/uploads/${item.imagePath}`}
              alt="Dental AI Image"
              className="w-full max-w-xs mt-2 rounded-md border"
            />
            </div>
        ))}
        
      </div>
    </div>
  )
}