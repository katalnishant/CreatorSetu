import { Globe2, Send, Sparkles } from 'lucide-react'

const footerLinks = [
  { label: 'About', href: '#' },
  { label: 'Creators', href: '#creators' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Contact', href: '#' },
]

const socials = [
  { icon: Sparkles, href: '#' },
  { icon: Globe2, href: '#' },
  { icon: Send, href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">CreatorSetu</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-slate-400">
            Helping brands and creators build authentic partnerships at scale.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.href}
                href={social.href}
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
