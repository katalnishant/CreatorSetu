import { BadgeCheck, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
  return (
    <div className="group rounded-[1.75rem] border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#457B9D]/40 hover:shadow-lg">

      {/* Creator information */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={creator.image}
            alt={creator.name}
            className="h-14 w-14 rounded-full border border-[#E2E8F0] object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-[#0B1324]">
                {creator.name}
              </h3>

              {creator.verified && (
                <BadgeCheck className="h-5 w-5 text-[#2A9D8F]" />
              )}
            </div>

            <p className="mt-1 text-sm text-[#64748B]">
              {creator.category}
            </p>
          </div>
        </div>

        {/* Followers */}
        <span className="rounded-full border border-[#2A9D8F]/30 bg-[#E8F3F1] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#247A70]">
          {creator.followers}
        </span>
      </div>

      {/* Rating + Location */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2 text-sm text-[#334155]">
          <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
          {creator.rating.toFixed(1)} / 5.0
        </div>

        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <MapPin className="h-4 w-4 text-[#457B9D]" />
          {creator.location}
        </div>

      </div>

      {/* Bottom section */}
      <div className="mt-6 flex items-center justify-between gap-3">

        <span className="text-sm text-[#64748B]">
          {creator.verified ? 'Verified partner' : 'New creator'}
        </span>

        <Link
          to={`/creator/${creator.id}`}
          className="inline-flex items-center rounded-full border border-[#457B9D]/30 bg-[#457B9D]/10 px-4 py-2 text-sm font-semibold text-[#1D5D82] transition hover:border-[#2A9D8F]/40 hover:bg-[#2A9D8F]/10 hover:text-[#247A70]"
        >
          View Profile
        </Link>

      </div>
    </div>
  )
}