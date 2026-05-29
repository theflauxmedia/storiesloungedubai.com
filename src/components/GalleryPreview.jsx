import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GALLERY_PREVIEW_ITEMS } from '../data/galleryPreview'

const luxuryEase = [0.22, 1, 0.36, 1]

function PreviewTile({ item, index }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.figure
      ref={ref}
      className="gallery-preview__item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: luxuryEase }}
    >
      <Link to="/gallery" className="gallery-preview__link" aria-label={`View gallery — ${item.categoryLabel}`}>
        <div className="gallery-preview__media">
          {loaded ? (
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
          ) : (
            <span className="gallery-preview__skeleton" aria-hidden="true" />
          )}
          <span className="gallery-preview__overlay">
            <span className="gallery-preview__label">{item.categoryLabel}</span>
          </span>
        </div>
      </Link>
    </motion.figure>
  )
}

const GalleryPreview = () => (
  <div className="gallery-preview">
    <div className="gallery-preview__grid">
      {GALLERY_PREVIEW_ITEMS.map((item, index) => (
        <PreviewTile key={item.src} item={item} index={index} />
      ))}
    </div>
    <motion.div
      className="gallery-preview__cta"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
    >
      <Link to="/gallery" className="btn btn--outline">
        View Full Gallery
      </Link>
    </motion.div>
  </div>
)

export default GalleryPreview
