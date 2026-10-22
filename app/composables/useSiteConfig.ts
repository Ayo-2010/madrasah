import { madrasah } from '~/config/madrasah'

/**
 * Read-only access to the central institution configuration plus small helpers
 * for displaying contact details only when they are genuinely available.
 */
export function useSiteConfig() {
  const runtime = useRuntimeConfig()
  const envSiteUrl = (runtime.public.siteUrl as string | undefined)?.trim() || ''
  const siteUrl = envSiteUrl || madrasah.siteUrl
  const siteUrlIsPlaceholder = !envSiteUrl && madrasah.siteUrlIsPlaceholder

  const addressLines = computed(() => {
    const address = madrasah.contact.address
    if (!address) return []

    return [
      address.line1,
      address.line2,
      address.city,
      address.region,
      address.postcode,
      address.country,
    ].filter((line): line is string => Boolean(line && line.trim()))
  })

  const telHref = computed(() => {
    if (!madrasah.contact.phone) return null
    const digits = madrasah.contact.phone.replace(/[^\d+]/g, '')
    return digits.length >= 7 ? `tel:${digits}` : null
  })

  const mailtoHref = computed(() => {
    if (!madrasah.contact.email) return null
    return `mailto:${madrasah.contact.email}`
  })

  const hasContactDetails = computed(() =>
    Boolean(
      madrasah.contact.phone
      || madrasah.contact.email
      || madrasah.contact.address
      || madrasah.contact.openingHours.length
      || madrasah.contact.socials.length,
    ),
  )

  return {
    config: madrasah,
    siteUrl,
    siteUrlIsPlaceholder,
    addressLines,
    telHref,
    mailtoHref,
    hasContactDetails,
  }
}
