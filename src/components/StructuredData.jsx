import { useEffect } from 'react'
import { SITE, FAQ_ITEMS } from '../config/seo'
import { socialSameAs } from '../config/social'

const buildSchemaGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/logo.png`,
        caption: SITE.name,
      },
      image: `${SITE.url}${SITE.ogImage}`,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      sameAs: socialSameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description:
        `Premium Rooftop Creekview dining, lounge bar and cafe in ${SITE.area}, Dubai with Dubai Creek skyline views.`,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en-AE',
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://wa.me/${SITE.phoneWhatsApp}?text=${encodeURIComponent('Hello Stories Lounge Dubai, I would like to reserve a table.')}`,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'FoodEstablishmentReservation',
          name: 'Table Reservation',
        },
      },
    },
    {
      '@type': ['Restaurant', 'BarOrPub', 'NightClub'],
      '@id': `${SITE.url}/#restaurant`,
      name: SITE.name,
      alternateName: ['Stories Lounge', `Stories Lounge ${SITE.area}`],
      description:
        `Rooftop Creekview dining and lounge bar cafe atop Concorde Creek View Hotel in ${SITE.area}, Dubai. Global fusion cuisine, handcrafted cocktails, premium shisha, DJ nights and Dubai Creek skyline views.`,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      image: `${SITE.url}${SITE.ogImage}`,
      logo: `${SITE.url}/logo.png`,
      priceRange: '$$$',
      servesCuisine: [
        'Indian',
        'Asian',
        'Mediterranean',
        'Continental',
        'Fusion',
        'Middle Eastern',
      ],
      menu: SITE.digitalMenu,
      acceptsReservations: true,
      hasMenu: SITE.digitalMenu,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE.geo.lat,
        longitude: SITE.geo.lng,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '12:00',
          closes: '23:59',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '04:00',
        },
      ],
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Rooftop Creekview seating', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Skyline view', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Shisha', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Live music', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Private dining', value: true },
      ],
      keywords:
        `Rooftop Creekview restaurant Dubai, lounge bar Dubai, ${SITE.area}, Dubai Creek views, shisha Dubai, fusion dining`,
      parentOrganization: {
        '@type': 'Hotel',
        name: 'Concorde Creek View Hotel',
      },
      isPartOf: {
        '@type': 'Place',
        name: `${SITE.area}, Dubai`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
      },
      sameAs: socialSameAs,
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE.url}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
})

const StructuredData = () => {
  useEffect(() => {
    const scriptId = 'stories-schema-graph'
    let script = document.getElementById(scriptId)

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(buildSchemaGraph())
  }, [])

  return null
}

export default StructuredData
