import { Outlet } from 'react-router-dom'
import Navbar from '../landing/Navbar'
import Footer from '../landing/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
