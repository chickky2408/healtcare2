"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const treatments = [
  {
    title: 'AI Dental Analysis',
    desc: 'Get fast diagnosis using AI-powered image recognition. Upload your teeth image for instant results.',
    image: '/treatments/ai.webp'
  },
  {
    title: 'Video Call Consultation',
    desc: 'Talk to our expert dentists from anywhere via secure video consultation.',
    image: '/treatments/videocall.jpg'
  },
  {
    title: 'In-Clinic Treatment',
    desc: 'Book your appointment and visit our clinic for professional treatment on-site.',
    image: '/treatments/clinic.jpg'
  }
]

export default function TreatmentSlider() {
  const router = useRouter()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % treatments.length)
    }, 4000) // auto-slide every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 px-6 md:px-16 bg-blue-50 text-center">
      <h3 className="text-3xl font-bold text-blue-800 mb-8">Our Treatments</h3>
      <div className="relative max-w-5xl mx-auto h-[400px] md:h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden"
          >
            <div className="w-full md:w-1/2 relative">
              <Image
                src={treatments[index].image}
                alt={treatments[index].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
              <h4 className="text-2xl font-semibold text-blue-700 mb-4">{treatments[index].title}</h4>
              <p className="text-gray-700 mb-6">{treatments[index].desc}</p>
              <button
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow transition"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
