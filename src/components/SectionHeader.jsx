import { motion } from 'framer-motion'

const headerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

const SectionHeader = ({ label, title, subtitle, align = 'center', as: Tag = 'h2', id }) => (
  <motion.header
    className={`section-header section-header--${align}`}
    variants={headerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
  >
    {label && <span className="section-header__label">{label}</span>}
    <Tag className="section-header__title" id={id}>
      {title}
    </Tag>
    <span className="section-header__divider" aria-hidden="true" />
    {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
  </motion.header>
)

export default SectionHeader
