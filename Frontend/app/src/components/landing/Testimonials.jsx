import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'We found our ideal brand ambassador within a week and doubled our engagement.',
    name: 'Lina Brooks',
    role: 'Marketing Lead, Northstar Labs',
  },
  {
    quote:
      'The search quality and creator insights helped us shorten our campaign planning cycle.',
    name: 'David Kim',
    role: 'Founder, Studio Nine',
  },
  {
    quote:
      'Every creator profile feels curated and relevant, which makes pitching much easier.',
    name: 'Mina Alvarez',
    role: 'Community Manager, Flux Studio',
  },
]

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Main section */}
      <div className="rounded-[2rem] border border-[#E2E8F0] bg-[#F5F7FA] p-8 shadow-sm lg:p-12">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2A9D8F]">
            Testimonials
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1324] sm:text-4xl">
            Creators and brands trust CreatorSetu to move faster.
          </h2>
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#457B9D]/40 hover:shadow-md"
            >
              {/* Quote icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F3F1]">
                <Quote className="h-5 w-5 text-[#2A9D8F]" />
              </div>

              {/* Quote */}
              <p className="mt-4 text-sm leading-7 text-[#475569]">
                “{testimonial.quote}”
              </p>

              {/* Person */}
              <div className="mt-6">
                <p className="font-semibold text-[#0B1324]">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm text-[#64748B]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
