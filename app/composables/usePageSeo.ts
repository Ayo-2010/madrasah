import { madrasah } from '~/config/madrasah'
import { toAbsoluteUrl } from '~/utils/seo'

export interface PageSeoOptions {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

/** Builds a consistent, unique title for an inner page. */
export function pageTitle(label: string): string {
  return `${label} | ${madrasah.name}`
}

/**
 * Applies page metadata, Open Graph tags and a canonical URL when a real
 * production domain has been configured.
 */
export function usePageSeo(options: PageSeoOptions) {
  const { siteUrl, siteUrlIsPlaceholder } = useSiteConfig()

  const canonical = siteUrlIsPlaceholder ? null : toAbsoluteUrl(siteUrl, options.path)
  // Prefer an absolute https URL. Until a production domain is configured, fall
  // back to the same-origin path so the OG asset is never a dead external URL.
  const socialImage = toAbsoluteUrl(siteUrl, options.image ?? '/og-image.png')
    ?? (options.image ?? '/og-image.png')

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type ?? 'website',
    ogSiteName: madrasah.name,
    ogLocale: 'en_GB',
    ...(canonical ? { ogUrl: canonical } : {}),
    ogImage: socialImage,
    twitterCard: socialImage ? 'summary_large_image' : 'summary',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: socialImage,
  })

  if (canonical) {
    useHead({
      link: [{ rel: 'canonical', href: canonical }],
    })
  }
}
