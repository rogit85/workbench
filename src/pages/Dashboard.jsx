import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  ChevronRight,
  Grid3x3,
  List,
  User,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Building,
  DollarSign,
  Calendar,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const Dashboard = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('list') // 'grid' or 'list'
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [filters, setFilters] = useState({
    assignee: 'all',
    status: 'all',
    priority: 'all'
  })

  // Refs for sections
  const myTasksRef = useRef(null)
  const teamTasksRef = useRef(null)
  const dueSoonRef = useRef(null)

  // Scroll to section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Mock data for user activities
  const myTasks = [
    {
      id: 's020',
      insured: 'MediCare Clinics Group',
      lob: 'Healthcare Liability',
      gwp: 420000,
      status: 'Appetite Check',
      priority: 'High',
      dueDate: '2025-10-25',
      daysOverdue: 0,
      assignee: 'Jeremy Isaacs'
    },
    {
      id: 's003',
      insured: 'Global Freight Ltd',
      lob: 'Marine',
      gwp: 420000,
      status: 'Rating',
      priority: 'Medium',
      dueDate: '2025-10-24',
      daysOverdue: 1,
      assignee: 'Jeremy Isaacs'
    },
    {
      id: 's007',
      insured: 'DataSecure Inc',
      lob: 'Cyber',
      gwp: 315000,
      status: 'Peer Review',
      priority: 'High',
      dueDate: '2025-10-26',
      daysOverdue: 0,
      assignee: 'Jeremy Isaacs'
    }
  ]

  const teamTasks = [
    {
      id: 's021',
      insured: 'Alpha Manufacturing Ltd',
      lob: 'Property',
      gwp: 560000,
      status: 'Sanctions',
      priority: 'Medium',
      dueDate: '2025-10-25',
      daysOverdue: 0,
      assignee: 'Sarah Chen'
    },
    {
      id: 's004',
      insured: 'BuildRight Construction',
      lob: 'Casualty',
      gwp: 890000,
      status: 'Quoted',
      priority: 'High',
      dueDate: '2025-10-24',
      daysOverdue: 1,
      assignee: 'Mike Johnson'
    }
  ]

  const dueSoon = [
    {
      id: 's022',
      insured: 'SkyHigh Aviation Services',
      lob: 'Aviation',
      gwp: 2100000,
      status: 'Clearance',
      priority: 'High',
      dueDate: '2025-10-23',
      daysOverdue: 2,
      assignee: 'Jeremy Isaacs'
    }
  ]

  // KPI stats with refs
  const kpis = [
    { label: 'My Tasks', value: myTasks.length, icon: User, color: 'blue', change: '+2', ref: myTasksRef },
    { label: 'Team Tasks', value: teamTasks.length + myTasks.length, icon: Users, color: 'green', change: '+5', ref: teamTasksRef },
    { label: 'Due Today', value: 3, icon: Clock, color: 'amber', change: '+1', ref: dueSoonRef },
    { label: 'Overdue', value: dueSoon.length, icon: AlertCircle, color: 'red', change: '-1', ref: dueSoonRef }
  ]

  const currency = (n) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(n)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-700 bg-red-50 border-red-300'
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-300'
      case 'Low': return 'text-green-700 bg-green-50 border-green-300'
      default: return 'text-gray-700 bg-gray-50 border-gray-300'
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'Received': 'bg-blue-100 text-blue-800 border-blue-300',
      'Clearance': 'bg-purple-100 text-purple-800 border-purple-300',
      'Appetite Check': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'Sanctions': 'bg-orange-100 text-orange-800 border-orange-300',
      'Rating': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'Peer Review': 'bg-teal-100 text-teal-800 border-teal-300',
      'Quoted': 'bg-amber-100 text-amber-800 border-amber-300',
      'Firm Order': 'bg-lime-100 text-lime-800 border-lime-300',
      'Bound': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Issued': 'bg-green-100 text-green-800 border-green-300'
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const TaskCard = ({ task, compact = false }) => {
    const isOverdue = task.daysOverdue > 0

    if (viewMode === 'list') {
      // Compact list view
      return (
        <motion.div
          whileHover={{ backgroundColor: '#F9FAFB' }}
          className="flex items-center gap-3 p-2 border-b border-gray-100 hover:border-gray-200 transition-all text-xs relative"
        >
          <a
            href={`/risk/${task.id}`}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/risk/${task.id}`)
            }}
            className="text-sompo-red hover:text-sompo-dark-red mr-2"
            title="Open risk detail (right-click to open in new tab)"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="w-16 font-mono text-gray-500">{task.id}</div>
          <div className="flex-1 font-semibold text-gray-900 truncate">{task.insured}</div>
          <div className="w-32 text-gray-600 truncate">{task.lob}</div>
          <div className="w-24 font-semibold text-gray-900">{currency(task.gwp)}</div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <div className={`w-20 text-right flex items-center justify-end gap-1 ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
            <Clock className="w-3 h-3" />
            {isOverdue ? `${task.daysOverdue}d overdue` : task.dueDate}
          </div>
          <div className="w-28 text-gray-600 truncate text-right">{task.assignee}</div>
        </motion.div>
      )
    }

    // Compact grid/card view
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
        className="bg-white rounded-lg border border-gray-200 p-3 transition-all relative"
      >
        <a
          href={`/risk/${task.id}`}
          onClick={(e) => {
            e.preventDefault()
            navigate(`/risk/${task.id}`)
          }}
          className="absolute top-2 right-2 text-sompo-red hover:text-sompo-dark-red z-10"
          title="Open risk detail (right-click to open in new tab)"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 truncate">{task.insured}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{task.lob}</p>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-medium border flex-shrink-0 ml-2 ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-gray-900">{currency(task.gwp)}</span>
          <span className="font-mono text-gray-500">{task.id}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
          <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
            <Clock className="w-3 h-3" />
            {isOverdue ? `${task.daysOverdue}d overdue` : task.dueDate}
          </div>
        </div>

        {task.assignee && (
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1 text-xs text-gray-600">
            <User className="w-3 h-3" />
            {task.assignee}
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
        <div className="max-w-[1680px] mx-auto">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-sm text-gray-600">Your tasks and team activities</p>
          </div>

          {/* KPIs - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {kpis.map((kpi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                onClick={() => scrollToSection(kpi.ref)}
                className="bg-white rounded-lg shadow border border-gray-200 p-3 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">{kpi.label}</div>
                    <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                    <div className={`text-xs font-medium mt-0.5 ${
                      kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change} today
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    kpi.color === 'blue' ? 'bg-blue-100' :
                    kpi.color === 'green' ? 'bg-green-100' :
                    kpi.color === 'amber' ? 'bg-amber-100' :
                    'bg-red-100'
                  }`}>
                    <kpi.icon className={`w-5 h-5 ${
                      kpi.color === 'blue' ? 'text-blue-600' :
                      kpi.color === 'green' ? 'text-green-600' :
                      kpi.color === 'amber' ? 'text-amber-600' :
                      'text-red-600'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters - Collapseable */}
          <motion.div className="bg-white rounded-lg shadow border border-gray-200 mb-4 overflow-hidden">
            <button
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {filtersExpanded ? <ChevronDown className="w-4 h-4 text-sompo-red" /> : <ChevronRight className="w-4 h-4 text-sompo-red" />}
                <span className="text-sm font-semibold text-gray-900">Filters</span>
                {!filtersExpanded && (filters.assignee !== 'all' || filters.status !== 'all' || filters.priority !== 'all') && (
                  <span className="px-2 py-0.5 bg-sompo-red text-white rounded text-xs font-medium">
                    {[filters.assignee !== 'all', filters.status !== 'all', filters.priority !== 'all'].filter(Boolean).length} active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-gray-100 rounded p-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setViewMode('grid') }}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    title="Grid view"
                  >
                    <Grid3x3 className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setViewMode('list') }}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    title="List view"
                  >
                    <List className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </button>

            <AnimatePresence>
              {filtersExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Assignee</label>
                      <select
                        value={filters.assignee}
                        onChange={(e) => setFilters({...filters, assignee: e.target.value})}
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
                      >
                        <option value="all">All Assignees</option>
                        <option value="me">My Tasks</option>
                        <option value="team">Team Tasks</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
                      >
                        <option value="all">All Status</option>
                        <option value="Received">Received</option>
                        <option value="Clearance">Clearance</option>
                        <option value="Appetite Check">Appetite Check</option>
                        <option value="Sanctions">Sanctions</option>
                        <option value="Rating">Rating</option>
                        <option value="Peer Review">Peer Review</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={filters.priority}
                        onChange={(e) => setFilters({...filters, priority: e.target.value})}
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
                      >
                        <option value="all">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* My Tasks */}
          <div ref={myTasksRef} className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-sompo-red" />
              My Tasks ({myTasks.length})
            </h2>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'bg-white rounded-lg shadow border border-gray-200 overflow-hidden'}>
              {myTasks.map((task, idx) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Team Tasks */}
          <div ref={teamTasksRef} className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-sompo-red" />
              Team Tasks ({teamTasks.length})
            </h2>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'bg-white rounded-lg shadow border border-gray-200 overflow-hidden'}>
              {teamTasks.map((task, idx) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Due Soon / Overdue */}
          <div ref={dueSoonRef} className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              Due Soon / Overdue ({dueSoon.length})
            </h2>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'bg-white rounded-lg shadow border border-gray-200 overflow-hidden'}>
              {dueSoon.map((task, idx) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Dashboard
