import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Send,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Database,
  RotateCcw
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const IntegrationStatus = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedIntegration, setExpandedIntegration] = useState('HX')

  const handleResendPacket = (transactionId, submissionRef) => {
    if (window.confirm(`Resend packet for ${submissionRef}?`)) {
      alert(`Resending packet ${transactionId}...`)
    }
  }

  const integrations = [
    {
      id: 'HX',
      name: 'HX Rating Engine',
      description: 'Rating and pricing calculation engine',
      status: 'active',
      endpoint: 'https://api.hxrating.com/v2',
      lastSync: '2025-07-28 14:32:15 UTC',
      health: 98.5,
      stats: {
        sentToday: 127,
        receivedToday: 125,
        failedToday: 2,
        avgResponseTime: 1.8,
        totalSent: 14523,
        totalReceived: 14401,
        totalFailed: 122,
        uptime: 99.2
      },
      recentTransactions: [
        {
          id: 'HX-2025-001234',
          submissionRef: 'SOM-2024-002',
          type: 'Rating Request',
          timestamp: '2025-07-28 14:30:00 UTC',
          status: 'success',
          responseTime: 1.6,
          requestSize: '24 KB',
          responseSize: '12 KB'
        },
        {
          id: 'HX-2025-001233',
          submissionRef: 'SOM-2024-001',
          type: 'Rating Request',
          timestamp: '2025-07-28 14:15:22 UTC',
          status: 'success',
          responseTime: 2.1,
          requestSize: '28 KB',
          responseSize: '15 KB'
        },
        {
          id: 'HX-2025-001232',
          submissionRef: 'SOM-2024-003',
          type: 'Rating Request',
          timestamp: '2025-07-28 14:02:45 UTC',
          status: 'failed',
          responseTime: 5.3,
          requestSize: '32 KB',
          responseSize: '0 KB',
          error: 'Timeout - No response received within 5 seconds'
        },
        {
          id: 'HX-2025-001231',
          submissionRef: 'SOM-2024-004',
          type: 'Rating Request',
          timestamp: '2025-07-28 13:45:12 UTC',
          status: 'success',
          responseTime: 1.4,
          requestSize: '19 KB',
          responseSize: '11 KB'
        }
      ]
    },
    {
      id: 'GWPC',
      name: 'Guidewire PolicyCenter',
      description: 'Policy administration and management system',
      status: 'active',
      endpoint: 'https://sompo.guidewire.com/pc/api',
      lastSync: '2025-07-28 14:28:30 UTC',
      health: 95.2,
      stats: {
        sentToday: 84,
        receivedToday: 82,
        failedToday: 2,
        avgResponseTime: 3.2,
        totalSent: 9234,
        totalReceived: 9150,
        totalFailed: 84,
        uptime: 97.8
      },
      recentTransactions: [
        {
          id: 'GWPC-2025-005678',
          submissionRef: 'SOM-2024-002',
          type: 'Policy Creation',
          timestamp: '2025-07-28 14:25:00 UTC',
          status: 'success',
          responseTime: 2.9,
          requestSize: '156 KB',
          responseSize: '45 KB'
        },
        {
          id: 'GWPC-2025-005677',
          submissionRef: 'SOM-2024-001',
          type: 'Submission Sync',
          timestamp: '2025-07-28 14:10:30 UTC',
          status: 'success',
          responseTime: 3.5,
          requestSize: '124 KB',
          responseSize: '32 KB'
        },
        {
          id: 'GWPC-2025-005676',
          submissionRef: 'SOM-2024-003',
          type: 'Policy Update',
          timestamp: '2025-07-28 13:55:15 UTC',
          status: 'failed',
          responseTime: 8.2,
          requestSize: '98 KB',
          responseSize: '0 KB',
          error: 'Validation Error - Required field missing: policyEffectiveDate'
        },
        {
          id: 'GWPC-2025-005675',
          submissionRef: 'SOM-2024-005',
          type: 'Submission Sync',
          timestamp: '2025-07-28 13:20:45 UTC',
          status: 'success',
          responseTime: 2.8,
          requestSize: '145 KB',
          responseSize: '38 KB'
        }
      ]
    },
    {
      id: 'DNB',
      name: 'Dun & Bradstreet',
      description: 'Business information and credit reporting',
      status: 'active',
      endpoint: 'https://api.dnb.com/v1',
      lastSync: '2025-07-28 14:31:50 UTC',
      health: 99.1,
      stats: {
        sentToday: 56,
        receivedToday: 56,
        failedToday: 0,
        avgResponseTime: 0.9,
        totalSent: 4521,
        totalReceived: 4498,
        totalFailed: 23,
        uptime: 99.5
      },
      recentTransactions: [
        {
          id: 'DNB-2025-009876',
          submissionRef: 'SOM-2024-002',
          type: 'Company Lookup',
          timestamp: '2025-07-28 14:30:15 UTC',
          status: 'success',
          responseTime: 0.8,
          requestSize: '2 KB',
          responseSize: '64 KB'
        },
        {
          id: 'DNB-2025-009875',
          submissionRef: 'SOM-2024-001',
          type: 'Credit Report',
          timestamp: '2025-07-28 14:18:40 UTC',
          status: 'success',
          responseTime: 1.1,
          requestSize: '3 KB',
          responseSize: '128 KB'
        },
        {
          id: 'DNB-2025-009874',
          submissionRef: 'SOM-2024-004',
          type: 'Company Lookup',
          timestamp: '2025-07-28 14:05:22 UTC',
          status: 'success',
          responseTime: 0.7,
          requestSize: '2 KB',
          responseSize: '72 KB'
        },
        {
          id: 'DNB-2025-009873',
          submissionRef: 'SOM-2024-006',
          type: 'Credit Report',
          timestamp: '2025-07-28 13:42:10 UTC',
          status: 'success',
          responseTime: 1.0,
          requestSize: '3 KB',
          responseSize: '115 KB'
        }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-700 bg-green-100 border-green-300'
      case 'failed': return 'text-red-700 bg-red-100 border-red-300'
      case 'pending': return 'text-amber-700 bg-amber-100 border-amber-300'
      default: return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getHealthColor = (health) => {
    if (health >= 95) return 'text-green-700'
    if (health >= 90) return 'text-amber-700'
    return 'text-red-700'
  }

  const handleRefresh = () => {
    alert('Refreshing integration status...')
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
                <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
                  <Activity className="w-8 h-8 text-sompo-red" />
                  Integration Status
                </h1>
                <p className="text-gray-600">Monitor integration health and transaction status</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {/* Period Selector */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-sompo-red" />
                <label className="text-sm font-semibold text-gray-900">Time Period</label>
              </div>
              <div className="flex gap-2">
                {['today', 'week', 'month', 'all'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      selectedPeriod === period
                        ? 'bg-sompo-red text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period === 'all' ? 'All Time' : period}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Integration Cards */}
          <div className="space-y-6">
            {integrations.map((integration) => {
              const isExpanded = expandedIntegration === integration.id

              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                >
                  {/* Integration Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sompo-red to-sompo-dark-red rounded-lg flex items-center justify-center">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{integration.name}</h2>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Health Score</div>
                          <div className={`text-2xl font-bold ${getHealthColor(integration.health)}`}>
                            {integration.health}%
                          </div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          integration.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {integration.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Send className="w-4 h-4 text-blue-600" />
                          <div className="text-xs text-blue-700">Sent Today</div>
                        </div>
                        <div className="text-2xl font-bold text-blue-900">{integration.stats.sentToday}</div>
                        <div className="text-xs text-blue-600">Total: {integration.stats.totalSent.toLocaleString()}</div>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Download className="w-4 h-4 text-green-600" />
                          <div className="text-xs text-green-700">Received Today</div>
                        </div>
                        <div className="text-2xl font-bold text-green-900">{integration.stats.receivedToday}</div>
                        <div className="text-xs text-green-600">Total: {integration.stats.totalReceived.toLocaleString()}</div>
                      </div>

                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-1">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <div className="text-xs text-red-700">Failed Today</div>
                        </div>
                        <div className="text-2xl font-bold text-red-900">{integration.stats.failedToday}</div>
                        <div className="text-xs text-red-600">Total: {integration.stats.totalFailed.toLocaleString()}</div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <div className="text-xs text-amber-700">Avg Response</div>
                        </div>
                        <div className="text-2xl font-bold text-amber-900">{integration.stats.avgResponseTime}s</div>
                        <div className="text-xs text-amber-600">Uptime: {integration.stats.uptime}%</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{integration.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Last sync: {integration.lastSync}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <button
                    onClick={() => setExpandedIntegration(isExpanded ? null : integration.id)}
                    className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-sompo-red" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-sompo-red" />
                      )}
                      <span className="font-semibold text-gray-900">Recent Transactions</span>
                    </div>
                    <span className="text-sm text-gray-600">{integration.recentTransactions.length} transactions</span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transaction ID</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Submission</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Timestamp</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Response Time</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sizes</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {integration.recentTransactions.map((transaction) => (
                              <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-mono text-gray-900">{transaction.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{transaction.submissionRef}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{transaction.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{transaction.timestamp}</td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                                    {getStatusIcon(transaction.status)}
                                    {transaction.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  {transaction.responseTime}s
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-600">
                                  <div>↑ {transaction.requestSize}</div>
                                  <div>↓ {transaction.responseSize}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <button
                                    onClick={() => handleResendPacket(transaction.id, transaction.submissionRef)}
                                    className="px-3 py-1.5 text-xs font-medium text-sompo-red hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    Resend
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Error Details */}
                      {integration.recentTransactions.some(t => t.error) && (
                        <div className="p-4 bg-red-50 border-t border-red-200">
                          <h4 className="text-sm font-semibold text-red-900 mb-2">Recent Errors</h4>
                          <div className="space-y-2">
                            {integration.recentTransactions
                              .filter(t => t.error)
                              .map((transaction) => (
                                <div key={transaction.id} className="text-xs text-red-800 bg-red-100 p-2 rounded border border-red-300">
                                  <span className="font-medium">{transaction.id}:</span> {transaction.error}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default IntegrationStatus
