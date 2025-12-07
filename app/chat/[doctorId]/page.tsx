// // ✅ File location: app/chat/[doctorId]/page.tsx

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




//ver2

// 'use client'

// import { useParams, useRouter } from 'next/navigation'
// import { useState, useRef, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// export default function ChatPage() {
//   const { doctorId } = useParams()
//   const router = useRouter()
//   const [messages, setMessages] = useState<string[]>([])
//   const [input, setInput] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   // Auto scroll to bottom when new messages arrive
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const sendMessage = () => {
//     if (input.trim()) {
//       const newMessage = input.trim()
//       setMessages(prev => [...prev, newMessage])
//       setInput('')
      
//       // Simulate doctor response
//       setIsTyping(true)
//       setTimeout(() => {
//         setIsTyping(false)
//         setMessages(prev => [...prev, `Thank you for your message: "${newMessage}". How can I help you further?`])
//       }, 2000)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   const getDoctorName = () => {
//     const doctorNames: Record<string, string> = {
//       '1': 'Dr. Sarah Johnson',
//       '2': 'Dr. Michael Chen', 
//       '3': 'Dr. Emily Rodriguez',
//       '4': 'Dr. David Kim'
//     }
//     const id = String(doctorId)
//     return doctorNames[id] || `Doctor ${doctorId}`
//   }

//   const formatTime = () => {
//     return new Date().toLocaleTimeString([], { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Enhanced Header */}
//       <motion.header
//         className="bg-white/90 backdrop-blur-xl border-b border-blue-100/50 shadow-lg sticky top-0 z-10"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="max-w-4xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               {/* Back Button */}
//               <motion.button
//                 onClick={() => router.back()}
//                 className="p-2 hover:bg-blue-50 rounded-full transition-all duration-300 group"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </motion.button>

//               {/* Doctor Info */}
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <motion.div 
//                     className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     💬
//                   </motion.div>
//                   {/* Online indicator */}
//                   <motion.div
//                     className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.5, type: "spring" }}
//                   />
//                 </div>
                
//                 <div>
//                   <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
//                     {getDoctorName()}
//                   </h1>
//                   <div className="flex items-center gap-2">
//                     <motion.div 
//                       className="w-2 h-2 bg-green-500 rounded-full"
//                       animate={{ scale: [1, 1.2, 1] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     />
//                     <span className="text-sm text-gray-600">Online • Available now</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-3">
//               <motion.button
//                 className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
//                 whileHover={{ scale: 1.05, rotate: 15 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//               </motion.button>
              
//               <motion.button
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                 </svg>
//                 <span className="text-sm font-semibold">Video</span>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Chat Container */}
//       <div className="max-w-4xl mx-auto px-6 py-6 h-[calc(100vh-120px)] flex flex-col">
//         <motion.div
//           className="flex-1 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden flex flex-col"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//         >
//           {/* Messages Area */}
//           <div className="flex-1 p-6 overflow-y-auto space-y-4">
//             <AnimatePresence>
//               {messages.length === 0 ? (
//                 <motion.div
//                   className="flex flex-col items-center justify-center h-full text-center py-12"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.5 }}
//                 >
//                   <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
//                     <motion.div
//                       animate={{ rotate: [0, 10, -10, 0] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                       </svg>
//                     </motion.div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Your Consultation</h3>
//                   <p className="text-gray-600 max-w-md leading-relaxed">
//                     Start a conversation with {getDoctorName()}. Share your symptoms or ask any health-related questions.
//                   </p>
//                   <div className="flex items-center gap-2 mt-4 text-sm text-green-600">
//                     <motion.div 
//                       className="w-2 h-2 bg-green-500 rounded-full"
//                       animate={{ opacity: [1, 0.3, 1] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     />
//                     <span>Doctor is online and ready to help</span>
//                   </div>
//                 </motion.div>
//               ) : (
//                 messages.map((msg, idx) => {
//                   const isUserMessage = idx % 2 === 0
                  
//                   return (
//                     <motion.div
//                       key={idx}
//                       className={`flex gap-3 ${isUserMessage ? 'flex-row-reverse' : ''}`}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4 }}
//                     >
//                       {/* Avatar */}
//                       <div className="flex-shrink-0">
//                         {isUserMessage ? (
//                           <motion.div 
//                             className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
//                             whileHover={{ scale: 1.05 }}
//                           >
//                             👤
//                           </motion.div>
//                         ) : (
//                           <motion.div 
//                             className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
//                             whileHover={{ scale: 1.05 }}
//                           >
//                             👨‍⚕️
//                           </motion.div>
//                         )}
//                       </div>

//                       {/* Message Bubble */}
//                       <div className={`max-w-xs lg:max-w-md ${isUserMessage ? 'text-right' : ''}`}>
//                         <motion.div
//                           className={`relative px-5 py-3 rounded-2xl shadow-lg ${
//                             isUserMessage
//                               ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
//                               : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md'
//                           }`}
//                           whileHover={{ scale: 1.02 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <p className="text-sm leading-relaxed">{msg}</p>
                          
//                           {/* Message tail */}
//                           <div
//                             className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
//                               isUserMessage
//                                 ? 'right-0 translate-x-1/2 translate-y-1/2 bg-purple-600'
//                                 : 'left-0 -translate-x-1/2 translate-y-1/2 bg-white border-l border-b border-gray-100'
//                             }`}
//                           />
//                         </motion.div>
                        
//                         {/* Timestamp */}
//                         <p className={`text-xs text-gray-500 mt-2 ${isUserMessage ? 'text-right' : ''}`}>
//                           {formatTime()}
//                         </p>
//                       </div>
//                     </motion.div>
//                   )
//                 })
//               )}
//             </AnimatePresence>

//             {/* Typing Indicator */}
//             <AnimatePresence>
//               {isTyping && (
//                 <motion.div
//                   className="flex gap-3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
//                     👨‍⚕️
//                   </div>
//                   <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-md px-5 py-3 shadow-sm">
//                     <div className="flex gap-1">
//                       {[0, 1, 2].map((i) => (
//                         <motion.div
//                           key={i}
//                           className="w-2 h-2 bg-gray-500 rounded-full"
//                           animate={{ 
//                             scale: [1, 1.5, 1],
//                             opacity: [0.5, 1, 0.5]
//                           }}
//                           transition={{ 
//                             duration: 1.2, 
//                             repeat: Infinity, 
//                             delay: i * 0.2 
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Enhanced Input Area */}
//           <div className="p-6 border-t border-gray-100/50 bg-gradient-to-r from-white/80 to-blue-50/30 backdrop-blur-sm">
//             <div className="flex items-end gap-4">
//               {/* Quick Actions */}
//               <div className="flex gap-2">
//                 <motion.button
//                   className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
//                   whileHover={{ scale: 1.1, rotate: 15 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                   </svg>
//                 </motion.button>
                
//                 <motion.button
//                   className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
//                   whileHover={{ scale: 1.1, rotate: -15 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </motion.button>
//               </div>

//               {/* Text Input */}
//               <div className="flex-1 relative">
//                 <motion.input
//                   type="text"
//                   value={input}
//                   onChange={e => setInput(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your message..."
//                   className="w-full px-6 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm placeholder-gray-500"
//                   whileFocus={{ scale: 1.02 }}
//                 />
                
//                 {/* Message length indicator */}
//                 {input.length > 50 && (
//                   <motion.div
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                   >
//                     {input.length}
//                   </motion.div>
//                 )}
//               </div>

//               {/* Send Button */}
//               <motion.button
//                 onClick={sendMessage}
//                 disabled={!input.trim()}
//                 className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
//                 whileHover={{ 
//                   scale: input.trim() ? 1.05 : 1,
//                   rotate: input.trim() ? -5 : 0
//                 }}
//                 whileTap={{ scale: input.trim() ? 0.95 : 1 }}
//               >
//                 <motion.svg 
//                   className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                   animate={input.trim() ? { rotate: [0, -10, 0] } : {}}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                 </motion.svg>
//               </motion.button>
//             </div>

//             {/* Quick Reply Suggestions */}
//             {messages.length === 0 && (
//               <motion.div
//                 className="flex gap-2 mt-4 overflow-x-auto pb-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1 }}
//               >
//                 {['Hello Doctor', 'I have a question', 'Book appointment', 'Emergency help'].map((suggestion, idx) => (
//                   <motion.button
//                     key={idx}
//                     onClick={() => setInput(suggestion)}
//                     className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap hover:bg-blue-200 transition-colors duration-300 shadow-sm"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 1.2 + idx * 0.1 }}
//                   >
//                     {suggestion}
//                   </motion.button>
//                 ))}
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }