import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
          <Link to="/contact" className="mobile-reserve__btn btn btn--primary btn--shimmer">
            Reserve a Table
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileReserveBar
