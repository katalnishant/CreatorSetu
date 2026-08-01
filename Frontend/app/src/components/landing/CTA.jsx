import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section id="join" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-500/15 via-violet-500/10 to-cyan-400/15 p-8 shadow-2xl shadow-fuchsia-500/10 lg:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-slate-950/40 px-3 py-1 text-sm font-medium text-fuchsia-200">
              <Sparkles className="h-4 w-4" />
              Join the platform
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Ready to build your next standout creator campaign?</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Create your free account, discover trusted talent, and start collaborating with confidence.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#discover"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-950/70"
            >
              Explore creators
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
