import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await api.get('/api/user/profile')
        setProfile(response.data.user)
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load profile.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!currentUser) {
    return null
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back, {currentUser?.name || 'Creator'}</h1>
            <p className="mt-3 text-slate-300">Your account details and creator profile are available here.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">Account information</h2>
            {loading ? (
              <p className="mt-4 text-slate-400">Loading your profile...</p>
            ) : error ? (
              <p className="mt-4 text-rose-400">{error}</p>
            ) : profile ? (
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p><span className="font-semibold text-white">Name:</span> {profile.name}</p>
                <p><span className="font-semibold text-white">Email:</span> {profile.email}</p>
              </div>
            ) : null}
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">Next steps</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Complete your creator profile to showcase your work</li>
              <li>• Update your social links and pricing</li>
              <li>• Continue discovering creators in the app</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
