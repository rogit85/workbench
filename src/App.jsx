import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Projects from './pages/Projects'
import AIGateway from './pages/AIGateway'
import Team from './pages/Team'
import Ideas from './pages/Ideas'
import About from './pages/About'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ai-gateway" element={<AIGateway />} />
          <Route path="/team" element={<Team />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App 