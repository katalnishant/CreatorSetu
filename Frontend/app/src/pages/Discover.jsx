import { Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import CreatorCard from '../components/common/CreatorCard'
import creators from '../data/creators'

const categories = [
  'All',
  'Gaming',
  'Fashion',
  'Technology',
  'Food',
  'Fitness',
  'Travel',
]

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCreators = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return creators.filter((creator) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        creator.category === selectedCategory

      const matchesSearch =
        normalizedSearch.length === 0 ||
        creator.name.toLowerCase().includes(normalizedSearch) ||
        creator.category.toLowerCase().includes(normalizedSearch) ||
        creator.location.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#0B1324]">

      {/* Hero */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#457B9D]/20 bg-[#457B9D]/5 px-3 py-1 text-sm font-semibold text-[#1D5D82]">
              <Sparkles className="h-4 w-4 text-[#2A9D8F]" />
              Creator marketplace
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0B1324] sm:text-5xl lg:text-6xl">
              Find the right creator for your next campaign.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748B]">
              Discover trusted creators, explore their niches, compare
              audiences, and find the right partner for your brand.
            </p>
          </div>

        </div>
      </section>

      {/* Search + Filters */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="rounded-[2rem] border border-[#E2E8F0] bg-white p-4 shadow-sm">

          {/* Search */}
          <div className="flex flex-col gap-4 lg:flex-row">

            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 transition focus-within:border-[#457B9D] focus-within:ring-2 focus-within:ring-[#457B9D]/10">

              <Search className="h-5 w-5 text-[#64748B]" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search creators, niches, or locations..."
                className="w-full bg-transparent text-sm text-[#0B1324] outline-none placeholder:text-[#94A3B8]"
              />

            </label>

            <div className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#334155]">
              <SlidersHorizontal className="h-4 w-4 text-[#457B9D]" />
              Filters
            </div>

          </div>

          {/* Categories */}
          <div className="mt-5 flex flex-wrap gap-2">

            {categories.map((category) => {
              const isActive = selectedCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'border-[#457B9D] bg-[#457B9D] text-white shadow-sm'
                      : 'border-[#CBD5E1] bg-white text-[#475569] hover:border-[#457B9D] hover:text-[#457B9D]'
                  }`}
                >
                  {category}
                </button>
              )
            })}

          </div>

        </div>

      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2A9D8F]">
              Featured creators
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#0B1324] sm:text-3xl">
              {filteredCreators.length} creators found
            </h2>
          </div>

          {searchTerm && (
            <p className="text-sm text-[#64748B]">
              Results for "{searchTerm}"
            </p>
          )}

        </div>

        {filteredCreators.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#CBD5E1] bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#457B9D]/10">
              <Search className="h-6 w-6 text-[#457B9D]" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-[#0B1324]">
              No creators found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
              Try another creator name, location, or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="mt-6 rounded-full bg-[#457B9D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2D6688]"
            >
              Clear filters
            </button>

          </div>
        )}

      </section>

    </main>
  )
}