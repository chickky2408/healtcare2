'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, message }) // 🔁 replace later with API
    alert('Message sent!')
    setIsOpen(false)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => setIsOpen(true)}
      >
        💬 Chat with a Doctor
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg p-4"
        >
          <h3 className="text-lg font-semibold mb-2">Contact Clinic</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border px-3 py-1 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border px-3 py-1 rounded"
              required
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full border px-3 py-1 rounded"
              required
            />
            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
                Send
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="text-gray-600 hover:underline">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  )
}