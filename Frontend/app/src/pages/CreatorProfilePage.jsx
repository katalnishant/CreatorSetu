import { useEffect, useState } from 'react'
import api from '../services/api'

const emptyForm = {
  bio: '',
  category: '',
  instagram: '',
  youtube: '',
  linkedin: '',
  followers: '',
  pricing: '',
  skills: '',
  profile_image: ''
}

export default function CreatorProfilePage() {
  const [formData, setFormData] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [profileExists, setProfileExists] = useState(false)

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true)

      const response = await api.get('/api/creator/profile')

      if (response.data?.profile) {
        setProfileExists(true)

        setFormData({
          bio: response.data.profile.bio || '',
          category: response.data.profile.category || '',
          instagram: response.data.profile.instagram || '',
          youtube: response.data.profile.youtube || '',
          linkedin: response.data.profile.linkedin || '',
          followers: response.data.profile.followers ?? '',
          pricing: response.data.profile.pricing || '',
          skills: response.data.profile.skills || '',
          profile_image: response.data.profile.profile_image || ''
        })
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        setProfileExists(false)
      } else {
        setError(
          err?.response?.data?.message ||
            'Unable to load creator profile.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  fetchProfile()
}, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMsg('')

    try {
      setSaving(true)
      const form = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value ?? '')
      })

      if (selectedImage) {
        form.append('profile_image', selectedImage)
      }

      form.set('followers', formData.followers === '' ? '' : String(Number(formData.followers)))

     const response = profileExists
  ? await api.put('/api/creator/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  : await api.post('/api/creator/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

setProfileExists(true)
      setSuccessMsg(
  response.data.message ||
    (profileExists
      ? 'Profile updated successfully.'
      : 'Profile created successfully.')
)
    } catch (err) {
      const serverErrors = err?.response?.data?.errors
      const message = err?.response?.data?.message || 'Unable to save profile.'
      setError(serverErrors ? serverErrors.join(' ') : message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Creator profile</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Build your public creator profile</h1>
          <p className="mt-3 text-slate-300">Share your bio, pricing, and socials with your audience.</p>
        </div>

        {loading ? (
          <p className="mt-6 text-slate-400">Loading your profile...</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <label className="block text-sm font-medium text-slate-300">
                <span className="mb-2 block">Profile image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-2xl border border-dashed border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                />
              </label>
              {(previewUrl || formData.profile_image) ? (
                <img
                  src={previewUrl || formData.profile_image}
                  alt="Profile preview"
                  className="mt-4 h-28 w-28 rounded-full border border-white/10 object-cover"
                />
              ) : null}
            </div>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Bio</span>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Category</span>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Instagram</span>
              <input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">YouTube</span>
              <input
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">LinkedIn</span>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Followers</span>
              <input
                type="number"
                name="followers"
                value={formData.followers}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Pricing</span>
              <input
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Skills</span>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <div className="md:col-span-2">
              {error && <p className="mb-3 text-sm text-rose-400">{error}</p>}
              {successMsg && <p className="mb-3 text-sm text-emerald-400">{successMsg}</p>}
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? 'Saving...' : 'Save profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
