'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AiAnalysisPage() {
  const { doctorId } = useParams()
  const router = useRouter()

  const [image, setImage] = useState<File | null>(null)
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
    setResult('')
  }

  const handleSubmit = async () => {
    if (!image) return alert('Please select an image first.')

    setLoading(true)
    setTimeout(() => {
      const mockResults = [
        '✅ Clean Teeth Detected',
        '❗ Possible Cavity Found',
        '⚠️ Early Signs of Tartar',
        '🧠 Analysis Inconclusive, Please Try Another Image'
      ]
      const random = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult(random)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">🧠 AI Dental Diagnosis</h1>
        <p className="text-gray-600 mb-4">Doctor ID: <code>{doctorId}</code></p>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full text-sm"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !image}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Submit for AI Analysis'}
        </button>

        {result && (
          <div className="mt-6 text-lg text-purple-800 font-medium border-t pt-4">
            🦷 Result: {result}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => router.push('/dashboard/user')}
            className="text-sm text-blue-500 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
