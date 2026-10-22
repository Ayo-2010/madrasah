import { madrasah } from '../../app/config/madrasah'
import { programmes } from '../../app/data/programmes'

const staticRoutes = [
  '/',
  '/about',
  '/programmes',
  '/admissions',
  '/teachers',
  '/facilities',
  '/events',
  '/gallery',
  '/faq',
  '/contact',
  '/privacy-policy',
]

export default defineEventHandler((event) => {
  const runtime = useRuntimeConfig(event)
  const configuredSiteUrl = (runtime.public.siteUrl as string | undefined)?.trim()
  const siteUrl = (configuredSiteUrl || madrasah.siteUrl).replace(/\/+$/, '')

  const routes = [
    ...staticRoutes,
    ...programmes.map(programme => `/programmes/${programme.slug}`),
  ]

  const urls = routes
    .map(route => `  <url><loc>${siteUrl}${route === '/' ? '/' : route}</loc></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
