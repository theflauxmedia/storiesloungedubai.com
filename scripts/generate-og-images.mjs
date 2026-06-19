/**
 * Generate premium Open Graph share images (1200×630)
 * Run: node scripts/generate-og-images.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const outDir = path.join(publicDir, 'og')

const W = 1200
const H = 630

const PAGES = [
  {
    file: 'default.jpg',
    hero: 'images/Hero/001.webp',
    title: 'Stories Lounge Dubai',
    subtitle: 'Rooftop Creekview Dining & Lounge Bar · Al Fahidi',
  },
  {
    file: 'home.jpg',
    hero: 'images/Hero/003.webp',
    title: 'Stories Lounge Dubai',
    subtitle: 'Rooftop Creekview Dining · Dubai Creek Views',
  },
  {
    file: 'about.jpg',
    hero: 'images/Hero/007.webp',
    title: 'About Stories Lounge',
    subtitle: 'Rooftop Creekview Moments Above Dubai Creek',
  },
  {
    file: 'menu.jpg',
    hero: 'images/Hero/005.webp',
    title: 'Our Menu',
    subtitle: 'Fusion Food · Cocktails · Shisha',
  },
  {
    file: 'events.jpg',
    hero: 'images/events/009.webp',
    title: 'Events & Entertainment',
    subtitle: 'DJ Nights · Private Rooftop Creekview Bookings',
  },
  {
    file: 'contact.jpg',
    hero: 'images/Hero/011.webp',
    title: 'Reserve Your Table',
    subtitle: 'Al Fahidi · Open Daily 12 PM – 4 AM',
  },
]

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildOverlaySvg({ title, subtitle, logoWidth, logoHeight }) {
  const logoX = 72
  const logoY = H - logoHeight - 118
  const titleY = H - 88
  const subtitleY = H - 48

  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080808" stop-opacity="0.08"/>
      <stop offset="45%" stop-color="#080808" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0.88"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C9A046"/>
      <stop offset="100%" stop-color="#E8C97A"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="url(#gold)"/>
  <image href="LOGO_PLACEHOLDER" x="${logoX}" y="${logoY}" width="${logoWidth}" height="${logoHeight}"/>
  <text x="${logoX}" y="${titleY}" fill="#F0EDE8" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-weight="600" letter-spacing="1">${escapeXml(title)}</text>
  <text x="${logoX}" y="${subtitleY}" fill="#C8C8C8" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="2">${escapeXml(subtitle.toUpperCase())}</text>
</svg>`)
}

async function generatePage(page) {
  const heroPath = path.join(publicDir, page.hero)
  const logoPath = path.join(publicDir, 'logo.png')

  if (!fs.existsSync(heroPath)) {
    console.warn(`Skip ${page.file} — missing ${page.hero}`)
    return
  }

  const logoMeta = await sharp(logoPath).metadata()
  const logoTargetW = 200
  const logoTargetH = Math.round((logoMeta.height / logoMeta.width) * logoTargetW)

  const logoPng = await sharp(logoPath)
    .resize(logoTargetW, logoTargetH, { fit: 'inside' })
    .png()
    .toBuffer()

  const logoDataUri = `data:image/png;base64,${logoPng.toString('base64')}`

  let overlaySvg = buildOverlaySvg({
    title: page.title,
    subtitle: page.subtitle,
    logoWidth: logoTargetW,
    logoHeight: logoTargetH,
  })
    .toString('utf8')
    .replace('LOGO_PLACEHOLDER', logoDataUri)

  const overlayBuffer = Buffer.from(overlaySvg)

  const background = await sharp(heroPath)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.92, saturation: 1.05 })
    .toBuffer()

  await sharp(background)
    .composite([{ input: overlayBuffer, top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(outDir, page.file))

  console.log(`✓ og/${page.file}`)
}

fs.mkdirSync(outDir, { recursive: true })

for (const page of PAGES) {
  await generatePage(page)
}

console.log(`Generated ${PAGES.length} OG images in public/og/`)
