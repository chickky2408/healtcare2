// ✅ File location: app/chat/[doctorId]/page.tsx

'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function ChatPage() {
  const { doctorId } = useParams()
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, input])
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-blue-50 p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-blue-800">
          💬 Chat with Doctor {doctorId}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow-inner mb-4 border">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <p
              key={idx}
              className="mb-2 px-4 py-2 bg-blue-100 rounded-md max-w-md text-gray-700"
            >
              {msg}
            </p>
          ))
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  )
}
