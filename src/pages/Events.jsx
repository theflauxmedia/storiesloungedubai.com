import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES } from '../config/seo'
import SectionHeader from '../components/SectionHeader'
import { ImageCard } from '../components/MediaImage'

const eventMeta = [
  { title: 'DJ Nights', label: 'DJ Nights — Live Sets', index: 4 },
  { title: 'Quiz & Theme Evenings', label: 'Quiz & Theme Evenings', index: 7 },
  { title: 'Festive & Holiday Events', label: 'Festive & Holiday Events', index: 10 },
  { title: 'Corporate & Social Mixers', label: 'Corporate & Social Mixers', index: 13 },
]

const eventTypeOptions = [
  'Birthday Celebration',
  'Corporate Gathering',
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
  const [ambianceImages, setAmbianceImages] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guestCount: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    import('../data/galleryManifest').then((m) => {
      setAmbianceImages(m.getImages('ambiance'))
    })
  }, [])

  const eventTypes = eventMeta.map((event) => ({
    ...event,
    image: ambianceImages[event.index],
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
    setSubmitted(true)
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
          <h1>Events &amp; Entertainment</h1>
          <span className="section-header__divider" aria-hidden="true" />
          <p className="events-header__intro">
            From weekly themed nights to seasonal celebrations, Stories Lounge is where Dubai
            comes alive after sunset.
          </p>
        </motion.div>
      </motion.section>

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
            title="Host Your Story With Us"
            subtitle="Celebrate birthdays, corporate gatherings, anniversaries, or private parties in a stylish rooftop setting with custom menus and personalized service."
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
          {submitted ? (
            <motion.div
              className="form-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>Thank You</h3>
              <p>
                Your enquiry has been received. Our events team will be in touch shortly with
                a tailored proposal.
              </p>
            </motion.div>
          ) : (
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
                Request a Proposal
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.section>
    </main>
  )
}

export default Events
