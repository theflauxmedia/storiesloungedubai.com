import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES } from '../config/seo'
import SectionHeader from '../components/SectionHeader'
import { FeaturedImage } from '../components/MediaImage'

const luxuryEase = [0.22, 1, 0.36, 1]

const aboutStoryImage = {
  src: '/images/ambiance/DSC07596.webp',
  alt: 'Rooftop lounge ambience at Stories Lounge, Concorde Creek View Hotel, Al Fahidi',
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
          <h1>Stories Lounge Bar &amp; Cafe, Al Fahidi</h1>
          <p className="about-story__text">
            Located on the rooftop of the Concorde Creek View Hotel, Stories Lounge is a rooftop
            restaurant and lounge in Al Fahidi, Bur Dubai, where food, music, views, and people
            come together. Born as Bengaluru&apos;s first luxury lounge and bar brand and inspired
            by Dubai&apos;s vibrant nightlife, we offer a relaxed yet refined space overlooking
            Dubai Creek, designed for social experiences that flow effortlessly from day to night.
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
        className="section section--black about-cuisine"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container seo-copy">
          <SectionHeader label="Our Kitchen" title="A Multicuisine Restaurant in Bur Dubai" as="h2" />
          <p>
            Our kitchen takes you across India and beyond. Order North Indian food in Bur Dubai
            straight from the tandoor, South Indian and coastal Indian food packed with spice and
            seafood, or Indo-Chinese favourites made for sharing. Prefer something lighter? Our
            Mediterranean and Continental food — including pizza and pasta — rounds out one of the
            most varied global fusion menus in Al Fahidi.
          </p>
          <p>
            We cook for every table: generous vegetarian food alongside non-veg classics, fresh
            seafood, and plates designed to pair with drinks from our cocktail bar and premium
            shisha lounge.
          </p>
          <h3>Near Meena Bazaar &amp; Dubai Creek</h3>
          <p>
            Stories Lounge Bur Dubai is steps from Meena Bazaar and the Al Fahidi historical
            district, making it an easy stop for lunch while exploring old Dubai or a rooftop
            dinner after a walk along Dubai Creek.{' '}
            <Link to="/contact" className="text-link">
              Get directions and reserve
              <span aria-hidden="true">→</span>
            </Link>
          </p>
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
            subtitle="From intimate tables for a romantic dinner to open social tables for group dining, Stories Lounge adapts seamlessly to every mood — relaxed rooftop lunches, golden-hour sunsets, or lively late nights."
            as="h2"
          />
          <motion.img
            src="/logo.png"
            alt="Stories Lounge Bar and Cafe Dubai logo"
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
