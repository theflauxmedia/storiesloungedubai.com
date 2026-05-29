/**
 * Compress & resize images in public/images/ for faster loads.
 * Run: node scripts/compress-images.mjs
 *
 * Hero/ambiance → max 1920px (full-viewport)
 * Gallery folders → max 1400px (grid + lightbox)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../public/images')
const exts = /\.(webp|jpe?g|png)$/i

/** @type {Record<string, { maxWidth: number, quality: number }>} */
const RULES = {
  Hero: { maxWidth: 1920, quality: 84 },
  ambiance: { maxWidth: 1920, quality: 84 },
  food: { maxWidth: 1400, quality: 82 },
  'mocktails and cocktails ': { maxWidth: 1400, quality: 82 },
  sheesha: { maxWidth: 1400, quality: 82 },
  wings: { maxWidth: 1400, quality: 82 },
}

const DEFAULT_RULE = { maxWidth: 1400, quality: 82 }

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function compressFile(filePath, category) {
  const before = fs.statSync(filePath).size
  const rule = RULES[category] ?? DEFAULT_RULE
  const meta = await sharp(filePath).metadata()
  const needsResize = (meta.width ?? 0) > rule.maxWidth

  const pipeline = sharp(filePath).rotate() // respect EXIF orientation

  if (needsResize) {
    pipeline.resize({
      width: rule.maxWidth,
      withoutEnlargement: true,
      fit: 'inside',
    })
  }

  const buffer = await pipeline
    .webp({
      quality: rule.quality,
      effort: 4,
      smartSubsample: true,
    })
    .toBuffer()

  const after = buffer.length

  // Keep original if compression wouldn't help meaningfully
  if (after >= before * 0.97 && !needsResize && filePath.endsWith('.webp')) {
    return { before, after: before, skipped: true }
  }

  const outPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp')
  const tmpPath = `${outPath}.tmp`

  fs.writeFileSync(tmpPath, buffer)
  fs.renameSync(tmpPath, outPath)

  if (outPath !== filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  return { before, after, skipped: false, resized: needsResize }
}

async function main() {
  let totalBefore = 0
  let totalAfter = 0
  let count = 0
  let skipped = 0

  const categories = fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())

  for (const cat of categories) {
    const category = cat.name
    const dir = path.join(root, category)
    const files = fs.readdirSync(dir).filter((f) => exts.test(f))

    console.log(`\n${category} (${files.length} files)`)

    for (const file of files) {
      const filePath = path.join(dir, file)
      try {
        const result = await compressFile(filePath, category)
        totalBefore += result.before
        totalAfter += result.after
        count += 1

        if (result.skipped) {
          skipped += 1
          continue
        }

        const pct = ((1 - result.after / result.before) * 100).toFixed(0)
        const tag = result.resized ? 'resize' : 'recompress'
        console.log(`  ✓ ${file}  ${formatBytes(result.before)} → ${formatBytes(result.after)} (−${pct}%, ${tag})`)
      } catch (err) {
        console.error(`  ✗ ${file}: ${err.message}`)
      }
    }
  }

  const saved = totalBefore - totalAfter
  const pct = totalBefore ? ((saved / totalBefore) * 100).toFixed(1) : 0

  console.log('\n── Summary ──')
  console.log(`Processed: ${count} images (${skipped} unchanged)`)
  console.log(`Before:    ${formatBytes(totalBefore)}`)
  console.log(`After:     ${formatBytes(totalAfter)}`)
  console.log(`Saved:     ${formatBytes(saved)} (${pct}%)`)
  console.log('\nRun: npm run generate:images && npm run generate:og')
}

main()
