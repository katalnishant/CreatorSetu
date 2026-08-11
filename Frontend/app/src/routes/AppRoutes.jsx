import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute'

import Home from '../pages/Home'
import Discover from '../pages/Discover'
import CreatorDetails from '../pages/CreatorDetails'
import About from '../pages/About'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'

import Dashboard from '../pages/Dashboard'
import CreatorProfilePage from '../pages/CreatorProfilePage'
import CreatorRequests from '../pages/CreatorRequests'


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator-profile"
          element={
            <ProtectedRoute>
              <CreatorProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator-requests"
          element={
            <ProtectedRoute>
              <CreatorRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator/:id"
          element={
            <ProtectedRoute>
              <CreatorDetails />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  )
}