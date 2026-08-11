import { ArrowRight, Handshake, Search, Sparkles } from 'lucide-react'

const steps = [
  {
    title: 'Discover',
    description:
      'Search high-performing creators by niche, audience, and campaign style.',
    icon: Search,
  },
  {
    title: 'Connect',
    description:
      'Message, compare, and secure the right fit with built-in collaboration tools.',
    icon: Handshake,
  },
  {
    title: 'Launch',
    description:
      'Track briefs, approvals, and performance from one beautifully organized workspace.',
    icon: Sparkles,
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Main container */}
      <div className="rounded-[2rem] border border-[#E2E8F0] bg-[#F5F7FA] p-8 shadow-sm lg:p-12">

        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2A9D8F]">
              How it works
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1324] sm:text-4xl">
              A simple flow from discovery to delivery.
            </h2>
          </div>

          <a
            href="#join"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#457B9D] transition hover:text-[#2A9D8F]"
          >
            See platform tour
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Steps */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.title}
                className="group rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#457B9D]/40 hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3F1] text-[#2A9D8F] transition-colors group-hover:bg-[#2A9D8F] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Number + title */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#457B9D]">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-semibold text-[#0B1324]">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-7 text-[#64748B]">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
