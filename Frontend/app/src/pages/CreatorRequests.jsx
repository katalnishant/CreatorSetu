import { useEffect, useState } from 'react'
import api from '../services/api'

export default function CreatorRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/collaboration/my-requests')
      setRequests(response.data.requests || [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load collaboration requests.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const updateStatus = async (id, action) => {
    try {
      setUpdatingId(id)
      await api.patch(`/api/collaboration/${id}/${action}`)
      await fetchRequests()
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to update request status.')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Collaboration requests</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Manage incoming brand requests</h1>
          <p className="mt-3 text-slate-300">Review incoming requests, accept good-fit opportunities, or reject ones that aren’t a match.</p>
        </div>

        {loading ? (
          <p className="mt-8 text-slate-400">Loading requests...</p>
        ) : error ? (
          <p className="mt-8 text-rose-400">{error}</p>
        ) : requests.length === 0 ? (
          <p className="mt-8 text-slate-400">You have no collaboration requests yet.</p>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {requests.map((request) => (
              <article key={request.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{request.brand_name}</h2>
                    <p className="mt-2 text-sm text-cyan-300">{request.campaign_title}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${request.status === 'Accepted' ? 'bg-emerald-500/15 text-emerald-300' : request.status === 'Rejected' ? 'bg-rose-500/15 text-rose-300' : 'bg-amber-500/15 text-amber-300'}`}>
                    {request.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">{request.campaign_description}</p>

                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  <p><span className="font-semibold text-white">Brand email:</span> {request.brand_email}</p>
                  <p><span className="font-semibold text-white">Budget:</span> {request.budget}</p>
                </div>

                {request.status === 'Pending' ? (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => updateStatus(request.id, 'accept')}
                      disabled={updatingId === request.id}
                      className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                    >
                      {updatingId === request.id ? 'Updating...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => updateStatus(request.id, 'reject')}
                      disabled={updatingId === request.id}
                      className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                    >
                      {updatingId === request.id ? 'Updating...' : 'Reject'}
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
