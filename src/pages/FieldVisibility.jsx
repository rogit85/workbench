import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Settings,
  Save,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Filter
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const FieldVisibility = () => {
  const [selectedLob, setSelectedLob] = useState('Property')
  const [expandedCategories, setExpandedCategories] = useState(['client', 'policy', 'financial'])

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
    // Add similar structures for other LOBs with different visibility defaults
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

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

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
      // Reset logic here
      alert('Settings reset to defaults')
    }
  }

  const getCategoryIcon = (category) => {
    return Settings
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
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
                  <Eye className="w-8 h-8 text-sompo-red" />
                  Field Visibility Configuration
                </h1>
                <p className="text-gray-600">Configure which fields are visible and required for each Line of Business</p>
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

            {/* LOB Selector */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-sompo-red" />
                <label className="text-sm font-semibold text-gray-900">Select Line of Business</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {lobs.map((lob) => (
                  <button
                    key={lob}
                    onClick={() => setSelectedLob(lob)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedLob === lob
                        ? 'bg-sompo-red text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lob}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Field Categories */}
          <div className="space-y-4">
            {Object.entries(currentLobSettings).map(([category, fields]) => {
              const isExpanded = expandedCategories.includes(category)
              const visibleCount = fields.filter(f => f.visible).length
              const requiredCount = fields.filter(f => f.required).length

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
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-sompo-red" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-sompo-red" />
                      )}
                      <Settings className="w-5 h-5 text-sompo-red" />
                      <h3 className="text-lg font-semibold text-gray-900">{getCategoryLabel(category)}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        {visibleCount}/{fields.length} Visible
                      </span>
                      <span className="text-gray-600">
                        {requiredCount}/{fields.length} Required
                      </span>
                    </div>
                  </button>

                  {/* Category Fields */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6">
                      <div className="space-y-3">
                        {fields.map((field, idx) => (
                          <div
                            key={field.field}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{field.label}</div>
                              <div className="text-xs text-gray-500">Field: {field.field}</div>
                            </div>

                            <div className="flex items-center gap-6">
                              {/* Visible Toggle */}
                              <label className="flex items-center gap-2 cursor-pointer">
                                <span className="text-sm text-gray-700 min-w-[60px]">Visible</span>
                                <button
                                  onClick={() => toggleFieldVisibility(category, idx)}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    field.visible ? 'bg-sompo-red' : 'bg-gray-300'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      field.visible ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                                {field.visible ? (
                                  <Eye className="w-4 h-4 text-green-600" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                )}
                              </label>

                              {/* Required Toggle */}
                              <label className="flex items-center gap-2 cursor-pointer">
                                <span className="text-sm text-gray-700 min-w-[70px]">Required</span>
                                <button
                                  onClick={() => toggleFieldRequired(category, idx)}
                                  disabled={!field.visible}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    field.required && field.visible
                                      ? 'bg-amber-500'
                                      : 'bg-gray-300'
                                  } ${!field.visible ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      field.required ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                                {field.required && field.visible && (
                                  <span className="text-xs font-medium text-amber-700">*</span>
                                )}
                              </label>
                            </div>
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

export default FieldVisibility
