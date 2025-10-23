import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Upload, AlertCircle, FileText, Table } from 'lucide-react'

const ManualSubmissionModal = ({ isOpen, onClose, onSubmit }) => {
  const [submissionMode, setSubmissionMode] = useState('manual') // 'manual', 'upload', 'batch'
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [formData, setFormData] = useState({
    // Insured Information
    insured: '',
    insuredAddress: '',
    insuredCountry: '',
    domicile: '',

    // Broker Information
    broker: '',
    brokerOffice: '',
    brokerContact: '',
    brokerContactEmail: '',

    // Team & Underwriter
    team: 'Management Liability',
    officeLocation: 'London',
    underwriter: '',
    underwriterAssistant: '',

    // Coverage
    lob: 'Property',
    coverage: '',
    product: '',

    // Dates
    inceptionDate: '',
    expiryDate: '',
    submissionDate: new Date().toISOString().split('T')[0],

    // Financial
    limit: '',
    limitCurrency: 'USD',
    gwp: '',
    deductible: '',

    // Placement
    placementType: 'Direct',
    newRenewal: 'New',
    offeredLine: '',
    expectedOrder: '',

    // Additional
    occupancy: '',
    sector: '',
    description: '',
    website: '',
    priority: 'Medium',

    // Source
    source: 'Manual'
  })

  const [errors, setErrors] = useState({})

  const lobs = [
    'Agriculture', 'Aviation', 'Casualty', 'Cyber', 'Energy', 'Environmental',
    'Errors & Omissions / Professional Indemnity', 'Financial Institutions',
    'Healthcare Liability', 'Life Sciences', 'Management Liability', 'Marine',
    'Property', 'Specialty', 'Surety'
  ]

  const teams = [
    'Management Liability', 'Property', 'Casualty', 'Marine', 'Aviation',
    'Energy', 'Cyber', 'Financial Lines', 'Specialty'
  ]

  const offices = [
    'London', 'New York', 'Bermuda', 'Singapore', 'Hong Kong', 'Dubai', 'Sydney'
  ]

  const countries = [
    'United Kingdom', 'United States', 'Cayman Islands', 'Bermuda', 'Singapore',
    'Hong Kong', 'United Arab Emirates', 'Australia', 'Canada', 'Ireland', 'Luxembourg'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.insured.trim()) newErrors.insured = 'Insured name is required'
    if (!formData.broker.trim()) newErrors.broker = 'Broker is required'
    if (!formData.lob) newErrors.lob = 'Line of Business is required'
    if (!formData.coverage.trim()) newErrors.coverage = 'Coverage type is required'
    if (!formData.inceptionDate) newErrors.inceptionDate = 'Inception date is required'
    if (!formData.limit || parseFloat(formData.limit) <= 0) newErrors.limit = 'Valid limit is required'
    if (!formData.insuredCountry) newErrors.insuredCountry = 'Insured country is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const submission = {
        ...formData,
        id: `SOM-${Date.now()}`,
        status: 'Received',
        submissionRef: `SOM-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        limit: parseFloat(formData.limit),
        gwp: formData.gwp ? parseFloat(formData.gwp) : 0,
        deductible: formData.deductible ? parseFloat(formData.deductible) : 0,
        offeredLine: formData.offeredLine ? parseFloat(formData.offeredLine) : null,
        appetiteScore: 'Pending',
        sanctionsStatus: 'Pending',
        extractionConfidence: {
          insured: 100,
          broker: 100,
          lob: 100,
          coverage: 100
        }
      }

      onSubmit(submission)
      resetForm()
      onClose()
    }
  }

  const resetForm = () => {
    setFormData({
      insured: '',
      insuredAddress: '',
      insuredCountry: '',
      domicile: '',
      broker: '',
      brokerOffice: '',
      brokerContact: '',
      brokerContactEmail: '',
      team: 'Management Liability',
      officeLocation: 'London',
      underwriter: '',
      underwriterAssistant: '',
      lob: 'Property',
      coverage: '',
      product: '',
      inceptionDate: '',
      expiryDate: '',
      submissionDate: new Date().toISOString().split('T')[0],
      limit: '',
      limitCurrency: 'USD',
      gwp: '',
      deductible: '',
      placementType: 'Direct',
      newRenewal: 'New',
      offeredLine: '',
      expectedOrder: '',
      occupancy: '',
      sector: '',
      description: '',
      website: '',
      priority: 'Medium',
      source: 'Manual'
    })
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    setUploadedFiles([])
    setSubmissionMode('manual')
    onClose()
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleDocumentSubmit = () => {
    // Simulate document processing
    const submissions = uploadedFiles.map((file, index) => ({
      ...formData,
      id: `SOM-${Date.now()}-${index}`,
      status: 'Received',
      submissionRef: `SOM-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      insured: formData.insured || `Extracted from ${file.name}`,
      broker: formData.broker || 'Document Upload',
      lob: formData.lob || 'Property',
      coverage: formData.coverage || 'To be determined',
      limit: parseFloat(formData.limit) || 1000000,
      gwp: formData.gwp ? parseFloat(formData.gwp) : 0,
      deductible: formData.deductible ? parseFloat(formData.deductible) : 0,
      offeredLine: formData.offeredLine ? parseFloat(formData.offeredLine) : null,
      appetiteScore: 'Pending',
      sanctionsStatus: 'Pending',
      source: 'Document Upload',
      documentName: file.name,
      extractionConfidence: {
        insured: 85,
        broker: 85,
        lob: 85,
        coverage: 85
      }
    }))

    submissions.forEach(submission => onSubmit(submission))
    resetForm()
    setUploadedFiles([])
    setSubmissionMode('manual')
    onClose()
  }

  const handleBatchSubmit = () => {
    // Simulate batch Excel/CSV processing
    // In production, this would parse the Excel/CSV file
    const batchSubmissions = Array.from({ length: 5 }, (_, index) => ({
      id: `SOM-BATCH-${Date.now()}-${index}`,
      status: 'Received',
      submissionRef: `SOM-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      insured: `Batch Import Company ${index + 1}`,
      broker: 'Batch Import',
      lob: ['Property', 'Casualty', 'Marine', 'Cyber'][index % 4],
      coverage: 'Imported from spreadsheet',
      limit: 1000000 * (index + 1),
      gwp: 50000 * (index + 1),
      deductible: 10000,
      offeredLine: 25,
      priority: 'Medium',
      appetiteScore: 'Pending',
      sanctionsStatus: 'Pending',
      source: 'Batch Upload',
      team: 'Management Liability',
      officeLocation: 'London',
      placementType: 'Direct',
      newRenewal: 'New',
      insuredCountry: 'United Kingdom',
      domicile: 'United Kingdom',
      extractionConfidence: {
        insured: 100,
        broker: 100,
        lob: 100,
        coverage: 100
      }
    }))

    batchSubmissions.forEach(submission => onSubmit(submission))
    setUploadedFiles([])
    setSubmissionMode('manual')
    onClose()
  }

  const InputField = ({ label, name, type = 'text', required = false, placeholder = '', options = null }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Add Submission</h2>
                  <button
                    onClick={handleClose}
                    className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mode Tabs */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmissionMode('manual')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors ${
                      submissionMode === 'manual'
                        ? 'bg-white text-sompo-red'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Manual Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionMode('upload')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors ${
                      submissionMode === 'upload'
                        ? 'bg-white text-sompo-red'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Documents
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionMode('batch')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors ${
                      submissionMode === 'batch'
                        ? 'bg-white text-sompo-red'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Table className="w-4 h-4" />
                    Batch Upload
                  </button>
                </div>
              </div>

              <>
                {/* Manual Entry Mode */}
                {submissionMode === 'manual' && (
                  <form onSubmit={handleSubmit}>
                    <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
                  {/* Insured Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Insured Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Insured Name" name="insured" required placeholder="e.g. Acme Corporation Ltd" />
                      <InputField label="Insured Country" name="insuredCountry" required options={['', ...countries]} />
                      <div className="md:col-span-2">
                        <InputField label="Insured Address" name="insuredAddress" placeholder="Full address" />
                      </div>
                      <InputField label="Domicile" name="domicile" options={['', ...countries]} />
                      <InputField label="Sector/Industry" name="sector" placeholder="e.g. Technology, Manufacturing" />
                      <InputField label="Occupancy" name="occupancy" placeholder="e.g. Software Development" />
                      <InputField label="Website" name="website" type="url" placeholder="https://..." />
                    </div>
                  </div>

                  {/* Broker Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Broker Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Broker Organization" name="broker" required placeholder="e.g. Howden Broking Group" />
                      <InputField label="Broker Office" name="brokerOffice" placeholder="Office location" />
                      <InputField label="Broker Contact" name="brokerContact" placeholder="Contact name" />
                      <InputField label="Broker Email" name="brokerContactEmail" type="email" placeholder="email@broker.com" />
                    </div>
                  </div>

                  {/* Team & Assignment */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Team & Assignment
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Team" name="team" options={teams} />
                      <InputField label="Office Location" name="officeLocation" options={offices} />
                      <InputField label="Underwriter" name="underwriter" placeholder="Assigned underwriter" />
                      <InputField label="Underwriter Assistant" name="underwriterAssistant" placeholder="Assistant name" />
                    </div>
                  </div>

                  {/* Coverage Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Coverage Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Line of Business" name="lob" required options={['', ...lobs]} />
                      <InputField label="Coverage Type" name="coverage" required placeholder="e.g. Directors & Officers Liability" />
                      <InputField label="Product" name="product" placeholder="Product name" />
                      <div className="md:col-span-2">
                        <InputField label="Description" name="description" placeholder="Brief description of the risk" />
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Policy Dates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField label="Inception Date" name="inceptionDate" type="date" required />
                      <InputField label="Expiry Date" name="expiryDate" type="date" />
                      <InputField label="Submission Date" name="submissionDate" type="date" />
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Financial Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Limit <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            name="limit"
                            value={formData.limit}
                            onChange={handleChange}
                            placeholder="1000000"
                            className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm ${
                              errors.limit ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          <select
                            name="limitCurrency"
                            value={formData.limitCurrency}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red text-sm"
                          >
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                        {errors.limit && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.limit}
                          </p>
                        )}
                      </div>
                      <InputField label="Estimated GWP" name="gwp" type="number" placeholder="Optional" />
                      <InputField label="Deductible" name="deductible" type="number" placeholder="Optional" />
                      <InputField label="Priority" name="priority" options={['Low', 'Medium', 'High']} />
                    </div>
                  </div>

                  {/* Placement Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Placement Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Placement Type" name="placementType" options={['Direct', 'Assumed Fac', 'Open Market']} />
                      <InputField label="New/Renewal" name="newRenewal" options={['New', 'Renewal']} />
                      <InputField label="Offered Line (%)" name="offeredLine" type="number" placeholder="e.g. 25" />
                      <InputField label="Expected Order" name="expectedOrder" placeholder="e.g. Lead, Follow" />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Create Submission
                  </button>
                </div>
              </form>
              )}

              {/* Upload Documents Mode */}
              {submissionMode === 'upload' && (
                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <p className="text-gray-600 mb-6">
                        Upload emails, PDFs, Word documents, or Excel files. Our AI will extract submission details automatically.
                      </p>

                      {/* File Upload Area */}
                      <label className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-sompo-red transition-colors cursor-pointer group">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.eml,.msg,.txt"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400 group-hover:text-sompo-red transition-colors mb-4" />
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, Word, Excel, Email (EML, MSG)
                          </p>
                        </div>
                      </label>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-6 space-y-2">
                          <h4 className="text-left font-semibold text-gray-900 mb-3">
                            Uploaded Files ({uploadedFiles.length})
                          </h4>
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-600" />
                                <div className="text-left">
                                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDocumentSubmit}
                      disabled={uploadedFiles.length === 0}
                      className="px-6 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-4 h-4" />
                      Process {uploadedFiles.length} {uploadedFiles.length === 1 ? 'Document' : 'Documents'}
                    </button>
                  </div>
                </div>
              )}

              {/* Batch Upload Mode */}
              {submissionMode === 'batch' && (
                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <p className="text-gray-600 mb-6">
                        Upload an Excel or CSV file containing multiple submissions. Each row will be processed as a separate submission.
                      </p>

                      {/* File Upload Area */}
                      <label className="relative block w-full border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-sompo-red transition-colors cursor-pointer group">
                        <input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center">
                          <Table className="w-12 h-12 text-gray-400 group-hover:text-sompo-red transition-colors mb-4" />
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Click to upload spreadsheet
                          </p>
                          <p className="text-sm text-gray-500">
                            Excel (.xlsx, .xls) or CSV files
                          </p>
                        </div>
                      </label>

                      {/* Template Download */}
                      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-blue-900 mb-1">
                              Need a template?
                            </p>
                            <p className="text-sm text-blue-700 mb-2">
                              Download our Excel template with the correct column format for batch uploads.
                            </p>
                            <button
                              type="button"
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
                            >
                              Download Template
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Uploaded File */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-left font-semibold text-gray-900 mb-3">
                            Selected File
                          </h4>
                          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Table className="w-6 h-6 text-green-600" />
                              <div className="text-left">
                                <p className="text-sm font-medium text-gray-900">{uploadedFiles[0].name}</p>
                                <p className="text-xs text-gray-500">
                                  Ready to process • {(uploadedFiles[0].size / 1024).toFixed(2)} KB
                                </p>
                                <p className="text-xs text-green-600 font-medium mt-1">
                                  ~5 submissions will be imported
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setUploadedFiles([])}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleBatchSubmit}
                      disabled={uploadedFiles.length === 0}
                      className="px-6 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Table className="w-4 h-4" />
                      Import Batch Submissions
                    </button>
                  </div>
                </div>
              )}
              </>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ManualSubmissionModal
