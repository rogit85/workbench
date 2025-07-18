import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/sompo-logo.svg" 
                alt="Sompo Logo" 
                className="w-10 h-10 filter brightness-0 invert"
              />
              <div>
                <h3 className="text-lg font-bold">Sompo Insurance</h3>
                <p className="text-sm text-gray-400">UK IT Innovation Hub</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pioneering the future of insurance through innovative AI solutions 
              and cutting-edge technology in the United Kingdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/ai-gateway" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                  AI Gateway Platform
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                  Current Projects
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link to="/ideas" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                  Submit Ideas
                </Link>
              </li>
            </ul>
          </div>

          {/* Leadership */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Leadership</h4>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">Brad O'Connor</p>
                <p className="text-gray-400 text-sm">UK Chief Information Officer</p>
              </div>
              <div className="pt-2">
                <p className="text-gray-400 text-sm">
                  Leading digital transformation and AI innovation across Sompo UK operations.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-sompo-red" />
                <span className="text-gray-400 text-sm">London, United Kingdom</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-sompo-red" />
                <span className="text-gray-400 text-sm">innovation@sompo.co.uk</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-sompo-red" />
                <span className="text-gray-400 text-sm">sompo.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Sompo Insurance. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 