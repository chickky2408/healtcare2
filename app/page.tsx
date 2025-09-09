


//ver1

// 'use client'

// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import TreatmentSlider from '@/components/TreatmentSlider' 
// import ChatPopup from '@/components/ChatPopup'

// export default function HomePage() {
//   const router = useRouter()

//   return (
//     <>
//     {/* 🧊 Floating Frosted Header */}
//     <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-sm border-b border-white/20">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
//         <h1 className="text-2xl font-bold text-blue-700">HealthCare+</h1>
//         <nav className="flex items-center gap-8 text-gray-800 text-sm font-medium">
//           <a href="#about" className="hover:text-blue-600 transition">About Us</a>
//           <a href="#location" className="hover:text-blue-600 transition">Location</a>
//           <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
//           <button
//             onClick={() => router.push('/login')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition font-semibold"
//           >
//             Book Appointment
//           </button>
//         </nav>
//       </div>
//     </header>

//     <main className="pt-[80px] relative min-h-screen overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 -z-10 animate-pulse-slow">
//         <Image
//           src="/clinic.jpg"
//           alt="clinic background"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
//       </div>

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] px-4">
//         <motion.div
//           className="bg-black/40 backdrop-blur-md p-10 rounded-2xl max-w-2xl text-white shadow-xl hover:scale-105 transition duration-300"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-200">Trusted Healthcare for You</h2>
//           <p className="text-lg mb-6 text-gray-100">
//             We are dedicated to providing compassionate and high-quality care through innovation and expertise.
//           </p>
//           <div className="flex flex-col md:flex-row gap-4 justify-center">
//             <button
//               onClick={() => router.push('/login')}
//               className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => router.push('/login')}
//               className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-700 transition font-semibold"
//             >
//               Register
//             </button>
//           </div>
//         </motion.div>
//       </section>

//       <TreatmentSlider />

//       <section id="about" className="py-16 px-6 md:px-16 bg-white text-center">
//         <h3 className="text-2xl font-bold text-blue-700 mb-4">About Us</h3>
//         <p className="text-gray-700 max-w-3xl mx-auto">
//           Our clinic provides a variety of healthcare services, from general checkups to specialized treatment. 
//           Our team of experienced professionals is here to ensure you receive the care you need.
//         </p>
//       </section>

//       <section id="location" className="py-16 px-6 md:px-16 bg-gray-50 text-center">
//         <h3 className="text-2xl font-bold text-blue-700 mb-4">Location</h3>
//         <p className="text-gray-700 mb-4">We’re located in the heart of the city for easy access.</p>
//         <iframe
//           src="https://maps.google.com/maps?q=Bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"
//           className="w-full h-64 rounded-lg shadow-md"
//           loading="lazy"
//         ></iframe>
//       </section>

//       <section id="contact" className="py-16 px-6 md:px-16 bg-white text-center">
//         <h3 className="text-2xl font-bold text-blue-700 mb-4">Contact Us</h3>
//         <p className="text-gray-700 mb-2">📞 02-123-4567</p>
//         <p className="text-gray-700 mb-2">📧 contact@yourclinic.com</p>
//         <p className="text-gray-700">🏥 123 Sukhumvit Rd, Bangkok, Thailand</p>
//       </section>

//       <footer className="bg-blue-600 text-white text-center py-4">
//         &copy; {new Date().getFullYear()} HealthCare+ | All rights reserved.
//       </footer>
//     </main>

//     <ChatPopup />
//     </>
//   )
// }





//ver2


'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import TreatmentSlider from '@/components/TreatmentSlider' 
import ChatPopup from '@/components/ChatPopup'

export default function HomePage() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <>
      {/* Enhanced Floating Header */}
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-100/30' 
            : 'bg-white/20 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              HealthCare+
            </h1>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8 text-gray-800 text-sm font-semibold">
            {['About Us', 'Services', 'Location', 'Contact'].map((item, index) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                className="relative hover:text-blue-600 transition-colors duration-300 group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
            
            <motion.button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              Book Appointment
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 rounded-lg bg-blue-500 text-white"
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      <main className="relative">
        {/* Enhanced Hero Section with Parallax */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <motion.div 
            className="absolute inset-0 -z-10"
            style={{ y: backgroundY }}
          >
            <Image
              src="/clinic.jpg"
              alt="Modern Healthcare Facility"
              fill
              className="object-cover scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-blue-800/50" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden -z-5">
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"
              animate={{ 
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 0.8, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-400/10 rounded-full blur-lg"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Hero Content */}
          <motion.div 
            className="text-center px-6 max-w-6xl mx-auto relative z-10"
            style={{ y: textY }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
              >
                <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Trusted
                </span>
                <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">
                  Healthcare
                </span>
                <span className="block text-white/90 drop-shadow-2xl">
                  for You
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Experience compassionate care through cutting-edge medical innovation, 
                where your health and wellbeing are our highest priority.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              >
                <motion.button
                  onClick={() => router.push('/login')}
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <motion.button
                  onClick={() => router.push('/login')}
                  className="group relative border-2 border-white/50 text-white px-12 py-4 rounded-full text-lg font-semibold backdrop-blur-sm hover:bg-white hover:text-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Learn More</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Treatment Slider with enhanced spacing */}
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <TreatmentSlider />
        </div>

        {/* Enhanced About Section */}
        <motion.section 
          id="aboutus"
          className="py-24 px-6 md:px-16 bg-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                About Our Mission
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12 rounded-full" />
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
                We believe healthcare should be accessible, compassionate, and innovative. Our state-of-the-art 
                facility combines cutting-edge technology with personalized care, ensuring every patient receives 
                the attention and treatment they deserve.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  { icon: "🏥", title: "Modern Facilities", desc: "State-of-the-art equipment and comfortable environments" },
                  { icon: "👨‍⚕️", title: "Expert Care", desc: "Experienced professionals dedicated to your wellbeing" },
                  { icon: "💝", title: "Compassionate Service", desc: "Personalized attention with genuine care and respect" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-100 to-transparent rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-100 to-transparent rounded-full blur-3xl opacity-30" />
        </motion.section>

        {/* Enhanced Location Section */}
        <motion.section 
          id="location"
          className="py-24 px-6 md:px-16 bg-gradient-to-br from-gray-50 to-blue-50 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Find Us Here
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12 rounded-full" />
              
              <p className="text-xl text-gray-600 mb-12 font-light">
                Conveniently located in the heart of Bangkok for easy access from anywhere in the city.
              </p>
              
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-96"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Contact Section */}
        <motion.section 
          id="contact"
          className="py-24 px-6 md:px-16 bg-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12 rounded-full" />

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  { icon: "📞", title: "Phone", info: "02-123-4567", desc: "Available 24/7 for emergencies" },
                  { icon: "📧", title: "Email", info: "contact@healthcare.com", desc: "We'll respond within 2 hours" },
                  { icon: "🏥", title: "Address", info: "123 Sukhumvit Rd", desc: "Bangkok, Thailand 10110" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-lg font-semibold text-blue-600 mb-2">{item.info}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-100 to-transparent rounded-full blur-3xl opacity-30" />
        </motion.section>

        {/* Enhanced Footer */}
        <footer className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-16 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center">
              <motion.h2
                className="text-3xl font-black mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                HealthCare+
              </motion.h2>
              <motion.p
                className="text-blue-100 mb-8 text-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Your health, our commitment
              </motion.p>
              <motion.div
                className="text-blue-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                &copy; {new Date().getFullYear()} HealthCare+ | All rights reserved.
              </motion.div>
            </div>
          </div>

          {/* Background animation */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </footer>
      </main>

      <ChatPopup />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  )
}