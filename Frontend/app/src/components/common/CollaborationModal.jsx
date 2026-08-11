import { useState } from 'react'
import api from '../../services/api'

export default function CollaborationModal({ creator, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    brand_name: '',
    brand_email: '',
    campaign_title: '',
    campaign_description: '',
    budget: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setLoading(true)
      await api.post('/api/collaboration/send', {
        ...formData,
        creator_id: creator.id
      })
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to send collaboration request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 px-4">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Send collaboration request</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">To {creator?.creator_name || 'this creator'}</h2>
          </div>
          <button onClick={onClose} className="text-sm font-semibold text-slate-300">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-300 md:col-span-2">
            <span className="mb-2 block">Brand Name</span>
            <input name="brand_name" value={formData.brand_name} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400" required />
          </label>

          <label className="block text-sm font-medium text-slate-300 md:col-span-2">
            <span className="mb-2 block">Brand Email</span>
            <input type="email" name="brand_email" value={formData.brand_email} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400" required />
          </label>

          <label className="block text-sm font-medium text-slate-300 md:col-span-2">
            <span className="mb-2 block">Campaign Title</span>
            <input name="campaign_title" value={formData.campaign_title} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400" required />
          </label>

          <label className="block text-sm font-medium text-slate-300 md:col-span-2">
            <span className="mb-2 block">Campaign Description</span>
            <textarea name="campaign_description" value={formData.campaign_description} onChange={handleChange} rows="4" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400" required />
          </label>

          <label className="block text-sm font-medium text-slate-300 md:col-span-2">
            <span className="mb-2 block">Budget</span>
            <input name="budget" value={formData.budget} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400" required />
          </label>

          {error && <p className="text-sm text-rose-400 md:col-span-2">{error}</p>}

          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2">
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  )
}
