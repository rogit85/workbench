import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Calculator, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users,
  PoundSterling,
  AlertTriangle
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { dashboardMetrics, submissionsData } from '../data/mockData'

const Dashboard = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100'
      case 'Quote Generated': return 'text-blue-600 bg-blue-100'
      case 'Rated': return 'text-purple-600 bg-purple-100'
      case 'Under Review': return 'text-yellow-600 bg-yellow-100'
      case 'Pending Information': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const StatCard = ({ title, value, icon: Icon, change, color = 'red' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">
              +{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
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
              Underwriting Dashboard
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-2"
            >
              Real-time overview of submissions, quotes, and approvals
            </motion.p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Submissions"
              value={dashboardMetrics.totalSubmissions}
              icon={FileText}
              change={12}
              color="blue"
            />
            <StatCard
              title="Pending Review"
              value={dashboardMetrics.pendingReview}
              icon={Clock}
              color="yellow"
            />
            <StatCard
              title="Quotes Generated"
              value={dashboardMetrics.quoted}
              icon={Calculator}
              change={8}
              color="purple"
            />
            <StatCard
              title="Approved"
              value={dashboardMetrics.approved}
              icon={CheckCircle}
              change={25}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Submissions */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Submissions</h2>
                  <Link 
                    to="/submissions"
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    View All →
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {submissionsData.slice(0, 5).map((submission) => (
                    <Link
                      key={submission.id}
                      to={`/submissions/${submission.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">
                              {submission.insuredName}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                              {submission.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span>{submission.businessType}</span>
                            <span>•</span>
                            <span>{submission.coverageType}</span>
                            <span>•</span>
                            <span>£{submission.requestedLimit.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Premium</span>
                    <span className="font-semibold text-green-600">
                      £{dashboardMetrics.totalPremium.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Premium</span>
                    <span className="font-semibold">
                      £{dashboardMetrics.averagePremium.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Quote Ratio</span>
                    <span className="font-semibold text-blue-600">
                      {dashboardMetrics.quotingRatio}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Approval Ratio</span>
                    <span className="font-semibold text-purple-600">
                      {dashboardMetrics.approvalRatio}%
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Items</h3>
                <div className="space-y-3">
                  {submissionsData
                    .filter(sub => sub.priority === 'High' && sub.status !== 'Approved')
                    .map((submission) => (
                      <Link
                        key={submission.id}
                        to={`/submissions/${submission.id}`}
                        className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-3" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-900">
                            {submission.insuredName}
                          </p>
                          <p className="text-xs text-red-600">
                            {submission.status}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/submissions"
                    className="flex items-center justify-center w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View All Submissions
                  </Link>
                  <Link
                    to="/quotes"
                    className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Generated Quotes
                  </Link>
                  <Link
                    to="/reports"
                    className="flex items-center justify-center w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Reports
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Dashboard