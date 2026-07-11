import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SITE } from '../config/seo'
import SocialLinks from './SocialLinks'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { href: SITE.digitalMenu, label: 'Menu', external: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <motion.img
        src="/logo.png"
        alt="Stories Lounge Dubai"
        className="footer__logo"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />

      <nav className="footer__nav" aria-label="Footer navigation">
        {navLinks.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              className="footer__nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.to} to={link.to} className="footer__nav-link">
              {link.label}
            </Link>
          )
        )}
      </nav>

      <p className="footer__tagline">Where every evening becomes a story.</p>

      <address className="footer__address" itemScope itemType="https://schema.org/Restaurant">
        <span itemProp="name">Stories Lounge Dubai</span>
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">{SITE.address.street}</span>,
          <span itemProp="addressLocality"> {SITE.address.locality}</span>,
          <span itemProp="addressCountry"> {SITE.address.countryName}</span>
        </span>
        · <a href={`tel:${SITE.phone}`} itemProp="telephone">{SITE.phoneDisplay}</a>
      </address>

      <motion.div
        className="footer__bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Stories Lounge Dubai
        </p>
        <SocialLinks className="footer__social" linkClassName="footer__social-link" />
      </motion.div>
    </div>
  </footer>
)

export default Footer
