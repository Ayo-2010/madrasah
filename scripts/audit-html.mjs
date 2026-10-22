import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const root = join(process.cwd(), '.output', 'public')

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await walk(full))
    else if (entry.name.endsWith('.html')) out.push(full)
  }
  return out
}

const pages = (await walk(root)).sort()
let problems = 0
for (const file of pages) {
  const page = relative(root, file).replace(/\\/g, '/')
  const html = await readFile(file, 'utf8')
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? ''
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? ''
  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? ''
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? ''
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length
  const lang = html.match(/<html[^>]*lang="([^"]*)"/)?.[1] ?? ''
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0])
  const imagesWithoutAlt = imgs.filter(img => !/\salt="[^"]*"/.test(img))
  const blankTargets = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map(m => m[0])
  const unsafeBlank = blankTargets.filter(link => !/rel="[^"]*noopener/.test(link))
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1])
  const jsonErrors = []
  for (const raw of jsonLd) {
    try {
      JSON.parse(raw)
    }
    catch (error) {
      jsonErrors.push(String(error))
    }
  }
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&#39;/g, '\'')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
  const flags = []
  if (!title) flags.push('missing title')
  if (title.length > 65) flags.push(`long title ${title.length}`)
  if (!desc) flags.push('missing description')
  if (desc.length < 70 || desc.length > 170) flags.push(`description length ${desc.length}`)
  if (canonical) flags.push('canonical present while site URL is placeholder')
  if (!ogTitle) flags.push('missing og:title')
  if (!ogImage) flags.push('missing og:image')
  if (h1s !== 1) flags.push(`h1 count ${h1s}`)
  if (lang !== 'en') flags.push(`lang ${lang}`)
  if (duplicateIds.length) flags.push(`duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`)
  if (imagesWithoutAlt.length) flags.push(`images without alt: ${imagesWithoutAlt.length}`)
  if (unsafeBlank.length) flags.push(`target=_blank without noopener: ${unsafeBlank.length}`)
  if (jsonErrors.length) flags.push(`invalid json-ld: ${jsonErrors.join('; ')}`)
  for (const term of ['TODO', 'lorem ipsum', 'example-madrasah', 'message sent', 'successfully sent', 'we will reply shortly', '123 Main', 'John Doe', 'Jane Doe']) {
    if (visible.toLowerCase().includes(term.toLowerCase())) flags.push(`visible text contains "${term}"`)
  }
  if (flags.length) {
    problems++
    console.log(`\n${page}`)
    for (const flag of flags) console.log('  -', flag)
  }
  else {
    console.log(`OK  ${page}`)
  }
}

console.log(`\n${pages.length} pages checked, ${problems} with problems.`)
