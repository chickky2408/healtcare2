// app/ai-analysis/[doctorId]/page.tsx
'use client'

import { useParams } from 'next/navigation'

export default function AiAnalysisPage() {
  const { doctorId } = useParams()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">
      <h1 className="text-3xl font-bold mb-4 text-purple-800">🤖 AI Diagnosis</h1>
      <p className="mb-6 text-gray-600">Doctor ID: {doctorId}</p>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg text-center">
        <p className="mb-4 text-lg">Upload an image of your dental issue:</p>
        <input
          type="file"
          accept="image/*"
          className="block mx-auto mb-4"
        />
        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Submit for AI Analysis
        </button>
      </div>
    </div>
  )
}