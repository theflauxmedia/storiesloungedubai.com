import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES, FAQ_ITEMS, SITE } from '../config/seo'
import SectionHeader from '../components/SectionHeader'

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    label: 'Address',
    value: SITE.addressDisplay,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: SITE.phoneDisplay,
    href: `tel:${SITE.phone}`,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: 'Hours',
    value: 'Daily | 12:00 PM – 4:00 AM',
  },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${SITE.phoneWhatsApp}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.882 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    notes: '',
  })

  usePageMeta({
    ...PAGES.contact,
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="contact-page">
      <motion.section
        className="section section--charcoal contact-main"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container contact-main__grid">
          <div className="contact-form-wrap">
            <span className="section-header__label page-eyebrow">Book a Table</span>
            <h1>Reserve Your Table</h1>
            <span className="section-header__divider section-header__divider--left" aria-hidden="true" />
            {submitted ? (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3>Reservation Requested</h3>
                <p>
                  Thank you for choosing Stories Lounge. We&apos;ll confirm your reservation
                  shortly via phone.
                </p>
              </motion.div>
            ) : (
              <form className="reservation-form" onSubmit={handleSubmit}>
                <motion.div className="form-group">
                  <label htmlFor="res-name">Name</label>
                  <input
                    id="res-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </motion.div>
                <div className="form-group">
                  <label htmlFor="res-phone">Phone</label>
                  <input
                    id="res-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <motion.div className="form-group">
                    <label htmlFor="res-date">Date</label>
                    <input
                      id="res-date"
                      name="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                    />
                  </motion.div>
                  <div className="form-group">
                    <label htmlFor="res-time">Time</label>
                    <input
                      id="res-time"
                      name="time"
                      type="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="res-guests">Guests</label>
                  <input
                    id="res-guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={form.guests}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="res-notes">Notes</label>
                  <textarea
                    id="res-notes"
                    name="notes"
                    rows="4"
                    placeholder="Special requests, dietary requirements..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn--primary btn--shimmer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Confirm Reservation
                </motion.button>
              </form>
            )}
          </div>

          <motion.aside
            className="contact-info"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="contact-info__item">
                <span className="contact-info__icon">{item.icon}</span>
                <div>
                  <p className="contact-info__label">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="contact-info__value">
                      {item.value}
                    </a>
                  ) : (
                    <p className="contact-info__value">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.aside>
        </div>
      </motion.section>

      <motion.section
        className="section section--purple-deep faq-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionVariants}
        aria-labelledby="faq-heading"
      >
        <div className="container">
          <SectionHeader label="Dubai" title="Frequently Asked Questions" as="h2" id="faq-heading" />
          <div className="faq-list">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-item__question">{item.question}</summary>
                <p className="faq-item__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section section--black map-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div
          className="map-placeholder img-placeholder"
          data-label="Google Map — Concorde Creek View Hotel"
        />
        <div className="container contact-social">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social__link"
              aria-label={social.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.section>
    </main>
  )
}

export default Contact
