import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = new URL('..', import.meta.url)
const slidesPath = new URL('./slides.md', root)
const distDir = new URL('./dist/', root)

const source = await readFile(slidesPath, 'utf8')
const slideCount = source.split('\n---\n').length - 1

for (let slide = 1; slide <= slideCount; slide += 1) {
  const targetDir = new URL(`./${slide}/`, distDir)
  await mkdir(targetDir, { recursive: true })
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=../#/${slide}">
    <title>Redirecting to slide ${slide}</title>
    <script>location.replace('../#/${slide}')</script>
  </head>
  <body></body>
</html>
`
  await writeFile(new URL('./index.html', targetDir), html, 'utf8')
}