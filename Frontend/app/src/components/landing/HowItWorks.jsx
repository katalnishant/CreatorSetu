import { ArrowRight, Handshake, Search, Sparkles } from 'lucide-react'

const steps = [
  {
    title: 'Discover',
    description: 'Search high-performing creators by niche, audience, and campaign style.',
    icon: Search,
  },
  {
    title: 'Connect',
    description: 'Message, compare, and secure the right fit with built-in collaboration tools.',
    icon: Handshake,
  },
  {
    title: 'Launch',
    description: 'Track briefs, approvals, and performance from one beautifully organized workspace.',
    icon: Sparkles,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/70 p-8 shadow-2xl shadow-slate-950/20 lg:p-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">A simple flow from discovery to delivery.</h2>
          </div>
          <a href="#join" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
            See platform tour <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-200">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-sm font-semibold text-fuchsia-300">0{index + 1}</span>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-400">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
