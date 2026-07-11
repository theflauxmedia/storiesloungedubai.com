import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { reserveTableWhatsAppUrl } from '../utils/whatsapp'

const MobileReserveBar = () => {
  const { pathname } = useLocation()
  const hidden = pathname === '/contact'

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="mobile-reserve"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={reserveTableWhatsAppUrl}
            className="mobile-reserve__btn btn btn--primary btn--shimmer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve a Table
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileReserveBar
