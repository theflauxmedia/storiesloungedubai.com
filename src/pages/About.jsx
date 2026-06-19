import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES } from '../config/seo'
import SectionHeader from '../components/SectionHeader'
import { FeaturedImage } from '../components/MediaImage'

const luxuryEase = [0.22, 1, 0.36, 1]

const aboutStoryImage = {
  src: '/images/ambiance/DSC07596.webp',
  alt: 'Ambience at Stories Lounge Dubai',
}

const philosophy = [
  'Crafted menus using premium ingredients',
  'Atmosphere designed for connection',
  'Music-driven evenings, not overpowering nightlife',
  'Attentive service without formality',
]

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: luxuryEase } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const About = () => {
  usePageMeta({
    ...PAGES.about,
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  })

  return (
    <main className="about">
      <motion.section
        className="section section--black about-story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div className="container about-story__intro">
          <span className="section-header__label page-eyebrow">About Us</span>
          <h1>Our Story</h1>
          <p className="about-story__text">
            Located atop the Concorde Creek View Hotel, Stories Lounge is a Rooftop Creekview destination
            where food, music, views, and people come together. Inspired by global dining
            cultures and Dubai&apos;s vibrant nightlife, we offer a relaxed yet refined space
            designed for social experiences that flow effortlessly from day to night.
          </p>
          <FeaturedImage
            item={aboutStoryImage}
            className="about-story__image"
            aspectRatio="21/9"
            priority
          />
        </motion.div>
      </motion.section>

      <motion.section
        className="section section--charcoal philosophy"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <SectionHeader label="Philosophy" title="More Than a Lounge" as="h2" />
          <motion.div className="philosophy__grid">
            {philosophy.map((point) => (
              <motion.article
                key={point}
                className="philosophy-card"
                variants={sectionVariants}
                whileHover={{ scale: 1.03 }}
              >
                <p>{point}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section section--purple the-space"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container the-space__inner">
          <SectionHeader
            label="The Space"
            title="Designed for Moments"
            subtitle="From intimate seating to open social tables, Stories Lounge adapts seamlessly to every mood — relaxed afternoons, golden-hour sunsets, or lively late nights."
            as="h2"
          />
          <motion.img
            src="/logo.png"
            alt="Stories Lounge Bar · Cafe Dubai"
            className="the-space__logo"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: luxuryEase }}
          />
        </div>
      </motion.section>
    </main>
  )
}

export default About
