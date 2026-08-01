import CreatorCard from '../common/CreatorCard'

export default function FeaturedCreators({ filteredCreators }) {
  return (
    <section id="creators" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Featured creators</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Meet creators who already convert attention into action.</h2>
        </div>
        <a href="#discover" className="text-sm font-semibold text-fuchsia-300 transition hover:text-fuchsia-200">
          View all creators →
        </a>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {filteredCreators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  )
}
