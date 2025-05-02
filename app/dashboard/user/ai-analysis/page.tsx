

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AiAnalysisPage() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  const [result, setResult] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (!user?.email) {
      alert('กรุณา login ใหม่ เนื่องจากไม่พบ userId')
      router.push('/login')
      return
    }

    const fetchPermission = async () => {
      try {
        const res = await fetch(`/api/user/appointments?userEmail=${user.email}`)
        const data = await res.json()
        if (data.length > 0) {
          setAllowed(true)
        } else {
          alert('กรุณาจองการวิเคราะห์ AI ก่อนใช้งาน')
          router.push('/dashboard/user')
        }
      } catch (err) {
        console.error(err)
        alert('เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์')
        router.push('/dashboard/user')
      }
    }

    fetchPermission()
  }, [router])

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user?.id) {
      alert('กรุณา login ใหม่ เนื่องจากไม่พบ userId')
      return
    }

    if (images.length === 0) {
      alert('กรุณาเลือกไฟล์ภาพก่อน')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('image', images[0])

    try {
      const res = await axios.post('/api/ai/analyze', formData)
      setResult(res.data.result)

      await axios.post('/api/diagnosis/save', {
        imagePath: images[0].name,
        result: res.data.result,
        confidence: res.data.confidence,
        userId: user.id,
      })
    } catch (error) {
      alert('เกิดข้อผิดพลาดระหว่างวิเคราะห์')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!allowed) {
    return <div className="p-6">กำลังตรวจสอบสิทธิ์การเข้าถึง...</div>
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🧠 Teeth AI Analysis</h1>
      <p className="mb-4 text-gray-600">กรุณาอัปโหลดภาพฟัน (บน/ล่าง) ที่ถ่ายจากกล้องมือถือ</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImages(Array.from(e.target.files || []))}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {loading ? 'กำลังวิเคราะห์...' : 'วิเคราะห์ด้วย AI'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
          <strong>ผลการวิเคราะห์:</strong> {result}
        </div>
      )}
    </div>
  )
}