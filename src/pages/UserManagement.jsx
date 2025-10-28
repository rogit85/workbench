import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  Lock,
  Unlock,
  Mail,
  Phone,
  Building,
  Save,
  X,
  Search,
  Filter,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const UserManagement = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    searchQuery: '',
    role: 'all',
    team: 'all',
    lob: 'all',
    status: 'all'
  })

  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Jeremy Isaacs',
      email: 'jeremy.isaacs@sompo.com',
      phone: '+44 20 7123 4567',
      role: 'Senior Underwriter',
      team: 'Property',
      lobs: ['Property', 'Casualty'],
      status: 'Active',
      permissions: {
        canApprove: true,
        canDecline: true,
        maxLineSize: 150000000,
        requiresPeerReview: false,
        canAccessReports: true,
        canManageTemplates: true
      }
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah.chen@sompo.com',
      phone: '+44 20 7123 4568',
      role: 'Underwriter',
      team: 'Specialty',
      lobs: ['Cyber', 'Life Sciences'],
      status: 'Active',
      permissions: {
        canApprove: true,
        canDecline: true,
        maxLineSize: 100000000,
        requiresPeerReview: true,
        canAccessReports: true,
        canManageTemplates: false
      }
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@sompo.com',
      phone: '+44 20 7123 4569',
      role: 'Head of Underwriting',
      team: 'Marine & Energy',
      lobs: ['Marine', 'Energy', 'Aviation'],
      status: 'Active',
      permissions: {
        canApprove: true,
        canDecline: true,
        maxLineSize: 200000000,
        requiresPeerReview: false,
        canAccessReports: true,
        canManageTemplates: true
      }
    },
    {
      id: 4,
      name: 'Emily Thompson',
      email: 'emily.thompson@sompo.com',
      phone: '+44 20 7123 4570',
      role: 'Associate Underwriter',
      team: 'Casualty',
      lobs: ['Casualty'],
      status: 'Active',
      permissions: {
        canApprove: false,
        canDecline: false,
        maxLineSize: 50000000,
        requiresPeerReview: true,
        canAccessReports: true,
        canManageTemplates: false
      }
    },
    {
      id: 5,
      name: 'David Park',
      email: 'david.park@sompo.com',
      phone: '+44 20 7123 4571',
      role: 'Underwriter',
      team: 'Property',
      lobs: ['Property'],
      status: 'Inactive',
      permissions: {
        canApprove: true,
        canDecline: true,
        maxLineSize: 75000000,
        requiresPeerReview: true,
        canAccessReports: false,
        canManageTemplates: false
      }
    }
  ])

  const roles = ['Head of Underwriting', 'Senior Underwriter', 'Underwriter', 'Associate Underwriter', 'Administrator', 'Analyst']
  const teams = ['Property', 'Casualty', 'Specialty', 'Marine & Energy']
  const lobs = ['Property', 'Casualty', 'Marine', 'Aviation', 'Energy', 'Cyber', 'Financial Institutions', 'Healthcare Liability', 'Life Sciences']

  const filteredUsers = users.filter(user => {
    if (filters.searchQuery && !user.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !user.email.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false
    if (filters.role !== 'all' && user.role !== filters.role) return false
    if (filters.team !== 'all' && user.team !== filters.team) return false
    if (filters.lob !== 'all' && !user.lobs.includes(filters.lob)) return false
    if (filters.status !== 'all' && user.status !== filters.status) return false
    return true
  })

  const handleEditUser = (user) => {
    setEditingUser({ ...user })
    setShowUserModal(true)
  }

  const handleAddUser = () => {
    setEditingUser({
      name: '',
      email: '',
      phone: '',
      role: 'Underwriter',
      team: 'Property',
      lobs: [],
      status: 'Active',
      permissions: {
        canApprove: false,
        canDecline: false,
        maxLineSize: 50000000,
        requiresPeerReview: true,
        canAccessReports: true,
        canManageTemplates: false
      }
    })
    setShowUserModal(true)
  }

  const handleSaveUser = () => {
    if (editingUser.id) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
    } else {
      setUsers([...users, { ...editingUser, id: Date.now() }])
    }
    setShowUserModal(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId))
    }
  }

  const toggleLob = (lob) => {
    const newLobs = editingUser.lobs.includes(lob)
      ? editingUser.lobs.filter(l => l !== lob)
      : [...editingUser.lobs, lob]
    setEditingUser({ ...editingUser, lobs: newLobs })
  }

  const currency = (n) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(n)
  }

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      role: 'all',
      team: 'all',
      lob: 'all',
      status: 'all'
    })
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
                  <Users className="w-8 h-8 text-sompo-red" />
                  User Management
                </h1>
                <p className="text-gray-600">Manage users, roles, permissions, and LOB assignments</p>
              </div>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Add User
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-sompo-red transition-colors"
                >
                  {showFilters ? <ChevronDown className="w-4 h-4 text-sompo-red" /> : <ChevronRight className="w-4 h-4 text-sompo-red" />}
                  Filters
                  {!showFilters && (filters.role !== 'all' || filters.team !== 'all' || filters.lob !== 'all' || filters.status !== 'all') && (
                    <span className="ml-2 px-2 py-0.5 bg-sompo-red text-white text-xs rounded-full">
                      Active
                    </span>
                  )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Name or email..."
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters({...filters, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                  >
                    <option value="all">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

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

                {/* LOB */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Line of Business</label>
                  <select
                    value={filters.lob}
                    onChange={(e) => setFilters({...filters, lob: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                  >
                    <option value="all">All LOBs</option>
                    {lobs.map((lob) => (
                      <option key={lob} value={lob}>{lob}</option>
                    ))}
                  </select>
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              )}
            </div>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Users ({filteredUsers.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOBs</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Line Size</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{user.team}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {user.lobs.map((lob) => (
                            <span key={lob} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                              {lob}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {currency(user.permissions.maxLineSize)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-1">
                          {user.permissions.canApprove && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs" title="Can Approve">
                              ✓
                            </span>
                          )}
                          {user.permissions.requiresPeerReview && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs" title="Requires Peer Review">
                              PR
                            </span>
                          )}
                          {user.permissions.canManageTemplates && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs" title="Can Manage Templates">
                              T
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* User Modal */}
      <AnimatePresence>
        {showUserModal && editingUser && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowUserModal(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white px-6 py-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{editingUser.id ? 'Edit User' : 'Add New User'}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveUser}
                      className="px-4 py-2 bg-white text-sompo-red rounded-lg hover:bg-gray-100 font-medium flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setShowUserModal(false)}
                      className="text-white hover:bg-white/20 rounded-full p-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 border-b pb-2">Basic Information</h4>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={editingUser.name}
                          onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={editingUser.phone}
                          onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <select
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                        <select
                          value={editingUser.team}
                          onChange={(e) => setEditingUser({...editingUser, team: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                        >
                          {teams.map((team) => (
                            <option key={team} value={team}>{team}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={editingUser.status}
                          onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* LOB Assignments & Permissions */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 border-b pb-2">LOB Assignments</h4>
                      <div className="space-y-2">
                        {lobs.map((lob) => (
                          <label key={lob} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editingUser.lobs.includes(lob)}
                              onChange={() => toggleLob(lob)}
                              className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red"
                            />
                            <span className="ml-2 text-sm text-gray-700">{lob}</span>
                          </label>
                        ))}
                      </div>

                      <h4 className="font-semibold text-gray-900 border-b pb-2 mt-6">Permissions</h4>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Line Size (USD)</label>
                        <input
                          type="number"
                          value={editingUser.permissions.maxLineSize}
                          onChange={(e) => setEditingUser({
                            ...editingUser,
                            permissions: {...editingUser.permissions, maxLineSize: parseInt(e.target.value)}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingUser.permissions.canApprove}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              permissions: {...editingUser.permissions, canApprove: e.target.checked}
                            })}
                            className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red"
                          />
                          <span className="ml-2 text-sm text-gray-700">Can Approve Submissions</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingUser.permissions.canDecline}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              permissions: {...editingUser.permissions, canDecline: e.target.checked}
                            })}
                            className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red"
                          />
                          <span className="ml-2 text-sm text-gray-700">Can Decline Submissions</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingUser.permissions.requiresPeerReview}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              permissions: {...editingUser.permissions, requiresPeerReview: e.target.checked}
                            })}
                            className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red"
                          />
                          <span className="ml-2 text-sm text-gray-700">Requires Peer Review</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingUser.permissions.canAccessReports}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              permissions: {...editingUser.permissions, canAccessReports: e.target.checked}
                            })}
                            className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red"
                          />
                          <span className="ml-2 text-sm text-gray-700">Can Access Reports</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingUser.permissions.canManageTemplates}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              permissions: {...editingUser.permissions, canManageTemplates: e.target.checked}
                            })}
                            className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red"
                          />
                          <span className="ml-2 text-sm text-gray-700">Can Manage Templates</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}

export default UserManagement
