import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in both fields.')
      return
    }

    const result = login(formData.email, formData.password)
    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/discover')
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20 lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Login to CreatorSetu</h1>
        <p className="mt-4 text-slate-300">Access your dashboard and continue discovering creators.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-slate-300">
            <span className="mb-2 block">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>

          <label className="block text-sm font-medium text-slate-300">
            <span className="mb-2 block">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-semibold text-cyan-300">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}
