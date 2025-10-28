import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Filter,
  Download,
  BarChart3,
  Activity,
  Brain,
  Clock,
  Zap
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const AIAccuracy = () => {
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    lob: 'all',
    extractionType: 'all'
  })

  const lobs = [
    'Agriculture', 'Aviation', 'Casualty', 'Cyber', 'Energy', 'Environmental',
    'Errors & Omissions / Professional Indemnity', 'Financial Institutions',
    'Healthcare Liability', 'Life Sciences', 'Management Liability', 'Marine',
    'Property', 'Specialty', 'Surety'
  ]

  const extractionTypes = [
    'Insured Name',
    'Broker Name',
    'Line of Business',
    'GWP',
    'Limit',
    'Deductible',
    'Coverage Details',
    'Inception Date',
    'Expiry Date',
    'Policy Terms'
  ]

  // Mock data for AI accuracy metrics
  const accuracyData = [
    { id: 1, submissionRef: 'SOM-2024-001', insured: 'Atlas Foods Group', lob: 'Property', extractionType: 'Insured Name', aiValue: 'Atlas Foods Group', actualValue: 'Atlas Foods Group', status: 'correct', confidence: 98 },
    { id: 2, submissionRef: 'SOM-2024-002', insured: 'Orion AeroSystems', lob: 'Aviation', extractionType: 'GWP', aiValue: '$980,000', actualValue: '$980,000', status: 'correct', confidence: 95 },
    { id: 3, submissionRef: 'SOM-2024-003', insured: 'Hyperion Biotech', lob: 'Life Sciences', extractionType: 'Limit', aiValue: '$10,000,000', actualValue: '$12,000,000', status: 'incorrect', confidence: 88 },
    { id: 4, submissionRef: 'SOM-2024-004', insured: 'Neptune Offshore Wind', lob: 'Energy', extractionType: 'Line of Business', aiValue: 'Energy', actualValue: 'Energy', status: 'correct', confidence: 99 },
    { id: 5, submissionRef: 'SOM-2024-005', insured: 'Lumenova Data Centers', lob: 'Property', extractionType: 'Coverage Details', aiValue: 'Property All Risk', actualValue: 'Property All Risk + Terrorism', status: 'partial', confidence: 82 },
    { id: 6, submissionRef: 'SOM-2024-006', insured: 'Phoenix Rail & Freight', lob: 'Casualty', extractionType: 'Inception Date', aiValue: '2025-01-15', actualValue: '2025-01-15', status: 'correct', confidence: 97 },
    { id: 7, submissionRef: 'SOM-2024-007', insured: 'Vivid Motors EV', lob: 'Specialty', extractionType: 'Broker Name', aiValue: 'Aon Global', actualValue: 'Aon Global', status: 'correct', confidence: 96 },
    { id: 8, submissionRef: 'SOM-2024-008', insured: 'Evergreen Supermarkets', lob: 'Property', extractionType: 'Deductible', aiValue: '$100,000', actualValue: '$150,000', status: 'incorrect', confidence: 75 },
    { id: 9, submissionRef: 'SOM-2024-009', insured: 'Silverline Hospitality', lob: 'Property', extractionType: 'GWP', aiValue: '$880,000', actualValue: '$880,000', status: 'correct', confidence: 94 },
    { id: 10, submissionRef: 'SOM-2024-010', insured: 'NorthSea Energy', lob: 'Energy', extractionType: 'Policy Terms', aiValue: '12 months', actualValue: '12 months', status: 'correct', confidence: 91 },
    { id: 11, submissionRef: 'SOM-2024-011', insured: 'TechCore Solutions', lob: 'Cyber', extractionType: 'Limit', aiValue: '$18,000,000', actualValue: '$18,000,000', status: 'correct', confidence: 93 },
    { id: 12, submissionRef: 'SOM-2024-012', insured: 'GreenField Agriculture', lob: 'Agriculture', extractionType: 'Coverage Details', aiValue: 'Crop Insurance', actualValue: 'Multi-Peril Crop', status: 'partial', confidence: 79 },
    { id: 13, submissionRef: 'SOM-2024-013', insured: 'MedCare Hospitals', lob: 'Healthcare Liability', extractionType: 'Insured Name', aiValue: 'MedCare Hospitals', actualValue: 'MedCare Hospitals', status: 'correct', confidence: 99 },
    { id: 14, submissionRef: 'SOM-2024-014', insured: 'Aqua Marine Logistics', lob: 'Marine', extractionType: 'GWP', aiValue: '$1,100,000', actualValue: '$1,150,000', status: 'incorrect', confidence: 86 },
    { id: 15, submissionRef: 'SOM-2024-015', insured: 'Summit Financial Group', lob: 'Financial Institutions', extractionType: 'Expiry Date', aiValue: '2026-01-14', actualValue: '2026-01-14', status: 'correct', confidence: 98 },
  ]

  // Failed extractions data
  const failedExtractions = [
    { id: 1, submissionRef: 'SOM-2024-016', insured: 'Global Tech Solutions', lob: 'Cyber', extractionType: 'Limit', reason: 'Document format not recognized', timestamp: '2025-07-22 10:35:00', llm: 'GPT-4' },
    { id: 2, submissionRef: 'SOM-2024-017', insured: 'Mountain Rail Corp', lob: 'Casualty', extractionType: 'Broker Name', reason: 'Missing field in source document', timestamp: '2025-07-22 11:42:00', llm: 'Claude 3' },
    { id: 3, submissionRef: 'SOM-2024-018', insured: 'Pacific Marine Ltd', lob: 'Marine', extractionType: 'GWP', reason: 'Currency conversion ambiguity', timestamp: '2025-07-23 09:15:00', llm: 'GPT-4' },
    { id: 4, submissionRef: 'SOM-2024-019', insured: 'Solar Energy Group', lob: 'Energy', extractionType: 'Inception Date', reason: 'Multiple dates found', timestamp: '2025-07-23 14:20:00', llm: 'Claude 3' },
    { id: 5, submissionRef: 'SOM-2024-020', insured: 'Biomedical Systems', lob: 'Life Sciences', extractionType: 'Coverage Details', reason: 'Complex policy wording', timestamp: '2025-07-24 08:30:00', llm: 'GPT-4' },
  ]

  // LLM accuracy data
  const llmAccuracy = [
    { llm: 'GPT-4', totalExtractions: 3245, correct: 2987, incorrect: 189, partial: 69, accuracy: 92.0, avgConfidence: 91.5, avgResponseTime: 2.4 },
    { llm: 'Claude 3', totalExtractions: 2876, correct: 2698, incorrect: 134, partial: 44, accuracy: 93.8, avgConfidence: 93.2, avgResponseTime: 1.9 },
    { llm: 'Gemini Pro', totalExtractions: 1523, correct: 1357, incorrect: 128, partial: 38, accuracy: 89.1, avgConfidence: 88.7, avgResponseTime: 3.1 },
  ]

  // Filter data
  const filteredData = useMemo(() => {
    return accuracyData.filter(record => {
      if (filters.lob !== 'all' && record.lob !== filters.lob) return false
      if (filters.extractionType !== 'all' && record.extractionType !== filters.extractionType) return false
      return true
    })
  }, [filters])

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = filteredData.length
    const correct = filteredData.filter(r => r.status === 'correct').length
    const incorrect = filteredData.filter(r => r.status === 'incorrect').length
    const partial = filteredData.filter(r => r.status === 'partial').length
    const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0
    const avgConfidence = total > 0 ? (filteredData.reduce((sum, r) => sum + r.confidence, 0) / total).toFixed(1) : 0

    // Group by extraction type
    const byExtractionType = {}
    extractionTypes.forEach(type => {
      const typeRecords = filteredData.filter(r => r.extractionType === type)
      if (typeRecords.length > 0) {
        const typeCorrect = typeRecords.filter(r => r.status === 'correct').length
        byExtractionType[type] = {
          accuracy: ((typeCorrect / typeRecords.length) * 100).toFixed(1),
          count: typeRecords.length
        }
      }
    })

    // Group by LOB
    const byLob = {}
    lobs.forEach(lob => {
      const lobRecords = filteredData.filter(r => r.lob === lob)
      if (lobRecords.length > 0) {
        const lobCorrect = lobRecords.filter(r => r.status === 'correct').length
        byLob[lob] = {
          accuracy: ((lobCorrect / lobRecords.length) * 100).toFixed(1),
          count: lobRecords.length
        }
      }
    })

    return {
      total,
      correct,
      incorrect,
      partial,
      accuracy,
      avgConfidence,
      byExtractionType,
      byLob
    }
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
      extractionType: 'all'
    })
  }

  const exportToCSV = () => {
    const headers = ['Submission Ref', 'Insured', 'LoB', 'Extraction Type', 'AI Value', 'Actual Value', 'Status', 'Confidence']
    const rows = filteredData.map(r => [
      r.submissionRef,
      r.insured,
      r.lob,
      r.extractionType,
      r.aiValue,
      r.actualValue,
      r.status,
      r.confidence
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-accuracy-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'correct': return 'bg-green-100 text-green-800'
      case 'incorrect': return 'bg-red-100 text-red-800'
      case 'partial': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct': return <CheckCircle className="w-4 h-4" />
      case 'incorrect': return <XCircle className="w-4 h-4" />
      case 'partial': return <AlertCircle className="w-4 h-4" />
      default: return null
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
                <h1 className="text-3xl font-bold gradient-text mb-2">AI Accuracy Reporting</h1>
                <p className="text-gray-600">Monitor and analyze AI extraction accuracy for continuous improvement</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                {/* Extraction Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Extraction Type</label>
                  <select
                    value={filters.extractionType}
                    onChange={(e) => setFilters({...filters, extractionType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                  >
                    <option value="all">All Types</option>
                    {extractionTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
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
                  <p className="text-gray-600 text-sm font-medium">Overall Accuracy</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.accuracy}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-600">+3.2% vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
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
                  <p className="text-gray-600 text-sm font-medium">Correct Extractions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.correct}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">
                      out of {metrics.total} total
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
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
                  <p className="text-gray-600 text-sm font-medium">Avg Confidence</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.avgConfidence}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600 mr-1" />
                    <span className="text-sm font-medium text-indigo-600">+1.5% improvement</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600" />
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
                  <p className="text-gray-600 text-sm font-medium">Needs Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.incorrect + metrics.partial}</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-amber-600 mr-1" />
                    <span className="text-sm font-medium text-amber-600">-2.1% improvement</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Accuracy by Extraction Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accuracy by Extraction Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(metrics.byExtractionType)
                .sort(([, a], [, b]) => b.accuracy - a.accuracy)
                .map(([type, data]) => (
                  <div key={type} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">{type}</h4>
                      <span className="text-xs text-gray-500">{data.count} samples</span>
                    </div>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">{data.accuracy}%</span>
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${data.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Accuracy by LOB */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accuracy by Line of Business</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(metrics.byLob)
                .sort(([, a], [, b]) => b.accuracy - a.accuracy)
                .slice(0, 9)
                .map(([lob, data]) => (
                  <div key={lob} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">{lob}</h4>
                      <span className="text-xs text-gray-500">{data.count} samples</span>
                    </div>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">{data.accuracy}%</span>
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: `${data.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* LLM Performance Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-sompo-red" />
                LLM Performance Comparison
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {llmAccuracy.map((llm, idx) => (
                <div key={llm.llm} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{llm.llm}</h4>
                    <Brain className={`w-6 h-6 ${idx === 0 ? 'text-purple-600' : idx === 1 ? 'text-blue-600' : 'text-green-600'}`} />
                  </div>

                  <div className="space-y-3">
                    {/* Accuracy */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">Accuracy</span>
                        <span className="text-xl font-bold text-gray-900">{llm.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${idx === 0 ? 'bg-gradient-to-r from-purple-500 to-purple-600' : idx === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`}
                          style={{ width: `${llm.accuracy}%` }}
                        />
                      </div>
                    </div>

                    {/* Confidence */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">Avg Confidence</span>
                      <span className="text-sm font-bold text-gray-900">{llm.avgConfidence}%</span>
                    </div>

                    {/* Response Time */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Response Time
                      </span>
                      <span className="text-sm font-bold text-gray-900">{llm.avgResponseTime}s</span>
                    </div>

                    {/* Extraction Stats */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs text-gray-600">Correct</div>
                          <div className="text-sm font-bold text-green-600">{llm.correct}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Partial</div>
                          <div className="text-sm font-bold text-yellow-600">{llm.partial}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Incorrect</div>
                          <div className="text-sm font-bold text-red-600">{llm.incorrect}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-xs text-gray-500">Total: {llm.totalExtractions.toLocaleString()} extractions</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Failed Extractions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Failed Extractions ({failedExtractions.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ref</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Insured</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">LoB</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Field</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Failure Reason</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">LLM</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {failedExtractions.map((failure) => (
                    <tr key={failure.id} className="hover:bg-red-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-sompo-red">
                        {failure.submissionRef}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {failure.insured}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {failure.lob}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {failure.extractionType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          {failure.reason}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          {failure.llm}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {failure.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Extraction Details ({filteredData.length} records)
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insured</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LoB</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extraction Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-sompo-red">
                        {record.submissionRef}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {record.insured}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {record.lob}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {record.extractionType}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {record.aiValue}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {record.actualValue}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}
                        >
                          {getStatusIcon(record.status)}
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                        {record.confidence}%
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

export default AIAccuracy
