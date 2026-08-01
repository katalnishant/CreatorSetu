import { ArrowRight, Play, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.2),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.03)_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-sm font-medium text-fuchsia-200">
            <Sparkles className="h-4 w-4" />
            Trusted by 12k+ creators and brands
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find your next creator partner in minutes.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Discover vetted creators, compare campaigns, and launch collaborations with a platform designed for modern brand growth.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#discover"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.01]"
            >
              Start exploring
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <Play className="h-4 w-4" />
              Watch how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Verified profiles
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Secure payments
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Campaign overview</p>
                  <p className="mt-1 text-xl font-semibold text-white">Creator match score</p>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">+28% reach</div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Top match</p>
                    <p className="text-lg font-semibold text-white">Ava Chen</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-white">98</p>
                    <p className="text-sm text-cyan-300">Perfect fit</p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {['Lifestyle • 142k followers', 'Brand-safe • 4.9/5 rating'].map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
