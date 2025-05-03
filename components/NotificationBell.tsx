'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Notification = {
  id: string
  message: string
  isRead: boolean
  createdAt: string
  userId: string
}

export default function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    axios.get('/api/notifications').then((res) => {
      const userNoti = res.data.filter((n: Notification) => n.userId === userId)
      setNotifications(userNoti)
    })
  }, [userId])

  const markAsRead = async (id: string) => {
    await axios.patch(`/api/notifications/${id}/read`)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  return (
    <div className="relative">
      <button className="relative text-white">
        🔔
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            !
          </span>
        )}
      </button>
      <div className="absolute top-full right-0 w-64 bg-white shadow-lg rounded p-2 z-50">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="border-b py-1">
              <p className={n.isRead ? 'text-gray-500' : 'text-black font-bold'}>
                {n.message}
              </p>
              {!n.isRead && (
                <button
                  className="text-blue-500 text-sm"
                  onClick={() => markAsRead(n.id)}
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}