import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { heroImages } from '../data/heroManifest'

const SLIDE_INTERVAL = 6000
const FADE_DURATION = 2.4
const luxuryEase = [0.22, 1, 0.36, 1]

const HeroSlider = ({ style, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [loaded, setLoaded] = useState({})

  const markLoaded = (src) => setLoaded((prev) => ({ ...prev, [src]: true }))

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const next = (activeIndex + 1) % heroImages.length
    const img = new Image()
    img.src = heroImages[next].src
  }, [activeIndex])

  useEffect(() => {
    if (reducedMotion || heroImages.length <= 1) return undefined

    let rafId
    let start = performance.now()

    const tick = (now) => {
      if (!document.hidden) {
        const elapsed = now - start
        setProgress(Math.min((elapsed / SLIDE_INTERVAL) * 100, 100))
        if (elapsed >= SLIDE_INTERVAL) {
          setActiveIndex((prev) => (prev + 1) % heroImages.length)
          start = now
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [activeIndex, reducedMotion])

  if (!heroImages.length) return null

  return (
    <motion.div
      className={`hero-slider ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      <div className="hero-slider__track">
        {heroImages.map((image, i) => {
          const isActive = i === activeIndex
          const isLoaded = loaded[image.src]

          return (
            <motion.div
              key={image.src}
              className="hero-slider__slide"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 2 : 0 }}
              transition={{
                duration: reducedMotion ? 0 : FADE_DURATION,
                ease: luxuryEase,
              }}
            >
              {!isLoaded && <div className="hero-slider__skeleton" />}
              <motion.img
                src={image.src}
                alt={image.alt}
                className={`hero-slider__img${isLoaded ? ' hero-slider__img--loaded' : ''}`}
                loading={i <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
                draggable={false}
                onLoad={() => markLoaded(image.src)}
                onError={() => markLoaded(image.src)}
                animate={{ scale: isActive && !reducedMotion ? 1.08 : 1 }}
                transition={{
                  duration: isActive ? SLIDE_INTERVAL / 1000 : 0.4,
                  ease: isActive ? 'linear' : luxuryEase,
                }}
              />
            </motion.div>
          )
        })}
      </div>

      {!reducedMotion && heroImages.length > 1 && (
        <div className="hero-slider__progress" aria-hidden="true">
          <div className="hero-slider__progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </motion.div>
  )
}

export default HeroSlider
