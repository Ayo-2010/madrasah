import { madrasah } from '../../app/config/madrasah'

export default defineEventHandler((event) => {
  const runtime = useRuntimeConfig(event)
  const configuredSiteUrl = (runtime.public.siteUrl as string | undefined)?.trim()
  const siteUrl = (configuredSiteUrl || madrasah.siteUrl).replace(/\/+$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`
})
