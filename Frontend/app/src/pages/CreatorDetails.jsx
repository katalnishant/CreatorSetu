import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, MapPin, Star } from 'lucide-react'
import creators from '../data/creators'

export default function CreatorDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const creator = creators.find((item) => item.id === Number(id))

  if (!creator) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-10 text-center shadow-2xl shadow-slate-950/20">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Creator unavailable</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Creator Not Found</h1>
          <p className="mt-4 text-slate-400">The profile you are looking for does not exist or may have been removed.</p>
          <button
            onClick={() => navigate('/discover')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to discover
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/20">
        <div className="grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
            <img src={creator.image} alt={creator.name} className="h-36 w-36 rounded-full border border-white/10 object-cover" />
            <div className="mt-5 flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-white">{creator.name}</h1>
              {creator.verified && <BadgeCheck className="h-6 w-6 text-cyan-300" />}
            </div>
            <p className="mt-2 text-slate-400">{creator.category}</p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Profile highlights</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Followers</p>
                  <p className="mt-1 text-xl font-semibold text-white">{creator.followers}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="mt-1 text-xl font-semibold text-white">{creator.location}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Rating</p>
                  <p className="mt-1 flex items-center gap-2 text-xl font-semibold text-white">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    {creator.rating.toFixed(1)} / 5.0
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Verified</p>
                  <p className="mt-1 text-xl font-semibold text-white">{creator.verified ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <MapPin className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">Based in {creator.location}</p>
              </div>
              <p className="mt-4 text-slate-300">
                {creator.name} is a trusted creator in the {creator.category.toLowerCase()} space, known for engaging communities and delivering strong campaign results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
