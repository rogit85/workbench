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
  Edit3,
  Edit2,
  File,
  FileCheck,
  Sparkles
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const SubmissionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('extractions')
  const [selectedEmail, setSelectedEmail] = useState(null) // for email detail modal
  const [selectedAttachment, setSelectedAttachment] = useState(null) // for attachment modal
  const [extractionView, setExtractionView] = useState('extract') // 'extract', 'raw', 'summary'
  const [selectedDocument, setSelectedDocument] = useState(0) // Selected document index
  const [extractionFeedback, setExtractionFeedback] = useState({}) // { docId-fieldIndex: { comment: string, correctedValue: string } }
  const [editingExtraction, setEditingExtraction] = useState(null) // docId-fieldIndex being edited
  const [extractionsConfirmed, setExtractionsConfirmed] = useState(false)
  const [editingUnderwriter, setEditingUnderwriter] = useState(false)
  const [underwriter, setUnderwriter] = useState('Jeremy Isaacs')
  const [underwriterAssistant, setUnderwriterAssistant] = useState('Frankie Dowsett')
  const [showExtractionTool, setShowExtractionTool] = useState(false)
  const [extractionToolType, setExtractionToolType] = useState('website') // 'website', 'sic', 'registry'
  const [extractionToolInput, setExtractionToolInput] = useState('')
  const [extractionToolLoading, setExtractionToolLoading] = useState(false)
  const [extractionToolResult, setExtractionToolResult] = useState(null)
  const scrollContainerRef = useRef(null)

  // Comprehensive submission data matching all intake fields
  const submissionData = useMemo(() => {
    return {
      // Policy & Lifecycle
      submissionRef: 'SOM-2024-002',
      status: 'Appetite Check',
      newRenewal: 'New Business',
      inceptionDate: '2025-10-03',
      expiryDate: '2037-10-03',
      submissionDate: '2025-07-22',
      guidewireRef: 'FLG-FLS0455998',

      // Renewal Information (if applicable)
      previousPolicyNumber: null,
      gwpcPolicyReference: null,
      expiringPremium: null,
      renewalIncrease: null,
      lossHistory: null,
      priorCarrier: null,
      yearsWithPriorCarrier: null,
      reasonForChange: null,

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
      sicCode: '7372',
      sicDescription: 'Prepackaged Software',
      naicsCode: '518210',
      naicsDescription: 'Data Processing, Hosting, and Related Services',

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
      excess: 10000,
      excessCurrency: 'USD',
      attachmentType: 'Primary',
      layer: '1st Layer',
      layering: 'Primary: USD 1M xs USD 10K',
      programme: 'Stand-alone D&O Policy',
      leadCarrier: 'Sompo International',
      leadCarrierShare: '100%',
      subLimits: [
        { coverage: 'Employment Practices Liability', limit: 2000000, currency: 'USD' },
        { coverage: 'Entity Securities', limit: 1000000, currency: 'USD' },
        { coverage: 'Investigation Costs', limit: 250000, currency: 'USD' }
      ],
      excesses: [
        { coverage: 'Side A (Non-indemnifiable Loss)', amount: 0, currency: 'USD' },
        { coverage: 'Side B (USA)', amount: 35000, currency: 'USD' },
        { coverage: 'Side B (Rest of World)', amount: 15044, currency: 'USD' }
      ],
      insurerNotes: 'Blockchain startup with strong VC backing. No prior claims history. Board includes experienced tech executives. Governance framework being implemented. Standard D&O coverage with EPL sublimit.',

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
      ],

      // Document Extractions
      documentExtractions: [
        {
          id: 1,
          documentName: 'Submission_Email.eml',
          documentType: 'Submission',
          uploadedAt: '2025-07-22 10:35:15 UTC',
          extractedAt: '2025-07-22 10:35:47 UTC',
          processingTime: '32s',
          summary: 'Email submission from Howden Insurance Brokers for D&O liability coverage for JX Research Limited, a blockchain technology company based in Cayman Islands. Requesting USD 1M limit with EUR 2M option. Policy inception date 03-Oct-2025.',
          rawText: `From: Josh Patching <Josh.Patching@howdengroup.com>
To: submissions@sompo.com
Subject: New D&O Submission - JX Research Limited
Date: July 22, 2025 10:35:15 AM UTC

Dear Underwriting Team,

Please find attached our D&O liability submission for JX Research Limited, a blockchain infrastructure company incorporated in the Cayman Islands.

Key Details:
- Insured: JX Research Limited
- Industry: Blockchain Technology / Cryptocurrency Infrastructure
- Limit Requested: USD 1,000,000 (with option for USD 2,000,000)
- Inception Date: October 3, 2025
- Coverage: Directors & Officers Liability

The insured is a well-capitalized blockchain technology firm with USD 5.55M in assets. They are seeking comprehensive D&O coverage with entity EPL sublimit.

Please let me know if you need any additional information.

Best regards,
Josh Patching
Howden Insurance Brokers Ltd`,
          extractedFields: [
            { field: 'Insured Name', value: 'JX Research Limited', confidence: 99, source: 'Email Body' },
            { field: 'Broker', value: 'Howden Insurance Brokers Ltd (UK)', confidence: 98, source: 'Email Sender' },
            { field: 'Broker Contact', value: 'Josh Patching', confidence: 99, source: 'Email Sender' },
            { field: 'Broker Email', value: 'Josh.Patching@howdengroup.com', confidence: 100, source: 'Email Sender' },
            { field: 'Coverage Type', value: 'Directors & Officers Liability', confidence: 97, source: 'Email Body' },
            { field: 'Limit Requested', value: 'USD 1,000,000', confidence: 95, source: 'Email Body' },
            { field: 'Limit Option 2', value: 'USD 2,000,000', confidence: 93, source: 'Email Body' },
            { field: 'Inception Date', value: '2025-10-03', confidence: 96, source: 'Email Body' },
            { field: 'Industry', value: 'Blockchain Technology', confidence: 94, source: 'Email Body' },
            { field: 'Total Assets', value: 'USD 5,550,000', confidence: 92, source: 'Email Body' }
          ]
        },
        {
          id: 2,
          documentName: 'Application_Form_Signed.pdf',
          documentType: 'Submission',
          uploadedAt: '2025-07-22 10:36:02 UTC',
          extractedAt: '2025-07-22 10:37:18 UTC',
          processingTime: '1m 16s',
          summary: 'Completed D&O application form for JX Research Limited. Contains detailed company information, financial data, governance structure, and coverage requirements. Form includes director and officer details, claim history, and risk management practices.',
          rawText: `DIRECTORS & OFFICERS LIABILITY APPLICATION FORM

SECTION 1: COMPANY INFORMATION
Company Name: JX Research Limited
Registered Address: SIX, 2nd Floor, Cricket Square, PO Box 2681, George Town, Grand Cayman, KY1-1111, Cayman Islands
Country of Incorporation: Cayman Islands
Business Description: Blockchain Technology and Cryptocurrency Infrastructure
Years in Operation: 3 years
DUNS Number: [Not Provided]

SECTION 2: FINANCIAL INFORMATION
Total Assets (Current): USD 5,550,000
Total Assets (Previous): N/A
Annual Revenue (Current): USD 0
Annual Revenue (Previous): N/A
Capital Raised: USD 5,550,000
Market Capitalization: Private Company

SECTION 3: COVERAGE REQUESTED
Coverage Type: Directors & Officers Liability
Limit Requested: USD 1,000,000
Alternative Limit: USD 2,000,000
Deductible Primary: USD 0
Deductible Side A: USD 0
Deductible Side B (USA): USD 35,000
Deductible Side B (RoW): USD 15,044
Entity EPL: Sublimit up to USD 2,000,000
Policy Period: October 3, 2025 to October 3, 2026

SECTION 4: GOVERNANCE
Number of Directors: 5
Number of Officers: 8
Independent Directors: 2
Audit Committee: Yes
...`,
          extractedFields: [
            { field: 'Insured Name', value: 'JX Research Limited', confidence: 100, source: 'Form Field' },
            { field: 'Registered Address', value: 'SIX, 2nd Floor, Cricket Square, PO Box 2681, George Town, Grand Cayman, KY1-1111, Cayman Islands', confidence: 99, source: 'Form Field' },
            { field: 'Country', value: 'Cayman Islands', confidence: 100, source: 'Form Field' },
            { field: 'Business Description', value: 'Blockchain Technology and Cryptocurrency Infrastructure', confidence: 98, source: 'Form Field' },
            { field: 'Total Assets Current', value: 'USD 5,550,000', confidence: 100, source: 'Form Field' },
            { field: 'Capital Raised', value: 'USD 5,550,000', confidence: 100, source: 'Form Field' },
            { field: 'Limit', value: 'USD 1,000,000', confidence: 100, source: 'Form Field' },
            { field: 'Limit Option 2', value: 'USD 2,000,000', confidence: 100, source: 'Form Field' },
            { field: 'Primary Deductible', value: 'USD 0', confidence: 100, source: 'Form Field' },
            { field: 'Side A Deductible', value: 'USD 0', confidence: 100, source: 'Form Field' },
            { field: 'Side B Deductible (USA)', value: 'USD 35,000', confidence: 100, source: 'Form Field' },
            { field: 'Side B Deductible (RoW)', value: 'USD 15,044', confidence: 100, source: 'Form Field' },
            { field: 'Entity EPL', value: 'Sublimit Upto USD 2,000,000', confidence: 99, source: 'Form Field' },
            { field: 'Inception Date', value: '2025-10-03', confidence: 100, source: 'Form Field' },
            { field: 'Expiry Date', value: '2026-10-03', confidence: 100, source: 'Form Field' }
          ]
        },
        {
          id: 3,
          documentName: 'Policy_Wording_DO_2024.pdf',
          documentType: 'Wording',
          uploadedAt: '2025-07-22 10:36:45 UTC',
          extractedAt: '2025-07-22 10:37:52 UTC',
          processingTime: '1m 7s',
          summary: 'Standard D&O policy wording document version 2024. Contains policy definitions, coverage terms, exclusions, conditions, and endorsements. No specific extraction of values required - reference document for coverage terms.',
          rawText: `DIRECTORS AND OFFICERS LIABILITY INSURANCE POLICY

POLICY WORDING VERSION 2024.1

DEFINITIONS
"Claim" means:
(a) a written demand for monetary or non-monetary relief;
(b) a civil proceeding;
(c) a criminal proceeding;
(d) a formal administrative or regulatory proceeding;
...

INSURING AGREEMENTS
Coverage A - Directors and Officers Liability
The Insurer shall pay on behalf of the Directors and Officers Loss arising from Claims first made during the Policy Period...

Coverage B - Company Reimbursement
The Insurer shall pay on behalf of the Company Loss arising from Claims first made during the Policy Period...
...`,
          extractedFields: [
            { field: 'Document Type', value: 'Policy Wording', confidence: 100, source: 'Document Header' },
            { field: 'Version', value: '2024.1', confidence: 99, source: 'Document Header' },
            { field: 'Coverage Types', value: 'Coverage A (D&O), Coverage B (Company Reimbursement)', confidence: 97, source: 'Document Body' }
          ]
        },
        {
          id: 4,
          documentName: 'Exposure_Schedule.xlsx',
          documentType: 'Exposure',
          uploadedAt: '2025-07-22 10:37:12 UTC',
          extractedAt: '2025-07-22 10:38:05 UTC',
          processingTime: '53s',
          summary: 'Detailed exposure schedule showing director and officer positions, compensation, equity holdings, and jurisdictional exposure. Includes breakdown of management structure and key person details.',
          rawText: `EXPOSURE SCHEDULE - JX RESEARCH LIMITED

DIRECTORS & OFFICERS:
Name                    Title                     Compensation    Equity    Jurisdiction
John Smith             CEO & Director            $250,000        15%       Cayman Islands
Sarah Johnson          CFO & Director            $200,000        10%       Cayman Islands
Michael Chen           CTO & Director            $200,000        12%       Cayman Islands
Emma Williams          Independent Director      $50,000         0%        United Kingdom
David Brown            Independent Director      $50,000         0%        United States

OFFICERS (Non-Director):
Alice Cooper           VP Operations             $150,000        3%        Cayman Islands
Robert Davis           VP Technology             $150,000        3%        Cayman Islands
Lisa Anderson          General Counsel           $180,000        2%        United States

JURISDICTIONAL EXPOSURE:
Cayman Islands: Primary
United States: Secondary (US operations and employees)
United Kingdom: Minimal (1 director)

TOTAL MANAGEMENT COMPENSATION: USD 1,230,000
TOTAL EQUITY HELD BY MANAGEMENT: 45%`,
          extractedFields: [
            { field: 'Number of Directors', value: '5', confidence: 100, source: 'Spreadsheet' },
            { field: 'Number of Officers', value: '8', confidence: 98, source: 'Spreadsheet' },
            { field: 'CEO Name', value: 'John Smith', confidence: 100, source: 'Spreadsheet' },
            { field: 'CFO Name', value: 'Sarah Johnson', confidence: 100, source: 'Spreadsheet' },
            { field: 'CTO Name', value: 'Michael Chen', confidence: 100, source: 'Spreadsheet' },
            { field: 'Independent Directors', value: '2', confidence: 100, source: 'Spreadsheet' },
            { field: 'Primary Jurisdiction', value: 'Cayman Islands', confidence: 100, source: 'Spreadsheet' },
            { field: 'Secondary Jurisdiction', value: 'United States', confidence: 100, source: 'Spreadsheet' },
            { field: 'Total Management Compensation', value: 'USD 1,230,000', confidence: 99, source: 'Spreadsheet' },
            { field: 'Management Equity', value: '45%', confidence: 100, source: 'Spreadsheet' }
          ]
        },
        {
          id: 5,
          documentName: 'Quote_Request_Notes.docx',
          documentType: 'Other',
          uploadedAt: '2025-07-22 11:20:33 UTC',
          extractedAt: '2025-07-22 11:21:08 UTC',
          processingTime: '35s',
          summary: 'Internal broker notes on the submission including market appetite, placement strategy, and client expectations. Contains information on competing markets and pricing guidance.',
          rawText: `INTERNAL QUOTE REQUEST NOTES

Client: JX Research Limited
Market: D&O - Technology / Blockchain Sector

PLACEMENT STRATEGY:
- Primary target: Specialist tech E&O/D&O markets
- Secondary: Lloyd's syndicates with crypto appetite
- Seeking competitive terms given strong capitalization

CLIENT EXPECTATIONS:
- Target pricing: 2.5% - 3.5% of limit
- Preferred deductible structure: Zero on Side A
- Must include entity EPL sublimit
- Policy period: 12 months from October 3, 2025

MARKET INTELLIGENCE:
- 3 other markets approached
- Preliminary indications: 3.2% - 4.1%
- Client has existing relationship with Sompo through other lines

UNDERWRITING CONSIDERATIONS:
- Blockchain sector = increased governance scrutiny
- Cayman incorporation = jurisdictional considerations
- Strong balance sheet = positive factor
- No prior claims = positive factor

TARGET SUBMISSION DATE: July 22, 2025
TARGET QUOTE DATE: July 29, 2025`,
          extractedFields: [
            { field: 'Client Name', value: 'JX Research Limited', confidence: 100, source: 'Document' },
            { field: 'Market Sector', value: 'Technology / Blockchain', confidence: 99, source: 'Document' },
            { field: 'Target Pricing', value: '2.5% - 3.5% of limit', confidence: 96, source: 'Document' },
            { field: 'Competing Markets', value: '3', confidence: 98, source: 'Document' },
            { field: 'Preliminary Indications', value: '3.2% - 4.1%', confidence: 97, source: 'Document' },
            { field: 'Target Quote Date', value: '2025-07-29', confidence: 95, source: 'Document' }
          ]
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
      status: 'Extraction Review',
      date: '2025-07-22',
      assignee: underwriter,
      duration: '15 mins',
      completed: extractionsConfirmed,
      completedBy: extractionsConfirmed ? underwriter : null,
      inProgress: !extractionsConfirmed
    },
    {
      status: 'Clearance',
      date: '2025-07-22',
      assignee: 'System',
      duration: '2 mins',
      completed: extractionsConfirmed,
      completedBy: extractionsConfirmed ? 'Auto-Approved' : null
    },
    {
      status: 'Appetite Check',
      date: '2025-07-22',
      assignee: underwriter,
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
    { id: 'extractions', label: 'Extractions', icon: Sparkles },
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
    return (
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
                  {workflowStatuses.map((item, idx) => {
                    // Check if this is an AI-powered stage
                    const isAIStage = item.status === 'Extraction Review' || item.status === 'Clearance' || item.completedBy === 'Auto-Approved' || item.completedBy === 'Auto-Intake'

                    return (
                    <div key={idx} className="flex items-start flex-shrink-0">
                      {/* Status Step */}
                      <div className="flex flex-col items-center relative" style={{ width: '100px' }}>
                        {/* AI Badge */}
                        {isAIStage && (
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-20">
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="flex items-center gap-0.5 px-1.5 py-0.5 bg-sompo-red text-white text-[8px] font-bold rounded-full shadow-sm"
                            >
                              <Sparkles className="w-2 h-2" />
                              AI
                            </motion.div>
                          </div>
                        )}

                        {/* Circle */}
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 ${
                          item.completed
                            ? isAIStage ? 'bg-sompo-red border-red-200' : 'bg-green-500 border-green-200'
                            : item.inProgress
                            ? isAIStage ? 'bg-sompo-red border-red-200 animate-pulse' : 'bg-purple-500 border-purple-200 animate-pulse'
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          {item.completed && (isAIStage ? <Sparkles className="w-4 h-4 text-white" /> : <CheckCircle className="w-4 h-4 text-white" />)}
                          {item.inProgress && (isAIStage ? <Sparkles className="w-4 h-4 text-white animate-pulse" /> : <Clock className="w-4 h-4 text-white" />)}
                        </div>

                        {/* Status name */}
                        <div className="mt-2 text-center">
                          <div className={`font-semibold text-[10px] leading-tight flex items-center justify-center gap-1 ${
                            item.completed
                              ? isAIStage ? 'text-sompo-red' : 'text-gray-900'
                              : item.inProgress
                              ? isAIStage ? 'text-sompo-red' : 'text-purple-700'
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
                    )
                  })}
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
          {activeTab === 'extractions' && (
            <div className="space-y-4">
              {/* Header with View Mode Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-sompo-red" />
                      Document Extraction & Classification
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      AI-powered extraction from {submissionData.documentExtractions.length} documents with confidence scoring
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExtractionView('extract')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          extractionView === 'extract'
                            ? 'bg-sompo-red text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <FileCheck className="w-4 h-4 inline mr-1" />
                        Extract
                      </button>
                      <button
                        onClick={() => setExtractionView('raw')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          extractionView === 'raw'
                            ? 'bg-sompo-red text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <File className="w-4 h-4 inline mr-1" />
                        Raw
                      </button>
                      <button
                        onClick={() => setExtractionView('summary')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          extractionView === 'summary'
                            ? 'bg-sompo-red text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Summary
                      </button>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <button
                      onClick={() => setExtractionsConfirmed(true)}
                      disabled={extractionsConfirmed}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                        extractionsConfirmed
                          ? 'bg-green-100 text-green-800 border-2 border-green-300 cursor-not-allowed'
                          : 'bg-sompo-red text-white hover:bg-sompo-dark-red shadow-md hover:shadow-lg'
                      }`}
                    >
                      {extractionsConfirmed ? (
                        <>
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Extractions Confirmed
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Confirm Extractions
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Assignment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-sompo-red" />
                    Assignment
                  </h4>
                  {!editingUnderwriter && (
                    <button
                      onClick={() => setEditingUnderwriter(true)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Edit2 className="w-3 h-3 inline mr-1" />
                      Edit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Underwriter
                    </label>
                    {editingUnderwriter ? (
                      <input
                        type="text"
                        value={underwriter}
                        onChange={(e) => setUnderwriter(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 font-medium">{underwriter}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Underwriter Assistant
                    </label>
                    {editingUnderwriter ? (
                      <input
                        type="text"
                        value={underwriterAssistant}
                        onChange={(e) => setUnderwriterAssistant(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 font-medium">{underwriterAssistant}</p>
                    )}
                  </div>
                </div>
                {editingUnderwriter && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setEditingUnderwriter(false)}
                      className="px-4 py-2 bg-sompo-red text-white rounded-lg text-sm font-medium hover:bg-sompo-dark-red transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setUnderwriter(submissionData.underwriter)
                        setUnderwriterAssistant(submissionData.underwriterAssistant)
                        setEditingUnderwriter(false)
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Company Information Extraction Tool */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    '0 4px 6px rgba(220, 38, 38, 0.1)',
                    '0 10px 25px rgba(220, 38, 38, 0.2)',
                    '0 4px 6px rgba(220, 38, 38, 0.1)',
                  ]
                }}
                transition={{
                  delay: 0.15,
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative bg-gradient-to-br from-red-50 via-white to-red-50 rounded-xl shadow-xl border-2 border-sompo-red p-5 overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-sompo-red/5 to-transparent opacity-50"></div>

                {/* Sparkle effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 right-2 w-16 h-16 bg-sompo-red/10 rounded-full blur-2xl"
                />

                <div className="relative flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-sompo-red animate-pulse" />
                      AI Company Information Extractor
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Extract key information from websites, SIC/NAICS codes, or company registries using AI
                    </p>
                  </div>
                  <button
                    onClick={() => setShowExtractionTool(!showExtractionTool)}
                    className="px-4 py-2 bg-sompo-red text-white rounded-lg text-sm font-semibold hover:bg-sompo-dark-red transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    {showExtractionTool ? 'Hide Tool' : 'Show Tool'}
                  </button>
                </div>

                {showExtractionTool && (
                  <div className="relative space-y-3">
                    {/* Tool Type Selection */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExtractionToolType('website')}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          extractionToolType === 'website'
                            ? 'bg-sompo-red text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        <Globe className="w-3 h-3 inline mr-1" />
                        Website URL
                      </button>
                      <button
                        onClick={() => setExtractionToolType('sic')}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          extractionToolType === 'sic'
                            ? 'bg-sompo-red text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        <BookOpen className="w-3 h-3 inline mr-1" />
                        SIC / NAICS
                      </button>
                      <button
                        onClick={() => setExtractionToolType('registry')}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          extractionToolType === 'registry'
                            ? 'bg-sompo-red text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        <Building className="w-3 h-3 inline mr-1" />
                        Company Registry
                      </button>
                    </div>

                    {/* Input Area */}
                    <div className="relative bg-white rounded-lg border-2 border-sompo-red/30 p-3 shadow-sm">
                      {extractionToolType === 'website' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-gray-700">
                            Company Website URL
                          </label>
                          <input
                            type="url"
                            value={extractionToolInput}
                            onChange={(e) => setExtractionToolInput(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500">
                            Extract company name, description, industry, contact info from website
                          </p>
                        </div>
                      )}

                      {extractionToolType === 'sic' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-gray-700">
                            SIC or NAICS Code
                          </label>
                          <input
                            type="text"
                            value={extractionToolInput}
                            onChange={(e) => setExtractionToolInput(e.target.value)}
                            placeholder="7372 or 518210"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500">
                            Lookup industry classification and description
                          </p>
                        </div>
                      )}

                      {extractionToolType === 'registry' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-gray-700">
                            Company Name or Registration Number
                          </label>
                          <input
                            type="text"
                            value={extractionToolInput}
                            onChange={(e) => setExtractionToolInput(e.target.value)}
                            placeholder="Company name or registration #"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                          />
                          <div className="flex items-center gap-2 mt-2">
                            <select className="px-2 py-1.5 text-xs border border-gray-300 rounded bg-white">
                              <option value="uk">UK Companies House</option>
                              <option value="de">Delaware</option>
                              <option value="ca">California</option>
                              <option value="ny">New York</option>
                              <option value="tx">Texas</option>
                              <option value="fl">Florida</option>
                            </select>
                          </div>
                          <p className="text-xs text-gray-500">
                            Search company registries for official company information
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setExtractionToolLoading(true)
                          // Simulate API call
                          setTimeout(() => {
                            setExtractionToolResult({
                              fields: [
                                { label: 'Company Name', value: 'JX Research Limited', confidence: 98, source: 'Website Homepage' },
                                { label: 'Registration Number', value: 'KY1-1111-2681', confidence: 95, source: 'Company Registry' },
                                { label: 'Address', value: 'SIX, 2nd Floor, Cricket Square, PO Box 2681, George Town, Grand Cayman', confidence: 96, source: 'Website Contact Page' },
                                { label: 'Country', value: 'Cayman Islands', confidence: 99, source: 'Registry Data' },
                                { label: 'Industry', value: 'Blockchain Technology', confidence: 92, source: 'Website About Page' },
                                { label: 'Business Description', value: 'Cryptocurrency infrastructure and blockchain research services', confidence: 89, source: 'Website Content' },
                                { label: 'SIC Code', value: '7372', confidence: 94, source: 'Industry Classification DB' },
                                { label: 'SIC Description', value: 'Prepackaged Software', confidence: 94, source: 'Industry Classification DB' },
                                { label: 'NAICS Code', value: '518210', confidence: 93, source: 'Industry Classification DB' },
                                { label: 'NAICS Description', value: 'Data Processing, Hosting, and Related Services', confidence: 93, source: 'Industry Classification DB' },
                                { label: 'Founded Year', value: '2022', confidence: 97, source: 'Company Registry' },
                                { label: 'Status', value: 'Active', confidence: 99, source: 'Company Registry' },
                                { label: 'Employee Count', value: '25-50', confidence: 78, source: 'LinkedIn Analysis' },
                                { label: 'Annual Revenue', value: 'Not Disclosed', confidence: 85, source: 'Public Records' }
                              ]
                            })
                            setExtractionToolLoading(false)
                          }, 2000)
                        }}
                        disabled={!extractionToolInput || extractionToolLoading}
                        className="w-full mt-3 px-4 py-2.5 bg-sompo-red text-white rounded-lg text-sm font-semibold hover:bg-sompo-dark-red transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        {extractionToolLoading ? (
                          <>
                            <Clock className="w-4 h-4 animate-spin" />
                            Extracting with AI...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            Extract Information with AI
                          </>
                        )}
                      </button>
                    </div>

                    {/* Results */}
                    {extractionToolResult && !extractionToolLoading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-400 p-4 shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-bold text-green-900 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-green-600 animate-pulse" />
                            AI Extraction Results
                          </h5>
                          <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                            {extractionToolResult.fields.length} Fields Extracted
                          </span>
                        </div>

                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                          {extractionToolResult.fields.map((field, idx) => {
                            const feedbackKey = `tool-${idx}`
                            const feedback = extractionFeedback[feedbackKey]
                            const isEditing = editingExtraction === feedbackKey

                            const getConfidenceColor = (confidence) => {
                              if (confidence >= 95) return 'text-green-700 bg-green-100'
                              if (confidence >= 85) return 'text-blue-700 bg-blue-100'
                              if (confidence >= 75) return 'text-amber-700 bg-amber-100'
                              return 'text-red-700 bg-red-100'
                            }

                            return (
                              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Sparkles className="w-3 h-3 text-sompo-red flex-shrink-0" />
                                      <span className="text-xs font-semibold text-gray-700">{field.label}</span>
                                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${getConfidenceColor(field.confidence)}`}>
                                        {field.confidence}% AI
                                      </span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 mb-1">{field.value}</div>
                                    <div className="text-xs text-gray-500">Source: {field.source}</div>

                                    {/* Feedback Section */}
                                    {!feedback && !isEditing && (
                                      <button
                                        onClick={() => setEditingExtraction(feedbackKey)}
                                        className="mt-2 px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium hover:bg-amber-100 transition-colors flex items-center gap-1"
                                      >
                                        <ThumbsDown className="w-3 h-3" />
                                        Incorrect? Provide Feedback
                                      </button>
                                    )}

                                    {isEditing && (
                                      <div className="mt-2 p-2 bg-amber-50 border border-amber-300 rounded-lg space-y-2">
                                        <div>
                                          <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Correct Value
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Enter correct value"
                                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                                            value={feedback?.correctedValue || ''}
                                            onChange={(e) => setExtractionFeedback({
                                              ...extractionFeedback,
                                              [feedbackKey]: { ...feedback, correctedValue: e.target.value }
                                            })}
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Comment (Optional)
                                          </label>
                                          <textarea
                                            placeholder="Add notes about the correction"
                                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-sompo-red focus:border-transparent resize-none"
                                            rows="2"
                                            value={feedback?.comment || ''}
                                            onChange={(e) => setExtractionFeedback({
                                              ...extractionFeedback,
                                              [feedbackKey]: { ...feedback, comment: e.target.value }
                                            })}
                                          />
                                        </div>
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() => {
                                              setExtractionFeedback({
                                                ...extractionFeedback,
                                                [feedbackKey]: feedback || { comment: '', correctedValue: '' }
                                              })
                                              setEditingExtraction(null)
                                            }}
                                            className="px-2 py-1 bg-sompo-red text-white rounded text-xs font-semibold hover:bg-sompo-dark-red transition-colors"
                                          >
                                            Save Feedback
                                          </button>
                                          <button
                                            onClick={() => {
                                              const updated = { ...extractionFeedback }
                                              delete updated[feedbackKey]
                                              setExtractionFeedback(updated)
                                              setEditingExtraction(null)
                                            }}
                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {feedback && !isEditing && (
                                      <div className="mt-2 p-2 bg-amber-100 border border-amber-400 rounded text-xs">
                                        <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1">
                                          <AlertTriangle className="w-3 h-3" />
                                          Corrected to: {feedback.correctedValue}
                                        </div>
                                        {feedback.comment && (
                                          <p className="text-amber-800 text-[10px] mb-1">Note: {feedback.comment}</p>
                                        )}
                                        <button
                                          onClick={() => setEditingExtraction(feedbackKey)}
                                          className="text-[10px] text-amber-700 hover:text-amber-900 underline"
                                        >
                                          Edit feedback
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        <button
                          onClick={() => {
                            // Apply extracted data to submission
                            alert('Data would be applied to submission fields')
                            setExtractionToolResult(null)
                            setExtractionToolInput('')
                          }}
                          className="w-full mt-4 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Apply All Fields to Submission
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Document List Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Documents ({submissionData.documentExtractions.length})</h4>
                    <div className="space-y-2">
                      {submissionData.documentExtractions.map((doc, index) => {
                        const getDocTypeColor = (type) => {
                          switch (type) {
                            case 'Submission': return 'bg-blue-100 text-blue-800 border-blue-300'
                            case 'Quote': return 'bg-green-100 text-green-800 border-green-300'
                            case 'Wording': return 'bg-purple-100 text-purple-800 border-purple-300'
                            case 'Exposure': return 'bg-orange-100 text-orange-800 border-orange-300'
                            case 'Other': return 'bg-gray-100 text-gray-800 border-gray-300'
                            default: return 'bg-gray-100 text-gray-800 border-gray-300'
                          }
                        }

                        return (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDocument(index)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              selectedDocument === index
                                ? 'border-sompo-red bg-red-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <File className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                selectedDocument === index ? 'text-sompo-red' : 'text-gray-400'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">{doc.documentName}</p>
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border mt-1 ${getDocTypeColor(doc.documentType)}`}>
                                  {doc.documentType}
                                </span>
                                <p className="text-[10px] text-gray-500 mt-1">
                                  {doc.extractedFields.length} fields • {doc.processingTime}
                                </p>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Document Content Area */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-3"
                >
                  {submissionData.documentExtractions[selectedDocument] && (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                      {/* Document Header */}
                      <div className="border-b border-gray-200 pb-4 mb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {submissionData.documentExtractions[selectedDocument].documentName}
                            </h4>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Upload className="w-3 h-3" />
                                Uploaded: {submissionData.documentExtractions[selectedDocument].uploadedAt}
                              </span>
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Extracted: {submissionData.documentExtractions[selectedDocument].extractedAt}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {submissionData.documentExtractions[selectedDocument].processingTime}
                              </span>
                            </div>
                          </div>
                          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>

                      {/* Extract View */}
                      {extractionView === 'extract' && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <FileCheck className="w-4 h-4 text-sompo-red" />
                            Extracted Fields ({submissionData.documentExtractions[selectedDocument].extractedFields.length})
                          </h5>
                          <div className="space-y-3">
                            {submissionData.documentExtractions[selectedDocument].extractedFields.map((field, idx) => {
                              const getConfidenceColor = (conf) => {
                                if (conf >= 95) return 'text-green-700 bg-green-50'
                                if (conf >= 85) return 'text-blue-700 bg-blue-50'
                                if (conf >= 75) return 'text-amber-700 bg-amber-50'
                                return 'text-red-700 bg-red-50'
                              }

                              const feedbackKey = `${submissionData.documentExtractions[selectedDocument].id}-${idx}`
                              const feedback = extractionFeedback[feedbackKey]
                              const isEditing = editingExtraction === feedbackKey

                              return (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className={`relative border rounded-lg p-3 transition-all overflow-hidden ${
                                    feedback ? 'border-amber-400 bg-amber-50' : 'border-gray-200 hover:border-sompo-red hover:shadow-md'
                                  }`}
                                >
                                  {/* AI Indicator Corner */}
                                  <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-sompo-red/10 to-transparent transform rotate-45 translate-x-4 -translate-y-4"></div>
                                    <Sparkles className="absolute top-1 right-1 w-3 h-3 text-sompo-red animate-pulse" />
                                  </div>

                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-1.5">
                                      <Sparkles className="w-3 h-3 text-sompo-red flex-shrink-0" />
                                      <span className="text-xs font-medium text-gray-600">{field.field}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getConfidenceColor(field.confidence)}`}>
                                        {field.confidence}% AI
                                      </span>
                                      <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                        {field.source}
                                      </span>
                                      {!feedback && (
                                        <button
                                          onClick={() => setEditingExtraction(feedbackKey)}
                                          className="p-1 hover:bg-red-100 rounded transition-colors"
                                          title="Report incorrect extraction"
                                        >
                                          <ThumbsDown className="w-3.5 h-3.5 text-red-600" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm font-semibold text-gray-900 break-words mb-2">{field.value}</p>

                                  {/* Feedback Form */}
                                  {isEditing && (
                                    <div className="mt-3 p-3 bg-white border border-amber-300 rounded-lg space-y-2">
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                          Corrected Value
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Enter correct value"
                                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                                          value={feedback?.correctedValue || ''}
                                          onChange={(e) => setExtractionFeedback({
                                            ...extractionFeedback,
                                            [feedbackKey]: { ...feedback, correctedValue: e.target.value }
                                          })}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                          Comment (Optional)
                                        </label>
                                        <textarea
                                          placeholder="Add notes about the correction"
                                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-sompo-red focus:border-transparent resize-none"
                                          rows="2"
                                          value={feedback?.comment || ''}
                                          onChange={(e) => setExtractionFeedback({
                                            ...extractionFeedback,
                                            [feedbackKey]: { ...feedback, comment: e.target.value }
                                          })}
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => {
                                            setExtractionFeedback({
                                              ...extractionFeedback,
                                              [feedbackKey]: feedback || { comment: '', correctedValue: '' }
                                            })
                                            setEditingExtraction(null)
                                          }}
                                          className="px-3 py-1.5 bg-sompo-red text-white rounded text-xs font-medium hover:bg-sompo-dark-red transition-colors"
                                        >
                                          Save Feedback
                                        </button>
                                        <button
                                          onClick={() => {
                                            const updated = { ...extractionFeedback }
                                            delete updated[feedbackKey]
                                            setExtractionFeedback(updated)
                                            setEditingExtraction(null)
                                          }}
                                          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Show Saved Feedback */}
                                  {feedback && !isEditing && (
                                    <div className="mt-2 p-2 bg-amber-100 border border-amber-300 rounded text-xs">
                                      <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        Corrected to: {feedback.correctedValue}
                                      </div>
                                      {feedback.comment && (
                                        <p className="text-amber-800 text-[11px]">Note: {feedback.comment}</p>
                                      )}
                                      <button
                                        onClick={() => setEditingExtraction(feedbackKey)}
                                        className="mt-1 text-[11px] text-amber-700 hover:text-amber-900 underline"
                                      >
                                        Edit feedback
                                      </button>
                                    </div>
                                  )}
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Raw View */}
                      {extractionView === 'raw' && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <File className="w-4 h-4 text-sompo-red" />
                            Raw Document Text
                          </h5>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                            <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap break-words">
                              {submissionData.documentExtractions[selectedDocument].rawText}
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Summary View */}
                      {extractionView === 'summary' && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-sompo-red" />
                            AI-Generated Summary
                          </h5>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-gray-800 leading-relaxed">
                              {submissionData.documentExtractions[selectedDocument].summary}
                            </p>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-3">
                            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                              <p className="text-xs text-gray-600">Total Fields</p>
                              <p className="text-2xl font-bold text-sompo-red mt-1">
                                {submissionData.documentExtractions[selectedDocument].extractedFields.length}
                              </p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                              <p className="text-xs text-gray-600">Avg Confidence</p>
                              <p className="text-2xl font-bold text-green-600 mt-1">
                                {Math.round(
                                  submissionData.documentExtractions[selectedDocument].extractedFields.reduce((sum, f) => sum + f.confidence, 0) /
                                  submissionData.documentExtractions[selectedDocument].extractedFields.length
                                )}%
                              </p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                              <p className="text-xs text-gray-600">Processing Time</p>
                              <p className="text-2xl font-bold text-blue-600 mt-1">
                                {submissionData.documentExtractions[selectedDocument].processingTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          )}

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
                    label="Insured Name"
                    value={submissionData.insuredExtracted}
                  />
                  <FieldDisplay
                    label="Insured Address"
                    value={submissionData.insuredAddress}
                  />
                  <FieldDisplay
                    label="Insured Country"
                    value={submissionData.insuredCountry}
                  />
                  <FieldDisplay
                    label="Domicile"
                    value={submissionData.domicile}
                  />
                  <FieldDisplay label="Account Number" value={submissionData.accountNo} />
                  <FieldDisplay label="DUNS Number" value={submissionData.dunsNumber} />
                  <FieldDisplay
                    label="Sector/Industry"
                    value={submissionData.sector}
                  />
                  <FieldDisplay
                    label="Sector Sub-Category"
                    value={submissionData.sectorSubCategory}
                  />
                  <FieldDisplay
                    label="Occupancy"
                    value={submissionData.occupancy}
                  />

                  {/* SIC & NAICS Classification */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 mt-2">Industry Classification</div>
                    <div className="space-y-2">
                      <div className="bg-blue-50 border border-blue-200 rounded p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-blue-900">SIC Code</span>
                          <span className="text-xs font-bold text-blue-700">{submissionData.sicCode}</span>
                        </div>
                        <div className="text-xs text-blue-800">{submissionData.sicDescription}</div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-green-900">NAICS Code</span>
                          <span className="text-xs font-bold text-green-700">{submissionData.naicsCode}</span>
                        </div>
                        <div className="text-xs text-green-800">{submissionData.naicsDescription}</div>
                      </div>
                    </div>
                  </div>
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
                    label="Broker Organization"
                    value={submissionData.broker}
                  />
                  <FieldDisplay
                    label="Broker Office"
                    value={submissionData.brokerOffice}
                  />
                  <FieldDisplay
                    label="Broker Contact"
                    value={submissionData.brokerContact}
                  />
                  <FieldDisplay
                    label="Broker Email"
                    value={submissionData.brokerContactEmail}
                  />
                  <FieldDisplay label="Team" value={submissionData.team} />
                  <FieldDisplay label="Office Location" value={submissionData.officeLocation} />

                  {/* Editable Underwriter Fields */}
                  <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        Assignment
                      </h4>
                      {!editingUnderwriter && (
                        <button
                          onClick={() => setEditingUnderwriter(true)}
                          className="px-2 py-1 bg-white text-gray-700 rounded text-xs font-medium hover:bg-gray-100 transition-colors border border-gray-300"
                        >
                          <Edit2 className="w-3 h-3 inline mr-0.5" />
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Underwriter
                        </label>
                        {editingUnderwriter ? (
                          <input
                            type="text"
                            value={underwriter}
                            onChange={(e) => setUnderwriter(e.target.value)}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                          />
                        ) : (
                          <p className="text-sm text-gray-900 font-medium">{underwriter}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Underwriter Assistant
                        </label>
                        {editingUnderwriter ? (
                          <input
                            type="text"
                            value={underwriterAssistant}
                            onChange={(e) => setUnderwriterAssistant(e.target.value)}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                          />
                        ) : (
                          <p className="text-sm text-gray-900 font-medium">{underwriterAssistant}</p>
                        )}
                      </div>
                    </div>
                    {editingUnderwriter && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setEditingUnderwriter(false)}
                          className="px-3 py-1.5 bg-sompo-red text-white rounded text-xs font-medium hover:bg-sompo-dark-red transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setUnderwriter(submissionData.underwriter)
                            setUnderwriterAssistant(submissionData.underwriterAssistant)
                            setEditingUnderwriter(false)
                          }}
                          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
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
                    label="Coverage Type"
                    value={submissionData.coverage}
                  />
                  <FieldDisplay
                    label="Inception Date"
                    value={submissionData.inceptionDate}
                  />
                  <FieldDisplay
                    label="Expiry Date"
                    value={submissionData.expiryDate}
                  />
                  <FieldDisplay label="Submission Date" value={submissionData.submissionDate} />
                  <FieldDisplay label="Attachment Type" value={submissionData.attachmentType} />
                  <FieldDisplay label="Direct / Assumed Fac" value={submissionData.assumedFac ? 'Assumed Fac' : 'Direct'} />
                  <FieldDisplay label="Lead" value={submissionData.lead} />
                  <FieldDisplay label="Written Since (YYYY)" value={submissionData.writtenSince} />
                </div>
              </motion.div>

              {/* Programme & Layering */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-3"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sompo-red" />
                  Programme & Layering
                </h3>
                <div className="space-y-2">
                  <FieldDisplay label="Programme" value={submissionData.programme} />
                  <FieldDisplay label="Layer" value={submissionData.layer} />
                  <FieldDisplay label="Layering Structure" value={submissionData.layering} />
                  <FieldDisplay label="Lead Carrier" value={submissionData.leadCarrier} />
                  <FieldDisplay label="Lead Carrier Share" value={submissionData.leadCarrierShare} />

                  {/* Sub-Limits */}
                  <div className="pt-2">
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">Sub-Limits</div>
                    <div className="space-y-1.5 pl-3">
                      {submissionData.subLimits?.map((sublimit, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-gray-50 rounded px-2 py-1.5">
                          <span className="text-gray-700">{sublimit.coverage}</span>
                          <span className="font-semibold text-gray-900">
                            {sublimit.currency} {sublimit.limit.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Excesses */}
                  <div className="pt-2">
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">Excesses / Deductibles</div>
                    <div className="space-y-1.5 pl-3">
                      {submissionData.excesses?.map((excess, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-gray-50 rounded px-2 py-1.5">
                          <span className="text-gray-700">{excess.coverage}</span>
                          <span className="font-semibold text-gray-900">
                            {excess.currency} {excess.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Insurer Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-3"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sompo-red" />
                  Insurer Notes
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {submissionData.insurerNotes}
                  </p>
                </div>
              </motion.div>

              {/* Renewal Information - Only show if this is a renewal */}
              {submissionData.newRenewal === 'Renewal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 lg:col-span-3"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-sompo-red" />
                    Renewal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <FieldDisplay label="Previous Policy Number" value={submissionData.previousPolicyNumber} highlight />
                      <FieldDisplay label="GWPC Policy Reference" value={submissionData.gwpcPolicyReference} highlight />
                      <FieldDisplay label="Prior Carrier" value={submissionData.priorCarrier} />
                    </div>
                    <div className="space-y-2">
                      <FieldDisplay label="Expiring Premium" value={submissionData.expiringPremium ? currency(submissionData.expiringPremium, submissionData.limitCurrency) : 'N/A'} />
                      <FieldDisplay label="Renewal Increase (%)" value={submissionData.renewalIncrease ? `${submissionData.renewalIncrease}%` : 'N/A'} />
                      <FieldDisplay label="Years with Prior Carrier" value={submissionData.yearsWithPriorCarrier} />
                    </div>
                    <div className="space-y-2">
                      <FieldDisplay label="Loss History" value={submissionData.lossHistory} />
                      <FieldDisplay label="Reason for Change" value={submissionData.reasonForChange} />
                    </div>
                  </div>
                </motion.div>
              )}
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
