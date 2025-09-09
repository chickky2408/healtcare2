


//ver1

// 'use client'

// import { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'

// interface Message {
//   id: string
//   text: string
//   timestamp: string
//   senderId: string
// }

// export default function ChatPage() {
//   const { doctorId } = useParams()
//   const [message, setMessage] = useState('')
//   const [chatLog, setChatLog] = useState<Message[]>([])
//   const [userId, setUserId] = useState<string>('')

//   // Fetch messages when doctorId is available
//   useEffect(() => {
//     const user = localStorage.getItem('user')
//     if (!user) return
//     const parsed = JSON.parse(user)
//     setUserId(parsed.id)

//     const fetchMessages = async () => {
//       const res = await fetch(`/api/messages?appointmentId=${doctorId}`)
//       const data = await res.json()
//       setChatLog(data)
//     }

//     fetchMessages()
//     const interval = setInterval(fetchMessages, 5000)
//     return () => clearInterval(interval)
//   }, [doctorId])

//   const sendMessage = async () => {
//     if (!message.trim()) return
//     const res = await fetch('/api/messages', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         appointmentId: doctorId,
//         senderId: userId,
//         text: message
//       })
//     })
//     const newMessage = await res.json()
//     setChatLog(prev => [...prev, newMessage])
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
//             chatLog.map((msg) => (
//               <p key={msg.id} className={`text-sm mb-1 ${msg.senderId === userId ? 'text-right text-blue-600' : 'text-left text-gray-700'}`}>
//                 {msg.text}
//               </p>
//             ))
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



//new theme

// app/dashboard/user/chat/[doctorId]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Send, ArrowLeft, MessageSquare, User as UserIcon, Shield } from 'lucide-react'

interface Message {
  id: string
  text: string
  timestamp: string
  senderId: string
}

export default function ChatPage() {
  const { doctorId } = useParams<{ doctorId: string }>()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState<Message[]>([])
  const [userId, setUserId] = useState<string>('')

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
        text: message,
      }),
    })
    const newMessage = await res.json()
    setChatLog((prev) => [...prev, newMessage])
    setMessage('')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800" />

      {/* Floating shapes */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
          animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-24 right-20 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl"
          animate={{ x: [0, -80, 0], y: [0, 50, 0], scale: [1, 0.85, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 mx-auto"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>

            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-5 shadow-lg">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-white">
              Chat with Doctor
            </h1>
            <p className="text-blue-100 text-sm mt-1">Doctor ID: {doctorId}</p>
          </motion.div>

          {/* Chat Box */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl flex flex-col h-[500px]"
            >
              <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
                {chatLog.length === 0 ? (
                  <p className="text-blue-200/70 text-center mt-10">No messages yet.</p>
                ) : (
                  chatLog.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.senderId === userId ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                          msg.senderId === userId
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                            : 'bg-white/20 text-white rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  placeholder="Type your message..."
                />
                <motion.button
                  onClick={sendMessage}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scrollbar styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}







