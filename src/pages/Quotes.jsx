import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Download, 
  Send, 
  Eye, 
  Search,
  Calendar,
  PoundSterling,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Calculator
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { quotesData } from '../data/mockData'

const Quotes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('generatedDate')
  const [sortOrder, setSortOrder] = useState('desc')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'text-green-600 bg-green-100'
      case 'Sent to Broker': return 'text-blue-600 bg-blue-100'
      case 'Under Review': return 'text-yellow-600 bg-yellow-100'
      case 'Expired': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <CheckCircle className="w-4 h-4" />
      case 'Sent to Broker': return <Send className="w-4 h-4" />
      case 'Under Review': return <Clock className="w-4 h-4" />
      case 'Expired': return <XCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const filteredQuotes = quotesData
    .filter(quote => {
      const matchesSearch = quote.insuredName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quote.submissionId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'All' || quote.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'generatedDate' || sortBy === 'validUntil') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const uniqueStatuses = [...new Set(quotesData.map(quote => quote.status))]

  const totalPremium = filteredQuotes.reduce((sum, quote) => sum + quote.premium, 0)
  const avgPremium = filteredQuotes.length > 0 ? totalPremium / filteredQuotes.length : 0

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
              Generated Quotes
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-2"
            >
              View and manage all generated insurance quotes
            </motion.p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Quotes</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{filteredQuotes.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Premium</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">£{totalPremium.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <PoundSterling className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Average Premium</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">£{Math.round(avgPremium).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {filteredQuotes.filter(q => q.status === 'Accepted').length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search quotes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="All">All Statuses</option>
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-')
                    setSortBy(field)
                    setSortOrder(order)
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="generatedDate-desc">Latest First</option>
                  <option value="generatedDate-asc">Oldest First</option>
                  <option value="premium-desc">Premium High-Low</option>
                  <option value="premium-asc">Premium Low-High</option>
                  <option value="validUntil-asc">Expiring Soon</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Quotes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {quote.insuredName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quote #{quote.quoteNumber}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                    {getStatusIcon(quote.status)}
                    <span className="ml-1">{quote.status}</span>
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Premium</span>
                    <span className="text-lg font-bold text-green-600">
                      £{quote.premium.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Excess</span>
                    <span className="text-sm font-medium">
                      £{quote.excess.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Commission</span>
                    <span className="text-sm font-medium">
                      {quote.commission}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Valid Until</span>
                    <span className="text-sm font-medium flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(quote.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Coverage Limit</span>
                    <span className="text-sm font-medium">
                      £{quote.coverageDetails.limit.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Generated: {new Date(quote.generatedDate).toLocaleDateString()}</span>
                    <span>Policy: {quote.policyPeriod}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/submissions/${quote.submissionId}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                    
                    <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center">
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </button>
                    
                    {quote.status !== 'Accepted' && (
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
                        <Send className="w-4 h-4 mr-1" />
                        Send
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredQuotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No quotes found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default Quotes