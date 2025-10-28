import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Settings,
  Save,
  RotateCcw,
  Filter,
  Check,
  X
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const FieldVisibility = () => {
  const [selectedLob, setSelectedLob] = useState('Property')

  const lobs = [
    'Property',
    'Casualty',
    'Marine',
    'Aviation',
    'Energy',
    'Cyber',
    'Financial Institutions',
    'Healthcare Liability',
    'Life Sciences',
    'Management Liability'
  ]

  const [fieldSettings, setFieldSettings] = useState({
    Property: {
      client: [
        { field: 'insured', label: 'Insured Name', visible: true, required: true },
        { field: 'insuredAddress', label: 'Insured Address', visible: true, required: true },
        { field: 'insuredCountry', label: 'Insured Country', visible: true, required: true },
        { field: 'domicile', label: 'Domicile', visible: true, required: true },
        { field: 'accountNo', label: 'Account Number', visible: true, required: false },
        { field: 'dunsNumber', label: 'DUNS Number', visible: true, required: false },
        { field: 'sector', label: 'Sector/Industry', visible: true, required: true },
        { field: 'occupancy', label: 'Occupancy', visible: true, required: true }
      ],
      policy: [
        { field: 'inceptionDate', label: 'Inception Date', visible: true, required: true },
        { field: 'expiryDate', label: 'Expiry Date', visible: true, required: true },
        { field: 'coverage', label: 'Coverage Type', visible: true, required: true },
        { field: 'newRenewal', label: 'New/Renewal', visible: true, required: true },
        { field: 'attachmentType', label: 'Attachment Type', visible: true, required: true },
        { field: 'placementType', label: 'Placement Type', visible: true, required: false },
        { field: 'writtenSince', label: 'Written Since (YYYY)', visible: true, required: false }
      ],
      financial: [
        { field: 'limit', label: 'Limit', visible: true, required: true },
        { field: 'limitCurrency', label: 'Limit Currency', visible: true, required: true },
        { field: 'excess', label: 'Excess', visible: true, required: false },
        { field: 'primaryDeductible', label: 'Primary Deductible', visible: true, required: true },
        { field: 'totalAssetsCurrent', label: 'Total Assets (Current)', visible: true, required: false },
        { field: 'annualRevenueCurrent', label: 'Annual Revenue (Current)', visible: true, required: false },
        { field: 'brokerage', label: 'Brokerage', visible: true, required: false }
      ],
      risk: [
        { field: 'riskLevel', label: 'Risk Level', visible: true, required: false },
        { field: 'riskProbability', label: 'Risk Probability', visible: true, required: false },
        { field: 'vulnerabilityPoints', label: 'Vulnerability Points', visible: true, required: false },
        { field: 'mitigationStrategies', label: 'Mitigation Strategies', visible: true, required: false }
      ],
      compliance: [
        { field: 'regulatoryClassification', label: 'Regulatory Classification', visible: true, required: false },
        { field: 'complianceRequirements', label: 'Compliance Requirements', visible: true, required: false },
        { field: 'sanctionsStatus', label: 'Sanctions Status', visible: true, required: true },
        { field: 'legalJurisdictions', label: 'Legal Jurisdictions', visible: true, required: false }
      ],
      governance: [
        { field: 'ownership', label: 'Ownership', visible: true, required: false },
        { field: 'listingType', label: 'Listing Type', visible: true, required: false },
        { field: 'boardExperience', label: 'Board Experience', visible: false, required: false },
        { field: 'corporateGovernance', label: 'Corporate Governance', visible: false, required: false }
      ]
    },
    Casualty: {
      client: [
        { field: 'insured', label: 'Insured Name', visible: true, required: true },
        { field: 'insuredAddress', label: 'Insured Address', visible: true, required: true },
        { field: 'insuredCountry', label: 'Insured Country', visible: true, required: true },
        { field: 'domicile', label: 'Domicile', visible: true, required: true },
        { field: 'accountNo', label: 'Account Number', visible: true, required: false },
        { field: 'dunsNumber', label: 'DUNS Number', visible: true, required: false },
        { field: 'sector', label: 'Sector/Industry', visible: true, required: true },
        { field: 'occupancy', label: 'Occupancy', visible: true, required: true }
      ],
      policy: [
        { field: 'inceptionDate', label: 'Inception Date', visible: true, required: true },
        { field: 'expiryDate', label: 'Expiry Date', visible: true, required: true },
        { field: 'coverage', label: 'Coverage Type', visible: true, required: true },
        { field: 'newRenewal', label: 'New/Renewal', visible: true, required: true },
        { field: 'attachmentType', label: 'Attachment Type', visible: true, required: true },
        { field: 'placementType', label: 'Placement Type', visible: true, required: false },
        { field: 'writtenSince', label: 'Written Since (YYYY)', visible: true, required: false }
      ],
      financial: [
        { field: 'limit', label: 'Limit', visible: true, required: true },
        { field: 'limitCurrency', label: 'Limit Currency', visible: true, required: true },
        { field: 'excess', label: 'Excess', visible: true, required: true },
        { field: 'primaryDeductible', label: 'Primary Deductible', visible: true, required: true },
        { field: 'totalAssetsCurrent', label: 'Total Assets (Current)', visible: true, required: false },
        { field: 'annualRevenueCurrent', label: 'Annual Revenue (Current)', visible: true, required: false },
        { field: 'brokerage', label: 'Brokerage', visible: true, required: false }
      ],
      risk: [
        { field: 'riskLevel', label: 'Risk Level', visible: true, required: false },
        { field: 'riskProbability', label: 'Risk Probability', visible: true, required: false },
        { field: 'vulnerabilityPoints', label: 'Vulnerability Points', visible: true, required: false },
        { field: 'mitigationStrategies', label: 'Mitigation Strategies', visible: true, required: false }
      ],
      compliance: [
        { field: 'regulatoryClassification', label: 'Regulatory Classification', visible: true, required: false },
        { field: 'complianceRequirements', label: 'Compliance Requirements', visible: true, required: false },
        { field: 'sanctionsStatus', label: 'Sanctions Status', visible: true, required: true },
        { field: 'legalJurisdictions', label: 'Legal Jurisdictions', visible: true, required: false }
      ],
      governance: [
        { field: 'ownership', label: 'Ownership', visible: true, required: false },
        { field: 'listingType', label: 'Listing Type', visible: true, required: false },
        { field: 'boardExperience', label: 'Board Experience', visible: false, required: false },
        { field: 'corporateGovernance', label: 'Corporate Governance', visible: false, required: false }
      ]
    }
  })

  const toggleFieldVisibility = (category, fieldIndex) => {
    setFieldSettings(prev => ({
      ...prev,
      [selectedLob]: {
        ...prev[selectedLob],
        [category]: prev[selectedLob][category].map((field, idx) =>
          idx === fieldIndex ? { ...field, visible: !field.visible } : field
        )
      }
    }))
  }

  const toggleFieldRequired = (category, fieldIndex) => {
    setFieldSettings(prev => ({
      ...prev,
      [selectedLob]: {
        ...prev[selectedLob],
        [category]: prev[selectedLob][category].map((field, idx) =>
          idx === fieldIndex ? { ...field, required: !field.required } : field
        )
      }
    }))
  }

  const handleSave = () => {
    alert('Field visibility settings saved successfully!')
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default settings?')) {
      alert('Settings reset to defaults')
    }
  }

  const getCategoryLabel = (category) => {
    const labels = {
      client: 'Client & Counterparty',
      policy: 'Policy Information',
      financial: 'Financial & Premium',
      risk: 'Risk Assessment',
      compliance: 'Compliance & Regulatory',
      governance: 'Corporate Governance'
    }
    return labels[category] || category
  }

  const currentLobSettings = fieldSettings[selectedLob] || fieldSettings['Property']

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
                  <Eye className="w-6 h-6 text-sompo-red" />
                  Field Visibility Configuration
                </h1>
                <p className="text-sm text-gray-600">Configure field visibility and requirements by LOB</p>
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

            {/* LOB Selector - Compact */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-sompo-red" />
                <label className="text-xs font-semibold text-gray-900">Line of Business</label>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {lobs.map((lob) => (
                  <button
                    key={lob}
                    onClick={() => setSelectedLob(lob)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      selectedLob === lob
                        ? 'bg-sompo-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lob}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Compact Table View */}
          <div className="space-y-4">
            {Object.entries(currentLobSettings).map(([category, fields]) => {
              const visibleCount = fields.filter(f => f.visible).length
              const requiredCount = fields.filter(f => f.required).length

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                >
                  {/* Category Header - Compact */}
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-sompo-red" />
                      <h3 className="text-sm font-semibold text-gray-900">{getCategoryLabel(category)}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{visibleCount}/{fields.length} visible</span>
                      <span>{requiredCount}/{fields.length} required</span>
                    </div>
                  </div>

                  {/* Compact Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Field Name</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Field ID</th>
                          <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">Visible</th>
                          <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">Required</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {fields.map((field, idx) => (
                          <tr key={field.field} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-900">{field.label}</td>
                            <td className="px-4 py-2 text-xs text-gray-500 font-mono">{field.field}</td>
                            <td className="px-4 py-2 text-center">
                              <button
                                onClick={() => toggleFieldVisibility(category, idx)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                              >
                                {field.visible ? (
                                  <Eye className="w-4 h-4 text-green-600" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button
                                onClick={() => toggleFieldRequired(category, idx)}
                                disabled={!field.visible}
                                className={`inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors ${
                                  !field.visible ? 'opacity-30 cursor-not-allowed' : ''
                                }`}
                              >
                                {field.required && field.visible ? (
                                  <Check className="w-4 h-4 text-amber-600" />
                                ) : (
                                  <X className="w-4 h-4 text-gray-300" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default FieldVisibility
