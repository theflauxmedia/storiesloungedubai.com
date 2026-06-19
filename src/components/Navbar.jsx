import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../config/seo'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { href: SITE.digitalMenu, label: 'Menu', external: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        animate={{
          backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.92)' : 'rgba(8, 8, 8, 0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="navbar__inner"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link to="/" className="navbar__logo-link" aria-label="Stories Lounge Dubai home">
            <img src="/logo.png" alt="Stories Lounge Dubai" className="navbar__logo" />
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="navbar__link"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="navbar__actions">
            <motion.a
              href={SITE.instagram}
              className="navbar__instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Stories Lounge on Instagram"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <InstagramIcon />
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="btn btn--outline navbar__cta">
                Reserve a Table
              </Link>
            </motion.div>

            <button
              type="button"
              className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="navbar__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <nav className="navbar__drawer-nav" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.external ? link.label : link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i }}
                  >
                    {link.external ? (
                      <a href={link.href} className="navbar__drawer-link">
                        {link.label}
                      </a>
                    ) : (
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
                <Link to="/contact" className="btn btn--outline navbar__drawer-cta">
                  Reserve a Table
                </Link>
                <a
                  href={SITE.instagram}
                  className="navbar__drawer-instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  Follow us on Instagram
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
