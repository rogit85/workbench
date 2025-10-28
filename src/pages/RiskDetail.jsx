import React, { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
  User,
  ThumbsUp,
  ThumbsDown,
  Edit3
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const SubmissionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [fieldFeedback, setFieldFeedback] = useState({}) // { fieldName: { positive: bool, suggestion: string } }
  const [editingSuggestion, setEditingSuggestion] = useState(null) // fieldName being edited
  const [selectedEmail, setSelectedEmail] = useState(null) // for email detail modal
  const [selectedAttachment, setSelectedAttachment] = useState(null) // for attachment modal
  const scrollContainerRef = useRef(null)

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
        { name: 'Application Form (Signed).pdf', uploadedDate: '2025-07-22', size: '2.8 MB', type: 'Application', category: 'Application Form' },
        { name: 'Submission Email.eml', uploadedDate: '2025-07-22', size: '45 KB', type: 'Email', category: 'Email Correspondence' },
        { name: 'Entity Structure.pdf', uploadedDate: '2025-07-22', size: '1.2 MB', type: 'Corporate', category: 'Corporate Documents' },
        { name: 'D&O Quote Request.pdf', uploadedDate: '2025-07-22', size: '890 KB', type: 'Quotation', category: 'Quote Request' },
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
      },

      // Email Chain History
      emailChain: [
        {
          id: 1,
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

About: Stable is a blockchain infrastructure company that operates a dedicated Layer 1 blockchain optimized for USDT (Tether) transactions. Please see attached documents for full details.

Best regards,
Josh`,
          attachments: ['Application Form (Signed).pdf', 'D&O Quote Request.pdf', 'Entity Structure.pdf']
        },
        {
          id: 2,
          from: 'Isaacs, Jeremy (jisaacs@sompo-intl.com)',
          to: 'Josh Patching (Josh.Patching@howdengroup.com)',
          cc: 'Freddie Palmer (Freddie.Palmer@howdengroup.com)',
          subject: 'RE: UX Research Limited - New D&O Submission [FLG-FLS0455998]',
          date: '2025-07-23 09:15:22 UTC',
          body: `Hi Josh,

Thanks for the submission. I've reviewed the initial documents and have a few questions:

1. Can you provide the entity chart you mentioned?
2. Are there any existing D&O policies we should be aware of?
3. What's the timeline for binding?

Thanks,
Jeremy`,
          attachments: []
        },
        {
          id: 3,
          from: 'Josh Patching (Josh.Patching@howdengroup.com)',
          to: 'Isaacs, Jeremy (jisaacs@sompo-intl.com)',
          cc: 'Freddie Palmer (Freddie.Palmer@howdengroup.com), Kiryn Farrelly (Kiryn.Farrelly@howdengroup.com)',
          subject: 'RE: UX Research Limited - New D&O Submission [FLG-FLS0455998]',
          date: '2025-07-23 14:20:15 UTC',
          body: `Hi Jeremy,

Please find answers below:

1. Entity chart is being finalized - will send by EOD tomorrow
2. No existing D&O coverage - this is a new purchase
3. Looking to bind by end of next week if possible

Let me know if you need anything else.

Josh`,
          attachments: []
        }
      ],

      // Activity History
      activityHistory: [
        {
          id: 1,
          type: 'submission',
          action: 'Submission Received',
          user: 'System',
          timestamp: '2025-07-22 10:36:00 UTC',
          details: 'Submission received via email from Josh Patching',
          icon: 'Mail'
        },
        {
          id: 2,
          type: 'extraction',
          action: 'AI Extraction Completed',
          user: 'AI Gateway',
          timestamp: '2025-07-22 10:36:45 UTC',
          details: 'Extracted 24 fields with 94% average confidence',
          icon: 'Activity'
        },
        {
          id: 3,
          type: 'assignment',
          action: 'Assigned to Underwriter',
          user: 'System',
          timestamp: '2025-07-22 10:37:00 UTC',
          details: 'Automatically assigned to Jeremy Isaacs (Management Liability)',
          icon: 'User'
        },
        {
          id: 4,
          type: 'clearance',
          action: 'Clearance Auto-Approved',
          user: 'System',
          timestamp: '2025-07-22 10:38:30 UTC',
          details: 'Clearance automatically approved based on appetite rules',
          icon: 'CheckCircle'
        },
        {
          id: 5,
          type: 'status',
          action: 'Status Changed',
          user: 'System',
          timestamp: '2025-07-22 10:38:35 UTC',
          details: 'Status changed from Clearance to Appetite Check',
          icon: 'Activity'
        },
        {
          id: 6,
          type: 'sanctions',
          action: 'Sanctions Check Clear',
          user: 'Sanctions System',
          timestamp: '2025-07-22 11:15:00 UTC',
          details: 'No sanctions matches found for insured or related parties',
          icon: 'Shield'
        },
        {
          id: 7,
          type: 'document',
          action: 'Document Uploaded',
          user: 'System',
          timestamp: '2025-07-22 10:36:00 UTC',
          details: 'Application Form (Signed).pdf',
          icon: 'Upload'
        },
        {
          id: 8,
          type: 'document',
          action: 'Document Uploaded',
          user: 'System',
          timestamp: '2025-07-22 10:36:00 UTC',
          details: 'Submission Email.eml',
          icon: 'Upload'
        },
        {
          id: 9,
          type: 'email',
          action: 'Email Sent',
          user: 'Jeremy Isaacs',
          timestamp: '2025-07-23 09:15:22 UTC',
          details: 'Sent follow-up questions to broker',
          icon: 'Send'
        },
        {
          id: 10,
          type: 'email',
          action: 'Email Received',
          user: 'Josh Patching',
          timestamp: '2025-07-23 14:20:15 UTC',
          details: 'Received response from broker with additional information',
          icon: 'Mail'
        },
        {
          id: 11,
          type: 'note',
          action: 'Note Added',
          user: 'Jeremy Isaacs',
          timestamp: '2025-07-24 08:30:00 UTC',
          details: 'Added note: "Blockchain sector presents elevated governance risk. Need to review entity structure carefully."',
          icon: 'Edit3'
        }
      ]
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
    { id: 'source', label: 'Source', icon: Mail },
    { id: 'activity', label: 'Activity', icon: Clock },
  ]

  const FieldDisplay = ({ label, value, highlight = false, confidence = null, extracted = false, fieldKey = null }) => {
    const feedback = fieldKey ? fieldFeedback[fieldKey] : null
    const isEditing = editingSuggestion === fieldKey

    const handleFeedback = (positive) => {
      if (!fieldKey) return

      if (positive) {
        // Thumbs up - just mark as positive
        setFieldFeedback(prev => ({
          ...prev,
          [fieldKey]: { positive: true, suggestion: null }
        }))
      } else {
        // Thumbs down - open suggestion input
        setEditingSuggestion(fieldKey)
        setFieldFeedback(prev => ({
          ...prev,
          [fieldKey]: { positive: false, suggestion: prev[fieldKey]?.suggestion || '' }
        }))
      }
    }

    const handleSuggestionChange = (newSuggestion) => {
      setFieldFeedback(prev => ({
        ...prev,
        [fieldKey]: { ...prev[fieldKey], suggestion: newSuggestion }
      }))
    }

    const handleSuggestionSave = () => {
      setEditingSuggestion(null)
    }

    return (
      <div>
        <div className="text-xs text-gray-600 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>{label}</span>
          <div className="flex items-center gap-2">
            {confidence && (
              <span className={`text-xs font-semibold ${confidence >= 95 ? 'text-green-600' : confidence >= 90 ? 'text-amber-600' : 'text-orange-600'}`}>
                {confidence}% confidence
              </span>
            )}
            {extracted && fieldKey && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleFeedback(true)}
                  className={`p-1 rounded hover:bg-gray-100 transition-colors ${feedback?.positive === true ? 'text-green-600' : 'text-gray-400'}`}
                  title="Correct extraction"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className={`p-1 rounded hover:bg-gray-100 transition-colors ${feedback?.positive === false ? 'text-red-600' : 'text-gray-400'}`}
                  title="Incorrect - suggest correction"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={`text-sm font-semibold ${highlight ? 'text-sompo-red' : 'text-gray-900'}`}>
          {value || 'N/A'}
        </div>
        {feedback?.positive === false && (
          <div className="mt-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={feedback.suggestion || ''}
                  onChange={(e) => handleSuggestionChange(e.target.value)}
                  onBlur={handleSuggestionSave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSuggestionSave()
                    if (e.key === 'Escape') {
                      setEditingSuggestion(null)
                    }
                  }}
                  placeholder="Enter correct value..."
                  autoFocus
                  className="flex-1 px-2 py-1 text-xs border border-sompo-red rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs bg-red-50 border border-red-200 rounded px-2 py-1">
                <span className="text-red-700 flex-1">
                  {feedback.suggestion ? `Suggestion: ${feedback.suggestion}` : 'Click to add suggestion'}
                </span>
                <button
                  onClick={() => setEditingSuggestion(fieldKey)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

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
            </div>
          </div>

          {/* Submission Header - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{submissionData.insured}</h1>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(submissionData.status)}`}>
                    {submissionData.status}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    submissionData.newRenewal === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {submissionData.newRenewal}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {submissionData.lob}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {submissionData.coverage}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {submissionData.submissionDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {submissionData.country}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    submissionData.source === 'Email' ? 'bg-purple-100 text-purple-800' :
                    submissionData.source === 'API' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {submissionData.source}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="font-medium">Appetite: {submissionData.appetiteScore}</span>
                  </span>
                  {submissionData.sanctionsStatus === 'Clear' ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Sanctions OK
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-700">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Sanctions Alert
                    </span>
                  )}
                  <span className={`flex items-center gap-1 text-xs font-medium ${
                    submissionData.riskLevel === 'Low' ? 'text-green-700' :
                    submissionData.riskLevel === 'Moderate' ? 'text-amber-700' :
                    'text-red-700'
                  }`}>
                    <Target className="w-3.5 h-3.5" />
                    Risk: {submissionData.riskLevel}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="text-gray-600">Ref</div>
                <div className="font-bold text-gray-900">{submissionData.submissionRef}</div>
                {submissionData.guidewireRef && (
                  <>
                    <div className="text-gray-600 mt-1">GW</div>
                    <div className="font-semibold text-gray-900">{submissionData.guidewireRef}</div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Workflow Status Timeline - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sompo-red" />
              Workflow Progress
            </h3>

            {/* Horizontal Timeline with Arrow Controls */}
            <div className="relative">
              {/* Left Scroll Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
                  }
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white border-2 border-sompo-red text-sompo-red hover:bg-sompo-red hover:text-white shadow-lg transition-all"
                style={{ marginLeft: '-20px' }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Scrollable Timeline Container */}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto pb-2 scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div className="flex items-start gap-0 min-w-max px-4">
                  {workflowStatuses.map((item, idx) => (
                    <div key={idx} className="flex items-start flex-shrink-0">
                      {/* Status Step */}
                      <div className="flex flex-col items-center" style={{ width: '100px' }}>
                        {/* Circle */}
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 ${
                          item.completed
                            ? 'bg-green-500 border-green-200'
                            : item.inProgress
                            ? 'bg-purple-500 border-purple-200 animate-pulse'
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                          {item.inProgress && <Clock className="w-4 h-4 text-white" />}
                        </div>

                        {/* Status name */}
                        <div className="mt-2 text-center">
                          <div className={`font-semibold text-[10px] leading-tight ${
                            item.completed
                              ? 'text-gray-900'
                              : item.inProgress
                              ? 'text-purple-700'
                              : 'text-gray-400'
                          }`}>
                            {item.status}
                          </div>

                          {/* Date and duration - condensed */}
                          {(item.date || item.duration) && (
                            <div className="text-[9px] text-gray-500 mt-0.5">
                              {item.duration}
                            </div>
                          )}

                          {/* Assignee info - condensed */}
                          {item.completed && item.completedBy && (
                            <div className="text-[9px] text-green-700 mt-0.5 truncate max-w-[90px]">
                              {item.completedBy}
                            </div>
                          )}
                          {item.inProgress && item.assignee && (
                            <div className="text-[9px] text-purple-700 mt-0.5 truncate max-w-[90px]">
                              {item.assignee}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Connecting line (except for last item) */}
                      {idx < workflowStatuses.length - 1 && (
                        <div className="flex items-start pt-3.5 flex-shrink-0" style={{ width: '40px' }}>
                          <div className={`h-0.5 w-full ${
                            item.completed ? 'bg-green-300' : 'bg-gray-200'
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Scroll Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white border-2 border-sompo-red text-sompo-red hover:bg-sompo-red hover:text-white shadow-lg transition-all"
                style={{ marginRight: '-20px' }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Insured Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-3"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-sompo-red" />
                  Insured Information
                </h3>
                <div className="space-y-2">
                  <FieldDisplay
                    label="Insured Name (Extracted)"
                    value={submissionData.insuredExtracted}
                    confidence={submissionData.extractionConfidence.insured}
                    extracted={true}
                    fieldKey="insuredName"
                  />
                  <FieldDisplay
                    label="Insured Address (Extracted)"
                    value={submissionData.insuredAddress}
                    extracted={true}
                    fieldKey="insuredAddress"
                  />
                  <FieldDisplay
                    label="Insured Country (Extracted)"
                    value={submissionData.insuredCountry}
                    extracted={true}
                    fieldKey="insuredCountry"
                  />
                  <FieldDisplay
                    label="Domicile (Extracted)"
                    value={submissionData.domicile}
                    extracted={true}
                    fieldKey="domicile"
                  />
                  <FieldDisplay label="Account Number" value={submissionData.accountNo} />
                  <FieldDisplay label="DUNS Number" value={submissionData.dunsNumber} />
                  <FieldDisplay
                    label="Sector/Industry (Extracted)"
                    value={submissionData.sector}
                    extracted={true}
                    fieldKey="sector"
                  />
                  <FieldDisplay
                    label="Sector Sub-Category (Extracted)"
                    value={submissionData.sectorSubCategory}
                    extracted={true}
                    fieldKey="sectorSubCategory"
                  />
                  <FieldDisplay
                    label="Occupancy (Extracted)"
                    value={submissionData.occupancy}
                    extracted={true}
                    fieldKey="occupancy"
                  />
                </div>
              </motion.div>

              {/* Broker & Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-3"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-sompo-red" />
                  Broker & Team
                </h3>
                <div className="space-y-2">
                  <FieldDisplay
                    label="Broker Organization (Extracted)"
                    value={submissionData.broker}
                    extracted={true}
                    fieldKey="broker"
                  />
                  <FieldDisplay
                    label="Broker Office (Extracted)"
                    value={submissionData.brokerOffice}
                    extracted={true}
                    fieldKey="brokerOffice"
                  />
                  <FieldDisplay
                    label="Broker Contact (Extracted)"
                    value={submissionData.brokerContact}
                    extracted={true}
                    fieldKey="brokerContact"
                  />
                  <FieldDisplay
                    label="Broker Email (Extracted)"
                    value={submissionData.brokerContactEmail}
                    extracted={true}
                    fieldKey="brokerEmail"
                  />
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
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-3"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sompo-red" />
                  Policy Information
                </h3>
                <div className="space-y-2">
                  <FieldDisplay
                    label="Coverage Type (Extracted)"
                    value={submissionData.coverage}
                    extracted={true}
                    fieldKey="coverage"
                  />
                  <FieldDisplay
                    label="Inception Date (Extracted)"
                    value={submissionData.inceptionDate}
                    extracted={true}
                    fieldKey="inceptionDate"
                  />
                  <FieldDisplay
                    label="Expiry Date (Extracted)"
                    value={submissionData.expiryDate}
                    extracted={true}
                    fieldKey="expiryDate"
                  />
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
                          {doc.category} • {doc.size} • Uploaded {doc.uploadedDate}
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

          {activeTab === 'source' && (
            <div className="space-y-6">
              {/* Email Chain */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-sompo-red" />
                  Email Chain ({submissionData.emailChain.length} messages)
                </h3>
                <div className="space-y-4">
                  {submissionData.emailChain.map((email) => (
                    <motion.div
                      key={email.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-sompo-red" />
                            <span className="font-semibold text-sm text-gray-900">{email.subject}</span>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600">
                            <div><span className="font-medium">From:</span> {email.from}</div>
                            <div><span className="font-medium">To:</span> {email.to}</div>
                            {email.cc && <div><span className="font-medium">Cc:</span> {email.cc}</div>}
                            <div><span className="font-medium">Date:</span> {email.date}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedEmail(email)}
                          className="px-3 py-1.5 text-xs font-medium text-sompo-red hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Full
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <pre className="whitespace-pre-wrap font-sans text-xs text-gray-700 line-clamp-4">
                          {email.body}
                        </pre>
                      </div>

                      {email.attachments && email.attachments.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            Attachments ({email.attachments.length})
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {email.attachments.map((attachment, idx) => (
                              <div
                                key={idx}
                                onClick={() => setSelectedAttachment(attachment)}
                                className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                              >
                                <FileText className="w-3 h-3" />
                                {attachment}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Documents with Email Context */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sompo-red" />
                  Documents with Email References
                </h3>
                <div className="space-y-3">
                  {submissionData.documents.map((doc, idx) => {
                    const relatedEmail = submissionData.emailChain.find(email =>
                      email.attachments && email.attachments.includes(doc.name)
                    )
                    return (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-sompo-red" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-gray-900">{doc.name}</div>
                              <div className="text-xs text-gray-500">{doc.category} • {doc.size}</div>
                              {relatedEmail && (
                                <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                                  <Mail className="w-3 h-3" />
                                  Attached to: {relatedEmail.subject}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedAttachment(doc.name)}
                            className="px-3 py-1.5 text-xs font-medium text-sompo-red hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* JSON Source Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-sompo-red" />
                    Raw JSON Data
                  </h3>
                  <button className="px-3 py-1.5 text-xs font-medium text-sompo-red hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download JSON
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="text-xs text-green-400 font-mono">
                    {JSON.stringify(submissionData, null, 2)}
                  </pre>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sompo-red" />
                Activity Timeline
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Activity items */}
                <div className="space-y-6">
                  {submissionData.activityHistory.map((activity, idx) => {
                    const IconComponent = {
                      Mail, Send, Activity, User, CheckCircle, Shield, Upload, Edit3
                    }[activity.icon] || Activity

                    const getActivityColor = (type) => {
                      switch(type) {
                        case 'submission': return 'bg-purple-100 text-purple-700 border-purple-300'
                        case 'extraction': return 'bg-blue-100 text-blue-700 border-blue-300'
                        case 'assignment': return 'bg-indigo-100 text-indigo-700 border-indigo-300'
                        case 'clearance': return 'bg-green-100 text-green-700 border-green-300'
                        case 'status': return 'bg-amber-100 text-amber-700 border-amber-300'
                        case 'sanctions': return 'bg-teal-100 text-teal-700 border-teal-300'
                        case 'document': return 'bg-red-100 text-red-700 border-red-300'
                        case 'email': return 'bg-purple-100 text-purple-700 border-purple-300'
                        case 'note': return 'bg-gray-100 text-gray-700 border-gray-300'
                        default: return 'bg-gray-100 text-gray-700 border-gray-300'
                      }
                    }

                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative flex gap-4 items-start"
                      >
                        {/* Icon */}
                        <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getActivityColor(activity.type)}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-sm text-gray-900">{activity.action}</h4>
                              <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getActivityColor(activity.type)}`}>
                              {activity.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {activity.user}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.timestamp}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Detail Modal */}
          <AnimatePresence>
            {selectedEmail && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedEmail(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-sompo-red" />
                      Email Details
                    </h3>
                    <button
                      onClick={() => setSelectedEmail(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                    <div className="space-y-3 mb-4 text-sm">
                      <div><span className="font-semibold">From:</span> {selectedEmail.from}</div>
                      <div><span className="font-semibold">To:</span> {selectedEmail.to}</div>
                      {selectedEmail.cc && <div><span className="font-semibold">Cc:</span> {selectedEmail.cc}</div>}
                      <div><span className="font-semibold">Subject:</span> {selectedEmail.subject}</div>
                      <div><span className="font-semibold">Date:</span> {selectedEmail.date}</div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{selectedEmail.body}</pre>
                    </div>
                    {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Attachments</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedEmail.attachments.map((attachment, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedAttachment(attachment)}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">{attachment}</span>
                              <Eye className="w-4 h-4 ml-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attachment Viewer Modal */}
          <AnimatePresence>
            {selectedAttachment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedAttachment(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-sompo-red" />
                      {selectedAttachment}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium text-sompo-red hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                      <button
                        onClick={() => setSelectedAttachment(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] bg-gray-50">
                    {/* Document viewer - In a real app, this would show the actual document */}
                    <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[600px] flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-sompo-red mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Document Viewer</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {selectedAttachment}
                        </p>
                        <p className="text-xs text-gray-500 max-w-md mx-auto">
                          In a production environment, this would display the actual document content using a PDF viewer, image viewer, or document preview component.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}

export default SubmissionDetail
