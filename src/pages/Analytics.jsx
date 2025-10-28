import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Target,
  Award,
  Activity
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const Analytics = () => {
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)

  const lobs = [
    'Agriculture', 'Aviation', 'Casualty', 'Cyber', 'Energy', 'Environmental',
    'Errors & Omissions / Professional Indemnity', 'Financial Institutions',
    'Healthcare Liability', 'Life Sciences', 'Management Liability', 'Marine',
    'Property', 'Specialty', 'Surety'
  ]

  const [filters, setFilters] = useState({
    status: 'all',
    lob: 'all',
    source: 'all',
    newRenewal: 'all',
    dateFrom: '',
    dateTo: '',
    searchQuery: ''
  })

  // Ordered statuses matching workflow
  const orderedStatuses = [
    'Received', 'Clearance', 'Appetite Check', 'Sanctions', 'Rating',
    'Peer Review', 'Quoted', 'Firm Order', 'Bound', 'Issued', 'Registered', 'Declined'
  ]

  // Expanded color palette for charts
  const statusColors = {
    'Received': '#6B7280',
    'Clearance': '#3B82F6',
    'Appetite Check': '#8B5CF6',
    'Sanctions': '#F97316',
    'Rating': '#6366F1',
    'Peer Review': '#14B8A6',
    'Quoted': '#F59E0B',
    'Firm Order': '#10B981',
    'Bound': '#059669',
    'Issued': '#0EA5E9',
    'Registered': '#06B6D4',
    'Declined': '#EF4444'
  }

  const lobColors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
    '#06B6D4', '#F43F5E', '#0EA5E9', '#A855F7', '#22C55E'
  ]

  // Mock data for analytics
  const allData = [
    { id: '1', insured: 'Atlas Foods Group', broker: 'Howden', lob: 'Property', gwp: 190000, status: 'Bound', newRenewal: 'Renewal', source: 'Email', date: '2024-10-15', submissionRef: 'SOM-2024-001', limit: 5000000 },
    { id: '2', insured: 'Orion AeroSystems', broker: 'Crestline Broking', lob: 'Aviation', gwp: 980000, status: 'Quoted', newRenewal: 'New', source: 'Email', date: '2024-10-16', submissionRef: 'SOM-2024-002', limit: 25000000 },
    { id: '3', insured: 'Hyperion Biotech', broker: 'Apex Risk Partners', lob: 'Life Sciences', gwp: 460000, status: 'Rating', newRenewal: 'New', source: 'Marsh Broker Platform', date: '2024-10-18', submissionRef: 'SOM-2024-003', limit: 10000000 },
    { id: '4', insured: 'Neptune Offshore Wind', broker: 'Westshore Willis', lob: 'Energy', gwp: 1875000, status: 'Bound', newRenewal: 'Renewal', source: 'Email', date: '2024-10-20', submissionRef: 'SOM-2024-004', limit: 50000000 },
    { id: '5', insured: 'Lumenova Data Centers', broker: 'Cairnstone', lob: 'Property', gwp: 1320000, status: 'Issued', newRenewal: 'Renewal', source: 'Marsh Broker Platform', date: '2024-10-21', submissionRef: 'SOM-2024-005', limit: 35000000 },
    { id: '6', insured: 'Phoenix Rail & Freight', broker: 'Gullwing Re', lob: 'Casualty', gwp: 720000, status: 'Quoted', newRenewal: 'New', source: 'Manual', date: '2024-10-22', submissionRef: 'SOM-2024-006', limit: 15000000 },
    { id: '7', insured: 'Vivid Motors EV', broker: 'Aon Global', lob: 'Specialty', gwp: 540000, status: 'Appetite Check', newRenewal: 'New', source: 'Email', date: '2024-10-22', submissionRef: 'SOM-2024-007', limit: 12000000 },
    { id: '8', insured: 'Evergreen Supermarkets', broker: 'Lockton City', lob: 'Property', gwp: 310000, status: 'Clearance', newRenewal: 'Renewal', source: 'Email', date: '2024-10-23', submissionRef: 'SOM-2024-008', limit: 8000000 },
    { id: '9', insured: 'Silverline Hospitality', broker: 'Marsh Europe', lob: 'Property', gwp: 880000, status: 'Firm Order', newRenewal: 'New', source: 'Marsh Broker Platform', date: '2024-10-23', submissionRef: 'SOM-2024-009', limit: 20000000 },
    { id: '10', insured: 'NorthSea Energy', broker: 'Aon Offshore', lob: 'Energy', gwp: 1750000, status: 'Registered', newRenewal: 'Renewal', source: 'Email', date: '2024-10-23', submissionRef: 'SOM-2024-010', limit: 45000000 },
    { id: '11', insured: 'TechCore Solutions', broker: 'Willis Towers', lob: 'Cyber', gwp: 650000, status: 'Peer Review', newRenewal: 'New', source: 'Marsh Broker Platform', date: '2024-10-19', submissionRef: 'SOM-2024-011', limit: 18000000 },
    { id: '12', insured: 'GreenField Agriculture', broker: 'JLT Specialty', lob: 'Agriculture', gwp: 420000, status: 'Bound', newRenewal: 'Renewal', source: 'Email', date: '2024-10-17', submissionRef: 'SOM-2024-012', limit: 9000000 },
    { id: '13', insured: 'MedCare Hospitals', broker: 'Gallagher', lob: 'Healthcare Liability', gwp: 890000, status: 'Issued', newRenewal: 'Renewal', source: 'Manual', date: '2024-10-14', submissionRef: 'SOM-2024-013', limit: 22000000 },
    { id: '14', insured: 'Aqua Marine Logistics', broker: 'Marsh JLT', lob: 'Marine', gwp: 1100000, status: 'Sanctions', newRenewal: 'New', source: 'Email', date: '2024-10-21', submissionRef: 'SOM-2024-014', limit: 28000000 },
    { id: '15', insured: 'Summit Financial Group', broker: 'Arthur J Gallagher', lob: 'Financial Institutions', gwp: 775000, status: 'Declined', newRenewal: 'New', source: 'Marsh Broker Platform', date: '2024-10-20', submissionRef: 'SOM-2024-015', limit: 16000000 },
  ]

  // Filter data
  const filteredData = useMemo(() => {
    return allData.filter(record => {
      if (filters.status !== 'all' && record.status !== filters.status) return false
      if (filters.lob !== 'all' && record.lob !== filters.lob) return false
      if (filters.source !== 'all' && record.source !== filters.source) return false
      if (filters.newRenewal !== 'all' && record.newRenewal !== filters.newRenewal) return false

      if (filters.dateFrom && record.date < filters.dateFrom) return false
      if (filters.dateTo && record.date > filters.dateTo) return false

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const searchableText = [record.insured, record.broker, record.lob, record.status, record.submissionRef].join(' ').toLowerCase()
        if (!searchableText.includes(query)) return false
      }

      return true
    })
  }, [filters])

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalGWP = filteredData.reduce((sum, r) => sum + r.gwp, 0)
    const totalLimit = filteredData.reduce((sum, r) => sum + r.limit, 0)
    const boundCount = filteredData.filter(r => ['Bound', 'Issued', 'Registered'].includes(r.status)).length
    const quotedCount = filteredData.filter(r => r.status === 'Quoted').length
    const declinedCount = filteredData.filter(r => r.status === 'Declined').length
    const inProgressCount = filteredData.filter(r => !['Bound', 'Issued', 'Registered', 'Quoted', 'Declined'].includes(r.status)).length

    const hitRate = filteredData.length > 0 ? ((boundCount / filteredData.length) * 100).toFixed(1) : 0
    const quoteToBindRate = quotedCount > 0 ? ((boundCount / quotedCount) * 100).toFixed(1) : 0
    const avgGWP = filteredData.length > 0 ? (totalGWP / filteredData.length) : 0
    const newBusiness = filteredData.filter(r => r.newRenewal === 'New').reduce((sum, r) => sum + r.gwp, 0)
    const renewals = filteredData.filter(r => r.newRenewal === 'Renewal').reduce((sum, r) => sum + r.gwp, 0)
    const newCount = filteredData.filter(r => r.newRenewal === 'New').length
    const renewalCount = filteredData.filter(r => r.newRenewal === 'Renewal').length

    return {
      totalGWP,
      totalLimit,
      boundCount,
      quotedCount,
      declinedCount,
      inProgressCount,
      hitRate,
      quoteToBindRate,
      avgGWP,
      newBusiness,
      renewals,
      newCount,
      renewalCount,
      totalSubmissions: filteredData.length
    }
  }, [filteredData])

  // Calculate charts data with proper ordering
  const chartData = useMemo(() => {
    // By Status - ordered
    const byStatus = {}
    orderedStatuses.forEach(status => {
      const statusRecords = filteredData.filter(r => r.status === status)
      if (statusRecords.length > 0) {
        byStatus[status] = statusRecords.reduce((sum, r) => sum + r.gwp, 0)
      }
    })

    // By LoB
    const byLob = {}
    filteredData.forEach(r => {
      byLob[r.lob] = (byLob[r.lob] || 0) + r.gwp
    })

    // By Source
    const bySource = {}
    filteredData.forEach(r => {
      bySource[r.source] = (bySource[r.source] || 0) + 1
    })

    // Count by status
    const countByStatus = {}
    orderedStatuses.forEach(status => {
      const count = filteredData.filter(r => r.status === status).length
      if (count > 0) {
        countByStatus[status] = count
      }
    })

    // Hit rate by LoB
    const hitRateByLob = {}
    lobs.forEach(lob => {
      const lobRecords = filteredData.filter(r => r.lob === lob)
      if (lobRecords.length > 0) {
        const lobBound = lobRecords.filter(r => ['Bound', 'Issued', 'Registered'].includes(r.status)).length
        hitRateByLob[lob] = ((lobBound / lobRecords.length) * 100).toFixed(1)
      }
    })

    return { byStatus, byLob, bySource, countByStatus, hitRateByLob }
  }, [filteredData])

  const currency = (n) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(n)
  }

  const resetFilters = () => {
    setFilters({
      status: 'all',
      lob: 'all',
      source: 'all',
      newRenewal: 'all',
      dateFrom: '',
      dateTo: '',
      searchQuery: ''
    })
  }

  const exportToCSV = () => {
    const headers = ['Submission Ref', 'Date', 'Insured', 'Broker', 'LoB', 'Status', 'New/Renewal', 'Source', 'GWP', 'Limit']
    const rows = filteredData.map(r => [
      r.submissionRef,
      r.date,
      r.insured,
      r.broker,
      r.lob,
      r.status,
      r.newRenewal,
      r.source,
      r.gwp,
      r.limit
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const BarChart = ({ data, title, showCurrency = true, colors = null, showVerticalAxis = true }) => {
    const [hoveredBar, setHoveredBar] = useState(null)
    const entries = Object.entries(data)
    const maxValue = Math.max(...entries.map(([, v]) => v), 1)
    const maxHeight = 180
    const labelHeight = 40 // Fixed height for labels to prevent layout shift

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-6">{title}</h3>
        <div className="flex gap-4">
          {/* Vertical Axis */}
          {showVerticalAxis && (
            <div className="flex flex-col justify-between text-xs text-gray-500" style={{ height: `${maxHeight}px` }}>
              <span>{showCurrency ? currency(maxValue) : maxValue}</span>
              <span>{showCurrency ? currency(maxValue * 0.75) : Math.round(maxValue * 0.75)}</span>
              <span>{showCurrency ? currency(maxValue * 0.5) : Math.round(maxValue * 0.5)}</span>
              <span>{showCurrency ? currency(maxValue * 0.25) : Math.round(maxValue * 0.25)}</span>
              <span>0</span>
            </div>
          )}

          {/* Bars */}
          <div className="flex-1 flex items-end justify-around gap-2" style={{ height: `${maxHeight + labelHeight}px` }}>
            {entries.map(([label, value], idx) => {
              const barHeight = Math.max((value / maxValue) * maxHeight, 4)
              const isHovered = hoveredBar === idx
              const barColor = colors ? colors[label] || colors[idx % Object.keys(colors).length] : statusColors[label] || lobColors[idx % lobColors.length]

              // Shorten label to prevent wrapping
              let displayLabel = label
              if (label.length > 12) {
                displayLabel = label.substring(0, 11) + '...'
              }

              return (
                <div
                  key={label}
                  className="flex flex-col items-center justify-end flex-1 h-full relative"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{ minWidth: '40px' }}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-lg z-10 whitespace-nowrap"
                      >
                        <div className="text-center">
                          <div className="font-bold mb-1">{label}</div>
                          <div>{showCurrency ? currency(value) : `${value} submissions`}</div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: barHeight, scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full rounded-t-lg cursor-pointer transition-all shadow-sm"
                    style={{
                      backgroundColor: barColor,
                      opacity: isHovered ? 1 : 0.9
                    }}
                  />
                  <div
                    className={`text-xs mt-2 text-center transition-colors flex items-center justify-center ${isHovered ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}
                    style={{ height: `${labelHeight}px`, width: '100%' }}
                  >
                    <span className="break-words leading-tight">{displayLabel}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    )
  }

  // Pie Chart Component
  const PieChart = ({ data, title, showCurrency = false, colors = null }) => {
    const [hoveredSlice, setHoveredSlice] = useState(null)
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
    const entries = Object.entries(data)
    const total = entries.reduce((sum, [, value]) => sum + value, 0)

    // Calculate angles for each slice
    let currentAngle = -90 // Start from top
    const slices = entries.map(([label, value], idx) => {
      const percentage = (value / total) * 100
      const angle = (value / total) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle = endAngle

      const barColor = colors ? colors[label] || colors[idx % Object.keys(colors).length] : statusColors[label] || lobColors[idx % lobColors.length]

      return {
        label,
        value,
        percentage,
        startAngle,
        endAngle,
        color: barColor
      }
    })

    const radius = 160
    const center = 180

    // Function to calculate SVG path for pie slice
    const getSlicePath = (startAngle, endAngle) => {
      const start = polarToCartesian(center, center, radius, endAngle)
      const end = polarToCartesian(center, center, radius, startAngle)
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
      return `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
    }

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees * Math.PI) / 180.0
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>

        <div className="flex items-start justify-between gap-6">
          {/* Pie Chart SVG - Left Side */}
          <div className="flex-shrink-0 relative">
            <svg
              width={center * 2}
              height={center * 2}
              className="transform transition-transform"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
              }}
            >
              {slices.map((slice, idx) => (
                <motion.path
                  key={slice.label}
                  d={getSlicePath(slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: hoveredSlice === idx ? 1 : 0.9,
                    scale: hoveredSlice === idx ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredSlice(idx)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="cursor-pointer"
                  style={{ transformOrigin: `${center}px ${center}px` }}
                />
              ))}
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredSlice !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute pointer-events-none z-10 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm"
                  style={{
                    left: tooltipPos.x + 10,
                    top: tooltipPos.y - 10,
                  }}
                >
                  <div className="font-semibold">{slices[hoveredSlice].label}</div>
                  <div className="text-xs mt-1">
                    {showCurrency ? currency(slices[hoveredSlice].value) : `${slices[hoveredSlice].value} submissions`}
                  </div>
                  <div className="text-xs text-gray-300">
                    {slices[hoveredSlice].percentage.toFixed(1)}%
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend - Right Side */}
          <div className="flex-1 space-y-0.5">
            {slices.map((slice, idx) => {
              const isHovered = hoveredSlice === idx
              return (
                <div
                  key={slice.label}
                  className={`flex items-center gap-2 cursor-pointer transition-all ${isHovered ? 'transform scale-105' : ''}`}
                  onMouseEnter={() => setHoveredSlice(idx)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div
                    className="w-3 h-3 rounded flex-shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs leading-tight truncate ${isHovered ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {slice.label}
                    </div>
                    <div className="text-xs text-gray-500 leading-tight">
                      {showCurrency ? currency(slice.value) : `${slice.value} submissions`} ({slice.percentage.toFixed(1)}%)
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    )
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
                <h1 className="text-3xl font-bold gradient-text mb-2">Analytics & Reporting</h1>
                <p className="text-gray-600">Comprehensive business intelligence and performance metrics</p>
              </div>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            {/* Comprehensive Filters */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-sompo-red transition-colors"
                >
                  <Filter className="w-5 h-5 text-sompo-red" />
                  Filters
                  <span className="text-sm font-normal text-gray-500">
                    {showFilters ? '(Click to collapse)' : '(Click to expand)'}
                  </span>
                </button>
                {showFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-sm font-medium text-sompo-red hover:text-sompo-dark-red"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {showFilters && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search by insured, broker, ref..."
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
                    {orderedStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* LoB */}
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
                    <option value="Marsh Broker Platform">Marsh Broker Platform</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                {/* New/Renewal */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">New/Renewal</label>
                  <select
                    value={filters.newRenewal}
                    onChange={(e) => setFilters({...filters, newRenewal: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="New">New Business</option>
                    <option value="Renewal">Renewal</option>
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
              </div>
              )}
            </div>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total GWP</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{currency(kpis.totalGWP)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-600">+12%</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Avg: <span className="font-semibold text-gray-900">{currency(kpis.avgGWP)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Submissions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{kpis.totalSubmissions}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium text-blue-600">+8% vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Processing Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">4.2 days</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-amber-600 mr-1" />
                    <span className="text-sm font-medium text-amber-600">-12% vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Pipeline</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{kpis.totalSubmissions - kpis.boundCount - kpis.declinedCount}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600 mr-1" />
                    <span className="text-sm font-medium text-indigo-600">+15% vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Conversion Rate KPIs - 8 Total */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Quote Rate */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Quote Rate</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  {Math.round((kpis.quotedCount / (kpis.quotedCount + kpis.declinedCount)) * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {kpis.quotedCount} / {kpis.quotedCount + kpis.declinedCount}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  style={{ width: `${Math.min((kpis.quotedCount / (kpis.quotedCount + kpis.declinedCount)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Quoted vs Total Decisions</p>
            </div>

            {/* Bind Rate */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Bind Rate</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  {Math.round((kpis.boundCount / kpis.quotedCount) * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {kpis.boundCount} / {kpis.quotedCount}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                  style={{ width: `${Math.min((kpis.boundCount / kpis.quotedCount) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Bound vs Quoted</p>
            </div>

            {/* Decline Rate */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Decline Rate</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  {Math.round((kpis.declinedCount / (kpis.quotedCount + kpis.declinedCount)) * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {kpis.declinedCount} / {kpis.quotedCount + kpis.declinedCount}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                  style={{ width: `${Math.min((kpis.declinedCount / (kpis.quotedCount + kpis.declinedCount)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Declined vs Total Decisions</p>
            </div>

            {/* Clearance Rate */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Clearance Rate</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  92%
                </div>
                <div className="text-xs text-gray-500">
                  31 / 34
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: '92%' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Passed Clearance Checks</p>
            </div>

            {/* New Business Rate */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">New Business %</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  {Math.round((kpis.newCount / kpis.totalSubmissions) * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {kpis.newCount} / {kpis.totalSubmissions}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${Math.min((kpis.newCount / kpis.totalSubmissions) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">New vs Total Submissions</p>
            </div>

            {/* Renewal Retention */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Renewal Rate</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  {Math.round((kpis.renewalCount / kpis.totalSubmissions) * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  {kpis.renewalCount} / {kpis.totalSubmissions}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                  style={{ width: `${Math.min((kpis.renewalCount / kpis.totalSubmissions) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Renewals vs Total Submissions</p>
            </div>

            {/* Average Quote Size */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Quote GWP</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  {currency(Math.round(kpis.totalGWP / kpis.quotedCount))}
                </div>
                <div className="text-xs text-gray-500">
                  per quote
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Average Premium Per Quote</p>
            </div>

            {/* Pipeline Conversion */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Pipeline Velocity</h3>
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-bold text-gray-900">
                  73%
                </div>
                <div className="text-xs text-gray-500">
                  submissions
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full"
                  style={{ width: '73%' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Active to Completed Ratio</p>
            </div>
          </div>

          {/* Pie Charts Row - New vs Renewal and Submissions by Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-start">
            <PieChart
              data={{ 'New Business': kpis.newCount, 'Renewals': kpis.renewalCount }}
              title="New vs Renewal Business"
              showCurrency={false}
              colors={{ 'New Business': '#3b82f6', 'Renewals': '#10b981' }}
            />

            <PieChart
              data={chartData.countByStatus}
              title="Submissions by Status"
              showCurrency={false}
              colors={statusColors}
            />
          </div>

          {/* Line of Business Chart */}
          <div className="mb-6">
            <BarChart
              data={Object.fromEntries(
                Object.entries(chartData.byLob)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
              )}
              title="Submissions by Line of Business"
              colors={Object.fromEntries(lobs.map((lob, idx) => [lob, lobColors[idx]]))}
            />
          </div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Submission Details ({filteredData.length} records)
              </h3>
              <button
                onClick={exportToCSV}
                className="text-sm font-medium text-sompo-red hover:text-sompo-dark-red flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Table
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insured</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LoB</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">GWP</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Limit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/risk/${record.id}`)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-sompo-red">
                        {record.submissionRef}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {record.insured}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {record.broker}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {record.lob}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white"
                          style={{ backgroundColor: statusColors[record.status] }}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.newRenewal === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {record.newRenewal}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.source === 'Email' ? 'bg-purple-100 text-purple-800' :
                          record.source === 'Marsh Broker Platform' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                        {currency(record.gwp)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">
                        {currency(record.limit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Analytics
