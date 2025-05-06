
// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'

// export default function AiAnalysisPage() {
//   const router = useRouter()
//   const [allowed, setAllowed] = useState(false)
//   const [result, setResult] = useState('')
//   const [images, setImages] = useState<File[]>([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')

//     if (!user?.email) {
//       alert('Please log in again as userId is not found.')
//       router.push('/login')
//       return
//     }

//     const fetchPermission = async () => {
//       try {
//         const res = await fetch(`/api/user/appointments?userEmail=${user.email}`)
//         const data = await res.json()
//         if (data.length > 0) {
//           setAllowed(true)
//         } else {
//           alert('Please book an AI analysis before use.')
//           router.push('/dashboard/user')
//         }
//       } catch (err) {
//         console.error(err)
//         alert('An authentication error occurred.')
//         router.push('/dashboard/user')
//       }
//     }

//     fetchPermission()
//   }, [router])

//   const handleSubmit = async () => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}')
//     if (!user?.id) {
//       alert('Please log in again as userId is not found.')
//       return
//     }

//     if (images.length === 0) {
//       alert('Please select an image file first.')
//       return
//     }

//     setLoading(true)

//     const formData = new FormData()
//     formData.append('image', images[0])

//     try {
//       const res = await axios.post('/api/ai/analyze', formData)
//       setResult(res.data.result)

//       await axios.post('/api/diagnosis/save', {
//         imagePath: images[0].name,
//         result: res.data.result,
//         confidence: res.data.confidence,
//         userId: user.id,
//       })
//     } catch (error) {
//       alert('An error occurred during analysis.')
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!allowed) {
//     return <div className="p-6">Checking access rights...</div>
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">🧠 Teeth AI Analysis</h1>
//       <p className="mb-4 text-gray-600">Please add your Image</p>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImages(Array.from(e.target.files || []))}
//         className="mb-4"
//       />

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md"
//       >
//         {loading ? 'Analyzing...' : 'Analyze with AI'}
//       </button>

//       {result && (
//         <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
//           <strong>Analysis Result:</strong> {result}
//         </div>
//       )}
//     </div>
//   )
// }







'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AiAnalysisPage() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  const [result, setResult] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [images, setImages] = useState<File[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user?.email) {
      alert('Please log in again.')
      router.push('/login')
      return
    }

    const checkEligibility = async () => {
      const res = await fetch(`/api/user/appointments?userEmail=${user.email}`)
      const data = await res.json()
      if (data.length > 0) setAllowed(true)
      else {
        alert('Please book an AI analysis appointment first.')
        router.push('/dashboard/user')
      }
    }

    checkEligibility()
  }, [router])

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user?.id || images.length === 0) {
      alert('Please select an image file.')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('image', images[0])

    try {
      const res = await axios.post('/api/ai/analyze', formData)
      setResult(res.data.result)
      setConfidence(res.data.confidence)

      await axios.post('/api/diagnosis/save', {
        imagePath: images[0].name,
        result: res.data.result,
        confidence: res.data.confidence,
        userId: user.id,
      })
    } catch (err) {
      alert('Error during analysis')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!allowed) return <div className="p-6 text-center text-gray-500">Checking permission...</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">🧠 Teeth AI Analysis</h1>
        <p className="text-gray-600 mb-6 text-center">Upload a clear image of your teeth (upper/lower)</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const fileList = Array.from(e.target.files || [])
            setImages(fileList)
            if (fileList[0]) setPreview(URL.createObjectURL(fileList[0]))
          }}
          className="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
        >
          {loading ? 'Analyzing...' : 'Analyze with AI'}
        </button>

        {result && (
          <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded-lg text-center">
            <h2 className="text-lg font-semibold text-green-700 mb-2">🧾 Analysis Result</h2>
            <p className="text-gray-800"><strong>Diagnosis:</strong> {result}</p>
            <p className="text-gray-800"><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-md shadow-md max-h-60 mx-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}