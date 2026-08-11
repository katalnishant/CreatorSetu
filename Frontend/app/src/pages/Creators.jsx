import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CollaborationModal from '../components/common/CollaborationModal'
import api from '../services/api'

export default function Creators() {
  const [creators, setCreators] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCreator, setSelectedCreator] = useState(null)

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true)
        const response = await api.get('/api/creators')
        setCreators(response.data.creators || [])
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load creators right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchCreators()
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(creators.map((creator) => creator.category).filter(Boolean))]
    return ['All', ...uniqueCategories]
  }, [creators])

  const filteredCreators = useMemo(() => {
    const query = search.toLowerCase().trim()

    return creators.filter((creator) => {
      const matchesCategory = selectedCategory === 'All' || creator.category === selectedCategory
      const searchableText = `${creator.creator_name} ${creator.category}`.toLowerCase()
      const matchesSearch = !query || searchableText.includes(query)

      return matchesCategory && matchesSearch
    })
  }, [creators, search, selectedCategory])

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Discover creators</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Find the right creator for your next campaign</h1>
            <p className="mt-3 text-slate-300">Browse creator profiles by category, search by name, and explore pricing details.</p>
          </div>

          <div className="w-full md:max-w-sm">
            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Search creators</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or category"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? 'bg-cyan-400 text-slate-950'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-8 text-slate-400">Loading creators...</p>
        ) : error ? (
          <p className="mt-8 text-rose-400">{error}</p>
        ) : filteredCreators.length === 0 ? (
          <p className="mt-8 text-slate-400">No creators match your search.</p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCreators.map((creator) => (
              <article key={creator.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-lg shadow-slate-950/20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{creator.creator_name}</h2>
                    <p className="mt-2 text-sm text-cyan-300">{creator.category || 'General'}</p>
                  </div>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    {creator.followers ? `${creator.followers.toLocaleString()} followers` : 'New creator'}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">{creator.bio || 'No bio provided yet.'}</p>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                  <span>Pricing: {creator.pricing || 'Contact for pricing'}</span>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/creator/${creator.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => setSelectedCreator(creator)}
                    className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200"
                  >
                    Send Collaboration Request
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedCreator ? (
        <CollaborationModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          onSuccess={() => setError('')}
        />
      ) : null}
    </main>
  )
}
