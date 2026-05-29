import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

const isTouchDevice = () =>
  window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const touch = isTouchDevice()

    const lenis = new Lenis({
      duration: touch ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: !touch,
      syncTouch: touch,
      syncTouchLerp: 0.1,
      touchMultiplier: touch ? 1.15 : 1.25,
      infinite: false,
      autoRaf: false,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return children
}

export default SmoothScroll
