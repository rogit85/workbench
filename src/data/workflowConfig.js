const statusThemes = {
  slate: {
    pill: 'bg-slate-100 text-slate-800 border-slate-300',
    badge: 'bg-slate-50 text-slate-600',
    board: 'border-slate-500',
    chart: '#94A3B8'
  },
  gray: {
    pill: 'bg-gray-100 text-gray-800 border-gray-300',
    badge: 'bg-gray-50 text-gray-600',
    board: 'border-gray-500',
    chart: '#9CA3AF'
  },
  rose: {
    pill: 'bg-rose-100 text-rose-800 border-rose-300',
    badge: 'bg-rose-50 text-rose-600',
    board: 'border-rose-500',
    chart: '#F43F5E'
  },
  blue: {
    pill: 'bg-blue-100 text-blue-800 border-blue-300',
    badge: 'bg-blue-50 text-blue-700',
    board: 'border-blue-500',
    chart: '#3B82F6'
  },
  sky: {
    pill: 'bg-sky-100 text-sky-800 border-sky-300',
    badge: 'bg-sky-50 text-sky-700',
    board: 'border-sky-500',
    chart: '#0EA5E9'
  },
  emerald: {
    pill: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badge: 'bg-emerald-50 text-emerald-700',
    board: 'border-emerald-500',
    chart: '#10B981'
  },
  green: {
    pill: 'bg-green-100 text-green-800 border-green-300',
    badge: 'bg-green-50 text-green-700',
    board: 'border-green-500',
    chart: '#22C55E'
  },
  amber: {
    pill: 'bg-amber-100 text-amber-800 border-amber-300',
    badge: 'bg-amber-50 text-amber-700',
    board: 'border-amber-500',
    chart: '#F59E0B'
  },
  purple: {
    pill: 'bg-purple-100 text-purple-800 border-purple-300',
    badge: 'bg-purple-50 text-purple-700',
    board: 'border-purple-500',
    chart: '#8B5CF6'
  },
  violet: {
    pill: 'bg-violet-100 text-violet-800 border-violet-300',
    badge: 'bg-violet-50 text-violet-700',
    board: 'border-violet-500',
    chart: '#7C3AED'
  },
  orange: {
    pill: 'bg-orange-100 text-orange-800 border-orange-300',
    badge: 'bg-orange-50 text-orange-700',
    board: 'border-orange-500',
    chart: '#FB923C'
  },
  red: {
    pill: 'bg-red-100 text-red-800 border-red-300',
    badge: 'bg-red-50 text-red-700',
    board: 'border-red-500',
    chart: '#EF4444'
  },
  indigo: {
    pill: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    badge: 'bg-indigo-50 text-indigo-700',
    board: 'border-indigo-500',
    chart: '#6366F1'
  },
  yellow: {
    pill: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    badge: 'bg-yellow-50 text-yellow-700',
    board: 'border-yellow-500',
    chart: '#FACC15'
  },
  teal: {
    pill: 'bg-teal-100 text-teal-800 border-teal-300',
    badge: 'bg-teal-50 text-teal-700',
    board: 'border-teal-500',
    chart: '#14B8A6'
  },
  cyan: {
    pill: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    badge: 'bg-cyan-50 text-cyan-700',
    board: 'border-cyan-500',
    chart: '#06B6D4'
  }
}

const applyThemes = (phaseTitle, stageTitle, statuses) => {
  return statuses.map(status => {
    const theme = statusThemes[status.color || 'gray'] || statusThemes.gray
    return {
      phase: phaseTitle,
      stage: stageTitle,
      showOnBoard: status.showOnBoard !== false,
      ...status,
      pillClass: status.pillClass || theme.pill,
      badgeClass: status.badgeClass || theme.badge,
      boardClass: status.boardClass || theme.board,
      chartColor: status.chartColor || theme.chart
    }
  })
}

const rawPhases = [
  {
    id: 'submission',
    title: 'Submission',
    stages: [
      {
        id: 'draft',
        title: 'Draft',
        summary: 'Manual creation or failed ingestion items triaged before checks can run.',
        notes: [
          'Manual Creation is only for drafts keyed directly by Ops/UA.',
          'Submission Failed should capture enough metadata (email name, sender, timestamp) so Ops can locate the source.'
        ],
        statuses: applyThemes('Submission', 'Draft', [
          {
            id: 'manualCreation',
            label: 'Manual Creation',
            icon: '✍️',
            description: 'Draft created manually and not yet released to automated checks.',
            color: 'slate'
          },
          {
            id: 'submissionFailed',
            label: 'Submission Failed',
            icon: '⚠️',
            description: 'Automated ingestion failed. Surface any extracted context so Ops/UA can locate the email or payload.',
            color: 'rose',
            automated: true
          }
        ])
      },
      {
        id: 'submissionReceived',
        title: 'Submission Received',
        summary: 'Automated and manual checks triggered once the submission lands.',
        actions: [
          'Review Failed Checks',
          'Perform Data Enrichment',
          'Initiate Broker Set-up',
          'Investigate Sanctions',
          'Investigate Restrictions',
          'Consult Compliance Team',
          'Consult Legal Team'
        ],
        notes: [
          'Checks In Progress covers compliance, sanctions, restrictions, and enrichment threads (details live in logs).',
          'Manual Review is raised when checks fail or confidence is low — display the reason beside the status.',
          'Auto-created tasks: Review Failed Checks, Perform Data Enrichment, Investigate Sanctions, Investigate Restrictions.',
          'If compliance teams participate, add Compliance - Ad Hoc, Conduct Risk, Sanctions & Financial Crime tasks.'
        ],
        statuses: applyThemes('Submission', 'Submission Received', [
          {
            id: 'pendingChecks',
            label: 'Pending Checks',
            icon: '📥',
            description: 'Submission captured and queued for enrichment, compliance, sanctions, and restrictions.',
            color: 'blue',
            automated: true
          },
          {
            id: 'checksInProgress',
            label: 'Checks In Progress',
            icon: '🔄',
            description: 'Automated checks currently running; detailed telemetry is available in logs.',
            color: 'sky',
            automated: true
          },
          {
            id: 'checksCompleted',
            label: 'Checks Completed',
            icon: '✅',
            description: 'All automated checks finished and are ready for review.',
            color: 'emerald'
          },
          {
            id: 'brokerSetupRequired',
            label: 'Broker Set-up Required',
            icon: '🤝',
            description: 'Ops must complete broker set-up before the submission can progress.',
            color: 'amber'
          },
          {
            id: 'manualReview',
            label: 'Manual Review',
            icon: '📝',
            description: 'Triggered when automated checks fail or confidence is low. Capture the reason alongside the status.',
            color: 'purple'
          },
          {
            id: 'sanctionsTriggered',
            label: 'Sanctions Triggered',
            icon: '🚨',
            description: 'Potential sanctions matches detected and awaiting investigation.',
            color: 'orange'
          },
          {
            id: 'restrictionsTriggered',
            label: 'Restrictions Triggered',
            icon: '⛔️',
            description: 'Jurisdiction or product restrictions surfaced and require routing to Compliance/Legal.',
            color: 'red'
          }
        ])
      },
      {
        id: 'submissionValidation',
        title: 'Submission Validation',
        summary: 'Manual clearance workflow and broker engagement to close information gaps.',
        actions: [
          'Request Additional Information',
          'Process Follow-up'
        ],
        notes: [
          'Follow-up Received can be triggered at any stage when new broker data arrives. Decide when auto-checks should re-fire versus manual review.',
          'Auto-created task: Process Follow-up (whenever a response is detected).'
        ],
        statuses: applyThemes('Submission', 'Submission Validation', [
          {
            id: 'pendingManualClearance',
            label: 'Pending Manual Clearance',
            icon: '📋',
            description: 'Waiting for manual clearance review and any broker interaction.',
            color: 'indigo'
          },
          {
            id: 'additionalInformationRequested',
            label: 'Additional Information Requested',
            icon: '📨',
            description: 'Ops requested more data from the broker.',
            color: 'yellow'
          },
          {
            id: 'followUpReceived',
            label: 'Follow-up Received',
            icon: '📬',
            description: 'Broker response detected. Determine whether to re-run checks or route for manual validation.',
            color: 'teal',
            automated: true
          },
          {
            id: 'clearanceCompleted',
            label: 'Clearance Completed',
            icon: '🏁',
            description: 'Manual clearance complete; submission ready for risk assessment.',
            color: 'green'
          }
        ])
      },
      {
        id: 'declined',
        title: 'Declined',
        summary: 'Any decline path must capture a business reason.',
        notes: ['Store the rationale for both automated and manual declines.'],
        statuses: applyThemes('Submission', 'Declined', [
          {
            id: 'autoDeclined',
            label: 'Auto Declined',
            icon: '🤖',
            description: 'Declined by automated rules with a captured explanation.',
            color: 'rose',
            automated: true
          },
          {
            id: 'expired',
            label: 'Expired',
            icon: '⌛',
            description: 'Submission expired before review or clearance completed.',
            color: 'slate'
          },
          {
            id: 'manualDeclined',
            label: 'Manual Declined',
            icon: '🛑',
            description: 'Underwriter declined manually and documented rationale.',
            color: 'red'
          }
        ])
      },
      {
        id: 'reopened',
        title: 'Reopened',
        summary: 'Declined cases that are reopened for another review cycle.',
        statuses: applyThemes('Submission', 'Reopened', [
          {
            id: 'pendingReview',
            label: 'Pending Review',
            icon: '🔁',
            description: 'Submission reopened and queued for reassessment.',
            color: 'cyan'
          },
          {
            id: 'underReview',
            label: 'Under Review',
            icon: '👀',
            description: 'Reopened submission currently being reviewed.',
            color: 'violet'
          }
        ])
      }
    ]
  },
  {
    id: 'riskAssessment',
    title: 'Risk Assessment',
    stages: [
      {
        id: 'riskAssessment',
        title: 'Risk Assessment',
        summary: 'Detailed risk evaluation flow (survey, CAT, enrichment, rationale).',
        actions: [
          'Request Survey',
          'Review Survey',
          'Request CAT Modelling',
          'Data Enrichment',
          'Upload Files',
          'Review Uploaded Files',
          'Document Underwriting Rationale',
          'Attestation',
          'Consult Compliance Team',
          'Consult Legal Team'
        ],
        notes: [
          'Move from Pending to In Progress automatically once tasks are created.',
          'Expect LoB variations — capture the flow for upcoming workshops.',
          'Compliance tasks from Submission Received might still apply.',
          'Other potential tasks: Actuarial Review, Ad hoc, CAT Modelling, Claims, DXC (post-bind), Exposure.'
        ],
        statuses: applyThemes('Risk Assessment', 'Risk Assessment', [
          {
            id: 'pendingRiskAssessment',
            label: 'Pending Risk Assessment',
            icon: '📊',
            description: 'Waiting for the risk assessment pack to kick off.',
            color: 'blue'
          },
          {
            id: 'riskAssessmentInProgress',
            label: 'Risk Assessment In Progress',
            icon: '⚙️',
            description: 'Risk assessment, enrichment, and documentation tasks underway.',
            color: 'amber'
          },
          {
            id: 'riskAssessmentCompleted',
            label: 'Risk Assessment Completed',
            icon: '✅',
            description: 'All risk assessment tasks completed.',
            color: 'emerald'
          },
          {
            id: 'peerReview',
            label: 'Peer Review',
            icon: '👥',
            description: 'Final peer review before binding.',
            color: 'teal'
          }
        ])
      }
    ]
  },
  {
    id: 'renewals',
    title: 'Renewals',
    stages: [
      {
        id: 'renewalFlow',
        title: 'Renewal',
        summary: 'Manual renewal handling (goal is STP for unchanged risks).',
        notes: [
          'Early iterations remain manual; highlight anything blocking STP adoption.'
        ],
        statuses: applyThemes('Renewals', 'Renewal', [
          {
            id: 'renewalReceived',
            label: 'Renewal Received',
            icon: '📆',
            description: 'Renewal submission captured and awaiting Ops triage.',
            color: 'gray'
          },
          {
            id: 'renewalManualReview',
            label: 'Manual Review',
            icon: '📝',
            description: 'Renewal manually reviewed to confirm changes and appetite.',
            color: 'purple'
          },
          {
            id: 'sentToGuidewire',
            label: 'Sent to Guidewire',
            icon: '📤',
            description: 'Renewal approved and being keyed/issued in Guidewire.',
            color: 'indigo'
          }
        ])
      },
      {
        id: 'renewalDeclined',
        title: 'Renewal Declined',
        summary: 'Renewals declined during manual review.',
        statuses: applyThemes('Renewals', 'Renewal Declined', [
          {
            id: 'renewalManualDeclined',
            label: 'Manual Declined (Renewal)',
            icon: '🚫',
            description: 'Renewal declined manually with reason documented.',
            color: 'rose'
          }
        ])
      }
    ]
  }
]

export const workflowPhases = rawPhases

export const workflowStatusList = workflowPhases.flatMap(phase =>
  phase.stages.flatMap(stage => stage.statuses)
)

export const workflowStatusMap = workflowStatusList.reduce((acc, status) => {
  acc[status.label] = status
  acc[status.id] = status
  return acc
}, {})

export const workflowStatusOrder = workflowStatusList.map(status => status.label)

export const workflowStatusChartColors = workflowStatusOrder.reduce((acc, label) => {
  acc[label] = workflowStatusMap[label]?.chartColor || '#9CA3AF'
  return acc
}, {})

export const workflowBoardColumns = workflowStatusList
  .filter(status => status.showOnBoard)
  .map(status => ({
    id: status.id,
    title: status.label,
    icon: status.icon || '⬜️',
    borderClass: status.boardClass,
    phase: status.phase,
    stage: status.stage,
    description: status.description,
    automated: status.automated
  }))

export const getWorkflowStatusDefinition = (status) => workflowStatusMap[status] || null

export const getWorkflowStatusPillClass = (status) => {
  const match = workflowStatusMap[status]
  if (match) return match.pillClass
  return 'bg-gray-100 text-gray-800 border-gray-300'
}

export const getWorkflowStatusBadgeClass = (status) => {
  const match = workflowStatusMap[status]
  if (match) return match.badgeClass
  return 'bg-gray-50 text-gray-600'
}

export const getWorkflowStatusChartColor = (status) => {
  const match = workflowStatusMap[status]
  if (match) return match.chartColor
  return '#9CA3AF'
}
