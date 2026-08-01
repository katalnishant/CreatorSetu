import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-10 text-center shadow-2xl shadow-slate-950/20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">404 error</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-slate-400">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
