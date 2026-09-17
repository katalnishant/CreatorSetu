import React from "react";
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CreatorCard from './CreatorCard'

const mockCreator = {
  id: 1,
  name: 'Ava Studio',
  image: 'https://example.com/avatar.png',
  category: 'Gaming',
  followers: '120K',
  rating: 4.8,
  location: 'Mumbai, IN',
  verified: true,
}

function renderCard(creator) {
  return render(
    <MemoryRouter>
      <CreatorCard creator={creator} />
    </MemoryRouter>
  )
}

describe('CreatorCard', () => {
  it('renders creator details', () => {
    renderCard(mockCreator)
    expect(screen.getByText('Ava Studio')).toBeInTheDocument()
    expect(screen.getByText('Gaming')).toBeInTheDocument()
    expect(screen.getByText('120K')).toBeInTheDocument()
    expect(screen.getByText('Mumbai, IN')).toBeInTheDocument()
    expect(screen.getByText('4.8 / 5.0')).toBeInTheDocument()
  })

  it('shows "Verified partner" label when the creator is verified', () => {
    renderCard(mockCreator)
    expect(screen.getByText('Verified partner')).toBeInTheDocument()
  })

  it('shows "New creator" label when the creator is not verified', () => {
    renderCard({ ...mockCreator, verified: false })
    expect(screen.getByText('New creator')).toBeInTheDocument()
  })

  it('links to the creator profile page', () => {
    renderCard(mockCreator)
    const link = screen.getByText('View Profile').closest('a')
    expect(link).toHaveAttribute('href', '/creator/1')
  })
})
