'use client'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-600">HealthCare+</h1>
          <nav className="space-x-6 text-sm font-medium text-gray-700">
            <a href="#about" className="hover:text-blue-600">About Us</a>
            <a href="#location" className="hover:text-blue-600">Location</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
            <button
              onClick={() => router.push('/login')}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-xl mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4 text-blue-700">Trusted Healthcare for You</h2>
          <p className="text-gray-600 mb-6">
            We are dedicated to providing compassionate and high-quality care through innovation and expertise.
          </p>
          <button
            onClick={() => router.push('/register')}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Register Now
          </button>
        </div>
        <Image
  src="https://images.unsplash.com/photo-1588776814546-ec7e4a3c4195"
  
  alt="doctor"
  width={500}
  height={500}
  className="w-full max-w-md rounded-lg shadow-md object-cover"
/>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 md:px-16 bg-gray-50">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">About Us</h3>
        <p className="text-gray-700 max-w-3xl">
          Our clinic provides a variety of healthcare services, from general checkups to specialized treatment. 
          Our team of experienced professionals is here to ensure you receive the care you need.
        </p>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 px-6 md:px-16">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">Location</h3>
        <p className="text-gray-700 mb-4">We’re located in the heart of the city for easy access.</p>
        <iframe
          src="https://maps.google.com/maps?q=Bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-64 rounded-lg"
          loading="lazy"
        ></iframe>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 md:px-16 bg-gray-50">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">Contact Us</h3>
        <p className="text-gray-700 mb-2">📞 02-123-4567</p>
        <p className="text-gray-700 mb-2">📧 contact@yourclinic.com</p>
        <p className="text-gray-700">🏥 123 Sukhumvit Rd, Bangkok, Thailand</p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4">
        &copy; {new Date().getFullYear()} HealthCare+ | All rights reserved.
      </footer>
    </div>
  )
}