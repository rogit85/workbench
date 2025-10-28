import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  AlertTriangle,
  Save,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Check,
  X
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const SanctionsConfig = () => {
  const [expandedCategories, setExpandedCategories] = useState(['peps', 'sanctions', 'terrorist', 'adverse'])

  const [sanctionsConfig, setSanctionsConfig] = useState({
    peps: [
      { id: 1, name: 'Foreign PEP - Level 1', description: 'Senior government officials, politicians, high-ranking military', riskScore: 100, approvalLevel: 'SVP', blockAutoQuote: true, requiresRating: true, enabled: true },
      { id: 2, name: 'Foreign PEP - Level 2', description: 'Immediate family members of Level 1 PEPs', riskScore: 85, approvalLevel: 'VP', blockAutoQuote: true, requiresRating: true, enabled: true },
      { id: 3, name: 'Foreign PEP - Level 3', description: 'Close associates of Level 1 PEPs', riskScore: 70, approvalLevel: 'Head of Underwriting', blockAutoQuote: false, requiresRating: true, enabled: true },
      { id: 4, name: 'Domestic PEP', description: 'Domestic politically exposed persons', riskScore: 60, approvalLevel: 'Senior Underwriter', blockAutoQuote: false, requiresRating: false, enabled: true },
      { id: 5, name: 'International Organization PEP', description: 'Senior management of international organizations', riskScore: 55, approvalLevel: 'Senior Underwriter', blockAutoQuote: false, requiresRating: false, enabled: true }
    ],
    sanctions: [
      { id: 1, name: 'OFAC - SDN List', description: 'US Treasury Specially Designated Nationals', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true },
      { id: 2, name: 'UN Security Council', description: 'United Nations sanctions list', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true },
      { id: 3, name: 'EU Sanctions', description: 'European Union consolidated sanctions list', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true },
      { id: 4, name: 'UK OFSI', description: 'UK Office of Financial Sanctions Implementation', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true },
      { id: 5, name: 'Sectoral Sanctions', description: 'Sector-specific economic sanctions', riskScore: 80, approvalLevel: 'SVP', blockAutoQuote: true, requiresRating: true, enabled: true }
    ],
    terrorist: [
      { id: 1, name: 'FBI Most Wanted Terrorists', description: 'FBI\'s list of most wanted terrorists', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true },
      { id: 2, name: 'OFAC - Terrorism List', description: 'Specially Designated Global Terrorists', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true },
      { id: 3, name: 'EU Terrorism List', description: 'European Union terrorist financing watch list', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true },
      { id: 4, name: 'UK Proscribed Organizations', description: 'UK Home Office list of proscribed terrorist organizations', riskScore: 100, approvalLevel: 'Auto-Decline', blockAutoQuote: true, requiresRating: false, enabled: true }
    ],
    adverse: [
      { id: 1, name: 'Financial Crime', description: 'Money laundering, fraud, bribery, corruption', riskScore: 90, approvalLevel: 'VP', blockAutoQuote: true, requiresRating: true, enabled: true },
      { id: 2, name: 'Regulatory Actions', description: 'Enforcement actions by regulatory bodies', riskScore: 75, approvalLevel: 'Head of Underwriting', blockAutoQuote: false, requiresRating: true, enabled: true },
      { id: 3, name: 'Legal Proceedings', description: 'Ongoing litigation and legal disputes', riskScore: 60, approvalLevel: 'Senior Underwriter', blockAutoQuote: false, requiresRating: false, enabled: true },
      { id: 4, name: 'Negative Media', description: 'Adverse media coverage and reputational risk', riskScore: 50, approvalLevel: 'None', blockAutoQuote: false, requiresRating: false, enabled: true }
    ]
  })

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const updateRule = (category, ruleId, updates) => {
    setSanctionsConfig(prev => ({
      ...prev,
      [category]: prev[category].map(rule =>
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    }))
  }

  const handleSave = () => {
    alert('Sanctions configuration saved successfully!')
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default settings?')) {
      alert('Settings reset to defaults')
    }
  }

  const getCategoryLabel = (category) => {
    const labels = {
      peps: 'Politically Exposed Persons (PEPs)',
      sanctions: 'Sanctions Lists',
      terrorist: 'Terrorist & Watchlists',
      adverse: 'Adverse Media & Legal'
    }
    return labels[category] || category
  }

  const getRiskColor = (score) => {
    if (score >= 90) return 'bg-red-100 text-red-700 border-red-300'
    if (score >= 70) return 'bg-orange-100 text-orange-700 border-orange-300'
    if (score >= 50) return 'bg-amber-100 text-amber-700 border-amber-300'
    return 'bg-yellow-100 text-yellow-700 border-yellow-300'
  }

  const getApprovalColor = (level) => {
    if (level === 'Auto-Decline') return 'bg-red-600 text-white'
    if (level === 'SVP') return 'bg-purple-600 text-white'
    if (level === 'VP') return 'bg-indigo-600 text-white'
    if (level === 'Head of Underwriting') return 'bg-blue-600 text-white'
    if (level === 'Senior Underwriter') return 'bg-cyan-600 text-white'
    return 'bg-gray-600 text-white'
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold gradient-text mb-1 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-sompo-red" />
                  Sanctions & Screening Configuration
                </h1>
                <p className="text-sm text-gray-600">Configure sanctions lists, PEP screening, and risk scoring</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-sm bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 text-sm bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>

          {/* Categories - Compact Table View */}
          <div className="space-y-3">
            {Object.entries(sanctionsConfig).map(([category, rules]) => {
              const isExpanded = expandedCategories.includes(category)
              const enabledCount = rules.filter(r => r.enabled).length
              const autoDeclineCount = rules.filter(r => r.approvalLevel === 'Auto-Decline' && r.enabled).length

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                >
                  {/* Category Header - Compact */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors bg-gray-50 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-sompo-red flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-sompo-red flex-shrink-0" />
                      )}
                      <Shield className="w-4 h-4 text-sompo-red flex-shrink-0" />
                      <h3 className="text-sm font-semibold text-gray-900">{getCategoryLabel(category)}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-gray-600">{enabledCount}/{rules.length} enabled</span>
                      {autoDeclineCount > 0 && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-medium">
                          {autoDeclineCount} auto-decline
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Compact Table */}
                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Rule Name</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Description</th>
                            <th className="px-3 py-2 text-center font-semibold text-gray-700">Risk</th>
                            <th className="px-3 py-2 text-center font-semibold text-gray-700">Approval Level</th>
                            <th className="px-3 py-2 text-center font-semibold text-gray-700">Block Quote</th>
                            <th className="px-3 py-2 text-center font-semibold text-gray-700">Rating</th>
                            <th className="px-3 py-2 text-center font-semibold text-gray-700">Enabled</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {rules.map((rule) => (
                            <tr key={rule.id} className={`hover:bg-gray-50 ${!rule.enabled ? 'opacity-50' : ''}`}>
                              <td className="px-3 py-2 font-medium text-gray-900">{rule.name}</td>
                              <td className="px-3 py-2 text-gray-600">{rule.description}</td>
                              <td className="px-3 py-2 text-center">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={rule.riskScore}
                                  onChange={(e) => updateRule(category, rule.id, { riskScore: parseInt(e.target.value) || 0 })}
                                  disabled={!rule.enabled}
                                  className={`w-16 px-2 py-1 text-center border border-gray-300 rounded text-xs font-semibold ${getRiskColor(rule.riskScore)} ${
                                    !rule.enabled ? 'cursor-not-allowed' : ''
                                  }`}
                                />
                              </td>
                              <td className="px-3 py-2 text-center">
                                <select
                                  value={rule.approvalLevel}
                                  onChange={(e) => updateRule(category, rule.id, { approvalLevel: e.target.value })}
                                  disabled={!rule.enabled}
                                  className={`px-2 py-1 rounded text-xs font-semibold ${getApprovalColor(rule.approvalLevel)} ${
                                    !rule.enabled ? 'cursor-not-allowed opacity-50' : ''
                                  }`}
                                >
                                  <option value="Auto-Decline">Auto-Decline</option>
                                  <option value="SVP">SVP</option>
                                  <option value="VP">VP</option>
                                  <option value="Head of Underwriting">Head UW</option>
                                  <option value="Senior Underwriter">Senior UW</option>
                                  <option value="None">None</option>
                                </select>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <button
                                  onClick={() => updateRule(category, rule.id, { blockAutoQuote: !rule.blockAutoQuote })}
                                  disabled={!rule.enabled}
                                  className={`inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors ${
                                    !rule.enabled ? 'opacity-30 cursor-not-allowed' : ''
                                  }`}
                                >
                                  {rule.blockAutoQuote ? (
                                    <Check className="w-4 h-4 text-red-600" />
                                  ) : (
                                    <X className="w-4 h-4 text-gray-300" />
                                  )}
                                </button>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <button
                                  onClick={() => updateRule(category, rule.id, { requiresRating: !rule.requiresRating })}
                                  disabled={!rule.enabled}
                                  className={`inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors ${
                                    !rule.enabled ? 'opacity-30 cursor-not-allowed' : ''
                                  }`}
                                >
                                  {rule.requiresRating ? (
                                    <Check className="w-4 h-4 text-amber-600" />
                                  ) : (
                                    <X className="w-4 h-4 text-gray-300" />
                                  )}
                                </button>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <button
                                  onClick={() => updateRule(category, rule.id, { enabled: !rule.enabled })}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                                >
                                  {rule.enabled ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <X className="w-4 h-4 text-gray-400" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default SanctionsConfig
