import CreatorCard from '../common/CreatorCard'

export default function FeaturedCreators({ filteredCreators }) {
  return (
    <section
      id="creators"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2A9D8F]">
            Featured creators
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1324] sm:text-4xl">
            Meet creators who already convert attention into action.
          </h2>
        </div>

        <a
          href="#discover"
          className="text-sm font-semibold text-[#457B9D] transition hover:text-[#2A9D8F]"
        >
          View all creators →
        </a>
      </div>

      {/* Creator cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCreators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredCreators.length === 0 && (
        <div className="mt-10 rounded-3xl border border-[#E2E8F0] bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-[#0B1324]">
            No creators found
          </p>

          <p className="mt-2 text-sm text-[#64748B]">
            Try changing your search or selecting another category.
          </p>
        </div>
      )}
    </section>
  )
}
