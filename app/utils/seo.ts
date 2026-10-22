/**
 * Joins a path to a site origin without duplicating slashes.
 * Returns null when the URL is not an absolute http(s) URL.
 */
export function toAbsoluteUrl(siteUrl: string | null | undefined, path = '/'): string | null {
  if (!siteUrl) return null

  try {
    const origin = new URL(siteUrl)
    if (!['http:', 'https:'].includes(origin.protocol)) return null

    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return new URL(cleanPath, origin.origin).toString()
  }
  catch {
    return null
  }
}

/** Formats an ISO date (YYYY-MM-DD) without timezone shifting. */
export function formatEventDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)

  if (!year || !month || !day) return isoDate

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

/** True when the event's final day is today or later. */
export function isUpcomingEvent(date: string, endDate?: string): boolean {
  const finalDay = endDate ?? date
  const today = new Date()
  const todayIso = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  return finalDay >= todayIso
}
