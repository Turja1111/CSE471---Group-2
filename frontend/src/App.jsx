import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CompanionText from './pages/CompanionText'
import TrainingProgram from './pages/TrainingProgram'
import Admin from './pages/Admin'

const Home = () => (
  <div className="max-w-4xl mx-auto mt-16 p-8 text-center">
    <h1 className="text-4xl font-semibold text-slate-700 mb-6">Welcome to SoulSpeak</h1>
    <p className="text-xl text-slate-500">A peaceful space for meaningful connections</p>
  </div>
)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <Router>
      <nav className="bg-gradient-to-r from-sage-400 to-sage-500 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-white text-2xl font-semibold hover:text-sage-100 transition-all duration-300">
              SoulSpeak ✨
            </Link>
          </div>
          <div className="space-x-8">
            <Link to="/become-a-companion" className="text-white hover:text-sage-100 transition-all duration-300">
              <span className="hover:-translate-y-0.5 inline-block transform">Become A Companion</span>
            </Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-white hover:text-sage-100 transition-all duration-300">
                  <span className="hover:-translate-y-0.5 inline-block transform">Login</span>
                </Link>
                <Link to="/signup" className="text-white hover:text-sage-100 transition-all duration-300">
                  <span className="hover:-translate-y-0.5 inline-block transform">Sign Up</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-white hover:text-sage-100 transition-all duration-300">
                  <span className="hover:-translate-y-0.5 inline-block transform">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  <span className="hover:-translate-y-0.5 inline-block transform">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-sage-50 via-slate-50 to-sage-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/become-a-companion" element={<CompanionText />} />
          <Route path="/training-program" element={<TrainingProgram />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App