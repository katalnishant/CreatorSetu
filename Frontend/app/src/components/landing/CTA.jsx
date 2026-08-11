import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section
      id="join"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="rounded-[2rem] border border-[#D7E2EA] bg-[#F5F7FA] p-8 shadow-sm lg:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Content */}
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2A9D8F]/25 bg-[#E8F3F1] px-3 py-1 text-sm font-medium text-[#247A70]">
              <Sparkles className="h-4 w-4 text-[#2A9D8F]" />
              Join the platform
            </div>

            {/* Heading */}
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0B1324] sm:text-4xl">
              Ready to build your next standout creator campaign?
            </h2>

            {/* Description */}
            <p className="mt-4 text-lg leading-8 text-[#475569]">
              Create your free account, discover trusted talent, and start
              collaborating with confidence.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Primary */}
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#457B9D] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1D3557] hover:scale-[1.01]"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* Secondary */}
            <a
              href="#discover"
              className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#1D3557] shadow-sm transition-all duration-200 hover:border-[#457B9D] hover:bg-[#F8FAFC]"
            >
              Explore creators
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}
