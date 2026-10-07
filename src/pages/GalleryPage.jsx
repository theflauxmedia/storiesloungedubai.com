import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES } from '../config/seo'
import SectionHeader from '../components/SectionHeader'

const Gallery = lazy(() => import('../components/Gallery'))

const luxuryEase = [0.22, 1, 0.36, 1]

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: luxuryEase } },
}

const GalleryPage = () => {
  usePageMeta({
    ...PAGES.gallery,
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Gallery', path: '/gallery' },
    ],
  })

  return (
    <main className="gallery-page">
      <motion.section
        className="section section--black gallery-page__intro"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container">
          <span className="section-header__label page-eyebrow">Visual Journey</span>
          <h1>Gallery: Rooftop Views Over Dubai Creek</h1>
          <span className="section-header__divider" aria-hidden="true" />
          <p className="gallery-page__intro-text">
            Sunset dining, the Dubai night view from our rooftop, signature dishes, handcrafted
            cocktails and shisha — see why guests call Stories one of the best restaurants with a
            view in Bur Dubai.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="section section--charcoal gallery-page__main"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={sectionVariants}
      >
        <div className="container">
          <SectionHeader
            label="The Stories Experience"
            title="Moments Above the Creek"
            subtitle="Filter by category or browse the full collection."
            as="h2"
          />
          <Suspense fallback={<div className="gallery gallery--loading" aria-hidden="true" />}>
            <Gallery />
          </Suspense>
        </div>
      </motion.section>
    </main>
  )
}

export default GalleryPage
