import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NotificationBell from './NotificationBell'
import logo from '../../assets/logo.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Discover', to: '/discover' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const authLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Creator Profile', to: '/creator-profile' },
  { label: 'Creator Requests', to: '/creator-requests' },
]

export default function Navbar() {
  const { currentUser, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo + Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-3 text-lg font-semibold text-[#0B1324]"
        >
          <img
            src={logo}
            alt="CreatorSetu logo"
            className="h-10 w-10 object-contain"
          />

          <span className="text-[#0B1324]">
            CreatorSetu
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive
                    ? 'text-[#0B1324]'
                    : 'text-[#475569] hover:text-[#457B9D]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {currentUser &&
            authLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0B1324]'
                      : 'text-[#475569] hover:text-[#457B9D]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {currentUser ? (
            <>
              {/* Notification */}
              <NotificationBell />

              {/* User Name */}
              <span className="hidden text-sm font-medium text-[#475569] sm:inline">
                Hi, {currentUser.name}
              </span>

              {/* Logout */}
              <button
                onClick={logout}
                className="rounded-full border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-[#334155] transition-all duration-200 hover:border-[#457B9D] hover:bg-[#F5F7FA] hover:text-[#0B1324]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <NavLink
                to="/login"
                className="hidden rounded-full border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-[#334155] transition-all duration-200 hover:border-[#457B9D] hover:bg-[#F5F7FA] hover:text-[#0B1324] sm:inline-flex"
              >
                Login
              </NavLink>

              {/* Signup */}
              <NavLink
                to="/signup"
                className="hidden rounded-full bg-[#457B9D] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2D6688] sm:inline-flex"
              >
                Signup
              </NavLink>
            </>
          )}

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-full border border-[#CBD5E1] bg-white p-2.5 text-[#334155] transition-all duration-200 hover:border-[#457B9D] hover:bg-[#F5F7FA] hover:text-[#0B1324] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

        </div>
      </div>
    </header>
  )
}