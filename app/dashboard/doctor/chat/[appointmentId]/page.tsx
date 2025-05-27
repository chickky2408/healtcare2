'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Message {
  id: string
  text: string
  senderId: string
  timestamp: string
}

export default function DoctorChatPage() {
  const { appointmentId } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [doctorId, setDoctorId] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setDoctorId(parsed.id)
    }
  }, [])

  useEffect(() => {
    if (!appointmentId) return
    fetch(`/api/messages?appointmentId=${appointmentId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data)
      })
  }, [appointmentId])

  const sendMessage = async () => {
    if (!input.trim() || !doctorId) return
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentId, senderId: doctorId, text: input })
    })
    const newMessage = await res.json()
    setMessages(prev => [...prev, newMessage])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-6">
        <h1 className="text-xl font-bold text-blue-800 mb-4">Chat with Patient (Appointment ID: {appointmentId})</h1>
        <div className="bg-gray-100 border rounded p-4 h-64 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <p
                key={msg.id || i}
                className={`text-sm mb-1 ${msg.senderId === doctorId ? 'text-right text-blue-700' : 'text-left text-gray-700'}`}
              >
                {msg.text}
              </p>
            ))
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
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
