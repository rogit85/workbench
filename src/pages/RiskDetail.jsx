import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Send,
  FileText,
  DollarSign,
  Building,
  Calendar,
  MapPin,
  Shield,
  Users,
  Activity,
  Download,
  Upload,
  ExternalLink,
  Mail,
  Eye,
  Globe,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Search,
  Clock,
  User
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const SubmissionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [showEmailSource, setShowEmailSource] = useState(false)

  // Comprehensive submission data matching all intake fields
  const submissionData = useMemo(() => {
    return {
      // Policy & Lifecycle
      submissionRef: 'SOM-2024-002',
      status: 'Appetite Check',
      newRenewal: 'New',
      inceptionDate: '2025-10-03',
      expiryDate: '2037-10-03',
      submissionDate: '2025-07-22',
      guidewireRef: 'FLG-FLS0455998',

      // Client & Counterparty
      insured: 'JX Research Limited',
      insuredExtracted: 'JX Research Limited',
      insuredAddress: 'SIX, 2nd Floor, Cricket Square, PO Box 2681, George Town, Grand Cayman, KY1-1111, Cayman Islands',
      insuredCountry: 'Cayman Islands',
      accountNo: 'New',
      dunsNumber: null,
      broker: 'Howden Insurance Brokers Ltd (UK)',
      brokerOffice: 'Howden-UK-London, One Creechurch Place, London, EC3A 5AF, United Kingdom',
      brokerContact: 'Josh Patching',
      brokerContactEmail: 'Josh.Patching@howdengroup.com',
      underwriter: 'Jeremy Isaacs',
      underwriterAssistant: 'Frankie Dowsett',
      occupancy: 'Blockchain Technology',
      sector: 'Cryptocurrency Infrastructure',
      sectorSubCategory: 'Cryptocurrency Infrastructure',

      // Team & Location
      team: 'Management Liability',
      officeLocation: 'London',
      branch: 'London',

      // Placement & Submission
      placementType: 'Direct',
      assumedFac: false,
      offeredLine: null,
      signedLine: null,
      expectedOrder: null,
      expectedLine: null,
      order: null,
      lead: null,
      clearance: 'Approved',
      clearanceDate: '2025-07-22',
      clearanceApprover: 'System Auto-Approved',

      // Financial & Premium Metrics
      limit: 1000000,
      limitCurrency: 'USD',
      limitOption1: 1000000,
      limitOption2: 2000000,
      limitBasis: null,
      exposureCurrency: 'USD',
      excess: null,
      attachmentType: 'Primary',
      layer: null,

      // Deductibles
      primaryDeductible: 0,
      sideADeductible: 0,
      sideBUSADeductible: 35000,
      sideBRoWDeductible: 15044,

      // Brokerage
      brokerage: null,
      brokerageLayer: null,
      noClaimsBonus: 0,
      reinstatements: 0,
      combLimitDisc: 0,
      otherAdjustments: 0,
      totalAdjustments: 0,

      // Financial Information
      totalAssetsCurrent: 5550000,
      totalAssetsPrevious: null,
      annualRevenueCurrent: 0,
      annualRevenuePrevious: null,
      marketCapSize: null,
      yearsInBusiness: null,
      capitalRaised: 5550000,

      // Coverage Details
      coverage: 'Directors & Officers Liability Coverage',
      cyberClause: null,
      contractWording: null,
      posi: null,
      runOff: null,
      entityEPL: 'Sublimit Upto USD 2,000,000',
      corporateLegalLiability: 'Not Included',
      yearsOfPriorActs: null,

      // Risk Information
      ownership: 'Private',
      listingType: 'Private',
      stockExchange: null,
      yoyStockComparison: null,
      concernWithStockMovement: null,
      sectorRisk: 'Blockchain',
      internationalExposure: 'High',
      bermudaExposureAUD: 0,
      intlExposure: null,
      totalExposure: null,

      // M&A and Offerings
      mnaLast2Years: 'Not Active',
      salesDivestituresLast2Years: 'Not Active',
      offeringsType: null,
      offeringsSize: null,
      offeringsUseOfProceeds: null,

      // Claims
      claimsHistory: 'No claims filed in the last three years',
      lossRatio: null,

      // Corporate Governance
      boardExperience: null,
      corporateGovernance: null,
      profitLoss: null,
      balanceSheet: null,
      cashFlowStatement: null,

      // Risk Assessment
      riskLevel: 'Moderate',
      riskProbability: 'Low',
      potentialImpact: 'Potentially high due to governance issues',
      vulnerabilityPoints: 'Governance and regulatory compliance',
      mitigationStrategies: 'Implement AML/CFT policies, enhance governance',
      preliminaryRiskScore: 'Moderate',

      // Compliance & Regulatory
      regulatoryClassification: 'Cayman Islands',
      complianceRequirements: 'AML/CFT policies not implemented',
      legalJurisdictions: 'Cayman Islands',
      industryStandards: 'Compliance with KYC checks',

      // Source & Priority
      source: 'Email',
      priority: 'Medium',
      writtenSince: null,

      // Location
      country: 'Cayman Islands',
      domicile: 'Cayman Islands',
      region: 'Caribbean',
      address: 'SIX, 2nd Floor, Cricket Square, PO Box 2681, George Town, Grand Cayman, KY1-1111, Cayman Islands',

      // Appetite Score (calculated)
      appetiteScore: 'Medium',
      appetiteReason: 'Blockchain sector with regulatory concerns, private entity with limited track record',

      // Sanctions Check
      sanctionsStatus: 'Clear',
      sanctionsCheckDate: '2025-07-22',

      // Rating
      ratingStatus: 'Pending HX',
      ratingBasis: null,
      technicalPremium: null,
      modelUsed: null,
      indicatedILF: null,
      selectedILF: null,
      totalUWModifier: null,
      yoyChangeInUWFactors: null,

      // LoB & Product
      lob: 'Management Liability',
      product: 'Directors & Officers Liability',

      // Description
      description: 'Stable is a blockchain infrastructure company operating a dedicated Layer 1 blockchain optimized for USDT transactions.',
      website: 'https://stable.xyz/',

      // Additional Details
      additionalDetails: [
        'They have a Cayman company serving as a LabsCo. Their Cayman company develops the code.',
        'A Panama foundation will be the issuer of the governance tokens.',
        'They have 3 directors of the Cayman company and 3 council members for the Panama foundation.',
        'Entity Chart to follow once received',
        'They will have a private token presale and free airdrops.',
        'No ICO.',
        'No financials available - Once the protocol is live, there will be gas fees. Until then, no revenue.',
        'Cap Table can be subject to binding if needed - they have pushed back on this item already.',
        'They have raised over $20 million from top-tier investors.'
      ],

      // Key Features
      keyFeatures: [
        'Optimized for USDT: Gas-free USDT0 transfer, optimized large scale USDT transfers, efficient USDT issuance and settlement',
        'Built for Everyday Usage: Transactions finalise in under a second with minimal costs',
        'Custom features for Enterprise: Guaranteed blockspace allocation, high throughput capabilities, comprehensive security measures'
      ],

      // Documents
      documents: [
        { name: 'Application Form (Signed).pdf', uploadedDate: '2025-07-22', size: '2.8 MB', type: 'Application' },
        { name: 'Submission Email.eml', uploadedDate: '2025-07-22', size: '45 KB', type: 'Email' },
        { name: 'Entity Structure.pdf', uploadedDate: '2025-07-22', size: '1.2 MB', type: 'Corporate' },
        { name: 'D&O Quote Request.pdf', uploadedDate: '2025-07-22', size: '890 KB', type: 'Quotation' },
      ],

      // Extraction confidence (for AI extracted fields)
      extractionConfidence: {
        insured: 98,
        inceptionDate: 95,
        limit: 92,
        broker: 97,
        lob: 94,
        coverage: 96,
        insuredAddress: 93,
        capitalRaised: 89
      },

      // Email Source
      emailSource: {
        from: 'Josh Patching (Josh.Patching@howdengroup.com)',
        to: 'Isaacs, Jeremy (jisaacs@sompo-intl.com)',
        cc: 'Freddie Palmer (Freddie.Palmer@howdengroup.com), Kiryn Farrelly (Kiryn.Farrelly@howdengroup.com)',
        subject: 'UX Research Limited - New D&O Submission [FLG-FLS0455998]',
        date: '2025-07-22 10:35:41 UTC',
        body: `Hi Jez,

Hope you had a nice evening.

Please accept this as our new submission for UX Research Limited and log to Howden. We're seeking D&O cover for this client. Below are our notes to assist in your review:

Risk Details:
Name: UX Research Limited
Headquarters: Cayman Islands
Website: https://stable.xyz/

About: Stable is a blockchain infrastructure company that operates a dedicated Layer 1 blockchain optimized for USDT (Tether) transactions...`
      }
    }
  }, [id])

  // Workflow status timeline data
  const workflowStatuses = [
    {
      status: 'Received',
      date: '2025-07-22',
      assignee: 'System',
      duration: '< 1 min',
      completed: true,
      completedBy: 'Auto-Intake'
    },
    {
      status: 'Clearance',
      date: '2025-07-22',
      assignee: 'System',
      duration: '2 mins',
      completed: true,
      completedBy: 'Auto-Approved'
    },
    {
      status: 'Appetite Check',
      date: '2025-07-22',
      assignee: 'Jeremy Isaacs',
      duration: '3 days',
      completed: false,
      inProgress: true
    },
    {
      status: 'Sanctions',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    },
    {
      status: 'Rating',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    },
    {
      status: 'Peer Review',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    },
    {
      status: 'Quoted',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    },
    {
      status: 'Firm Order',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    },
    {
      status: 'Bound',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    },
    {
      status: 'Issued',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    },
    {
      status: 'Registered',
      date: null,
      assignee: null,
      duration: null,
      completed: false
    }
  ]

  const currency = (n, curr = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 0
    }).format(n)
  }

  const getStatusColor = (status) => {
    const statusMap = {
      'Received': 'bg-gray-100 text-gray-800 border-gray-300',
      'Clearance': 'bg-blue-100 text-blue-800 border-blue-300',
      'Appetite Check': 'bg-purple-100 text-purple-800 border-purple-300',
      'Sanctions': 'bg-orange-100 text-orange-800 border-orange-300',
      'Rating': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'Peer Review': 'bg-teal-100 text-teal-800 border-teal-300',
      'Quoted': 'bg-amber-100 text-amber-800 border-amber-300',
      'Firm Order': 'bg-green-100 text-green-800 border-green-300',
      'Bound': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Issued': 'bg-sky-100 text-sky-800 border-sky-300',
      'Registered': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'Declined': 'bg-red-100 text-red-800 border-red-300',
    }
    return statusMap[status] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getAppetiteColor = (score) => {
    switch (score) {
      case 'High': return 'text-green-700 bg-green-50 border-green-300'
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-300'
      case 'Low': return 'text-red-700 bg-red-50 border-red-300'
      default: return 'text-gray-700 bg-gray-50 border-gray-300'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'risk', label: 'Risk Information', icon: Shield },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'coverage', label: 'Coverage', icon: Activity },
    { id: 'compliance', label: 'Compliance', icon: BookOpen },
    { id: 'documents', label: 'Documents', icon: Upload },
  ]

  const FieldDisplay = ({ label, value, highlight = false, confidence = null }) => (
    <div>
      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1 flex items-center justify-between">
        <span>{label}</span>
        {confidence && (
          <span className={`text-xs font-semibold ${confidence >= 95 ? 'text-green-600' : confidence >= 90 ? 'text-amber-600' : 'text-orange-600'}`}>
            {confidence}% confidence
          </span>
        )}
      </div>
      <div className={`text-sm font-semibold ${highlight ? 'text-sompo-red' : 'text-gray-900'}`}>
        {value || 'N/A'}
      </div>
    </div>
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1680px] mx-auto">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/workqueue')}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work Queue
            </motion.button>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEmailSource(!showEmailSource)}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {showEmailSource ? 'Hide' : 'View'} Email Source
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Send className="w-4 h-4" />
                Push to Guidewire
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Send to HX Rating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve & Proceed
              </motion.button>
            </div>
          </div>

          {/* Email Source Modal */}
          <AnimatePresence>
            {showEmailSource && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-sompo-red" />
                    Email Source
                  </h3>
                  <button
                    onClick={() => setShowEmailSource(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2 text-sm">
                  <div><span className="font-semibold">From:</span> {submissionData.emailSource.from}</div>
                  <div><span className="font-semibold">To:</span> {submissionData.emailSource.to}</div>
                  <div><span className="font-semibold">Cc:</span> {submissionData.emailSource.cc}</div>
                  <div><span className="font-semibold">Subject:</span> {submissionData.emailSource.subject}</div>
                  <div><span className="font-semibold">Date:</span> {submissionData.emailSource.date}</div>
                  <div className="pt-3 mt-3 border-t border-gray-300">
                    <pre className="whitespace-pre-wrap font-sans text-xs text-gray-700">{submissionData.emailSource.body}</pre>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submission Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{submissionData.insured}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(submissionData.status)}`}>
                    {submissionData.status}
                  </span>
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    submissionData.newRenewal === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {submissionData.newRenewal} Business
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {submissionData.lob}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {submissionData.coverage}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Submitted {submissionData.submissionDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {submissionData.country}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    submissionData.source === 'Email' ? 'bg-purple-100 text-purple-800' :
                    submissionData.source === 'API' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {submissionData.source}
                  </span>
                </div>
                {submissionData.website && (
                  <a
                    href={submissionData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sompo-red hover:text-sompo-dark-red flex items-center gap-1"
                  >
                    <Globe className="w-4 h-4" />
                    {submissionData.website}
                  </a>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Submission Reference</div>
                <div className="text-lg font-bold text-gray-900">{submissionData.submissionRef}</div>
                {submissionData.guidewireRef && (
                  <>
                    <div className="text-sm text-gray-600 mb-1 mt-2">Guidewire Reference</div>
                    <div className="text-sm font-semibold text-gray-900">{submissionData.guidewireRef}</div>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {submissionData.description && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-700">{submissionData.description}</div>
              </div>
            )}

            {/* Appetite Score Banner */}
            <div className={`p-4 rounded-lg border-2 ${getAppetiteColor(submissionData.appetiteScore)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Appetite Score: {submissionData.appetiteScore}</div>
                    <div className="text-sm opacity-90">{submissionData.appetiteReason}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {submissionData.sanctionsStatus === 'Clear' ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-300">
                      <CheckCircle className="w-4 h-4" />
                      Sanctions Clear
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-300">
                      <AlertTriangle className="w-4 h-4" />
                      Sanctions Alert
                    </span>
                  )}
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${
                    submissionData.riskLevel === 'Low' ? 'bg-green-50 text-green-700 border-green-300' :
                    submissionData.riskLevel === 'Moderate' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                    'bg-red-50 text-red-700 border-red-300'
                  }`}>
                    Risk: {submissionData.riskLevel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Workflow Status Timeline - Horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-sompo-red" />
              Workflow Progress
            </h3>

            {/* Horizontal Timeline */}
            <div className="relative overflow-x-auto pb-2">
              <div className="flex items-start gap-0 min-w-max">
                {workflowStatuses.map((item, idx) => (
                  <div key={idx} className="flex items-start flex-shrink-0">
                    {/* Status Step */}
                    <div className="flex flex-col items-center" style={{ width: '140px' }}>
                      {/* Circle */}
                      <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 ${
                        item.completed
                          ? 'bg-green-500 border-green-200'
                          : item.inProgress
                          ? 'bg-purple-500 border-purple-200 animate-pulse'
                          : 'bg-gray-100 border-gray-300'
                      }`}>
                        {item.completed && <CheckCircle className="w-5 h-5 text-white" />}
                        {item.inProgress && <Clock className="w-5 h-5 text-white" />}
                      </div>

                      {/* Status name */}
                      <div className="mt-3 text-center">
                        <div className={`font-semibold text-xs mb-1 ${
                          item.completed
                            ? 'text-gray-900'
                            : item.inProgress
                            ? 'text-purple-700'
                            : 'text-gray-400'
                        }`}>
                          {item.status}
                        </div>

                        {/* Date and duration */}
                        {item.date && (
                          <div className="text-xs text-gray-600 mb-1">
                            {item.date}
                          </div>
                        )}
                        {item.duration && (
                          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </div>
                        )}

                        {/* Assignee info */}
                        {item.completed && item.completedBy && (
                          <div className="text-xs text-green-700 mt-1 flex items-center justify-center gap-1">
                            <User className="w-3 h-3" />
                            <span className="truncate max-w-[120px]">{item.completedBy}</span>
                          </div>
                        )}
                        {item.inProgress && item.assignee && (
                          <div className="text-xs text-purple-700 mt-1 flex items-center justify-center gap-1">
                            <User className="w-3 h-3" />
                            <span className="truncate max-w-[120px]">{item.assignee}</span>
                          </div>
                        )}
                        {!item.completed && !item.inProgress && (
                          <div className="text-xs text-gray-400 mt-1">
                            Pending
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connecting line (except for last item) */}
                    {idx < workflowStatuses.length - 1 && (
                      <div className="flex items-start pt-5 flex-shrink-0" style={{ width: '60px' }}>
                        <div className={`h-0.5 w-full ${
                          item.completed ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-sompo-red text-sompo-red'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Insured Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-sompo-red" />
                  Insured Information
                </h3>
                <div className="space-y-3">
                  <FieldDisplay
                    label="Insured Name (Extracted)"
                    value={submissionData.insuredExtracted}
                    confidence={submissionData.extractionConfidence.insured}
                  />
                  <FieldDisplay label="Insured Address" value={submissionData.insuredAddress} />
                  <FieldDisplay label="Insured Country" value={submissionData.insuredCountry} />
                  <FieldDisplay label="Domicile" value={submissionData.domicile} />
                  <FieldDisplay label="Account Number" value={submissionData.accountNo} />
                  <FieldDisplay label="DUNS Number" value={submissionData.dunsNumber} />
                  <FieldDisplay label="Sector/Industry" value={submissionData.sector} />
                  <FieldDisplay label="Sector Sub-Category" value={submissionData.sectorSubCategory} />
                </div>
              </motion.div>

              {/* Broker & Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-sompo-red" />
                  Broker & Team
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Broker Organization" value={submissionData.broker} />
                  <FieldDisplay label="Broker Office" value={submissionData.brokerOffice} />
                  <FieldDisplay label="Broker Contact" value={submissionData.brokerContact} />
                  <FieldDisplay label="Broker Email" value={submissionData.brokerContactEmail} />
                  <FieldDisplay label="Team" value={submissionData.team} />
                  <FieldDisplay label="Office Location" value={submissionData.officeLocation} />
                  <FieldDisplay label="Underwriter" value={submissionData.underwriter} />
                  <FieldDisplay label="Underwriter Assistant" value={submissionData.underwriterAssistant} />
                </div>
              </motion.div>

              {/* Policy Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sompo-red" />
                  Policy Information
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Coverage Type" value={submissionData.coverage} />
                  <FieldDisplay label="Inception Date" value={submissionData.inceptionDate} />
                  <FieldDisplay label="Expiry Date" value={submissionData.expiryDate} />
                  <FieldDisplay label="Submission Date" value={submissionData.submissionDate} />
                  <FieldDisplay label="Attachment Type" value={submissionData.attachmentType} />
                  <FieldDisplay label="Direct / Assumed Fac" value={submissionData.assumedFac ? 'Assumed Fac' : 'Direct'} />
                  <FieldDisplay label="Lead" value={submissionData.lead} />
                  <FieldDisplay label="Written Since (YYYY)" value={submissionData.writtenSince} />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Profile Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sompo-red" />
                  Risk Profile Analysis
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Overall Risk Level" value={submissionData.riskLevel} highlight />
                  <FieldDisplay label="Risk Probability" value={submissionData.riskProbability} />
                  <FieldDisplay label="Potential Financial Impact" value={submissionData.potentialImpact} />
                  <FieldDisplay label="Vulnerability Points" value={submissionData.vulnerabilityPoints} />
                  <FieldDisplay label="Mitigation Strategies" value={submissionData.mitigationStrategies} />
                  <FieldDisplay label="Preliminary Risk Score" value={submissionData.preliminaryRiskScore} />
                  <FieldDisplay label="Sector/Industry Risk" value={submissionData.sectorRisk} />
                  <FieldDisplay label="International Exposure" value={submissionData.internationalExposure} />
                </div>
              </motion.div>

              {/* Claims & History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sompo-red" />
                  Claims & History
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Claims History" value={submissionData.claimsHistory} />
                  <FieldDisplay label="Loss Ratio" value={submissionData.lossRatio} />
                  <FieldDisplay label="M&A (Last 2 Years)" value={submissionData.mnaLast2Years} />
                  <FieldDisplay label="Sales & Divestitures (Last 2 Years)" value={submissionData.salesDivestituresLast2Years} />
                  <FieldDisplay label="Years in Business" value={submissionData.yearsInBusiness} />
                  <FieldDisplay label="Offerings - Type" value={submissionData.offeringsType} />
                  <FieldDisplay label="Offerings - Size" value={submissionData.offeringsSize} />
                  <FieldDisplay label="Offerings - Use of Proceeds" value={submissionData.offeringsUseOfProceeds} />
                </div>
              </motion.div>

              {/* Corporate Governance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sompo-red" />
                  Corporate Governance
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Ownership" value={submissionData.ownership} />
                  <FieldDisplay label="Listing Type" value={submissionData.listingType} />
                  <FieldDisplay label="Stock Exchange" value={submissionData.stockExchange} />
                  <FieldDisplay label="Board Experience" value={submissionData.boardExperience} />
                  <FieldDisplay label="Corporate Governance" value={submissionData.corporateGovernance} />
                  <FieldDisplay label="YoY Stock Comparison" value={submissionData.yoyStockComparison} />
                  <FieldDisplay label="Concern with Stock Movement" value={submissionData.concernWithStockMovement} />
                </div>
              </motion.div>

              {/* Additional Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sompo-red" />
                  Additional Details
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {submissionData.additionalDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sompo-red mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 lg:col-span-2"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-sompo-red" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {submissionData.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-br from-sompo-red/5 to-sompo-red/10 rounded-lg border border-sompo-red/20">
                      <p className="text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Limit & Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-sompo-red" />
                  Limit & Premium
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="text-xs text-green-700 uppercase tracking-wider mb-1">Requested Limit</div>
                    <div className="text-3xl font-bold text-green-900">{currency(submissionData.limit, submissionData.limitCurrency)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Option 1</div>
                      <div className="text-lg font-semibold text-gray-900">{currency(submissionData.limitOption1, submissionData.limitCurrency)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Option 2</div>
                      <div className="text-lg font-semibold text-gray-900">{currency(submissionData.limitOption2, submissionData.limitCurrency)}</div>
                    </div>
                  </div>
                  <FieldDisplay label="Limit Currency" value={submissionData.limitCurrency} />
                  <FieldDisplay label="Limit Basis" value={submissionData.limitBasis} />
                  <FieldDisplay label="Excess (Currency)" value={submissionData.excess ? currency(submissionData.excess, submissionData.limitCurrency) : 'N/A'} />
                  <FieldDisplay label="Layer" value={submissionData.layer} />
                </div>
              </motion.div>

              {/* Deductibles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sompo-red" />
                  Deductibles
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Primary Deductible (Current Year)" value={currency(submissionData.primaryDeductible, submissionData.limitCurrency)} />
                  <FieldDisplay label="Side A Deductible (min Currency 0)" value={currency(submissionData.sideADeductible, submissionData.limitCurrency)} />
                  <FieldDisplay label="Side B USA Deductible (min Currency 35,000)" value={currency(submissionData.sideBUSADeductible, submissionData.limitCurrency)} />
                  <FieldDisplay label="Side B RoW Deductible (min Currency 15,044)" value={currency(submissionData.sideBRoWDeductible, submissionData.limitCurrency)} />
                </div>
              </motion.div>

              {/* Financial Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-sompo-red" />
                  Financial Information
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-700 uppercase tracking-wider mb-1">Total Capital Raised</div>
                    <div className="text-2xl font-bold text-blue-900">{currency(submissionData.capitalRaised, 'USD')}</div>
                  </div>
                  <FieldDisplay label="Assumed Total Assets (Current Year)" value={submissionData.totalAssetsCurrent ? currency(submissionData.totalAssetsCurrent, 'USD') : 'N/A'} />
                  <FieldDisplay label="Annual Revenue (Current Year)" value={submissionData.annualRevenueCurrent ? currency(submissionData.annualRevenueCurrent, 'USD') : 'USD 0'} />
                  <FieldDisplay label="Assumed Total Assets (Prev Year)" value={submissionData.totalAssetsPrevious ? currency(submissionData.totalAssetsPrevious, 'USD') : 'N/A'} />
                  <FieldDisplay label="Annual Revenue (Prev Year)" value={submissionData.annualRevenuePrevious ? currency(submissionData.annualRevenuePrevious, 'USD') : 'N/A'} />
                  <FieldDisplay label="Market Cap Size" value={submissionData.marketCapSize} />
                </div>
              </motion.div>

              {/* Brokerage & Adjustments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sompo-red" />
                  Brokerage & Adjustments
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Brokerage (%)" value={submissionData.brokerage ? `${submissionData.brokerage}%` : 'N/A'} />
                  <FieldDisplay label="Brokerage (Layer)" value={submissionData.brokerageLayer} />
                  <FieldDisplay label="No Claims Bonus" value={`${submissionData.noClaimsBonus}%`} />
                  <FieldDisplay label="Reinstatements" value={`${submissionData.reinstatements}%`} />
                  <FieldDisplay label="Comb Limit Disc" value={`${submissionData.combLimitDisc}%`} />
                  <FieldDisplay label="Other Adjustments" value={`${submissionData.otherAdjustments}%`} />
                  <div className="pt-3 border-t border-gray-200">
                    <FieldDisplay label="Total Adjustments" value={`${submissionData.totalAdjustments}%`} highlight />
                  </div>
                </div>
              </motion.div>

              {/* Exposure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 lg:col-span-2"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sompo-red" />
                  Exposure
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <FieldDisplay label="Bermuda Exposure (AUD)" value={currency(submissionData.bermudaExposureAUD, 'AUD')} />
                  <FieldDisplay label="Intl Exposure (Currency)" value={submissionData.intlExposure ? currency(submissionData.intlExposure, submissionData.exposureCurrency) : 'N/A'} />
                  <FieldDisplay label="Total Exposure (Currency)" value={submissionData.totalExposure ? currency(submissionData.totalExposure, submissionData.exposureCurrency) : 'N/A'} />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'coverage' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coverage Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sompo-red" />
                  Coverage Details
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Contract Wording" value={submissionData.contractWording} />
                  <FieldDisplay label="POSI" value={submissionData.posi} />
                  <FieldDisplay label="Run-off" value={submissionData.runOff} />
                  <FieldDisplay label="Entity EPL (Currency)" value={submissionData.entityEPL} />
                  <FieldDisplay label="Corporate Legal Liability (Currency)" value={submissionData.corporateLegalLiability} />
                  <FieldDisplay label="Years of Prior Acts" value={submissionData.yearsOfPriorActs} />
                  <FieldDisplay label="Cyber Clause" value={submissionData.cyberClause} />
                </div>
              </motion.div>

              {/* Placement Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-sompo-red" />
                  Placement & Order
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Placement Type" value={submissionData.placementType} />
                  <FieldDisplay label="Expected Order" value={submissionData.expectedOrder} />
                  <FieldDisplay label="Expected Line" value={submissionData.expectedLine ? `${submissionData.expectedLine}%` : 'N/A'} />
                  <FieldDisplay label="Offered Line" value={submissionData.offeredLine ? `${submissionData.offeredLine}%` : 'N/A'} />
                  <FieldDisplay label="Signed Line" value={submissionData.signedLine ? `${submissionData.signedLine}%` : 'TBD'} />
                  <div className="pt-3 border-t border-gray-200">
                    <FieldDisplay label="Clearance Status" value={submissionData.clearance} />
                    <FieldDisplay label="Clearance Date" value={submissionData.clearanceDate} />
                    <FieldDisplay label="Clearance Approver" value={submissionData.clearanceApprover} />
                  </div>
                </div>
              </motion.div>

              {/* Rating Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 lg:col-span-2"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sompo-red" />
                  Rating Information
                </h3>
                <div className="grid grid-cols-4 gap-6">
                  <FieldDisplay label="Rating Status" value={submissionData.ratingStatus} highlight />
                  <FieldDisplay label="Rating Basis" value={submissionData.ratingBasis} />
                  <FieldDisplay label="Technical Premium" value={submissionData.technicalPremium ? currency(submissionData.technicalPremium, submissionData.limitCurrency) : 'N/A'} />
                  <FieldDisplay label="Model Used" value={submissionData.modelUsed} />
                  <FieldDisplay label="Indicated ILF (Current Year)" value={submissionData.indicatedILF} />
                  <FieldDisplay label="Selected ILF (Current Year)" value={submissionData.selectedILF} />
                  <FieldDisplay label="Total UW Modifier" value={submissionData.totalUWModifier} />
                  <FieldDisplay label="YoY Change in UW Factors" value={submissionData.yoyChangeInUWFactors} />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance & Regulatory */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sompo-red" />
                  Compliance & Regulatory Assessment
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Regulatory Classification" value={submissionData.regulatoryClassification} />
                  <FieldDisplay label="Compliance Requirements" value={submissionData.complianceRequirements} />
                  <FieldDisplay label="Legal Jurisdictions" value={submissionData.legalJurisdictions} />
                  <FieldDisplay label="Industry Standards" value={submissionData.industryStandards} />
                  <div className="pt-3 border-t border-gray-200">
                    <FieldDisplay label="Sanctions Status" value={submissionData.sanctionsStatus} highlight />
                    <FieldDisplay label="Sanctions Check Date" value={submissionData.sanctionsCheckDate} />
                  </div>
                </div>
              </motion.div>

              {/* Financial Statements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-sompo-red" />
                  Financial Statements
                </h3>
                <div className="space-y-3">
                  <FieldDisplay label="Profit & Loss" value={submissionData.profitLoss} />
                  <FieldDisplay label="Balance Sheet" value={submissionData.balanceSheet} />
                  <FieldDisplay label="Cash Flow Statement" value={submissionData.cashFlowStatement} />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'documents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sompo-red" />
                  Documents ({submissionData.documents.length})
                </h3>
                <button className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              </div>
              <div className="space-y-3">
                {submissionData.documents.map((doc, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5, backgroundColor: '#F9FAFB' }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-sompo-red" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{doc.name}</div>
                        <div className="text-xs text-gray-500">
                          {doc.type} • {doc.size} • Uploaded {doc.uploadedDate}
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-sompo-red hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default SubmissionDetail
