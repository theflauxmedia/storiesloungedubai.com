/**
 * Edge middleware — injects route-specific Open Graph tags for link-preview crawlers.
 * WhatsApp, iMessage, Facebook, LinkedIn, etc. do not execute client-side JS.
 */
const SITE_URL = 'https://storiesloungedubai.com'

const ROUTE_META = {
  '/': {
    title: 'Stories Lounge Dubai | Rooftop Creekview Restaurant & Lounge Bar — Al Fahidi',
    description:
      'Premium Rooftop Creekview dining in Al Fahidi, Dubai. Global fusion cuisine, cocktails, shisha & Dubai Creek skyline views at Stories Lounge.',
    image: '/og/home.jpg',
  },
  '/about': {
    title: 'About Stories Lounge Dubai | Rooftop Creekview Lounge & Dining Experience',
    description:
      'Our story at Stories Lounge Dubai — Rooftop Creekview destination in Al Fahidi blending global cuisine, music, creek views & Dubai nightlife.',
    image: '/og/about.jpg',
  },
  '/menu': {
    title: 'Menu | Stories Lounge Dubai — Fusion Food, Cocktails & Shisha',
    description:
      'Stories Lounge Dubai menu: fusion starters, signature mains, craft cocktails & premium shisha. Rooftop Creekview dining in Al Fahidi.',
    image: '/og/menu.jpg',
  },
  '/gallery': {
    title: 'Gallery | Stories Lounge Dubai — Rooftop Creekview Photos & Experience',
    description:
      'Explore Stories Lounge Dubai in photos — Rooftop Creekview ambience, signature dishes, cocktails, shisha, and evenings above Dubai Creek.',
    image: '/og/home.jpg',
  },
  '/events': {
    title: 'Events, DJ Nights & Housie Nights | Stories Lounge Dubai',
    description:
      'DJ nights, Housie nights, themed evenings & private Rooftop Creekview bookings at Stories Lounge Dubai — birthdays, corporate events & celebrations.',
    image: '/og/events.jpg',
  },
  '/contact': {
    title: 'Reserve a Table | Stories Lounge Dubai — WhatsApp Booking',
    description:
      'Book your table at Stories Lounge Dubai via WhatsApp. Rooftop Creekview - Concorde Creek View Hotel, Al Fahidi, Dubai. Open daily 12 PM–4 AM. Call +971 50 549 9410.',
    image: '/og/contact.jpg',
  },
}

const CRAWLER_UA =
  /facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Discordbot|Googlebot|bingbot|Pinterest/i

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function injectMeta(html, meta, canonical) {
  const ogImage = `${SITE_URL}${meta.image}`
  const replacements = [
    ['<title>[^<]*</title>', `<title>${escapeAttr(meta.title)}</title>`],
    ['name="description" content="[^"]*"', `name="description" content="${escapeAttr(meta.description)}"`],
    ['property="og:title" content="[^"]*"', `property="og:title" content="${escapeAttr(meta.title)}"`],
    ['property="og:description" content="[^"]*"', `property="og:description" content="${escapeAttr(meta.description)}"`],
    ['property="og:url" content="[^"]*"', `property="og:url" content="${escapeAttr(canonical)}"`],
    ['property="og:image" content="[^"]*"', `property="og:image" content="${escapeAttr(ogImage)}"`],
    ['property="og:image:secure_url" content="[^"]*"', `property="og:image:secure_url" content="${escapeAttr(ogImage)}"`],
    ['name="twitter:title" content="[^"]*"', `name="twitter:title" content="${escapeAttr(meta.title)}"`],
    ['name="twitter:description" content="[^"]*"', `name="twitter:description" content="${escapeAttr(meta.description)}"`],
    ['name="twitter:image" content="[^"]*"', `name="twitter:image" content="${escapeAttr(ogImage)}"`],
    ['rel="canonical" href="[^"]*"', `rel="canonical" href="${escapeAttr(canonical)}"`],
  ]

  return replacements.reduce(
    (out, [pattern, replacement]) => out.replace(new RegExp(pattern, 'i'), replacement),
    html
  )
}

export const config = {
  matcher: ['/((?!assets|images|og|logo\\.png|robots\\.txt|sitemap\\.xml|llms\\.txt|manifest\\.webmanifest|.*\\..*).*)'],
}

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  if (!CRAWLER_UA.test(ua)) {
    return
  }

  const { pathname } = new URL(request.url)
  const path = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  const meta = ROUTE_META[path] || ROUTE_META['/']
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`

  const response = await fetch(request)
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) {
    return response
  }

  const html = await response.text()
  const updated = injectMeta(html, meta, canonical)

  return new Response(updated, {
    status: response.status,
    headers: response.headers,
  })
}
