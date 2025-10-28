import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Plus, Trash2, Save, Send, X, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const Configuration = () => {
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  // Appetite Builder State
  const [appetiteRules, setAppetiteRules] = useState([])
  const [currentRule, setCurrentRule] = useState({
    field: 'LOB',
    operator: 'is',
    value: '',
    outcome: 'Accept',
    rationale: ''
  })

  const [appetiteTemplates, setAppetiteTemplates] = useState([
    {
      id: 'at1',
      name: 'Property Core v1',
      description: 'UK retail, core hazard',
      status: 'Draft',
      rules: [
        { field: 'LOB', operator: 'is', value: 'Property', outcome: 'Accept', rationale: 'In-core' },
        { field: 'TIV', operator: '<=', value: '250000000', outcome: 'Accept', rationale: 'Cap line size' },
        { field: 'Sprinklered', operator: 'is', value: 'true', outcome: 'Accept', rationale: 'HPR standard' },
        { field: 'NatCatZone', operator: '!=', value: 'A', outcome: 'Refer', rationale: 'Flood referral' }
      ]
    },
    {
      id: 'at2',
      name: 'Aviation - Airlines',
      description: 'Aviation Airlines Underwriting Guidelines 2025',
      status: 'Approved',
      rules: [
        { field: 'LOB', operator: 'is', value: 'Aviation', outcome: 'Accept', rationale: 'Aviation appetite' },
        { field: 'Aviation Subclass', operator: 'is', value: 'Airlines', outcome: 'Accept', rationale: 'Airlines subclass' },
        { field: 'IATA Member', operator: 'is', value: 'Yes', outcome: 'Accept', rationale: 'Focus on IATA members with proven safety processes' },
        { field: 'Line Size USD', operator: '<=', value: '150000000', outcome: 'Accept', rationale: 'Max line USD150m for Airlines' },
        { field: 'Line %', operator: '<=', value: '5', outcome: 'Accept', rationale: 'Max 5% line for Airlines' },
        { field: 'Commission %', operator: '<=', value: '25', outcome: 'Accept', rationale: 'Max commission 25% for Airlines (except fronting)' },
        { field: 'Line Size USD', operator: '>', value: '100000000', outcome: 'Refer', rationale: 'Line exceeds USD100m - SVP referral required' },
        { field: 'EPI USD', operator: '>', value: '1000000', outcome: 'Refer', rationale: 'EPI exceeds USD1m - SVP referral required' },
        { field: 'Reinsurance Coverage', operator: 'is', value: 'No', outcome: 'Refer', rationale: 'Risk not covered by reinsurance programme - Head of Division referral' },
        { field: 'Rate Reduction %', operator: '>', value: '10', outcome: 'Refer', rationale: 'Rate reduction exceeds 10% - Head of Division referral' },
        { field: 'High Attrition', operator: 'is', value: 'Yes', outcome: 'Decline', rationale: 'Avoid high attrition/frequency accounts without adequate deductibles' }
      ]
    },
    {
      id: 'at3',
      name: 'Aviation - Aerospace',
      description: 'Aviation Aerospace Underwriting Guidelines 2025',
      status: 'Approved',
      rules: [
        { field: 'LOB', operator: 'is', value: 'Aviation', outcome: 'Accept', rationale: 'Aviation appetite' },
        { field: 'Aviation Subclass', operator: 'is', value: 'Aerospace', outcome: 'Accept', rationale: 'Aerospace subclass' },
        { field: 'Line Size USD', operator: '<=', value: '150000000', outcome: 'Accept', rationale: 'Max line USD150m for Aerospace' },
        { field: 'Line %', operator: '<=', value: '10', outcome: 'Accept', rationale: 'Max 10% line for Aerospace' },
        { field: 'Commission % - Facility', operator: '<=', value: '35', outcome: 'Accept', rationale: 'Max commission 35% for facility business' },
        { field: 'Commission % - Direct', operator: '<=', value: '27.5', outcome: 'Accept', rationale: 'Max commission 27.5% for direct and facultative' },
        { field: 'Airport Management', operator: 'is', value: 'Yes', outcome: 'Accept', rationale: 'Focus on Airport Management companies that sub-contract services' },
        { field: 'Line Size USD', operator: '>', value: '100000000', outcome: 'Refer', rationale: 'Line exceeds USD100m - SVP referral required' },
        { field: 'High Attrition', operator: 'is', value: 'Yes', outcome: 'Decline', rationale: 'Avoid high attrition/frequency accounts without adequate deductibles' }
      ]
    },
    {
      id: 'at4',
      name: 'Aviation - General Aviation',
      description: 'General Aviation Underwriting Guidelines 2025',
      status: 'Approved',
      rules: [
        { field: 'LOB', operator: 'is', value: 'Aviation', outcome: 'Accept', rationale: 'Aviation appetite' },
        { field: 'Aviation Subclass', operator: 'is', value: 'General Aviation', outcome: 'Accept', rationale: 'General Aviation subclass' },
        { field: 'Line Size USD', operator: '<=', value: '50000000', outcome: 'Accept', rationale: 'Max line USD50m for General Aviation' },
        { field: 'Line %', operator: '<=', value: '20', outcome: 'Accept', rationale: 'Max 20% line for General Aviation' },
        { field: 'Commission % - Facility', operator: '<=', value: '35', outcome: 'Accept', rationale: 'Max commission 35% for facility business' },
        { field: 'Commission % - Direct', operator: '<=', value: '27.5', outcome: 'Accept', rationale: 'Max commission 27.5% for direct and facultative' },
        { field: 'High Attrition', operator: 'is', value: 'Yes', outcome: 'Decline', rationale: 'Avoid high attrition/frequency accounts without adequate deductibles' }
      ]
    },
    {
      id: 'at5',
      name: 'Aviation - War',
      description: 'Aviation War Underwriting Guidelines 2025',
      status: 'Approved',
      rules: [
        { field: 'LOB', operator: 'is', value: 'Aviation', outcome: 'Accept', rationale: 'Aviation appetite' },
        { field: 'Aviation Subclass', operator: 'is', value: 'War', outcome: 'Accept', rationale: 'War subclass' },
        { field: 'Cover Type', operator: 'is', value: 'Liability', outcome: 'Accept', rationale: 'War liability coverage' },
        { field: 'Line Size USD - Liability', operator: '<=', value: '40000000', outcome: 'Accept', rationale: 'Max line USD40m for War liabilities' },
        { field: 'Line Size USD - Hull War', operator: '<=', value: '50000000', outcome: 'Accept', rationale: 'Max line USD50m aggregate for Hull War' },
        { field: 'Commission % - Facility', operator: '<=', value: '35', outcome: 'Accept', rationale: 'Max commission 35% for facility business' },
        { field: 'Route Structure', operator: 'is', value: 'Prudent', outcome: 'Accept', rationale: 'Focus on insureds with prudent route structure and dynamic risk assessment' },
        { field: 'Route Structure', operator: 'is', value: 'High Risk', outcome: 'Decline', rationale: 'Decline insureds with imprudent route structures' }
      ]
    }
  ])


  const fieldOptions = [
    'LOB', 'Geography', 'TIV', 'Construction', 'Sprinklered',
    'Occupancy', 'NatCatZone', 'Loss Ratio', 'Broker Tier',
    'Distance to Coast', 'Year Built',
    'Aviation Subclass', 'IATA Member', 'Line Size USD', 'Line %',
    'Commission %', 'Commission % - Facility', 'Commission % - Direct',
    'EPI USD', 'Reinsurance Coverage', 'Rate Reduction %',
    'High Attrition', 'Airport Management', 'Cover Type',
    'Line Size USD - Liability', 'Line Size USD - Hull War', 'Route Structure'
  ]

  const operatorOptions = [
    { value: 'is', label: 'is' },
    { value: 'in', label: 'in' },
    { value: '>=', label: '≥' },
    { value: '<=', label: '≤' },
    { value: 'between', label: 'between' },
    { value: 'contains', label: 'contains' },
    { value: '!=', label: 'is not' }
  ]

  const addAppetiteRule = () => {
    if (!currentRule.value.trim()) {
      alert('Please enter a value')
      return
    }
    setAppetiteRules([...appetiteRules, { ...currentRule }])
    setCurrentRule({ ...currentRule, value: '', rationale: '' })
  }

  const deleteAppetiteRule = (index) => {
    setAppetiteRules(appetiteRules.filter((_, i) => i !== index))
  }

  const saveAppetiteTemplate = () => {
    if (appetiteRules.length === 0) {
      alert('Add at least one rule')
      return
    }
    const name = prompt('Template name:') || `Appetite ${Date.now()}`
    const description = prompt('Description:') || ''
    setAppetiteTemplates([
      { id: `at${Date.now()}`, name, description, status: 'Draft', rules: [...appetiteRules] },
      ...appetiteTemplates
    ])
    setAppetiteRules([])
    alert('Template saved!')
  }

  const loadTemplateToBuilder = (template) => {
    setAppetiteRules([...template.rules])
    setShowTemplateModal(false)
  }

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'Accept': return 'bg-green-100 text-green-800 border-green-300'
      case 'Refer': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Decline': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-300'
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1680px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8 text-sompo-red" />
              Appetite Builder
            </h1>
            <p className="text-gray-600">Build and manage appetite rules for underwriting submissions</p>
          </div>

          {/* Appetite Builder */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Builder */}
              <div className="lg:col-span-2 space-y-6">
                {/* Build Rules Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Build Business Rules</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentRule({ field: 'LOB', operator: 'is', value: '', outcome: 'Accept', rationale: '' })}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Clear
                      </button>
                      <button
                        onClick={addAppetiteRule}
                        className="px-3 py-1.5 text-sm bg-sompo-red text-white rounded-lg hover:bg-sompo-dark-red flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Rule
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <select
                      value={currentRule.field}
                      onChange={(e) => setCurrentRule({ ...currentRule, field: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                    >
                      {fieldOptions.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <select
                      value={currentRule.operator}
                      onChange={(e) => setCurrentRule({ ...currentRule, operator: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                    >
                      {operatorOptions.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
                    </select>
                    <input
                      type="text"
                      value={currentRule.value}
                      onChange={(e) => setCurrentRule({ ...currentRule, value: e.target.value })}
                      placeholder="Value"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                    />
                    <select
                      value={currentRule.outcome}
                      onChange={(e) => setCurrentRule({ ...currentRule, outcome: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                    >
                      <option value="Accept">Accept</option>
                      <option value="Refer">Refer</option>
                      <option value="Decline">Decline</option>
                    </select>
                    <input
                      type="text"
                      value={currentRule.rationale}
                      onChange={(e) => setCurrentRule({ ...currentRule, rationale: e.target.value })}
                      placeholder="Rationale / commentary"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red col-span-2"
                    />
                  </div>

                  <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Rule Preview</div>
                    <div className="text-sm font-mono text-gray-900">
                      IF {currentRule.field} {currentRule.operator} {currentRule.value || '…'} THEN {currentRule.outcome}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">Current Rule Set</div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">#</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">When</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Outcome</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Rationale</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {appetiteRules.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="px-4 py-3 text-sm text-gray-500 text-center">No rules added.</td>
                            </tr>
                          ) : (
                            appetiteRules.map((rule, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-3 text-sm">{idx + 1}</td>
                                <td className="px-4 py-3 text-sm font-mono">{rule.field} {rule.operator} {rule.value}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getOutcomeColor(rule.outcome)}`}>
                                    {rule.outcome}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{rule.rationale || '—'}</td>
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => deleteAppetiteRule(idx)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Templates */}
              <div className="space-y-6">
                {/* Save Template Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Save as Template</h3>
                    <button
                      onClick={saveAppetiteTemplate}
                      className="px-3 py-1.5 text-sm bg-sompo-red text-white rounded-lg hover:bg-sompo-dark-red flex items-center gap-1"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Save your current rule set as a reusable template for future submissions.
                  </p>
                </motion.div>

                {/* My Templates Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">My Templates</h3>
                  <div className="space-y-3">
                    {appetiteTemplates.map(template => (
                      <div
                        key={template.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedTemplate(template)
                          setShowTemplateModal(true)
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{template.name}</div>
                            <div className="text-sm text-gray-600">{template.description}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(template.status)}`}>
                            {template.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">{template.rules.length} rules</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Detail Modal */}
      <AnimatePresence>
        {showTemplateModal && selectedTemplate && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowTemplateModal(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white px-6 py-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{selectedTemplate.name}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadTemplateToBuilder(selectedTemplate)}
                      className="px-3 py-1.5 text-sm bg-white text-sompo-red rounded-lg hover:bg-gray-100"
                    >
                      Load into Builder
                    </button>
                    <button onClick={() => setShowTemplateModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                  <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>
                  <div className="space-y-3">
                    {selectedTemplate.rules.map((rule, idx) => (
                      <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono">{rule.field} {rule.operator} {rule.value}</code>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getOutcomeColor(rule.outcome)}`}>
                            {rule.outcome}
                          </span>
                        </div>
                        {rule.rationale && <div className="text-sm text-gray-600">Rationale: {rule.rationale}</div>}
                      </div>
                    ))}
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

export default Configuration
