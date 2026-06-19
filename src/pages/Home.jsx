import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES, SITE } from '../config/seo'
import SectionHeader from '../components/SectionHeader'
import HeroSlider from '../components/HeroSlider'
import GalleryPreview from '../components/GalleryPreview'
import { FeaturedImage } from '../components/MediaImage'

const heroWords = ['Stories', 'Lounge']

const experiencePreviewImage = {
  src: '/images/Hero/012.webp',
  alt: 'Stories Lounge Dubai Rooftop Creekview experience',
}

const brandSnapshot = [
  {
    icon: '◈',
    title: 'Panoramic Rooftop Creek View',
    description:
      'Enjoy breathtaking creek and city skyline panoramas from our elevated setting.',
  },
  {
    icon: '◆',
    title: 'Global Fusion Menu',
    description:
      'A refined blend of Indian, Asian, Mediterranean & Continental cuisine.',
  },
  {
    icon: '✦',
    title: 'Social Evenings',
    description:
      'Enjoy fun-filled evenings with Bollywood Quiz Nights, Housie Nights, and Live Performances every week at Stories.',
  },
]

const weeklyHighlights = [
  { name: 'Happy Hours', day: 'Daily', time: 'Drink & bite specials' },
  {
    name: 'Themed Nights',
    day: 'Weekly',
    time: 'DJ Nights, Quiz Nights, Bollywood & Lounge Sessions',
  },
  {
    name: 'Weekend Vibes',
    day: 'Fri – Sun',
    time: 'Elevated music, crowd energy & signature cocktails',
  },
  {
    name: 'Celebratory Stories',
    day: 'Special Occasions',
    time:
      "From birthdays and anniversaries to date nights and special occasions, celebrate life's memorable moments at Stories.",
  },
]

const testimonials = [
  {
    quote:
      'Absolutely stunning rooftop creek views at sunset. The cocktails were incredible and the vibe was perfect for a date night. Will definitely be back!',
    name: 'Sarah M.',
  },
  {
    quote:
      'Best shisha in the Al Fahidi area. Food was amazing — try the butter chicken bites. Staff were super friendly and the DJ set on Friday was fire.',
    name: 'Ahmed K.',
  },
  {
    quote:
      'Hosted my birthday here and they went above and beyond. Custom menu, great service, and the skyline backdrop made every photo look incredible.',
    name: 'Priya R.',
  },
]

const luxuryEase = [0.22, 1, 0.36, 1]

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: luxuryEase },
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: luxuryEase },
  },
}

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '28%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, isMobile ? 1 : 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.12])

  usePageMeta({
    ...PAGES.home,
    breadcrumb: [{ name: 'Home', path: '/' }],
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="home">
      <section className="hero" ref={heroRef} aria-label="Welcome">
        <HeroSlider
          style={isMobile ? undefined : { y: heroY, scale: heroScale }}
        />
        <motion.div
          className="hero__overlay"
          style={isMobile ? undefined : { opacity: heroOpacity }}
        />
        <motion.div
          className="hero__glow"
          style={isMobile ? undefined : { opacity: heroOpacity }}
        />

        <motion.div
          className="hero__content"
          style={isMobile ? undefined : { opacity: heroOpacity }}
        >
          <p className="hero__eyebrow">Al Fahidi - Dubai - United Arab Emirates</p>

          <h1 className="hero__title">
            {heroWords.map((word, i) => (
              <motion.span
                key={word}
                className="hero__word"
                initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.18, ease: luxuryEase }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: luxuryEase }}
          >
            <em>Bengaluru’s First Luxury Lounge &amp; Bar Brand Now in Dubai</em>
          </motion.p>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.8, ease: luxuryEase }}
          >
            Where curated global flavours, handcrafted cocktails, and stunning skyline
            views come together to create unforgettable evenings.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.95, ease: luxuryEase }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="btn btn--primary btn--shimmer">
                Reserve a Table
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a href={SITE.digitalMenu} className="btn btn--outline">
                View Menu
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href={SITE.instagram}
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        id="discover"
        className="section section--charcoal brand-snapshot"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        aria-labelledby="brand-snapshot-heading"
      >
        <div className="container">
          <SectionHeader
            label="The Destination"
            title="What Makes Us Special"
            as="h2"
            id="brand-snapshot-heading"
          />
          <motion.div className="brand-snapshot__grid" variants={containerVariants}>
            {brandSnapshot.map((item) => (
              <motion.article
                key={item.title}
                className="snapshot-card"
                variants={cardVariants}
                whileHover={{ y: -6 }}
              >
                <span className="snapshot-card__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="snapshot-card__title">{item.title}</h3>
                <p className="snapshot-card__desc">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section section--purple experience-preview"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        aria-labelledby="experience-heading"
      >
        <motion.div
          className="container experience-preview__inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div
            className="experience-preview__text"
            variants={sectionVariants}
          >
            <span className="section-header__label">The Experience</span>
            <h2 id="experience-heading">An Experience Beyond Dining</h2>
            <span className="section-header__divider section-header__divider--left" aria-hidden="true" />
            <p>
              Stories Lounge is designed for moments that linger — sunset conversations,
              celebratory dinners, late-night cocktails, and vibrant social energy. Whether
              you&apos;re here to unwind or celebrate, every visit becomes a story worth
              sharing.
            </p>
            <Link to="/about" className="text-link">
              Explore Our Story
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
          <motion.div
            className="experience-preview__media"
            variants={sectionVariants}
          >
            <FeaturedImage
              item={experiencePreviewImage}
              className="experience-preview__img"
              aspectRatio="4/5"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="section section--black highlights"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        aria-labelledby="highlights-heading"
      >
        <motion.div className="container">
          <SectionHeader label="This Week" title="What's Happening at Stories" as="h2" />
          <div className="highlights__grid" role="list">
            {weeklyHighlights.map((event, i) => (
              <motion.article
                key={event.name}
                className="highlight-card"
                role="listitem"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: luxuryEase }}
                whileHover={{ y: -3 }}
              >
                <span className="highlight-card__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="highlight-card__body">
                  <h3 className="highlight-card__name">{event.name}</h3>
                  <p className="highlight-card__day">{event.day}</p>
                  <p className="highlight-card__time">{event.time}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/events" className="btn btn--outline highlights__cta">
              Explore Events
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="section section--black home-gallery"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionVariants}
        aria-labelledby="gallery-heading"
      >
        <div className="container">
          <SectionHeader
            label="Visual Journey"
            title="The Stories Experience"
            subtitle="Rooftop Creekview ambience, signature dishes, handcrafted cocktails, and evenings above Dubai Creek."
            as="h2"
            id="gallery-heading"
          />
          <GalleryPreview />
        </div>
      </motion.section>

      <motion.section
        className="section section--purple-deep testimonials"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        aria-labelledby="testimonials-heading"
      >
        <motion.div className="container testimonials__inner">
          <SectionHeader label="Social Proof" title="Loved by Our Guests" as="h2" />
          <motion.div className="testimonials__carousel" layout>
            <motion.blockquote
              key={activeTestimonial}
              className="testimonials__quote"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, ease: luxuryEase }}
            >
              <div className="testimonials__stars" aria-label="5 out of 5 stars">
                {'★★★★★'}
              </div>
              <p>&ldquo;{testimonials[activeTestimonial].quote}&rdquo;</p>
              <cite>— {testimonials[activeTestimonial].name}</cite>
            </motion.blockquote>
          </motion.div>
          <div className="testimonials__dots" role="tablist" aria-label="Guest testimonials">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeTestimonial}
                aria-label={`Testimonial ${i + 1}`}
                className={`testimonials__dot${i === activeTestimonial ? ' testimonials__dot--active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="section section--charcoal final-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionVariants}
        aria-labelledby="final-cta-heading"
      >
        <div className="container final-cta__inner">
          <span className="section-header__label">Reservations</span>
          <h2 id="final-cta-heading">Your Table Awaits</h2>
          <span className="section-header__divider" aria-hidden="true" />
          <p className="final-cta__desc">
            Join us atop Concorde Creek View for an evening of flavour, music, and skyline views.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" className="btn btn--primary btn--shimmer btn--lg">
              Reserve Now
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}

export default Home
