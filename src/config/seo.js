/** Central SEO config — rooftop restaurant, Al Fahidi / Bur Dubai keywords */
export const SITE = {
  url: 'https://storiesloungedubai.com',
  name: 'Stories Lounge Dubai',
  legalName: 'Stories Lounge',
  locale: 'en_AE',
  language: 'en',
  phone: '+971505499410',
  phoneDisplay: '+971 50 549 9410',
  phoneWhatsApp: '971505499410',
  instagram: 'https://www.instagram.com/storieslounge.dubai/',
  facebook: 'https://www.facebook.com/profile.php?id=61572428356261',
  tiktok: 'https://www.tiktok.com/@drs.dxb',
  snapchat: 'https://snapchat.com/t/uxRXz5FO',
  mapsEmbed:
    'https://www.google.com/maps?q=Concorde+Creek+View+Hotel,+Al+Fahidi,+Dubai&z=16&output=embed',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Concorde+Creek+View+Hotel+Al+Fahidi+Dubai',
  digitalMenu: 'https://qr.mydigimenu.com/b9b1e898-7b11-4d3f-928a-352e20247cc8',
  email: 'info@storiesloungedubai.com',
  area: 'Al Fahidi',
  addressDisplay:
    'Rooftop Creekview - Concorde Creek View Hotel, Al Souq Al Kabeer - Al Fahidi - Dubai - United Arab Emirates',
  address: {
    street: 'Rooftop Creekview, Concorde Creek View Hotel, Al Souq Al Kabeer, Al Fahidi',
    locality: 'Dubai',
    region: 'Dubai',
    country: 'AE',
    countryName: 'United Arab Emirates',
    postalCode: '',
  },
  geo: { lat: 25.2634, lng: 55.2972 },
  hours: 'Daily 12:00 PM – 4:00 AM',
  ogImage: '/og/default.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  keywords: [
    'Stories Lounge Dubai',
    'rooftop restaurant Dubai',
    'rooftop restaurant Bur Dubai',
    'rooftop restaurant Al Fahidi',
    'rooftop restaurant near Dubai Creek',
    'Dubai Creek view restaurant',
    'rooftop lounge Dubai',
    'rooftop bar Bur Dubai',
    'rooftop dining Dubai',
    'restaurants in Meena Bazaar',
    'Indian restaurants in Bur Dubai',
    'best restaurants in Al Fahidi',
    'romantic dinner Dubai',
    'date night rooftop Dubai',
    'live music in Bur Dubai',
    'DJ nights in Bur Dubai',
    'shisha lounges in Bur Dubai',
    'cocktail bar Al Fahidi',
    'rooftop happy hour Dubai',
    'late night restaurants in Bur Dubai',
  ].join(', '),
}

export const PAGES = {
  home: {
    path: '/',
    title: 'Stories Lounge Dubai | Rooftop Restaurant & Bar in Bur Dubai',
    description:
      'Rooftop restaurant & lounge in Al Fahidi, Bur Dubai with Dubai Creek views. Indian & global fusion food, cocktails, shisha, live music & DJ nights. Book now.',
    keywords:
      'rooftop restaurant Dubai, rooftop restaurant Bur Dubai, rooftop restaurant Al Fahidi, Dubai Creek view restaurant, rooftop lounge Dubai, rooftop bar Bur Dubai, restaurants in Meena Bazaar, best restaurants in Bur Dubai, Indian restaurants in Bur Dubai, Stories Lounge Dubai',
    ogImage: '/og/home.jpg',
  },
  about: {
    path: '/about',
    title: 'About Stories Lounge Dubai | Rooftop Bar & Cafe, Al Fahidi',
    description:
      'Stories Lounge Bar & Cafe sits atop Concorde Creek View Hotel in Al Fahidi, Bur Dubai — a rooftop restaurant and lounge serving Indian, Asian & Continental food.',
    keywords:
      'Stories Lounge bar and cafe Dubai, Stories Lounge Concorde Creek View Hotel, Stories Lounge Al Fahidi, Stories Lounge Bur Dubai, restaurant and lounge Dubai, multicuisine restaurants in Bur Dubai, global fusion restaurants in Dubai, North Indian food in Bur Dubai, Indo Chinese food in Dubai',
    ogImage: '/og/about.jpg',
  },
  menu: {
    path: '/menu',
    title: 'Menu — Indian, Asian & Continental Food in Bur Dubai',
    description:
      'Stories Lounge Dubai menu: North & South Indian, Indo-Chinese, Continental, pizza, pasta, seafood, cocktails & shisha at our rooftop restaurant in Al Fahidi.',
    keywords:
      'Stories Lounge Dubai menu, Indian restaurants in Bur Dubai, Indo Chinese food in Bur Dubai, Continental food in Dubai, vegetarian food in Bur Dubai, seafood in Bur Dubai, cocktail bars in Bur Dubai',
    ogImage: '/og/menu.jpg',
  },
  gallery: {
    path: '/gallery',
    title: 'Rooftop Restaurant Photos, Dubai Creek',
    description:
      'Photos of our rooftop restaurant in Al Fahidi — Dubai Creek views at sunset and night, signature dishes, cocktails and shisha at Stories Lounge Dubai.',
    keywords:
      'Stories Lounge Dubai rooftop, Stories Lounge Dubai Creek view, restaurants with a view in Dubai, dinner with view Dubai, Dubai night view restaurants, sunset dining in Dubai Creek, rooftop ambience restaurant Dubai',
    ogImage: '/og/home.jpg',
  },
  events: {
    path: '/events',
    title: 'Rooftop Events & DJ Nights, Bur Dubai',
    description:
      'DJ, Bollywood, quiz & Housie nights plus live music at our rooftop lounge in Bur Dubai. Book birthdays, corporate dinners & private events in Al Fahidi.',
    keywords:
      'Stories Lounge Dubai events, DJ nights in Bur Dubai, Bollywood nights in Dubai, quiz nights in Bur Dubai, Housie nights in Dubai, live music in Bur Dubai, rooftop events in Dubai, rooftop party venue Dubai, corporate dinner rooftop Dubai, birthday celebration rooftop Dubai, private event rooftop Dubai',
    ogImage: '/og/events.jpg',
  },
  contact: {
    path: '/contact',
    title: 'Rooftop Restaurant Booking, Al Fahidi',
    description: `Reserve a rooftop table at Stories Lounge Dubai, Concorde Creek View Hotel, Al Fahidi, Bur Dubai. Open daily 12 PM–4 AM. WhatsApp or call ${SITE.phoneDisplay}.`,
    keywords:
      'Stories Lounge Dubai reservations, rooftop restaurant booking Dubai, rooftop bar reservation Dubai, Stories Lounge Meena Bazaar, rooftop restaurant Al Fahidi, late night restaurants in Bur Dubai',
    ogImage: '/og/contact.jpg',
  },
}

export const FAQ_ITEMS = [
  {
    question: 'Where is Stories Lounge Dubai located?',
    answer: `Stories Lounge is a rooftop restaurant and lounge on top of Concorde Creek View Hotel in Al Fahidi, Bur Dubai — a short walk from Meena Bazaar, with views over Dubai Creek. Address: ${SITE.addressDisplay}.`,
  },
  {
    question: 'What are the opening hours?',
    answer:
      'We are open daily from 12:00 PM until 4:00 AM, so you can come for a rooftop lunch, sunset dinner or a late-night bite in Bur Dubai.',
  },
  {
    question: 'What type of cuisine does Stories Lounge serve?',
    answer:
      'A multicuisine menu: North Indian, South Indian and coastal Indian dishes, Indo-Chinese, Asian, Mediterranean and Continental food including pizza, pasta and seafood, with plenty of vegetarian and non-veg options, cocktails and shisha.',
  },
  {
    question: 'Is Stories Lounge good for a date night or romantic dinner?',
    answer:
      'Yes. Our rooftop tables overlook Dubai Creek, making it a popular spot for date nights, anniversary dinners and romantic sunset dining in Al Fahidi.',
  },
  {
    question: 'Do you have live music and DJ nights?',
    answer:
      'Yes. We host DJ nights, live music and performances, Bollywood nights, quiz nights and Housie nights every week. See our Events page for what is on.',
  },
  {
    question: 'Can I book a private event, birthday or corporate dinner?',
    answer:
      'Yes. We host birthday dinners, anniversaries, corporate dinners, team dinners and private rooftop parties with custom menus. Enquire via WhatsApp on our Events page.',
  },
  {
    question: 'Does Stories Lounge have shisha and happy hour?',
    answer:
      'Yes. We offer a premium shisha menu and a daily rooftop happy hour with shisha combos, beer bucket offers and bites specials.',
  },
  {
    question: 'How do I reserve a table?',
    answer: `Tap Reserve a Table to message us on WhatsApp, or call ${SITE.phoneDisplay}. Walk-ins welcome subject to availability.`,
  },
]
