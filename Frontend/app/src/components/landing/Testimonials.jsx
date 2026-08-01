import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'We found our ideal brand ambassador within a week and doubled our engagement.',
    name: 'Lina Brooks',
    role: 'Marketing Lead, Northstar Labs',
  },
  {
    quote: 'The search quality and creator insights helped us shorten our campaign planning cycle.',
    name: 'David Kim',
    role: 'Founder, Studio Nine',
  },
  {
    quote: 'Every creator profile feels curated and relevant, which makes pitching much easier.',
    name: 'Mina Alvarez',
    role: 'Community Manager, Flux Studio',
  },
]

export default function Testimonials() {
  return (
    <section id="stories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20 lg:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Testimonials</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Creators and brands trust CreatorSetu to move faster.</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <Quote className="h-8 w-8 text-fuchsia-300" />
              <p className="mt-4 text-sm leading-7 text-slate-300">“{testimonial.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
