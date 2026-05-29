import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const luxuryEase = [0.22, 1, 0.36, 1]
const IO_MARGIN = '200px 0px'

function useLazySrc(src) {
  const ref = useRef(null)
  const [activeSrc, setActiveSrc] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el || activeSrc) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src)
          observer.disconnect()
        }
      },
      { rootMargin: IO_MARGIN, threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [src, activeSrc])

  return { ref, activeSrc }
}

export const FeaturedImage = ({
  item,
  className = '',
  aspectRatio = '16/10',
  priority = false,
}) => {
  const { ref, activeSrc } = useLazySrc(item?.src)
  const eager = priority

  if (!item) return null

  return (
    <figure
      ref={ref}
      className={`featured-image ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {(eager || activeSrc) && (
        <img
          src={eager ? item.src : activeSrc}
          alt={item.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
        />
      )}
    </figure>
  )
}

export const ImageStrip = ({ items, className = '' }) => (
  <div className={`image-strip ${className}`.trim()}>
    {items.map((item) => (
      <ImageStripItem key={item.id} item={item} />
    ))}
  </div>
)

const ImageStripItem = ({ item }) => {
  const { ref, activeSrc } = useLazySrc(item.src)

  return (
    <figure ref={ref} className="image-strip__item">
      <div className="image-strip__media">
        {activeSrc && (
          <img src={activeSrc} alt={item.alt} loading="lazy" decoding="async" />
        )}
      </div>
    </figure>
  )
}

export const ImageCard = ({ item, className = '', overlayTitle }) => {
  const { ref, activeSrc } = useLazySrc(item.src)

  return (
    <article ref={ref} className={`image-card ${className}`.trim()}>
      <div className="image-card__media">
        {activeSrc && (
          <img src={activeSrc} alt={item.alt} loading="lazy" decoding="async" />
        )}
        <div className="image-card__overlay">
          <h3>{overlayTitle || item.categoryLabel}</h3>
        </div>
      </div>
    </article>
  )
}

export const FadeIn = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: luxuryEase }}
  >
    {children}
  </motion.div>
)

export default FeaturedImage
