/**
 * Regenerate image manifests after adding images to public/images/
 * Run: node scripts/generate-images.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../public/images')
const exts = new Set(['.webp', '.jpg', '.jpeg', '.png'])

const CATEGORY_LABELS = {
  Hero: 'Hero',
  ambiance: 'Ambience',
  food: 'Food',
  'mocktails and cocktails ': 'Cocktails & Mocktails',
  sheesha: 'Shisha',
  wings: 'Wings',
}

function toSrc(category, file) {
  return `/images/${category.split('/').map(encodeURIComponent).join('/')}/${encodeURIComponent(file)}`
}

const items = []
for (const cat of fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  const category = cat.name
  const categoryLabel = CATEGORY_LABELS[category] || category
  for (const file of fs.readdirSync(path.join(root, category))) {
    const ext = path.extname(file).toLowerCase()
    if (!exts.has(ext)) continue
    items.push({
      id: `${category}/${file}`,
      category,
      categoryLabel,
      file,
      src: toSrc(category, file),
      alt: `${categoryLabel} at Stories Lounge Dubai`,
    })
  }
}

const heroImages = items
  .filter((i) => i.category === 'Hero')
  .sort((a, b) => parseInt(a.file, 10) - parseInt(b.file, 10))
  .map(({ src }, idx) => ({ src, alt: `Stories Lounge Dubai rooftop view ${idx + 1}` }))

const galleryImages = items.filter((i) => i.category !== 'Hero')
const galleryCategories = [...new Set(galleryImages.map((i) => i.category))].map((key) => ({
  key,
  label: CATEGORY_LABELS[key] || key,
}))
const byCategory = Object.fromEntries(
  galleryCategories.map(({ key }) => [key, galleryImages.filter((i) => i.category === key)])
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
