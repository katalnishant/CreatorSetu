import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    window.alert('Thanks for reaching out! We will get back to you soon.')
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20 lg:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact us</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Let’s build better creator partnerships.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Share your goals and we will help you find the right creators, workflows, and campaign strategy.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              <span className="mb-2 block">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-300">
            <span className="mb-2 block">Message</span>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white"
          >
            Send message
          </button>
        </form>
      </div>
    </main>
  )
}
