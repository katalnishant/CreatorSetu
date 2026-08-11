import { ArrowRight, Play, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FA]">

      {/* Very subtle brand accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#457B9D]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#2A9D8F]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >

          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#457B9D]/20 bg-white px-3 py-1 text-sm font-medium text-[#1D3557] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#2A9D8F]" />
            Trusted by 12k+ creators and brands
          </div>

          {/* Main heading */}
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#0B1324] sm:text-5xl lg:text-6xl">
            Find your next creator partner in minutes.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#475569]">
            Discover vetted creators, compare campaigns, and launch
            collaborations with a platform designed for modern brand growth.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            {/* Primary button */}
            <a
              href="#discover"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#457B9D] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#457B9D]/20 transition hover:bg-[#1D3557] hover:scale-[1.01]"
            >
              Start exploring
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* Secondary button */}
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#1D3557] shadow-sm transition hover:border-[#457B9D] hover:bg-[#F8FAFC]"
            >
              <Play className="h-4 w-4 text-[#457B9D]" />
              Watch how it works
            </a>

          </div>

          {/* Trust features */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#475569]">

            <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#2A9D8F]" />
              Verified profiles
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#2A9D8F]" />
              Secure payments
            </span>

          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >

          {/* Outer card */}
          <div className="rounded-[2rem] border border-[#E2E8F0] bg-white p-4 shadow-xl shadow-[#0B1324]/10">

            {/* Inner card */}
            <div className="rounded-[1.5rem] border border-[#E2E8F0] bg-[#F8FAFC] p-5">

              {/* Card header */}
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-[#64748B]">
                    Campaign overview
                  </p>

                  <p className="mt-1 text-xl font-semibold text-[#0B1324]">
                    Creator match score
                  </p>
                </div>

                {/* Reach badge */}
                <div className="rounded-full bg-[#2A9D8F]/10 px-3 py-1 text-sm font-semibold text-[#23806E]">
                  +28% reach
                </div>

              </div>

              {/* Match card */}
              <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-[#64748B]">
                      Top match
                    </p>

                    <p className="text-lg font-semibold text-[#0B1324]">
                      Ava Chen
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-semibold text-[#0B1324]">
                      98
                    </p>

                    <p className="text-sm text-[#457B9D]">
                      Perfect fit
                    </p>

                  </div>

                </div>

                {/* Score bar */}
                <div className="mt-4 h-2 rounded-full bg-[#E2E8F0]">
                  <div className="h-2 w-[92%] rounded-full bg-[#457B9D]" />
                </div>

                {/* Information boxes */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm text-[#475569]">
                    Lifestyle • 142k followers
                  </div>

                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm text-[#475569]">
                    Brand-safe • 4.9/5 rating
                  </div>

                </div>

              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  )
} 