export const NEW_RENEWAL_OPTIONS = ['New Business', 'Renewal']

export const normalizeNewRenewal = (value) => {
  if (!value) return 'New Business'
  const normalized = value.toString().trim().toLowerCase()
  if (normalized.startsWith('renew')) return 'Renewal'
  return 'New Business'
}

export const isRenewal = (value) => normalizeNewRenewal(value) === 'Renewal'

export const getNewRenewalLabel = (value) => (isRenewal(value) ? 'Renewal' : 'New Business')

export const getNewRenewalBadgeClasses = (value) =>
  isRenewal(value)
    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    : 'bg-blue-50 text-blue-700 border border-blue-200'

export const getNewRenewalBadgeStrongClasses = (value) =>
  isRenewal(value)
    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
    : 'bg-blue-100 text-blue-800 border-blue-200'
