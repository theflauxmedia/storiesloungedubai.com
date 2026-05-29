import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES } from '../config/seo'
import SectionHeader from '../components/SectionHeader'
import { FeaturedImage, ImageStrip } from '../components/MediaImage'

const luxuryEase = [0.22, 1, 0.36, 1]

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
  const [ambianceImages, setAmbianceImages] = useState([])

  usePageMeta({
    ...PAGES.about,
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  })

  useEffect(() => {
    import('../data/galleryManifest').then((m) => {
      setAmbianceImages(m.getImages('ambiance'))
    })
  }, [])

  return (
    <main className="about">
      <motion.section
        className="section section--black about-story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div className="container">
          <span className="section-header__label page-eyebrow">About Us</span>
          <h1>Our Story</h1>
          <p className="about-story__text">
            Located atop the Concorde Creek View Hotel, Stories Lounge is a rooftop destination
            where food, music, views, and people come together. Inspired by global dining
            cultures and Dubai&apos;s vibrant nightlife, we offer a relaxed yet refined space
            designed for social experiences that flow effortlessly from day to night.
          </p>
        </motion.div>
        {ambianceImages[0] && (
          <FeaturedImage
            item={ambianceImages[0]}
            className="about-story__image"
            aspectRatio="21/9"
            priority
          />
        )}
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
        <div className="container">
          <SectionHeader
            label="The Space"
            title="Designed for Moments"
            subtitle="From intimate seating to open social tables, Stories Lounge adapts seamlessly to every mood — relaxed afternoons, golden-hour sunsets, or lively late nights."
            as="h2"
          />
        </div>
        {ambianceImages.length > 0 && (
          <ImageStrip items={ambianceImages} className="the-space__strip" />
        )}
      </motion.section>
    </main>
  )
}

export default About
