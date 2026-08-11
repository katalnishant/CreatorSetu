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
    <footer className="border-t border-[#457B9D] bg-[#457B9D] text-white">

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

        {/* Brand */}
        <div>
          <p className="text-lg font-semibold text-white">
            CreatorSetu
          </p>

          <p className="mt-2 max-w-md text-sm leading-7 text-white/80">
            Helping brands and creators build authentic partnerships at scale.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-white/80">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socials.map((social, index) => {
            const Icon = social.icon

            return (
              <a
                key={index}
                href={social.href}
                className="rounded-full border border-white/30 bg-white/10 p-2.5 text-white transition-all duration-200 hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-white/70 sm:px-6 lg:px-8">
          © 2026 CreatorSetu. All rights reserved.
        </div>
      </div>

    </footer>
  )
}