import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Mail,
  Cloud,
  Edit,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Activity,
  Inbox,
  Filter
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ManualSubmissionModal from '../components/ManualSubmissionModal'

const Intake = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    lob: 'all',
    source: 'all',
    dateFrom: '',
    dateTo: '',
    searchQuery: ''
  })

  const lobs = [
    'Agriculture', 'Aviation', 'Casualty', 'Cyber', 'Energy', 'Environmental',
    'Errors & Omissions / Professional Indemnity', 'Financial Institutions',
    'Healthcare Liability', 'Life Sciences', 'Management Liability', 'Marine',
    'Property', 'Specialty', 'Surety'
  ]

  const stats = [
    { label: 'Today', value: 47, change: '+12%', icon: TrendingUp, color: 'blue' },
    { label: 'This Week', value: 231, change: '+8%', icon: Activity, color: 'green' },
    { label: 'Pending Review', value: 18, change: '-3%', icon: Inbox, color: 'amber' },
    { label: 'Auto-Cleared', value: 156, change: '+15%', icon: CheckCircle, color: 'emerald' },
  ]

  // All submissions
  const allSubmissions = [
    {
      id: 's018',
      insured: 'TechVault Security Systems',
      broker: 'Aon',
      lob: 'Cyber',
      gwp: 275000,
      source: 'Email',
      time: '2 min ago',
      status: 'Received',
      confidence: 94,
      flags: []
    },
    {
      id: 's019',
      insured: 'Global Shipping Lines',
      broker: 'Marsh',
      lob: 'Marine',
      gwp: 1850000,
      source: 'API',
      time: '8 min ago',
      status: 'Clearance',
      confidence: 98,
      flags: []
    },
    {
      id: 's020',
      insured: 'MediCare Clinics Group',
      broker: 'Willis Towers Watson',
      lob: 'Healthcare Liability',
      gwp: 420000,
      source: 'Email',
      time: '15 min ago',
      status: 'Appetite Check',
      confidence: 76,
      flags: ['Low Confidence', 'Missing Documents']
    },
    {
      id: 's021',
      insured: 'Alpha Manufacturing Ltd',
      broker: 'Lockton',
      lob: 'Property',
      gwp: 560000,
      source: 'Manual',
      time: '23 min ago',
      status: 'Sanctions',
      confidence: 100,
      flags: []
    },
    {
      id: 's022',
      insured: 'SkyHigh Aviation Services',
      broker: 'Gallagher',
      lob: 'Aviation',
      gwp: 2100000,
      source: 'API',
      time: '31 min ago',
      status: 'Rating',
      confidence: 91,
      flags: []
    },
    {
      id: 's023',
      insured: 'CyberDefense Pro',
      broker: 'Howden',
      lob: 'Cyber',
      gwp: 185000,
      source: 'Email',
      time: '42 min ago',
      status: 'Peer Review',
      confidence: 88,
      flags: []
    },
    {
      id: 's024',
      insured: 'Green Energy Solutions UK',
      broker: 'JLT Specialty',
      lob: 'Energy',
      gwp: 3200000,
      source: 'Email',
      time: '1 hour ago',
      status: 'Quoted',
      confidence: 96,
      flags: []
    },
    {
      id: 's025',
      insured: 'Financial Trust Partners',
      broker: 'Marsh',
      lob: 'Financial Institutions',
      gwp: 890000,
      source: 'API',
      time: '1 hour ago',
      status: 'Firm Order',
      confidence: 95,
      flags: []
    },
    {
      id: 's026',
      insured: 'Coastal Properties Ltd',
      broker: 'Aon',
      lob: 'Property',
      gwp: 1250000,
      source: 'Email',
      time: '2 hours ago',
      status: 'Bound',
      confidence: 97,
      flags: []
    },
    {
      id: 's027',
      insured: 'MedTech Innovations',
      broker: 'Willis',
      lob: 'Life Sciences',
      gwp: 680000,
      source: 'API',
      time: '3 hours ago',
      status: 'Issued',
      confidence: 99,
      flags: []
    },
    {
      id: 's028',
      insured: 'Pacific Cargo Services',
      broker: 'Marsh',
      lob: 'Marine',
      gwp: 1450000,
      source: 'Email',
      time: '4 hours ago',
      status: 'Registered',
      confidence: 98,
      flags: []
    },
    {
      id: 's029',
      insured: 'High Risk Ventures',
      broker: 'Local Broker',
      lob: 'Casualty',
      gwp: 150000,
      source: 'Manual',
      time: '5 hours ago',
      status: 'Declined',
      confidence: 72,
      flags: ['Outside Appetite']
    },
  ]

  // Filter logic
  const filteredSubmissions = allSubmissions.filter(submission => {
    // Status filter
    if (filters.status !== 'all') {
      if (submission.status !== filters.status) return false
    }

    // LoB filter
    if (filters.lob !== 'all' && submission.lob !== filters.lob) return false

    // Source filter
    if (filters.source !== 'all' && submission.source !== filters.source) return false

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = [
        submission.insured,
        submission.broker,
        submission.lob,
        submission.status,
        submission.id
      ].join(' ').toLowerCase()
      if (!searchableText.includes(query)) return false
    }

    return true
  })

  const resetFilters = () => {
    setFilters({
      status: 'all',
      lob: 'all',
      source: 'all',
      dateFrom: '',
      dateTo: '',
      searchQuery: ''
    })
  }

  const handleManualSubmission = (submission) => {
    console.log('New manual submission:', submission)
    // In a real app, this would save to backend/state
    // For now, just navigate to work queue
    navigate('/workqueue')
  }

  const currency = (n) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(n)
  }

  const getSourceIcon = (source) => {
    switch (source) {
      case 'Email': return <Mail className="w-4 h-4" />
      case 'API': return <Cloud className="w-4 h-4" />
      case 'Manual': return <Edit className="w-4 h-4" />
      default: return null
    }
  }

  const getSourceColor = (source) => {
    switch (source) {
      case 'Email': return 'bg-blue-100 text-blue-800'
      case 'API': return 'bg-green-100 text-green-800'
      case 'Manual': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'Clearance': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Appetite Check': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Sanctions': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'Rating': return 'bg-indigo-100 text-indigo-800 border-indigo-300'
      case 'Peer Review': return 'bg-teal-100 text-teal-800 border-teal-300'
      case 'Quoted': return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'Firm Order': return 'bg-green-100 text-green-800 border-green-300'
      case 'Bound': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'Issued': return 'bg-sky-100 text-sky-800 border-sky-300'
      case 'Registered': return 'bg-cyan-100 text-cyan-800 border-cyan-300'
      case 'Declined': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-700'
    if (confidence >= 75) return 'text-amber-700'
    return 'text-red-700'
  }

  const getLOBColor = (lob) => {
    switch (lob) {
      case 'Property': return 'bg-blue-600 text-white border-blue-700'
      case 'Casualty': return 'bg-orange-600 text-white border-orange-700'
      case 'Marine': return 'bg-cyan-600 text-white border-cyan-700'
      case 'Aviation': return 'bg-sky-600 text-white border-sky-700'
      case 'Energy': return 'bg-emerald-600 text-white border-emerald-700'
      case 'Cyber': return 'bg-purple-600 text-white border-purple-700'
      case 'Financial Institutions': return 'bg-indigo-600 text-white border-indigo-700'
      case 'Healthcare Liability': return 'bg-pink-600 text-white border-pink-700'
      case 'Life Sciences': return 'bg-teal-600 text-white border-teal-700'
      case 'Management Liability': return 'bg-red-600 text-white border-red-700'
      case 'Specialty': return 'bg-amber-600 text-white border-amber-700'
      case 'Surety': return 'bg-green-600 text-white border-green-700'
      case 'Agriculture': return 'bg-lime-600 text-white border-lime-700'
      case 'Environmental': return 'bg-green-700 text-white border-green-800'
      case 'Errors & Omissions / Professional Indemnity': return 'bg-violet-600 text-white border-violet-700'
      default: return 'bg-gray-600 text-white border-gray-700'
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1680px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">Intake Dashboard</h1>
                <p className="text-gray-600">Real-time submission ingestion from all sources</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red"
              >
                Add Submission
              </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className={`text-sm font-medium mt-1 ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} vs last period
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      stat.color === 'blue' ? 'bg-blue-100' :
                      stat.color === 'green' ? 'bg-green-100' :
                      stat.color === 'amber' ? 'bg-amber-100' :
                      'bg-emerald-100'
                    }`}>
                      <stat.icon className={`w-6 h-6 ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'amber' ? 'text-amber-600' :
                        'text-emerald-600'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comprehensive Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-sompo-red" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-sompo-red hover:text-sompo-dark-red"
              >
                Reset All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search by insured, broker, ID..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Received">Received</option>
                  <option value="Clearance">Clearance</option>
                  <option value="Appetite Check">Appetite Check</option>
                  <option value="Sanctions">Sanctions</option>
                  <option value="Rating">Rating</option>
                  <option value="Peer Review">Peer Review</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Firm Order">Firm Order</option>
                  <option value="Bound">Bound</option>
                  <option value="Issued">Issued</option>
                  <option value="Registered">Registered</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              {/* Line of Business */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Line of Business</label>
                <select
                  value={filters.lob}
                  onChange={(e) => setFilters({...filters, lob: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                >
                  <option value="all">All LoB</option>
                  {lobs.map((lob) => (
                    <option key={lob} value={lob}>{lob}</option>
                  ))}
                </select>
              </div>

              {/* Source */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Source</label>
                <select
                  value={filters.source}
                  onChange={(e) => setFilters({...filters, source: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                >
                  <option value="all">All Sources</option>
                  <option value="Email">Email</option>
                  <option value="API">API</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Date From</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Date To</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.status !== 'all' || filters.lob !== 'all' || filters.source !== 'all' || filters.searchQuery) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">Active filters:</span>
                  {filters.status !== 'all' && (
                    <span className="px-3 py-1 bg-sompo-red text-white rounded-full text-xs font-medium">
                      Status: {filters.status}
                    </span>
                  )}
                  {filters.lob !== 'all' && (
                    <span className="px-3 py-1 bg-sompo-red text-white rounded-full text-xs font-medium">
                      LoB: {filters.lob}
                    </span>
                  )}
                  {filters.source !== 'all' && (
                    <span className="px-3 py-1 bg-sompo-red text-white rounded-full text-xs font-medium">
                      Source: {filters.source}
                    </span>
                  )}
                  {filters.searchQuery && (
                    <span className="px-3 py-1 bg-sompo-red text-white rounded-full text-xs font-medium">
                      Search: "{filters.searchQuery}"
                    </span>
                  )}
                  <span className="text-sm text-gray-600">
                    ({filteredSubmissions.length} result{filteredSubmissions.length !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Submissions Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Recent Submissions</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredSubmissions.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-lg">No submissions match your filters</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-sompo-red text-white rounded-lg font-medium hover:bg-sompo-dark-red"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredSubmissions.map((submission, idx) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  onClick={() => navigate(`/risk/${submission.id}`)}
                  className="p-6 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{submission.insured}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${getSourceColor(submission.source)}`}>
                          {getSourceIcon(submission.source)}
                          {submission.source}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 shadow-sm ${getLOBColor(submission.lob)}`}>
                          {submission.lob}
                        </span>
                        <span>{submission.broker}</span>
                        <span>•</span>
                        <span className="font-semibold text-gray-900">{currency(submission.gwp)}</span>
                        <span>•</span>
                        <span className="text-gray-500">{submission.time}</span>
                      </div>

                      {submission.flags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {submission.flags.map((flag, flagIdx) => (
                            <span key={flagIdx} className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {flag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-600 mb-1">Extraction Confidence</div>
                      <div className={`text-2xl font-bold ${getConfidenceColor(submission.confidence)}`}>
                        {submission.confidence}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
              )}
            </div>

            {/* Load More */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-center">
              <button className="text-sm font-medium text-sompo-red hover:text-sompo-dark-red">
                Load More Submissions
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Manual Submission Modal */}
      <ManualSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleManualSubmission}
      />
    </PageTransition>
  )
}

export default Intake
