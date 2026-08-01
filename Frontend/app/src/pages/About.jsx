import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from 'lucide-react'

const points = [
  {
    title: 'Built for modern teams',
    description: 'CreatorSetu helps brands discover, evaluate, and collaborate with creators through one streamlined platform.',
  },
  {
    title: 'Trusted collaboration',
    description: 'Every creator profile is organized with clear insights so teams can make faster, smarter decisions.',
  },
  {
    title: 'Fast-moving operations',
    description: 'From discovery to campaign delivery, the experience is designed to keep momentum high and communication clear.',
  },
]

export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20 lg:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About CreatorSetu</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">A modern platform for creator-led growth.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            CreatorSetu brings together brands, creators, and campaign managers in a single workspace designed for clarity, speed, and authentic partnerships.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 text-fuchsia-200">
                {point.title.includes('Built') ? <Sparkles className="h-6 w-6" /> : point.title.includes('Trusted') ? <ShieldCheck className="h-6 w-6" /> : <BadgeCheck className="h-6 w-6" />}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">{point.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="/discover" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white">
            Explore creators
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/contact" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
            Contact us
          </a>
        </div>
      </div>
    </main>
  )
}
