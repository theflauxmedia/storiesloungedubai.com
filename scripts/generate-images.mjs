/**
 * Regenerate image manifests after adding images to public/images/
 * Run: node scripts/generate-images.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../public/images')
const exts = new Set(['.webp', '.jpg', '.jpeg', '.png'])

const CATEGORY_LABELS = {
  Hero: 'Hero',
  events: 'Events',
  ambiance: 'Ambience',
  food: 'Food',
  'mocktails and cocktails ': 'Cocktails & Mocktails',
  sheesha: 'Shisha',
  wings: 'Wings',
}

const CATEGORY_ORDER = ['events', 'food', 'mocktails and cocktails ', 'wings', 'sheesha', 'ambiance']

function fileNumber(file) {
  const match = file.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

function toSrc(category, file) {
  return `/images/${category.split('/').map(encodeURIComponent).join('/')}/${encodeURIComponent(file)}`
}

async function readImageSize(category, file) {
  try {
    const meta = await sharp(path.join(root, category, file)).metadata()
    return { width: meta.width ?? null, height: meta.height ?? null }
  } catch {
    return { width: null, height: null }
  }
}

const items = []
for (const cat of fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  const category = cat.name
  const categoryLabel = CATEGORY_LABELS[category] || category
  for (const file of fs.readdirSync(path.join(root, category))) {
    const ext = path.extname(file).toLowerCase()
    if (!exts.has(ext)) continue
    const { width, height } = await readImageSize(category, file)
    items.push({
      id: `${category}/${file}`,
      category,
      categoryLabel,
      file,
      src: toSrc(category, file),
      alt: `${categoryLabel} at Stories Lounge Dubai`,
      width,
      height,
    })
  }
}

const sortByFileNumber = (a, b) => fileNumber(a.file) - fileNumber(b.file) || a.file.localeCompare(b.file)

const heroImages = items
  .filter((i) => i.category === 'Hero')
  .sort(sortByFileNumber)
  .map(({ src }, idx) => ({ src, alt: `Stories Lounge Dubai rooftop creek view ${idx + 1}` }))

const galleryImages = items
  .filter((i) => i.category !== 'Hero')
  .sort((a, b) => {
    const orderA = CATEGORY_ORDER.indexOf(a.category)
    const orderB = CATEGORY_ORDER.indexOf(b.category)
    const catDiff = (orderA === -1 ? 99 : orderA) - (orderB === -1 ? 99 : orderB)
    if (catDiff !== 0) return catDiff
    return sortByFileNumber(a, b)
  })

const galleryCategories = [...new Set(galleryImages.map((i) => i.category))]
  .sort((a, b) => {
    const orderA = CATEGORY_ORDER.indexOf(a)
    const orderB = CATEGORY_ORDER.indexOf(b)
    return (orderA === -1 ? 99 : orderA) - (orderB === -1 ? 99 : orderB)
  })
  .map((key) => ({
    key,
    label: CATEGORY_LABELS[key] || key,
  }))

const byCategory = Object.fromEntries(
  galleryCategories.map(({ key }) => [
    key,
    galleryImages.filter((i) => i.category === key).sort(sortByFileNumber),
  ])
)

const dataDir = path.join(__dirname, '../src/data')

fs.writeFileSync(
  path.join(dataDir, 'heroManifest.js'),
  `// Auto-generated — run: node scripts/generate-images.mjs
export const heroImages = ${JSON.stringify(heroImages, null, 2)}
`
)

fs.writeFileSync(
  path.join(dataDir, 'galleryManifest.js'),
  `// Auto-generated — run: node scripts/generate-images.mjs
export const galleryCategories = ${JSON.stringify(galleryCategories, null, 2)}

export const galleryImages = ${JSON.stringify(galleryImages, null, 2)}

export const imagesByCategory = ${JSON.stringify(byCategory, null, 2)}

export function getImages(category) {
  return imagesByCategory[category] ?? []
}
`
)

console.log(`Generated ${heroImages.length} hero + ${galleryImages.length} gallery images`)
console.log('Categories:', galleryCategories.map((c) => `${c.key} (${byCategory[c.key]?.length ?? 0})`).join(', '))
