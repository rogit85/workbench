import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Award,
  Filter,
  Download,
  BarChart3,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const UnderwriterPerformance = () => {
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    lob: 'all',
    team: 'all',
    underwriter: 'all'
  })

  const lobs = [
    'Property', 'Casualty', 'Marine', 'Aviation', 'Energy', 'Cyber',
    'Financial Institutions', 'Healthcare Liability', 'Life Sciences'
  ]

  const teams = ['Property', 'Casualty', 'Specialty', 'Marine & Energy']

  // Mock data for underwriter performance
  const underwriterData = [
    {
      id: 1,
      name: 'Jeremy Isaacs',
      team: 'Property',
      totalSubmissions: 45,
      activeSubmissions: 12,
      quoted: 28,
      bound: 18,
      declined: 7,
      avgLeadTime: 4.2,
      avgRemediationTime: 2.1,
      submissionToQuoteRatio: 62,
      quoteToBindRatio: 64,
      gwpWritten: 8500000,
      lobBreakdown: {
        'Property': { submissions: 45, quoted: 28, bound: 18, gwp: 8500000 }
      }
    },
    {
      id: 2,
      name: 'Sarah Chen',
      team: 'Specialty',
      totalSubmissions: 38,
      activeSubmissions: 9,
      quoted: 25,
      bound: 16,
      declined: 4,
      avgLeadTime: 3.8,
      avgRemediationTime: 1.9,
      submissionToQuoteRatio: 66,
      quoteToBindRatio: 64,
      gwpWritten: 6200000,
      lobBreakdown: {
        'Cyber': { submissions: 22, quoted: 15, bound: 10, gwp: 3500000 },
        'Life Sciences': { submissions: 16, quoted: 10, bound: 6, gwp: 2700000 }
      }
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      team: 'Marine & Energy',
      totalSubmissions: 52,
      activeSubmissions: 15,
      quoted: 32,
      bound: 22,
      declined: 8,
      avgLeadTime: 5.1,
      avgRemediationTime: 2.8,
      submissionToQuoteRatio: 62,
      quoteToBindRatio: 69,
      gwpWritten: 12800000,
      lobBreakdown: {
        'Energy': { submissions: 30, quoted: 19, bound: 13, gwp: 7200000 },
        'Marine': { submissions: 22, quoted: 13, bound: 9, gwp: 5600000 }
      }
    },
    {
      id: 4,
      name: 'Emily Thompson',
      team: 'Casualty',
      totalSubmissions: 41,
      activeSubmissions: 11,
      quoted: 27,
      bound: 19,
      declined: 5,
      avgLeadTime: 4.5,
      avgRemediationTime: 2.3,
      submissionToQuoteRatio: 66,
      quoteToBindRatio: 70,
      gwpWritten: 9100000,
      lobBreakdown: {
        'Casualty': { submissions: 41, quoted: 27, bound: 19, gwp: 9100000 }
      }
    },
    {
      id: 5,
      name: 'David Park',
      team: 'Property',
      totalSubmissions: 36,
      activeSubmissions: 10,
      quoted: 21,
      bound: 14,
      declined: 6,
      avgLeadTime: 4.8,
      avgRemediationTime: 2.5,
      submissionToQuoteRatio: 58,
      quoteToBindRatio: 67,
      gwpWritten: 7400000,
      lobBreakdown: {
        'Property': { submissions: 36, quoted: 21, bound: 14, gwp: 7400000 }
      }
    },
    {
      id: 6,
      name: 'Rachel Martinez',
      team: 'Specialty',
      totalSubmissions: 29,
      activeSubmissions: 7,
      quoted: 19,
      bound: 12,
      declined: 3,
      avgLeadTime: 3.5,
      avgRemediationTime: 1.7,
      submissionToQuoteRatio: 66,
      quoteToBindRatio: 63,
      gwpWritten: 5300000,
      lobBreakdown: {
        'Financial Institutions': { submissions: 17, quoted: 11, bound: 7, gwp: 3100000 },
        'Healthcare Liability': { submissions: 12, quoted: 8, bound: 5, gwp: 2200000 }
      }
    }
  ]

  // Filter data
  const filteredData = useMemo(() => {
    return underwriterData.filter(uw => {
      if (filters.team !== 'all' && uw.team !== filters.team) return false
      if (filters.underwriter !== 'all' && uw.name !== filters.underwriter) return false
      return true
    })
  }, [filters])

  // Calculate aggregated metrics
  const aggregatedMetrics = useMemo(() => {
    const total = filteredData.reduce((acc, uw) => ({
      totalSubmissions: acc.totalSubmissions + uw.totalSubmissions,
      activeSubmissions: acc.activeSubmissions + uw.activeSubmissions,
      quoted: acc.quoted + uw.quoted,
      bound: acc.bound + uw.bound,
      declined: acc.declined + uw.declined,
      gwpWritten: acc.gwpWritten + uw.gwpWritten
    }), {
      totalSubmissions: 0,
      activeSubmissions: 0,
      quoted: 0,
      bound: 0,
      declined: 0,
      gwpWritten: 0
    })

    const avgLeadTime = filteredData.length > 0
      ? (filteredData.reduce((sum, uw) => sum + uw.avgLeadTime, 0) / filteredData.length).toFixed(1)
      : 0

    const avgRemediationTime = filteredData.length > 0
      ? (filteredData.reduce((sum, uw) => sum + uw.avgRemediationTime, 0) / filteredData.length).toFixed(1)
      : 0

    const submissionToQuoteRatio = total.totalSubmissions > 0
      ? ((total.quoted / total.totalSubmissions) * 100).toFixed(1)
      : 0

    const quoteToBindRatio = total.quoted > 0
      ? ((total.bound / total.quoted) * 100).toFixed(1)
      : 0

    const submissionToBindRatio = total.totalSubmissions > 0
      ? ((total.bound / total.totalSubmissions) * 100).toFixed(1)
      : 0

    return {
      ...total,
      avgLeadTime,
      avgRemediationTime,
      submissionToQuoteRatio,
      quoteToBindRatio,
      submissionToBindRatio
    }
  }, [filteredData])

  // LoB performance breakdown
  const lobPerformance = useMemo(() => {
    const lobStats = {}

    filteredData.forEach(uw => {
      Object.entries(uw.lobBreakdown).forEach(([lob, stats]) => {
        if (!lobStats[lob]) {
          lobStats[lob] = { submissions: 0, quoted: 0, bound: 0, gwp: 0, underwriters: [] }
        }
        lobStats[lob].submissions += stats.submissions
        lobStats[lob].quoted += stats.quoted
        lobStats[lob].bound += stats.bound
        lobStats[lob].gwp += stats.gwp
        lobStats[lob].underwriters.push({ name: uw.name, ...stats })
      })
    })

    return lobStats
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
      dateFrom: '',
      dateTo: '',
      lob: 'all',
      team: 'all',
      underwriter: 'all'
    })
  }

  const exportToCSV = () => {
    const headers = ['Underwriter', 'Team', 'Total Submissions', 'Active', 'Quoted', 'Bound', 'Declined', 'Avg Lead Time', 'Avg Remediation Time', 'S->Q %', 'Q->B %', 'GWP Written']
    const rows = filteredData.map(uw => [
      uw.name,
      uw.team,
      uw.totalSubmissions,
      uw.activeSubmissions,
      uw.quoted,
      uw.bound,
      uw.declined,
      uw.avgLeadTime,
      uw.avgRemediationTime,
      uw.submissionToQuoteRatio,
      uw.quoteToBindRatio,
      uw.gwpWritten
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `underwriter-performance-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
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
                <h1 className="text-3xl font-bold gradient-text mb-2">Underwriter Performance & Team Analytics</h1>
                <p className="text-gray-600">Track team productivity, conversion rates, and individual performance metrics</p>
              </div>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            {/* Filters */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Team */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Team</label>
                    <select
                      value={filters.team}
                      onChange={(e) => setFilters({...filters, team: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                    >
                      <option value="all">All Teams</option>
                      {teams.map((team) => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>

                  {/* Underwriter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Underwriter</label>
                    <select
                      value={filters.underwriter}
                      onChange={(e) => setFilters({...filters, underwriter: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                    >
                      <option value="all">All Underwriters</option>
                      {underwriterData.map((uw) => (
                        <option key={uw.id} value={uw.name}>{uw.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range */}
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

          {/* Aggregated KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Pipeline</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{aggregatedMetrics.activeSubmissions}</p>
                  <div className="flex items-center mt-2">
                    <Activity className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm text-gray-600">submissions in progress</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Lead Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{aggregatedMetrics.avgLeadTime} days</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-600">-8% improvement</span>
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
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Quote Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{aggregatedMetrics.submissionToQuoteRatio}%</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">
                      {aggregatedMetrics.quoted} / {aggregatedMetrics.totalSubmissions}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Bind Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{aggregatedMetrics.quoteToBindRatio}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-600">+5% vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Funnel & Conversion Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Funnel Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Funnel</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Total Submissions</span>
                    <span className="text-sm font-bold text-gray-900">{aggregatedMetrics.totalSubmissions}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div className="bg-blue-500 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ width: '100%' }}>
                      100%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Quoted</span>
                    <span className="text-sm font-bold text-gray-900">{aggregatedMetrics.quoted}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div className="bg-purple-500 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ width: `${aggregatedMetrics.submissionToQuoteRatio}%` }}>
                      {aggregatedMetrics.submissionToQuoteRatio}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Bound</span>
                    <span className="text-sm font-bold text-gray-900">{aggregatedMetrics.bound}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div className="bg-green-500 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ width: `${aggregatedMetrics.submissionToBindRatio}%` }}>
                      {aggregatedMetrics.submissionToBindRatio}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Declined</span>
                    <span className="text-sm font-bold text-gray-900">{aggregatedMetrics.declined}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div className="bg-red-500 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ width: `${((aggregatedMetrics.declined / aggregatedMetrics.totalSubmissions) * 100).toFixed(1)}%` }}>
                      {((aggregatedMetrics.declined / aggregatedMetrics.totalSubmissions) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Avg Remediation Time</p>
                      <p className="text-xl font-bold text-gray-900">{aggregatedMetrics.avgRemediationTime} days</p>
                    </div>
                  </div>
                  <TrendingDown className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total GWP Written</p>
                      <p className="text-xl font-bold text-gray-900">{currency(aggregatedMetrics.gwpWritten)}</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Decline Rate</p>
                      <p className="text-xl font-bold text-gray-900">
                        {((aggregatedMetrics.declined / aggregatedMetrics.totalSubmissions) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Submission to Bind</p>
                      <p className="text-xl font-bold text-gray-900">{aggregatedMetrics.submissionToBindRatio}%</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Underwriter Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Individual Underwriter Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Underwriter</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quoted</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bound</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Declined</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Time</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">S→Q %</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Q→B %</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">GWP</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData
                    .sort((a, b) => b.gwpWritten - a.gwpWritten)
                    .map((uw, index) => (
                    <tr key={uw.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{uw.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{uw.team}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {uw.activeSubmissions}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                        {uw.totalSubmissions}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">
                        {uw.quoted}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-semibold text-green-600">
                        {uw.bound}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-red-600">
                        {uw.declined}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">
                        {uw.avgLeadTime}d
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="text-sm font-medium text-gray-900">{uw.submissionToQuoteRatio}%</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="text-sm font-medium text-gray-900">{uw.quoteToBindRatio}%</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                        {currency(uw.gwpWritten)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* LoB Performance Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Line of Business</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(lobPerformance)
                .sort(([, a], [, b]) => b.gwp - a.gwp)
                .map(([lob, stats]) => (
                <div key={lob} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-3">{lob}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Submissions:</span>
                      <span className="font-medium text-gray-900">{stats.submissions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Quoted:</span>
                      <span className="font-medium text-gray-900">{stats.quoted}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Bound:</span>
                      <span className="font-medium text-green-600">{stats.bound}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Quote Rate:</span>
                      <span className="font-bold text-gray-900">{((stats.quoted / stats.submissions) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">GWP:</span>
                      <span className="font-bold text-gray-900">{currency(stats.gwp)}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Top Performers:</p>
                      <div className="space-y-1">
                        {stats.underwriters
                          .sort((a, b) => b.gwp - a.gwp)
                          .slice(0, 2)
                          .map((uw, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-gray-700">{uw.name}</span>
                              <span className="font-medium text-gray-900">{currency(uw.gwp)}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default UnderwriterPerformance
