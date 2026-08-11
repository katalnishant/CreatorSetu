import {
  Compass,
  Flame,
  Palette,
  Sparkles,
  Dumbbell,
  Plane,
  UtensilsCrossed,
} from 'lucide-react'

const categoryOptions = [
  { label: 'All', icon: Sparkles },
  { label: 'Gaming', icon: Flame },
  { label: 'Fashion', icon: Palette },
  { label: 'Technology', icon: Compass },
  { label: 'Food', icon: UtensilsCrossed },
  { label: 'Fitness', icon: Dumbbell },
  { label: 'Travel', icon: Plane },
]

export default function Categories({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#457B9D]">
            Popular categories
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-[#0B1324] sm:text-4xl">
            Explore communities that match your brand values.
          </h2>
        </div>

        <a
          href="#discover"
          className="text-sm font-semibold text-[#457B9D] transition hover:text-[#1D3557]"
        >
          Browse all categories →
        </a>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        {categoryOptions.map((category) => {
          const Icon = category.icon
          const isActive = selectedCategory === category.label

          return (
            <button
              key={category.label}
              onClick={() => onSelectCategory(category.label)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'border-[#457B9D] bg-[#457B9D] text-white shadow-sm'
                  : 'border-[#CBD5E1] bg-white text-[#334155] hover:border-[#457B9D] hover:text-[#1D3557]'
              }`}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </button>
          )
        })}

      </div>

    </section>
  )
}