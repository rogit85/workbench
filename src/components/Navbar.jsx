import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [analyticsMenuOpen, setAnalyticsMenuOpen] = useState(false);
  const [configMenuOpen, setConfigMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Work Queue", href: "/workqueue" },
    {
      name: "Analytics",
      href: "/analytics",
      submenu: [
        { name: "Performance Reporting", href: "/analytics/performance" },
        { name: "Underwriter Performance", href: "/analytics/underwriter-performance" },
        { name: "AI Accuracy", href: "/analytics/ai-accuracy" }
      ]
    },
    {
      name: "Configuration",
      href: "/configuration",
      submenu: [
        { name: "Email Templates", href: "/configuration/email-templates" },
        { name: "Appetite Builder", href: "/configuration/appetite-builder" }
      ]
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Red Banner */}
      <div className="bg-sompo-dark-red py-1.5">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-white font-bold text-xs tracking-wide">
            GLOBAL BUSINESS INTAKE SOLUTION
          </p>
          <p className="text-white text-xs font-medium">
            Powered by The AI Gateway
          </p>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="w-32 h-32 relative flex-shrink-0">
                <img
                  src="/sompo-logo.svg"
                  alt="Sompo Logo"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  item.submenu ? (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => item.name === "Analytics" ? setAnalyticsMenuOpen(true) : setConfigMenuOpen(true)}
                      onMouseLeave={() => item.name === "Analytics" ? setAnalyticsMenuOpen(false) : setConfigMenuOpen(false)}
                    >
                      <button
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group flex items-center gap-1 ${
                          location.pathname.startsWith(item.href)
                            ? "text-sompo-red bg-sompo-red/10"
                            : "text-gray-700 hover:text-sompo-red hover:bg-gray-100"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          (item.name === "Analytics" && analyticsMenuOpen) || (item.name === "Configuration" && configMenuOpen) ? "rotate-180" : ""
                        }`} />
                        {location.pathname.startsWith(item.href) && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-red rounded-full"
                          />
                        )}
                      </button>
                      <AnimatePresence>
                        {((item.name === "Analytics" && analyticsMenuOpen) || (item.name === "Configuration" && configMenuOpen)) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                          >
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.name}
                                to={subitem.href}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  location.pathname === subitem.href
                                    ? "text-sompo-red bg-sompo-red/10 font-medium"
                                    : "text-gray-700 hover:text-sompo-red hover:bg-gray-100"
                                }`}
                              >
                                {subitem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        location.pathname === item.href
                          ? "text-sompo-red bg-sompo-red/10"
                          : "text-gray-700 hover:text-sompo-red hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                      {location.pathname === item.href && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-red rounded-full"
                        />
                      )}
                    </Link>
                  )
                ))}
              </div>

              {/* User Menu */}
              <div className="relative ml-4">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.fullName || "User"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{user?.role}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User size={24} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  item.submenu ? (
                    <div key={item.name}>
                      <div className="px-4 py-3 text-base font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            to={subitem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              location.pathname === subitem.href
                                ? "text-sompo-red bg-sompo-red/10"
                                : "text-gray-700 hover:text-sompo-red hover:bg-gray-100"
                            }`}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        location.pathname === item.href
                          ? "text-sompo-red bg-sompo-red/10"
                          : "text-gray-700 hover:text-sompo-red hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                ))}

                {/* Mobile User Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-sompo-red hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
