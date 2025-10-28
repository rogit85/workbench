import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  AlertTriangle,
  Save,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Edit,
  Plus,
  Trash2
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const SanctionsConfig = () => {
  const [expandedCategory, setExpandedCategory] = useState('peps')

  const [sanctionsConfig, setSanctionsConfig] = useState({
    peps: [
      {
        id: 1,
        name: 'Foreign PEP - Level 1',
        description: 'Senior government officials, politicians, and high-ranking military',
        riskScore: 100,
        requiresApproval: true,
        approvalLevel: 'SVP',
        blockAutoQuote: true,
        requiresRating: true,
        enabled: true
      },
      {
        id: 2,
        name: 'Foreign PEP - Level 2',
        description: 'Immediate family members of Level 1 PEPs',
        riskScore: 85,
        requiresApproval: true,
        approvalLevel: 'VP',
        blockAutoQuote: true,
        requiresRating: true,
        enabled: true
      },
      {
        id: 3,
        name: 'Foreign PEP - Level 3',
        description: 'Close associates of Level 1 PEPs',
        riskScore: 70,
        requiresApproval: true,
        approvalLevel: 'Head of Underwriting',
        blockAutoQuote: false,
        requiresRating: true,
        enabled: true
      },
      {
        id: 4,
        name: 'Domestic PEP',
        description: 'Domestic politically exposed persons',
        riskScore: 60,
        requiresApproval: true,
        approvalLevel: 'Senior Underwriter',
        blockAutoQuote: false,
        requiresRating: false,
        enabled: true
      },
      {
        id: 5,
        name: 'International Organization PEP',
        description: 'Senior management of international organizations',
        riskScore: 55,
        requiresApproval: true,
        approvalLevel: 'Senior Underwriter',
        blockAutoQuote: false,
        requiresRating: false,
        enabled: true
      }
    ],
    sanctions: [
      {
        id: 1,
        name: 'OFAC - SDN List',
        description: 'US Treasury Specially Designated Nationals',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      },
      {
        id: 2,
        name: 'UN Security Council',
        description: 'United Nations sanctions list',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      },
      {
        id: 3,
        name: 'EU Sanctions',
        description: 'European Union consolidated sanctions list',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      },
      {
        id: 4,
        name: 'UK OFSI',
        description: 'UK Office of Financial Sanctions Implementation',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      },
      {
        id: 5,
        name: 'Sectoral Sanctions',
        description: 'Sector-specific economic sanctions',
        riskScore: 80,
        requiresApproval: true,
        approvalLevel: 'SVP',
        blockAutoQuote: true,
        requiresRating: true,
        enabled: true
      }
    ],
    terrorist: [
      {
        id: 1,
        name: 'FBI Most Wanted Terrorists',
        description: 'FBI\'s list of most wanted terrorists',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      },
      {
        id: 2,
        name: 'OFAC - Terrorism List',
        description: 'Specially Designated Global Terrorists',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      },
      {
        id: 3,
        name: 'EU Terrorism List',
        description: 'European Union terrorist financing watch list',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      },
      {
        id: 4,
        name: 'UK Proscribed Organizations',
        description: 'UK Home Office list of proscribed terrorist organizations',
        riskScore: 100,
        requiresApproval: false,
        approvalLevel: 'Auto-Decline',
        blockAutoQuote: true,
        requiresRating: false,
        enabled: true
      }
    ],
    adverse: [
      {
        id: 1,
        name: 'Financial Crime',
        description: 'Money laundering, fraud, bribery, corruption',
        riskScore: 90,
        requiresApproval: true,
        approvalLevel: 'VP',
        blockAutoQuote: true,
        requiresRating: true,
        enabled: true
      },
      {
        id: 2,
        name: 'Regulatory Actions',
        description: 'Enforcement actions by regulatory bodies',
        riskScore: 75,
        requiresApproval: true,
        approvalLevel: 'Head of Underwriting',
        blockAutoQuote: false,
        requiresRating: true,
        enabled: true
      },
      {
        id: 3,
        name: 'Legal Proceedings',
        description: 'Ongoing litigation and legal disputes',
        riskScore: 60,
        requiresApproval: true,
        approvalLevel: 'Senior Underwriter',
        blockAutoQuote: false,
        requiresRating: false,
        enabled: true
      },
      {
        id: 4,
        name: 'Negative Media',
        description: 'Adverse media coverage and reputational risk',
        riskScore: 50,
        requiresApproval: false,
        approvalLevel: 'None',
        blockAutoQuote: false,
        requiresRating: false,
        enabled: true
      }
    ]
  })

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category)
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

  const getCategoryDescription = (category) => {
    const descriptions = {
      peps: 'Configure risk scoring and approval requirements for politically exposed persons',
      sanctions: 'International sanctions lists and embargoed entities',
      terrorist: 'Terrorism financing and watchlist screening',
      adverse: 'Adverse media, legal proceedings, and reputational risk factors'
    }
    return descriptions[category] || ''
  }

  const getRiskColor = (score) => {
    if (score >= 90) return 'text-red-700 bg-red-100 border-red-300'
    if (score >= 70) return 'text-orange-700 bg-orange-100 border-orange-300'
    if (score >= 50) return 'text-amber-700 bg-amber-100 border-amber-300'
    return 'text-yellow-700 bg-yellow-100 border-yellow-300'
  }

  const getApprovalColor = (level) => {
    if (level === 'Auto-Decline') return 'bg-red-600'
    if (level === 'SVP') return 'bg-purple-600'
    if (level === 'VP') return 'bg-indigo-600'
    if (level === 'Head of Underwriting') return 'bg-blue-600'
    if (level === 'Senior Underwriter') return 'bg-cyan-600'
    return 'bg-gray-600'
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
                  <Shield className="w-8 h-8 text-sompo-red" />
                  Sanctions & Screening Configuration
                </h1>
                <p className="text-gray-600">Configure sanctions lists, PEP screening, and risk scoring thresholds</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <div className="space-y-4">
            {Object.entries(sanctionsConfig).map(([category, rules]) => {
              const isExpanded = expandedCategory === category
              const enabledCount = rules.filter(r => r.enabled).length
              const autoDeclineCount = rules.filter(r => r.approvalLevel === 'Auto-Decline' && r.enabled).length

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-sompo-red" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-sompo-red" />
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sompo-red to-sompo-dark-red rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-gray-900">{getCategoryLabel(category)}</h3>
                          <p className="text-sm text-gray-600">{getCategoryDescription(category)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-gray-600">
                        {enabledCount}/{rules.length} Enabled
                      </div>
                      {autoDeclineCount > 0 && (
                        <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                          {autoDeclineCount} Auto-Decline
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Rules */}
                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      <div className="p-6 space-y-4">
                        {rules.map((rule) => (
                          <div
                            key={rule.id}
                            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-base font-semibold text-gray-900">{rule.name}</h4>
                                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${getRiskColor(rule.riskScore)}`}>
                                    Risk Score: {rule.riskScore}
                                  </span>
                                  {rule.blockAutoQuote && (
                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                                      Block Auto-Quote
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{rule.description}</p>
                              </div>

                              {/* Enable/Disable Toggle */}
                              <label className="flex items-center gap-2 cursor-pointer">
                                <span className="text-sm text-gray-700">Enabled</span>
                                <button
                                  onClick={() => updateRule(category, rule.id, { enabled: !rule.enabled })}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    rule.enabled ? 'bg-green-600' : 'bg-gray-300'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      rule.enabled ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              </label>
                            </div>

                            {/* Configuration Grid */}
                            <div className="grid grid-cols-4 gap-4">
                              {/* Risk Score */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Risk Score</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={rule.riskScore}
                                  onChange={(e) => updateRule(category, rule.id, { riskScore: parseInt(e.target.value) })}
                                  disabled={!rule.enabled}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                              </div>

                              {/* Approval Level */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Approval Level</label>
                                <select
                                  value={rule.approvalLevel}
                                  onChange={(e) => updateRule(category, rule.id, { approvalLevel: e.target.value })}
                                  disabled={!rule.enabled}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                  <option value="Auto-Decline">Auto-Decline</option>
                                  <option value="SVP">SVP</option>
                                  <option value="VP">VP</option>
                                  <option value="Head of Underwriting">Head of Underwriting</option>
                                  <option value="Senior Underwriter">Senior Underwriter</option>
                                  <option value="None">None</option>
                                </select>
                              </div>

                              {/* Requires Rating */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Requires Rating</label>
                                <label className="flex items-center gap-2 cursor-pointer mt-2">
                                  <input
                                    type="checkbox"
                                    checked={rule.requiresRating}
                                    onChange={(e) => updateRule(category, rule.id, { requiresRating: e.target.checked })}
                                    disabled={!rule.enabled}
                                    className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red disabled:opacity-50"
                                  />
                                  <span className="text-sm text-gray-700">Yes</span>
                                </label>
                              </div>

                              {/* Block Auto-Quote */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Block Auto-Quote</label>
                                <label className="flex items-center gap-2 cursor-pointer mt-2">
                                  <input
                                    type="checkbox"
                                    checked={rule.blockAutoQuote}
                                    onChange={(e) => updateRule(category, rule.id, { blockAutoQuote: e.target.checked })}
                                    disabled={!rule.enabled}
                                    className="w-4 h-4 text-sompo-red border-gray-300 rounded focus:ring-sompo-red disabled:opacity-50"
                                  />
                                  <span className="text-sm text-gray-700">Yes</span>
                                </label>
                              </div>
                            </div>

                            {/* Approval Indicator */}
                            {rule.requiresApproval && rule.enabled && (
                              <div className="mt-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                <span className="text-sm text-gray-700">
                                  Submissions matching this rule require{' '}
                                  <span className={`px-2 py-0.5 rounded text-white text-xs font-semibold ${getApprovalColor(rule.approvalLevel)}`}>
                                    {rule.approvalLevel}
                                  </span>
                                  {' '}approval
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
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
