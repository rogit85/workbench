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
  ExternalLink
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ManualSubmissionModal from '../components/ManualSubmissionModal'
import { getWorkflowStatusPillClass } from '../data/workflowConfig'
import { getNewRenewalBadgeClasses, getNewRenewalLabel, NEW_RENEWAL_OPTIONS } from '../utils/newRenewal'

const Intake = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [typeFilter, setTypeFilter] = useState('All')

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
      status: 'Pending Checks',
      confidence: 94,
      flags: [],
      newRenewal: 'New Business'
    },
    {
      id: 's019',
      insured: 'Global Shipping Lines',
      broker: 'Marsh',
      lob: 'Marine',
      gwp: 1850000,
      source: 'API',
      time: '8 min ago',
      status: 'Checks In Progress',
      confidence: 98,
      flags: [],
      newRenewal: 'Renewal'
    },
    {
      id: 's020',
      insured: 'MediCare Clinics Group',
      broker: 'Willis Towers Watson',
      lob: 'Healthcare Liability',
      gwp: 420000,
      source: 'Email',
      time: '15 min ago',
      status: 'Manual Review',
      confidence: 76,
      flags: ['Low Confidence', 'Missing Documents'],
      newRenewal: 'New Business'
    },
    {
      id: 's021',
      insured: 'Alpha Manufacturing Ltd',
      broker: 'Lockton',
      lob: 'Property',
      gwp: 560000,
      source: 'Manual',
      time: '23 min ago',
      status: 'Sanctions Triggered',
      confidence: 100,
      flags: [],
      newRenewal: 'Renewal'
    },
    {
      id: 's022',
      insured: 'SkyHigh Aviation Services',
      broker: 'Gallagher',
      lob: 'Aviation',
      gwp: 2100000,
      source: 'API',
      time: '31 min ago',
      status: 'Pending Risk Assessment',
      confidence: 91,
      flags: [],
      newRenewal: 'New Business'
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
      flags: [],
      newRenewal: 'New Business'
    },
    {
      id: 's024',
      insured: 'Green Energy Solutions UK',
      broker: 'JLT Specialty',
      lob: 'Energy',
      gwp: 3200000,
      source: 'Email',
      time: '1 hour ago',
      status: 'Pending Manual Clearance',
      confidence: 96,
      flags: [],
      newRenewal: 'Renewal'
    },
    {
      id: 's025',
      insured: 'Financial Trust Partners',
      broker: 'Marsh',
      lob: 'Financial Institutions',
      gwp: 890000,
      source: 'API',
      time: '1 hour ago',
      status: 'Clearance Completed',
      confidence: 95,
      flags: [],
      newRenewal: 'Renewal'
    },
    {
      id: 's026',
      insured: 'Coastal Properties Ltd',
      broker: 'Aon',
      lob: 'Property',
      gwp: 1250000,
      source: 'Email',
      time: '2 hours ago',
      status: 'Risk Assessment Completed',
      confidence: 97,
      flags: [],
      newRenewal: 'Renewal'
    },
    {
      id: 's027',
      insured: 'MedTech Innovations',
      broker: 'Willis',
      lob: 'Life Sciences',
      gwp: 680000,
      source: 'API',
      time: '3 hours ago',
      status: 'Risk Assessment Completed',
      confidence: 99,
      flags: [],
      newRenewal: 'New Business'
    },
    {
      id: 's028',
      insured: 'Pacific Cargo Services',
      broker: 'Marsh',
      lob: 'Marine',
      gwp: 1450000,
      source: 'Email',
      time: '4 hours ago',
      status: 'Sent to Guidewire',
      confidence: 98,
      flags: [],
      newRenewal: 'Renewal'
    },
    {
      id: 's029',
      insured: 'High Risk Ventures',
      broker: 'Local Broker',
      lob: 'Casualty',
      gwp: 150000,
      source: 'Manual',
      time: '5 hours ago',
      status: 'Manual Declined',
      confidence: 72,
      flags: ['Outside Appetite'],
      newRenewal: 'New Business'
    },
  ]


  const filteredSubmissions = allSubmissions.filter(submission =>
    typeFilter === 'All' || getNewRenewalLabel(submission.newRenewal) === typeFilter
  )

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

  const getStatusColor = (status) => getWorkflowStatusPillClass(status)

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
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Type Filter</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sompo-red"
                  >
                    <option value="All">All</option>
                    {NEW_RENEWAL_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
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
            </div>
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
                  <p className="text-gray-500 text-lg">No submissions found</p>
                </div>
              ) : (
                filteredSubmissions.map((submission, idx) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  className="p-6 transition-colors relative"
                >
                  <a
                    href={`/risk/${submission.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/risk/${submission.id}`)
                    }}
                    className="absolute top-4 right-4 text-sompo-red hover:text-sompo-dark-red z-10"
                    title="Open risk detail (right-click to open in new tab)"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <div className="flex items-start justify-between pr-8">
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
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getNewRenewalBadgeClasses(submission.newRenewal)}`}>
                          {getNewRenewalLabel(submission.newRenewal)}
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
