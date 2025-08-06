import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { dashboardMetrics, submissionsData, quotesData } from '../data/mockData'

const Reports = () => {
  const [dateRange, setDateRange] = useState('30')
  const [reportType, setReportType] = useState('overview')

  // Calculate metrics
  const totalSubmissions = submissionsData.length
  const totalQuotes = quotesData.length
  const totalApproved = submissionsData.filter(sub => sub.approved === true).length
  const totalPremium = quotesData.reduce((sum, quote) => sum + quote.premium, 0)
  
  const conversionRate = totalSubmissions > 0 ? (totalQuotes / totalSubmissions * 100).toFixed(1) : 0
  const approvalRate = totalQuotes > 0 ? (totalApproved / totalQuotes * 100).toFixed(1) : 0
  
  // Business type breakdown
  const businessTypes = {}
  submissionsData.forEach(sub => {
    businessTypes[sub.businessType] = (businessTypes[sub.businessType] || 0) + 1
  })

  // Coverage type breakdown
  const coverageTypes = {}
  submissionsData.forEach(sub => {
    coverageTypes[sub.coverageType] = (coverageTypes[sub.coverageType] || 0) + 1
  })

  // Premium by month (mock data)
  const monthlyPremiums = [
    { month: 'Oct 2023', premium: 85000, quotes: 5 },
    { month: 'Nov 2023', premium: 120000, quotes: 8 },
    { month: 'Dec 2023', premium: 145000, quotes: 11 },
    { month: 'Jan 2024', premium: 103250, quotes: 3 }
  ]

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
              ) : change < 0 ? (
                <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
              ) : (
                <Minus className="w-4 h-4 text-gray-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                change > 0 ? 'text-green-600' : 
                change < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {change > 0 ? '+' : ''}{change}% vs last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  )

  const ChartCard = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </motion.div>
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold gradient-text"
            >
              Analytics & Reports
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-2"
            >
              Comprehensive insights into underwriting performance and trends
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="overview">Overview</option>
                  <option value="premium">Premium Analysis</option>
                  <option value="conversion">Conversion Rates</option>
                  <option value="risk">Risk Analysis</option>
                </select>
              </div>

              <div className="md:col-span-2 flex items-end">
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center mr-3">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </button>
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Submissions"
              value={totalSubmissions}
              change={12}
              icon={BarChart3}
              color="blue"
            />
            <MetricCard
              title="Conversion Rate"
              value={`${conversionRate}%`}
              change={5.2}
              icon={TrendingUp}
              color="green"
            />
            <MetricCard
              title="Total Premium"
              value={`£${totalPremium.toLocaleString()}`}
              change={-3.1}
              icon={PieChart}
              color="purple"
            />
            <MetricCard
              title="Approval Rate"
              value={`${approvalRate}%`}
              change={8.7}
              icon={Calendar}
              color="yellow"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Premium Trend */}
            <ChartCard title="Premium Trend">
              <div className="space-y-3">
                {monthlyPremiums.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{item.month}</span>
                      <p className="text-xs text-gray-600">{item.quotes} quotes</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-green-600">
                        £{item.premium.toLocaleString()}
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${(item.premium / Math.max(...monthlyPremiums.map(m => m.premium))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Business Type Distribution */}
            <ChartCard title="Business Type Distribution">
              <div className="space-y-3">
                {Object.entries(businessTypes).map(([type, count], index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{type}</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-3">{count} submissions</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(count / totalSubmissions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coverage Type Analysis */}
            <ChartCard title="Coverage Types">
              <div className="space-y-3">
                {Object.entries(coverageTypes).map(([type, count], index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{type}</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">{count}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(count / totalSubmissions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Status Breakdown */}
            <ChartCard title="Submission Status">
              <div className="space-y-3">
                {['Approved', 'Quote Generated', 'Rated', 'Under Review', 'Pending Information'].map((status, index) => {
                  const count = submissionsData.filter(sub => sub.status === status).length
                  const colors = ['green', 'blue', 'purple', 'yellow', 'orange']
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{status}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">{count}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${colors[index]}-600 h-2 rounded-full`}
                            style={{ width: `${(count / totalSubmissions) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ChartCard>

            {/* Risk Assessment */}
            <ChartCard title="Risk Profile">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Low Risk</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Medium Risk</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">High Risk</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>

          {/* Detailed Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Summary</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissionsData.slice(0, 5).map((submission, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(submission.submissionDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        New Submission
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {submission.insuredName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{submission.requestedLimit.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {submission.status}
                        </span>
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

export default Reports