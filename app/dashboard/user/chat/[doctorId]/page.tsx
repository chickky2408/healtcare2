// 'use client'

// import { useState } from 'react'
// import { useParams } from 'next/navigation'

// export default function ChatPage() {
//   const { doctorId } = useParams()
//   const [message, setMessage] = useState('')
//   const [chatLog, setChatLog] = useState<string[]>([])

//   const sendMessage = () => {
//     if (!message.trim()) return
//     setChatLog([...chatLog, `You: ${message}`])
//     setMessage('')
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
//       <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-6">
//         <h1 className="text-xl font-bold text-blue-800 mb-4">Chat with Doctor ID: {doctorId}</h1>
//         <div className="bg-gray-50 border rounded p-4 h-64 overflow-y-auto mb-4">
//           {chatLog.length === 0 ? (
//             <p className="text-gray-400 text-sm">No messages yet.</p>
//           ) : (
//             chatLog.map((msg, i) => <p key={i} className="text-sm mb-1">{msg}</p>)
//           )}
//         </div>
//         <div className="flex items-center gap-2">
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 px-4 py-2 border rounded text-sm"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface Message {
  id: string
  text: string
  timestamp: string
  senderId: string
}

export default function ChatPage() {
  const { doctorId } = useParams()
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState<Message[]>([])
  const [userId, setUserId] = useState<string>('')

  // Fetch messages when doctorId is available
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return
    const parsed = JSON.parse(user)
    setUserId(parsed.id)

    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?appointmentId=${doctorId}`)
      const data = await res.json()
      setChatLog(data)
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [doctorId])

  const sendMessage = async () => {
    if (!message.trim()) return
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appointmentId: doctorId,
        senderId: userId,
        text: message
      })
    })
    const newMessage = await res.json()
    setChatLog(prev => [...prev, newMessage])
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-6">
        <h1 className="text-xl font-bold text-blue-800 mb-4">Chat with Doctor ID: {doctorId}</h1>
        <div className="bg-gray-50 border rounded p-4 h-64 overflow-y-auto mb-4">
          {chatLog.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet.</p>
          ) : (
            chatLog.map((msg) => (
              <p key={msg.id} className={`text-sm mb-1 ${msg.senderId === userId ? 'text-right text-blue-600' : 'text-left text-gray-700'}`}>
                {msg.text}
              </p>
            ))
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded text-sm"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
