import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(process.cwd(), '.output', 'public')

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await walk(full))
    else out.push(full)
  }
  return out
}

const files = (await walk(root)).filter(file => file.endsWith('.html'))
const hrefs = new Map()
const srcs = new Map()
const waLinks = new Set()
const external = new Set()

for (const file of files) {
  const html = await readFile(file, 'utf8')
  const page = relative(root, file).replace(/\\/g, '/')
  for (const match of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = match[1]
    if (href.startsWith('#')) continue
    if (href.startsWith('http')) {
      external.add(href)
      if (href.includes('wa.me')) waLinks.add(href)
      continue
    }
    if (!hrefs.has(href)) hrefs.set(href, new Set())
    hrefs.get(href).add(page)
  }
  for (const match of html.matchAll(/\ssrc="([^"]+)"/g)) {
    const src = match[1]
    if (src.startsWith('http') || src.startsWith('data:')) continue
    if (!srcs.has(src)) srcs.set(src, new Set())
    srcs.get(src).add(page)
  }
}

function targetExists(href) {
  const clean = decodeURIComponent(href.split('?')[0].split('#')[0])
  return existsSync(join(root, clean)) || existsSync(join(root, clean, 'index.html'))
}

const brokenLinks = [...hrefs].filter(([href]) => !targetExists(href))
const brokenSrcs = [...srcs].filter(([src]) => !existsSync(join(root, decodeURIComponent(src.split('?')[0]))))

console.log('HTML pages:', files.length)
console.log('Unique internal hrefs:', hrefs.size)
console.log('Broken internal hrefs:', brokenLinks.length)
for (const [href, pages] of brokenLinks) console.log('  BROKEN', href, '->', [...pages].slice(0, 3).join(', '))
console.log('Broken srcs:', brokenSrcs.length)
for (const [src, pages] of brokenSrcs) console.log('  BROKEN SRC', src, '->', [...pages].slice(0, 3).join(', '))
console.log('External links:')
for (const url of [...external].sort()) console.log(' ', url)
console.log('WhatsApp links:', waLinks.size)
