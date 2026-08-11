import { Search, SlidersHorizontal } from 'lucide-react'

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <section
      id="discover"
      className="bg-[#F5F7FA] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[#475569] transition focus-within:border-[#457B9D] focus-within:ring-2 focus-within:ring-[#457B9D]/10">

              <Search className="h-5 w-5 text-[#64748B]" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search creators, niches, or campaigns"
                className="w-full bg-transparent text-sm text-[#0B1324] outline-none placeholder:text-[#94A3B8]"
              />

            </label>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-[#1D3557] shadow-sm transition-all duration-200 hover:border-[#457B9D] hover:bg-[#F8FAFC] hover:text-[#0B1324]"
              >
                <SlidersHorizontal className="h-4 w-4 text-[#457B9D]" />
                Filters
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
} 