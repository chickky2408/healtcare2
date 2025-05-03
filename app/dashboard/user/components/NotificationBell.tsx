'use client'
import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export default function NotificationBell({ userId }: { userId: string }) {
  interface Notification {
    id: string
    userId: string
    message: string
    isRead: boolean
  }
  
  const { data: notifications, mutate } = useSWR<Notification[]>('/api/notifications', fetcher)
  const [show, setShow] = useState(false)

  const unreadCount = notifications?.filter((n: Notification) => n.userId === userId && !n.isRead).length || 0
  const userNotifications = notifications?.filter((n: Notification) => n.userId === userId) || []

  const markAsRead = async (id: string) => {
    await axios.patch(`/api/notifications/${id}/read`)
    mutate()
  }

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setShow(!show)} className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {unreadCount}
          </span>
        )}
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded p-2 z-10">
          <h3 className="font-bold text-sm mb-2">Notifications</h3>
          {userNotifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No notifications</p>
          ) : (
            userNotifications.map((n: Notification) => (
              <div key={n.id} className="mb-2 text-sm border-b pb-1">
                <p>{n.message}</p>
                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-blue-600 text-xs underline"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}