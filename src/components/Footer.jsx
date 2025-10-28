import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Globe, Shield } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">Workbench</span>
                <span className="text-xs text-gray-400">Risk Management</span>
              </div>
            </div>
            <h3 className="text-base font-bold mb-2">Global Business Intake Solution</h3>
            <p className="text-sm text-gray-400">Powered by The AI Gateway</p>
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
                <Link to="/ideas" className="text-gray-400 hover:text-sompo-red transition-colors text-sm">
                  Submit Ideas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-sompo-red" />
                <span className="text-gray-400 text-sm">support@workbench.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-sompo-red" />
                <span className="text-gray-400 text-sm">workbench.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Workbench. All rights reserved.
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