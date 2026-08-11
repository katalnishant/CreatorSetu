import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, MapPin, Star } from 'lucide-react'
import api from '../services/api'

export default function CreatorDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [ratings, setRatings] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')

  const loadCreatorDetails = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/creators`)
      const selectedCreator = response.data.creators.find((item) => item.id === Number(id))
      setCreator(selectedCreator || null)

      if (selectedCreator) {
        const ratingsResponse = await api.get(`/api/ratings/${selectedCreator.id}`)
        setRatings(ratingsResponse.data.ratings || [])
        setAverageRating(ratingsResponse.data.average_rating || 0)
        setTotalReviews(ratingsResponse.data.total_reviews || 0)
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load creator details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCreatorDetails()
  }, [id])

  const handleSubmitReview = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await api.post('/api/ratings', {
        creator_id: creator?.id,
        reviewer_name: reviewerName,
        rating,
        review,
      })

      setReviewerName('')
      setRating(5)
      setReview('')
      await loadCreatorDetails()
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to submit review.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-slate-300">Loading creator profile...</p>
      </main>
    )
  }

  if (!creator) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-10 text-center shadow-2xl shadow-slate-950/20">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Creator unavailable</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Creator Not Found</h1>
          <p className="mt-4 text-slate-400">The profile you are looking for does not exist or may have been removed.</p>
          <button
            onClick={() => navigate('/discover')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to discover
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/20">
        <div className="grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
            <img src={creator.profile_image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'} alt={creator.creator_name} className="h-36 w-36 rounded-full border border-white/10 object-cover" />
            <div className="mt-5 flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-white">{creator.creator_name}</h1>
              <BadgeCheck className="h-6 w-6 text-cyan-300" />
            </div>
            <p className="mt-2 text-slate-400">{creator.category}</p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Profile highlights</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Followers</p>
                  <p className="mt-1 text-xl font-semibold text-white">{creator.followers}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Pricing</p>
                  <p className="mt-1 text-xl font-semibold text-white">{creator.pricing || 'Available on request'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Average Rating</p>
                  <p className="mt-1 flex items-center gap-2 text-xl font-semibold text-white">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    {averageRating.toFixed(1)} / 5.0
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Total Reviews</p>
                  <p className="mt-1 text-xl font-semibold text-white">{totalReviews}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <MapPin className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">About this creator</p>
              </div>
              <p className="mt-4 text-slate-300">
                {creator.bio || `${creator.creator_name} is a trusted creator in the ${creator.category?.toLowerCase() || 'content'} space.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold text-white">Leave a review</h2>
          <p className="mt-2 text-sm text-slate-400">Share your experience and help others discover this creator.</p>

          <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Your name</label>
              <input
                value={reviewerName}
                onChange={(event) => setReviewerName(event.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none ring-0"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-amber-400 transition hover:bg-white/10"
                  >
                    <Star className={`h-5 w-5 ${value <= rating ? 'fill-amber-400' : 'text-slate-500'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Review</label>
              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                rows="4"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none ring-0"
                placeholder="Share a few words about the collaboration experience"
              />
            </div>

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Submitting...' : 'Submit review'}
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Reviews</h2>
              <p className="mt-2 text-sm text-slate-400">What clients and collaborators say about this creator.</p>
            </div>
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-300">
              {averageRating.toFixed(1)} / 5
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {ratings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-6 text-center text-sm text-slate-400">
                No reviews yet. Be the first to leave one.
              </div>
            ) : (
              ratings.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{item.reviewer_name}</p>
                      <p className="mt-1 text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={`${item.id}-${index}`} className={`h-4 w-4 ${index < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                  </div>
                  {item.review ? <p className="mt-3 text-sm text-slate-300">{item.review}</p> : null}
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
