import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import MobileReserveBar from './components/MobileReserveBar'
import StructuredData from './components/StructuredData'
import Home from './pages/Home'
import About from './pages/About'
import MenuRedirect from './pages/MenuRedirect'
import Events from './pages/Events'
import Contact from './pages/Contact'
import GalleryPage from './pages/GalleryPage'

function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route path="/menu" element={<MenuRedirect />} />
          <Route
            path="/events"
            element={
              <PageTransition>
                <Events />
              </PageTransition>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageTransition>
                <GalleryPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <MobileReserveBar />
    </>
  )
}

function App() {
  return (
    <>
      <StructuredData />
      <SmoothScroll>
        <AppRoutes />
      </SmoothScroll>
    </>
  )
}

export default App
