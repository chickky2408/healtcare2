'use client'

import AuthForm from './AuthForm'

export default function RegisterUserPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-100 to-white px-4">
      {/* <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Register as User</h2> */}
        <AuthForm />
        {/* <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div> */}
    </div>
  )
}







