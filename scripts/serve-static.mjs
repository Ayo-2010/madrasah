import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), '.output', 'public')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

async function resolvePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0])
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  let file = join(root, safe)
  if (safe === '/' || safe === '\\') file = join(root, 'index.html')

  try {
    const info = await stat(file)
    if (info.isDirectory()) file = join(file, 'index.html')
    return file
  }
  catch {
    if (!extname(file)) return join(root, safe, 'index.html')
    return null
  }
}

createServer(async (req, res) => {
  try {
    let file = await resolvePath(req.url || '/')
    if (file) {
      try {
        const body = await readFile(file)
        res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' })
        res.end(body)
        return
      }
      catch {
        // Missing or unreadable file; fall through to the 404 response.
      }
    }

    const body = await readFile(join(root, '404.html')).catch(() => 'Not found')
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
    res.end(body)
  }
  catch (error) {
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end(String(error))
  }
}).listen(4173, '127.0.0.1', () => {
  console.log('Static preview: http://127.0.0.1:4173')
})
