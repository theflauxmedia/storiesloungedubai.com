import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../config/seo'
import { reserveTableWhatsAppUrl } from '../utils/whatsapp'

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
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
                  target="_blank"
                  rel="noopener noreferrer"
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
            <div className="navbar__cta-stack">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={reserveTableWhatsAppUrl}
                  className="btn btn--outline navbar__cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve a Table
                </a>
              </motion.div>
              <motion.a
                href={SITE.instagram}
                className="navbar__follow-btn navbar__follow-btn--stack"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Follow Us
              </motion.a>
            </div>

            <div className="navbar__utility">
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
              <motion.a
                href={SITE.instagram}
                className="navbar__follow-btn navbar__follow-btn--utility"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Follow Us
              </motion.a>
            </div>
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
                      <a
                        href={link.href}
                        className="navbar__drawer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                <a
                  href={reserveTableWhatsAppUrl}
                  className="btn btn--outline navbar__drawer-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve a Table
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
