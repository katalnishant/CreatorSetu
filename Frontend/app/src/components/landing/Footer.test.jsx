import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the brand name and tagline', () => {
    render(<Footer />)
    expect(screen.getByText('CreatorSetu')).toBeInTheDocument()
    expect(
      screen.getByText(/Helping brands and creators build authentic partnerships/i)
    ).toBeInTheDocument()
  })

  it('renders all footer navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Creators')).toBeInTheDocument()
    expect(screen.getByText('How it works')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
