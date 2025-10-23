import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Printer,
  Zap,
  GitBranch,
  BookOpen,
  Clock,
  FileText,
  DollarSign,
  Building,
  Calendar,
  MapPin,
  Shield
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const RiskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Generate dynamic risk data based on ID
  const riskData = useMemo(() => {
    const baseData = {
      'a0': {
        insured: 'Atlas Foods Group',
        broker: 'Howden',
        lob: 'Property',
        product: 'Food & Bev Package',
        biz: 'Renewal',
        eff: '2025-10-01',
        exp: '2026-10-01',
        premium: 190000,
        stage: 'Cleared',
        priority: 'Medium',
        channel: 'Broker',
        limits: '$5,000,000',
        deductible: '$50,000',
        occupancy: 'Food Processing & Distribution',
        tiv: '$45,000,000',
        address: '123 Industrial Park Dr, Manchester, UK'
      },
      'a1': {
        insured: 'Orion AeroSystems',
        broker: 'Crestline Broking',
        lob: 'Property',
        product: 'Aviation PAR',
        biz: 'New',
        eff: '2025-11-01',
        exp: '2026-11-01',
        premium: 980000,
        stage: 'Quoted',
        priority: 'High',
        channel: 'Broker',
        limits: '$25,000,000',
        deductible: '$250,000',
        occupancy: 'Aircraft Maintenance & Repair',
        tiv: '$120,000,000',
        address: 'Heathrow Cargo Centre, London, UK'
      },
      'a2': {
        insured: 'Hyperion Biotech',
        broker: 'Apex Risk Partners',
        lob: 'Specialty',
        product: 'Life Science Liability',
        biz: 'New',
        eff: '2025-12-12',
        exp: '2026-12-12',
        premium: 460000,
        stage: 'Submissions',
        priority: 'Medium',
        channel: 'Direct',
        limits: '$10,000,000',
        deductible: '$100,000',
        occupancy: 'Biotechnology Research & Development',
        tiv: '$75,000,000',
        address: 'Cambridge Science Park, Cambridge, UK'
      },
      'a3': {
        insured: 'Neptune Offshore Wind',
        broker: 'Westshore Willis',
        lob: 'Marine',
        product: 'Offshore Construction',
        biz: 'Renewal',
        eff: '2025-12-31',
        exp: '2026-12-31',
        premium: 1875000,
        stage: 'Bound',
        priority: 'High',
        channel: 'Broker',
        limits: '$100,000,000',
        deductible: '$1,000,000',
        occupancy: 'Wind Farm Construction & Operations',
        tiv: '$850,000,000',
        address: 'Port of Aberdeen, Aberdeen, UK'
      },
      'a4': {
        insured: 'Lumenova Data Centers',
        broker: 'Cairnstone',
        lob: 'Property',
        product: 'NatCat Excess',
        biz: 'Renewal',
        eff: '2025-10-30',
        exp: '2026-10-30',
        premium: 1320000,
        stage: 'Bound',
        priority: 'High',
        channel: 'Direct',
        limits: '$50,000,000',
        deductible: '$500,000',
        occupancy: 'Data Center Operations',
        tiv: '$250,000,000',
        address: 'London Docklands, London, UK'
      },
      'a5': {
        insured: 'Phoenix Rail & Freight',
        broker: 'Gullwing Re',
        lob: 'Casualty',
        product: 'Excess Liability',
        biz: 'New',
        eff: '2025-11-05',
        exp: '2026-11-05',
        premium: 720000,
        stage: 'Quoted',
        priority: 'Medium',
        channel: 'MGA',
        limits: '$15,000,000',
        deductible: '$200,000',
        occupancy: 'Rail Transport & Logistics',
        tiv: '$180,000,000',
        address: 'Birmingham Rail Hub, Birmingham, UK'
      },
      'a6': {
        insured: 'Vivid Motors EV',
        broker: 'Aon Global',
        lob: 'Specialty',
        product: 'Tech E&O',
        biz: 'New',
        eff: '2025-11-20',
        exp: '2026-11-20',
        premium: 540000,
        stage: 'Submissions',
        priority: 'High',
        channel: 'Broker',
        limits: '$8,000,000',
        deductible: '$150,000',
        occupancy: 'Electric Vehicle Manufacturing',
        tiv: '$95,000,000',
        address: 'Milton Keynes Industrial Estate, Milton Keynes, UK'
      },
      'a7': {
        insured: 'Evergreen Supermarkets',
        broker: 'Lockton City',
        lob: 'Property',
        product: 'Retail Package',
        biz: 'Renewal',
        eff: '2025-12-01',
        exp: '2026-12-01',
        premium: 310000,
        stage: 'Submissions',
        priority: 'Medium',
        channel: 'Direct',
        limits: '$4,000,000',
        deductible: '$25,000',
        occupancy: 'Retail - Supermarket Chain',
        tiv: '$62,000,000',
        address: 'Multiple Locations, UK Wide'
      },
      'a8': {
        insured: 'Silverline Hospitality',
        broker: 'Marsh Europe',
        lob: 'Property',
        product: 'Hotels PAR',
        biz: 'New',
        eff: '2025-10-12',
        exp: '2026-10-12',
        premium: 880000,
        stage: 'Quoted',
        priority: 'High',
        channel: 'Broker',
        limits: '$20,000,000',
        deductible: '$300,000',
        occupancy: 'Luxury Hotel Group',
        tiv: '$165,000,000',
        address: 'Central London & Edinburgh'
      },
      'a9': {
        insured: 'NorthSea Energy',
        broker: 'Aon Offshore',
        lob: 'Marine',
        product: 'Offshore Construction',
        biz: 'Renewal',
        eff: '2025-12-31',
        exp: '2026-12-31',
        premium: 1750000,
        stage: 'Bound',
        priority: 'High',
        channel: 'Broker',
        limits: '$90,000,000',
        deductible: '$900,000',
        occupancy: 'Oil & Gas Platform Operations',
        tiv: '$720,000,000',
        address: 'North Sea Platform, UK Waters'
      }
    }

    return baseData[id] || baseData['a0']
  }, [id])

  // Generate activity timeline
  const timeline = useMemo(() => {
    const events = [
      {
        time: '2 hours ago',
        type: 'stage',
        title: `Risk ${riskData.stage}`,
        description: `Submission has been moved to ${riskData.stage} stage`,
        color: 'green'
      },
      {
        time: '5 hours ago',
        type: 'note',
        title: 'Underwriter Note Added',
        description: 'Risk assessment completed. All documentation reviewed and approved.',
        color: 'blue'
      },
      {
        time: '1 day ago',
        type: 'document',
        title: 'Documents Uploaded',
        description: 'Property schedule and loss history documents received',
        color: 'purple'
      },
      {
        time: '2 days ago',
        type: 'submission',
        title: 'Submission Created',
        description: `New ${riskData.biz} business submission for ${riskData.insured}`,
        color: 'amber'
      }
    ]
    return events
  }, [riskData])

  const currency = (n) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(n)
  }

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Bound': return 'bg-green-100 text-green-800 border-green-300'
      case 'Quoted': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Submissions': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Cleared': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300'
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Zap className="w-4 h-4" />
                Risk Actions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50"
              >
                <GitBranch className="w-4 h-4" />
                Workflow
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50"
              >
                <BookOpen className="w-4 h-4" />
                Notes
              </motion.button>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <Printer className="w-4 h-4" />
                Print
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/analytics')}
                className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Analytics
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Timeline Sidebar */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-24"
              >
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Activity Timeline</h3>
                  <Clock className="w-4 h-4 text-gray-500" />
                </div>
                <div className="p-4">
                  <div className="relative space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-red-700 before:to-red-600">
                    {timeline.map((event, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8"
                      >
                        <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-md ${
                          event.color === 'green' ? 'bg-green-500' :
                          event.color === 'blue' ? 'bg-blue-500' :
                          event.color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <div className="text-xs text-gray-500 mb-1">{event.time}</div>
                        <div className="font-semibold text-sm text-gray-900">{event.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{event.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Overview Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-700 to-red-600 rounded-lg shadow-lg text-white overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{riskData.insured}</h1>
                      <p className="text-red-100 text-lg">{riskData.product}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getStageColor(riskData.stage)}`}>
                        {riskData.stage}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getPriorityColor(riskData.priority)}`}>
                        {riskData.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Risk Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Broker Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Building className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Broker Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Broker</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.broker}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Channel</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.channel}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Business Type</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.biz}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Coverage Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Coverage Details</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Line of Business</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.lob}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Product</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.product}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Policy Limits</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.limits}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Financial Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Estimated Premium</div>
                      <div className="text-lg font-bold text-green-700">{currency(riskData.premium)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Deductible</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.deductible}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Total Insured Value</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.tiv}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Policy Dates */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Policy Dates</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Inception Date</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.eff}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Expiry Date</div>
                      <div className="text-sm font-semibold text-gray-900">{riskData.exp}</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Risk Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Risk Location & Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Address</div>
                    <div className="text-sm font-semibold text-gray-900">{riskData.address}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Occupancy</div>
                    <div className="text-sm font-semibold text-gray-900">{riskData.occupancy}</div>
                  </div>
                </div>
              </motion.div>

              {/* Documents Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                </div>
                <div className="space-y-3">
                  {['Submission Form', 'Property Schedule', 'Loss History', 'Insurance Proposal'].map((doc, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5, backgroundColor: '#F9FAFB' }}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{doc}</div>
                          <div className="text-xs text-gray-500">Uploaded {idx + 1} day(s) ago</div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-600 hover:text-red-700"
                      >
                        View
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default RiskDetail
