import { useMemo, useState } from 'react'
import CreatorCard from '../components/common/CreatorCard'
import Categories from '../components/landing/Categories'
import SearchBar from '../components/landing/SearchBar'
import creators from '../data/creators'

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCreators = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return creators.filter((creator) => {
      const matchesCategory = selectedCategory === 'All' || creator.category === selectedCategory
      const matchesSearch =
        normalizedSearch.length === 0 ||
        creator.name.toLowerCase().includes(normalizedSearch) ||
        creator.category.toLowerCase().includes(normalizedSearch) ||
        creator.location.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Discover creators</p>
        <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Browse creators that fit your next campaign.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Use search and category filters to find trusted creators across lifestyle, gaming, tech, food, fitness, and travel.
        </p>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {filteredCreators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </main>
  )
}
