import { BadgeCheck, MapPin, Star } from 'lucide-react'

export default function CreatorCard({ creator }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={creator.image}
            alt={creator.name}
            className="h-14 w-14 rounded-full border border-white/10 object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">{creator.name}</h3>
              {creator.verified && <BadgeCheck className="h-5 w-5 text-cyan-300" />}
            </div>
            <p className="mt-1 text-sm text-slate-400">{creator.category}</p>
          </div>
        </div>
        <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fuchsia-200">
          {creator.followers}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {creator.rating.toFixed(1)} / 5.0
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MapPin className="h-4 w-4" />
          {creator.location}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-slate-400">{creator.verified ? 'Verified partner' : 'New creator'}</span>
        <button className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20">
          View Profile
        </button>
      </div>
    </div>
  )
}
