'use client'

import Link from 'next/link'

const paths = [
  '/',
  '/login',
  '/register',
  '/dashboard/user',
  '/dashboard/doctor',
  '/dashboard/admin',
  '/booking',
  '/dashboard/user/appointments/edit/test-id',
  '/telemedicine/test-doctor-id',
  '/dashboard/admin/users',
  '/dashboard/admin/users/edit/test-id',
  '/dashboard/admin/users/test-id/appointments'
]

export default function TestLinksPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-4">🔗 Dev Page: All Routes</h1>
        <ul className="space-y-3">
          {paths.map((path) => (
            <li key={path}>
              <Link
                href={path}
                className="text-blue-600 hover:underline break-all"
                target="_blank"
              >
                {path}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
