import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES, FAQ_ITEMS, SITE } from '../config/seo'
import SectionHeader from '../components/SectionHeader'
import SocialLinks from '../components/SocialLinks'
import { openWhatsApp, reservationWhatsAppMessage } from '../utils/whatsapp'

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

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const Contact = () => {
  const today = new Date().toISOString().split('T')[0]
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
    openWhatsApp(reservationWhatsAppMessage(form))
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
            <h1>Reserve Your Rooftop Table</h1>
            <span className="section-header__divider section-header__divider--left" aria-hidden="true" />
            <p className="contact-form-wrap__intro">
              Book a table at our rooftop restaurant in Al Fahidi, Bur Dubai — for a date night,
              birthday dinner, business lunch or group dinner with Dubai Creek views.
            </p>
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
                      min={today}
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
                  Reserve via WhatsApp
                </motion.button>
            </form>
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
          <SectionHeader label="Good to Know" title="Frequently Asked Questions" as="h2" id="faq-heading" />
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
        <div className="map-embed">
          <iframe
            title="Stories Lounge Dubai — Concorde Creek View Hotel, Al Fahidi"
            src={SITE.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={SITE.mapsUrl}
            className="map-embed__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
        <SocialLinks className="container contact-social" linkClassName="contact-social__link" />
      </motion.section>
    </main>
  )
}

export default Contact
