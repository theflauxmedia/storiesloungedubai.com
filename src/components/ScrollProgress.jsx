import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const [visible, setVisible] = useState(false)
  const scaleX = useSpring(0, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const next = docHeight > 0 ? scrollTop / docHeight : 0
      setVisible(next > 0.005)
      scaleX.set(next)
    }

    update()

    const lenis = window.lenis
    if (lenis?.on) {
      lenis.on('scroll', update)
      return () => lenis.off('scroll', update)
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [scaleX])

  if (!visible) return null

  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  )
}

export default ScrollProgress
