import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Nuxt writes 200.html and 404.html as client-rendered SPA fallbacks. Their
 * visible error UI and metadata only exist after JavaScript loads. This script
 * adds a small, self-contained no-JS fallback and social metadata so the files
 * are still useful if JavaScript fails, while leaving the Nuxt app untouched.
 *
 * Run automatically after `nuxt generate` via the `generate` npm script.
 */

const publicDir = join(process.cwd(), '.output', 'public')
const marker = '<!-- madrasah-static-fallback -->'

const configSource = await readFile(join(process.cwd(), 'app', 'config', 'madrasah.ts'), 'utf8')

function readConfigString(key) {
  const raw = configSource.match(new RegExp(`^\\s{2}${key}:\\s*'((?:\\\\.|[^'])*)'`, 'm'))?.[1]
  return raw?.replace(/\\(['"\\])/g, '$1')
}

const institutionName = readConfigString('name') ?? 'Madrasah Al-Noor'
const institutionDescription = readConfigString('description')
  ?? 'A community Islamic school teaching the Qur\u2019an, the Arabic language and the foundations of Islamic knowledge.'

const pages = [
  {
    file: '404.html',
    title: `Page not found | ${institutionName}`,
    description: `The page you requested could not be found. Return to the ${institutionName} homepage, browse programmes, or contact us.`,
    heading: 'This page has wandered off.',
    body: `The page you are looking for may have moved, or the address may be incorrect. You can return home, browse our programmes, or contact ${institutionName}.`,
    noindex: true,
  },
  {
    file: '200.html',
    title: `${institutionName} | Qur\u2019an, Arabic & Islamic Studies`,
    description: institutionDescription,
    heading: 'This page needs JavaScript.',
    body: 'Please enable JavaScript and reload the page, or use the links below to continue browsing the Madrasah website.',
    noindex: false,
  },
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function fallbackMarkup(page) {
  return `${marker}
<noscript>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:#faf8f1;color:#123c2f;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;">
    <div style="max-width:34rem;width:100%;border:1px solid rgba(18,60,47,0.12);border-radius:1.25rem;background:#fff;padding:2.5rem;box-shadow:0 24px 60px -40px rgba(18,60,47,0.45);">
      <p style="margin:0 0 0.75rem;font-size:0.6875rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#8a6a2f;">${escapeHtml(institutionName)}</p>
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:2rem;line-height:1.15;letter-spacing:-0.02em;">${escapeHtml(page.heading)}</h1>
      <p style="margin:1rem 0 1.75rem;font-size:0.9375rem;line-height:1.75;color:#475569;">${escapeHtml(page.body)}</p>
      <nav aria-label="Fallback navigation" style="display:flex;flex-wrap:wrap;gap:0.75rem;">
        <a href="/" style="display:inline-flex;min-height:2.75rem;align-items:center;justify-content:center;border-radius:9999px;background:#176b4d;padding:0.65rem 1.25rem;font-size:0.875rem;font-weight:600;color:#fff;text-decoration:none;">Return home</a>
        <a href="/programmes" style="display:inline-flex;min-height:2.75rem;align-items:center;justify-content:center;border-radius:9999px;border:1px solid rgba(18,60,47,0.2);padding:0.65rem 1.25rem;font-size:0.875rem;font-weight:600;color:#123c2f;text-decoration:none;">Programmes</a>
        <a href="/contact" style="display:inline-flex;min-height:2.75rem;align-items:center;justify-content:center;border-radius:9999px;border:1px solid rgba(18,60,47,0.2);padding:0.65rem 1.25rem;font-size:0.875rem;font-weight:600;color:#123c2f;text-decoration:none;">Contact</a>
      </nav>
    </div>
  </div>
</noscript>`
}

for (const page of pages) {
  const path = join(publicDir, page.file)
  let html = await readFile(path, 'utf8')

  // Remove a previous run so the script is idempotent.
  html = html.replace(new RegExp(`${marker}[\\s\\S]*?</noscript>`), '')

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
  )

  const headTags = [
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:image" content="/og-image.png">',
    '<meta name="twitter:card" content="summary_large_image">',
    ...(page.noindex ? ['<meta name="robots" content="noindex">'] : []),
  ].join('')

  if (!html.includes('property="og:title"')) {
    html = html.replace('</head>', `${headTags}</head>`)
  }
  else {
    // Replace any existing social metadata so the fallback file stays stable.
    html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(page.title)}">`)
    html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(page.description)}">`)
    html = html.replace(/<meta property="og:image"[^>]*>/, '<meta property="og:image" content="/og-image.png">')
  }

  html = html.replace('<body>', `<body>${fallbackMarkup(page)}`)
  await writeFile(path, html, 'utf8')
  console.log(`Fallback metadata added to ${page.file}`)
}
