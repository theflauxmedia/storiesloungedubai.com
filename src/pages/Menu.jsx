import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { PAGES } from '../config/seo'
import SectionHeader from '../components/SectionHeader'

const Gallery = lazy(() => import('../components/Gallery'))

const MENU_GALLERY_CATEGORIES = ['food', 'mocktails and cocktails ', 'sheesha', 'wings']

const DIGITAL_MENU_URL = 'https://qr.mydigimenu.com/c2764751-64d6-4175-9d56-2d3b67d239d4'

const menuCategories = [
  {
    id: 'starters',
    label: 'Starters & Small Plates',
    dishes: [
      { name: 'Truffle Hummus & Warm Pita', desc: 'Silky chickpea dip with za\'atar oil and toasted flatbread.', type: 'V' },
      { name: 'Butter Chicken Bites', desc: 'Tender tandoori chicken in rich tomato-cream glaze.', type: 'NV' },
      { name: 'Crispy Calamari', desc: 'Lightly fried with lemon aioli and pickled chilli.', type: 'NV' },
      { name: 'Edamame & Sea Salt', desc: 'Steamed pods with togarashi and yuzu zest.', type: 'V' },
      { name: 'Spiced Lamb Sliders', desc: 'Mini brioche buns with mint yogurt and caramelised onion.', type: 'NV' },
      { name: 'Mediterranean Mezze Board', desc: 'Labneh, olives, falafel, and grilled vegetables to share.', type: 'V' },
    ],
  },
  {
    id: 'mains',
    label: 'Mains & Signatures',
    dishes: [
      { name: 'Stories Signature Grill', desc: 'Mixed grill of lamb chops, chicken tikka, and seekh kebab.', type: 'NV' },
      { name: 'Pan-Seared Sea Bass', desc: 'Citrus beurre blanc with charred broccolini and saffron rice.', type: 'NV' },
      { name: 'Wagyu Beef Tenderloin', desc: '250g cut with truffle mash and red wine jus.', type: 'NV' },
      { name: 'Thai Green Curry', desc: 'Coconut broth with jasmine rice, basil, and seasonal vegetables.', type: 'NV' },
      { name: 'Dubai Creek Prawn Pilaf', desc: 'Saffron-infused rice with jumbo prawns and dried lime.', type: 'NV' },
      { name: 'Harissa Roasted Chicken', desc: 'Half bird with roasted root vegetables and tahini drizzle.', type: 'NV' },
    ],
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian Selection',
    dishes: [
      { name: 'Paneer Tikka Skewers', desc: 'Chargrilled cottage cheese with bell peppers and mint chutney.', type: 'V' },
      { name: 'Wild Mushroom Risotto', desc: 'Arborio rice with porcini, truffle oil, and aged parmesan.', type: 'V' },
      { name: 'Stuffed Aubergine', desc: 'Roasted eggplant with pomegranate, pine nuts, and tahini.', type: 'V' },
      { name: 'Vegetable Biryani', desc: 'Fragrant basmati with saffron, cashews, and raita.', type: 'V' },
      { name: 'Beyond Burger', desc: 'Plant-based patty with avocado, aged cheddar, and brioche bun.', type: 'V' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    dishes: [
      { name: 'Dark Chocolate Fondant', desc: 'Warm molten centre with vanilla bean ice cream.', type: 'V' },
      { name: 'Kunafa Cheesecake', desc: 'Middle Eastern twist on a classic New York slice.', type: 'V' },
      { name: 'Mango Sticky Rice', desc: 'Thai-inspired coconut cream with fresh Alphonso mango.', type: 'V' },
      { name: 'Baklava Ice Cream Sundae', desc: 'Pistachio gelato, honey syrup, and crushed filo.', type: 'V' },
      { name: 'Tiramisu', desc: 'Espresso-soaked ladyfingers with mascarpone and cocoa dust.', type: 'V' },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    dishes: [
      { name: 'Stories Sunset', desc: 'Passion fruit, Aperol, prosecco, and a hint of rose water.', type: 'V' },
      { name: 'Creek View Old Fashioned', desc: 'Bourbon, date syrup, and aromatic bitters.', type: 'V' },
      { name: 'Spiced Mango Lassi', desc: 'House-blended yogurt drink with cardamom and saffron.', type: 'V' },
      { name: 'Smoky Mezcal Margarita', desc: 'Mezcal, lime, agave, and tajín rim.', type: 'V' },
      { name: 'Dubai Nights Espresso Martini', desc: 'Vodka, Kahlúa, and double-shot espresso.', type: 'V' },
      { name: 'Fresh Mint Lemonade', desc: 'Hand-pressed lemons with garden mint and crushed ice.', type: 'V' },
    ],
  },
  {
    id: 'shisha',
    label: 'Shisha Menu',
    dishes: [
      { name: 'Double Apple', desc: 'Classic blend with a smooth, sweet finish.', type: 'V' },
      { name: 'Grape Mint', desc: 'Refreshing fusion of dark grape and cool mint.', type: 'V' },
      { name: 'Love 66', desc: 'Tropical fruit medley with a mellow draw.', type: 'V' },
      { name: 'Blue Mist', desc: 'Berry-infused blend with a cool exhale.', type: 'V' },
      { name: 'Stories Signature Mix', desc: 'House-blend creation exclusive to Stories Lounge.', type: 'V' },
      { name: 'Premium Oud Tobacco', desc: 'Rich, aromatic oud notes for the discerning palate.', type: 'V' },
    ],
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const Menu = () => {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id)
  const activeCategory = menuCategories.find((c) => c.id === activeTab)

  usePageMeta({
    ...PAGES.menu,
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Menu', path: '/menu' },
    ],
  })

  return (
    <main className="menu-page">
      <motion.section
        className="section section--charcoal menu-intro"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.div className="container menu-intro__inner">
          <span className="section-header__label page-eyebrow">Culinary</span>
          <h1>Our Menu</h1>
          <span className="section-header__divider" aria-hidden="true" />
          <p>
            Our menu blends global inspirations with comfort flavours — thoughtfully curated
            for sharing, pairing, and indulging.
          </p>
          <motion.div
            className="menu-intro__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a
              href={DIGITAL_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--shimmer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Digital Menu
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="section section--black menu-tabs-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div className="container">
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeTab === cat.id}
                className={`menu-tab${activeTab === cat.id ? ' menu-tab--active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="menu-grid"
              role="tabpanel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {activeCategory.dishes.map((dish) => (
                <motion.article
                  key={dish.name}
                  className="dish-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.div className="dish-card__header">
                    <h3>{dish.name}</h3>
                    <span className={`dish-badge dish-badge--${dish.type.toLowerCase()}`}>
                      <span className="dish-badge__dot" aria-hidden="true" />
                      {dish.type}
                    </span>
                  </motion.div>
                  <p>{dish.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.section>

      <motion.section
        className="section section--purple-dark menu-gallery-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container">
          <SectionHeader
            label="From Our Kitchen & Bar"
            title="A Taste of Stories"
            subtitle="Explore our dishes, cocktails, shisha, and wings — each plate and pour crafted for Rooftop Creekview evenings in Dubai."
            as="h2"
          />
          <Suspense fallback={<div className="gallery gallery--loading" aria-hidden="true" />}>
            <Gallery includeCategories={MENU_GALLERY_CATEGORIES} />
          </Suspense>
        </div>
      </motion.section>

      <motion.section
        className="section section--purple-deep menu-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container menu-cta__inner">
          <p>Pair your meal with our signature cocktails &amp; skyline views.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" className="btn btn--primary btn--shimmer">
              Reserve Your Table
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}

export default Menu
