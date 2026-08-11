import { useMemo, useState } from 'react'
import Hero from '../components/landing/Hero'
import SearchBar from '../components/landing/SearchBar'
import Categories from '../components/landing/Categories'
import HowItWorks from '../components/landing/HowItWorks'
import FeaturedCreators from '../components/landing/FeaturedCreators'
import Testimonials from '../components/landing/Testimonials'
import CTA from '../components/landing/CTA'
import creators from '../data/creators'

export default function LandingPage() {
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
    <div className="min-h-screen bg-[#F5F7FA] text-[#0B1324]">
      <Hero />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <HowItWorks />

      <FeaturedCreators
        filteredCreators={filteredCreators}
      />

      <Testimonials />

      <CTA />
    </div>
  )
}