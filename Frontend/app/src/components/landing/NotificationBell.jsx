import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/notifications')
      setNotifications(response.data.notifications || [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load notifications.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const unreadCount = notifications.filter((item) => !item.is_read).length

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/notifications/${id}/read`)
      setNotifications((current) => current.map((item) => item.id === id ? { ...item, is_read: true } : item))
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to mark notification as read.')
    }
  }

  const markAllAsRead = async () => {
    try {
      await api.patch('/api/notifications/read-all')
      setNotifications((current) => current.map((item) => ({ ...item, is_read: true })))
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to mark notifications as read.')
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((current) => !current)} className="relative rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-semibold text-slate-950">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl shadow-slate-950/40">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            {notifications.length > 0 ? (
              <button onClick={markAllAsRead} className="text-xs font-semibold text-cyan-300">Mark all as read</button>
            ) : null}
          </div>

          {loading ? (
            <p className="mt-4 text-sm text-slate-400">Loading notifications...</p>
          ) : error ? (
            <p className="mt-4 text-sm text-rose-400">{error}</p>
          ) : notifications.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">No notifications yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`rounded-2xl border p-3 ${notification.is_read ? 'border-white/10 bg-slate-950/70' : 'border-cyan-400/30 bg-cyan-400/10'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{notification.title}</p>
                      <p className="mt-1 text-sm text-slate-300">{notification.message}</p>
                    </div>
                    {!notification.is_read ? (
                      <button onClick={() => markAsRead(notification.id)} className="text-xs font-semibold text-cyan-300">Read</button>
                    ) : null}
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{new Date(notification.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
