import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES } from '../config/seo'
import SectionHeader from '../components/SectionHeader'
import { ImageCard } from '../components/MediaImage'
import { eventEnquiryWhatsAppMessage, openWhatsApp } from '../utils/whatsapp'

const eventMeta = [
  { title: 'DJ Nights', index: 0 },
  { title: 'Bollywood & Quiz Nights', index: 4 },
  { title: 'Festive & Holiday Events', index: 9 },
  { title: 'Corporate Dinners & Parties', index: 14 },
]

const eventTypeOptions = [
  'Birthday Celebration',
  'Corporate Dinner / Team Dinner',
  'Anniversary',
  'Private Party',
  'Other',
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const Events = () => {
  const today = new Date().toISOString().split('T')[0]
  const [eventImages, setEventImages] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guestCount: '',
    message: '',
  })

  useEffect(() => {
    import('../data/galleryManifest').then((m) => {
      setEventImages(m.getImages('events'))
    })
  }, [])

  const eventTypes = eventMeta.map((event) => ({
    ...event,
    image: eventImages[event.index],
  }))

  usePageMeta({
    ...PAGES.events,
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Events', path: '/events' },
    ],
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    openWhatsApp(eventEnquiryWhatsAppMessage(form))
  }

  return (
    <main className="events-page">
      <motion.section
        className="section section--black events-header"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.div className="container">
          <span className="section-header__label page-eyebrow">Entertainment</span>
          <h1>Rooftop Events &amp; Nightlife in Bur Dubai</h1>
          <span className="section-header__divider" aria-hidden="true" />
          <p className="events-header__intro">
            From DJ nights and live music to Bollywood, quiz and Housie nights, Stories Lounge is
            where Al Fahidi comes alive after sunset — weekend nightlife on a rooftop above
            Dubai Creek.
          </p>
        </motion.div>
      </motion.section>

      {eventTypes.some((event) => event.image) && (
        <motion.section
          className="section section--charcoal events-grid-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="container">
            <motion.div className="events-grid">
              {eventTypes.map(
                (event) =>
                  event.image && (
                    <motion.div key={event.title} variants={sectionVariants}>
                      <ImageCard
                        item={event.image}
                        overlayTitle={event.title}
                        className="event-card"
                      />
                    </motion.div>
                  )
              )}
            </motion.div>
          </div>
        </motion.section>
      )}

      <motion.section
        className="section section--black weekly-nights"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container seo-copy">
          <SectionHeader label="Every Week" title="Live Music, DJ & Themed Nights" as="h2" />
          <h3>DJ Nights &amp; Live Performances</h3>
          <p>
            Our resident DJs and live performers make Stories one of the go-to spots for live
            music in Bur Dubai — a restaurant with live entertainment where dinner flows into a
            rooftop night out.
          </p>
          <h3>Bollywood Nights</h3>
          <p>
            Bollywood nights in Al Fahidi with the hits you know, great food and a crowd that
            loves to dance.
          </p>
          <h3>Quiz Nights &amp; Housie Nights</h3>
          <p>
            Gather your friends for quiz nights and Housie nights — a fun group hangout with
            prizes, cocktails and creek views.
          </p>
          <h3>Rooftop Happy Hour</h3>
          <p>
            Daily happy hour with shisha combos, beer bucket offers and bites specials — one of
            the best-value happy hour bars in Bur Dubai.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="section section--purple private-bookings"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div className="container private-bookings__inner">
          <SectionHeader
            label="Private Events"
            title="Private Events & Rooftop Parties"
            subtitle="Celebrate birthdays, anniversary dinners, corporate dinners, team dinners or private parties at our rooftop party venue in Bur Dubai — with custom menus, group dining packages and personalized service."
            as="h2"
          />
        </motion.div>
      </motion.section>

      <motion.section
        className="section section--charcoal enquiry-form-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div className="container">
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="event-name">Name</label>
                <input
                  id="event-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="event-email">Email</label>
                <input
                  id="event-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="event-phone">Phone</label>
                <input
                  id="event-phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="event-type">Event Type</label>
                <select
                  id="event-type"
                  name="eventType"
                  required
                  value={form.eventType}
                  onChange={handleChange}
                >
                  <option value="">Select event type</option>
                  {eventTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="event-date">Date</label>
                <input
                  id="event-date"
                  name="date"
                  type="date"
                  min={today}
                  required
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="event-guests">Guest Count</label>
                <input
                  id="event-guests"
                  name="guestCount"
                  type="number"
                  min="1"
                  required
                  value={form.guestCount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="event-message">Message</label>
              <textarea
                id="event-message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <motion.button
              type="submit"
              className="btn btn--primary btn--shimmer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Request via WhatsApp
            </motion.button>
          </form>
        </motion.div>
      </motion.section>
    </main>
  )
}

export default Events
