import { useEffect } from 'react'
import { SITE } from '../config/seo'

const upsertMeta = (attr, key, content) => {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const upsertLink = (rel, href, attrs = {}) => {
  if (!href) return
  const selector = attrs.hreflang
    ? `link[rel="${rel}"][hreflang="${attrs.hreflang}"]`
    : `link[rel="${rel}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
}

export const usePageMeta = ({
  title,
  description,
  path = '/',
  keywords,
  ogImage,
  ogType = 'website',
  noindex = false,
  breadcrumb,
}) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`
    const canonical = `${SITE.url}${path}`
    const imagePath = ogImage || SITE.ogImage
    const ogImageUrl = `${SITE.url}${imagePath}`
    const pageKeywords = keywords || SITE.keywords

    document.title = fullTitle
    document.documentElement.lang = SITE.language

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', pageKeywords)
    upsertMeta('name', 'author', SITE.name)
    upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    upsertMeta('name', 'googlebot', 'index,follow')
    upsertMeta('name', 'bingbot', 'index,follow')

    upsertMeta('name', 'geo.region', 'AE-DU')
    upsertMeta('name', 'geo.placename', `Dubai, ${SITE.area}`)
    upsertMeta('name', 'geo.position', `${SITE.geo.lat};${SITE.geo.lng}`)
    upsertMeta('name', 'ICBM', `${SITE.geo.lat}, ${SITE.geo.lng}`)

    upsertLink('canonical', canonical)
    upsertLink('alternate', canonical, { hreflang: 'en-AE' })
    upsertLink('alternate', canonical, { hreflang: 'en' })
    upsertLink('alternate', `${SITE.url}/`, { hreflang: 'x-default' })

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', 'en_AE')
    upsertMeta('property', 'og:image', ogImageUrl)
    upsertMeta('property', 'og:image:secure_url', ogImageUrl)
    upsertMeta('property', 'og:image:type', SITE.ogImageType)
    upsertMeta('property', 'og:image:width', String(SITE.ogImageWidth))
    upsertMeta('property', 'og:image:height', String(SITE.ogImageHeight))
    upsertMeta('property', 'og:image:alt', `${SITE.name} — Premium Rooftop Creekview dining in ${SITE.area}, Dubai`)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImageUrl)
    upsertMeta('name', 'twitter:image:alt', `${SITE.name} — Premium Rooftop Creekview dining in ${SITE.area}, Dubai`)

    if (breadcrumb?.length) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${SITE.url}${item.path}`,
        })),
      }
      const scriptId = 'page-breadcrumb-schema'
      let script = document.getElementById(scriptId)
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(breadcrumbSchema)
    }
  }, [title, description, path, keywords, ogImage, ogType, noindex, breadcrumb])
}

export { SITE as SITE_URL, SITE }
