import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { galleryImages, galleryCategories } from '../data/galleryManifest'
import { buildMasonryLayout } from '../utils/galleryMasonry'
import { useMasonryColumns } from '../hooks/useMasonryColumns'

const PAGE_SIZE = 9
const ROOT_MARGIN = '280px 0px'

const ALL_TAB = { key: 'all', label: 'All' }

function getTileAspectStyle(item) {
  if (item.width && item.height) {
    return { aspectRatio: `${item.width} / ${item.height}` }
  }
  return { aspectRatio: '1 / 1' }
}

function GalleryTile({ item, onOpen }) {
  const ref = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      ref={ref}
      type="button"
      className="gallery__item"
      onClick={() => onOpen(item)}
    >
      <div className="gallery__item-media" style={getTileAspectStyle(item)}>
        {shouldLoad ? (
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            width={item.width ?? undefined}
            height={item.height ?? undefined}
          />
        ) : (
          <span className="gallery__item-skeleton" aria-hidden="true" />
        )}
        <span className="gallery__item-overlay">
          <span className="gallery__item-category">{item.categoryLabel}</span>
        </span>
      </div>
    </button>
  )
}

const Gallery = ({
  categories = galleryCategories,
  images: imagesProp,
  includeCategories,
  showFilters = true,
  limit,
  className = '',
}) => {
  const sectionRef = useRef(null)
  const columnCount = useMasonryColumns()
  const [mounted, setMounted] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(limit ?? PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const images =
    imagesProp ??
    (includeCategories
      ? galleryImages.filter((img) => includeCategories.includes(img.category))
      : galleryImages)

  const activeCategories = includeCategories
    ? galleryCategories.filter((c) => includeCategories.includes(c.key))
    : categories

  const filters = [ALL_TAB, ...activeCategories]

  const filtered =
    activeFilter === 'all'
      ? images
      : images.filter((img) => img.category === activeFilter)

  const displayed = limit ? filtered.slice(0, limit) : filtered.slice(0, visibleCount)
  const hasMore = !limit && visibleCount < filtered.length

  const masonryColumns = useMemo(
    () => buildMasonryLayout(displayed, columnCount),
    [displayed, columnCount]
  )

  const placeholderColumns = useMemo(
    () => buildMasonryLayout(
      Array.from({ length: 6 }, (_, i) => ({
        id: `placeholder-${i}`,
        categoryLabel: '',
        alt: '',
        src: '',
        width: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 5,
        height: i % 3 === 0 ? 5 : i % 3 === 1 ? 4 : 3,
      })),
      columnCount
    ),
    [columnCount]
  )

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeFilter])

  useEffect(() => {
    if (lightboxIndex === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % filtered.length)
      if (e.key === 'ArrowLeft')
        setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxIndex, filtered.length])

  const openLightbox = useCallback(
    (item) => {
      const idx = filtered.findIndex((x) => x.id === item.id)
      if (idx >= 0) setLightboxIndex(idx)
    },
    [filtered]
  )

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null

  const renderMasonry = (columns, { skeleton = false } = {}) => (
    <div
      className={`gallery__masonry${skeleton ? ' gallery__masonry--placeholder' : ''}`}
      style={{ '--gallery-cols': columns.length }}
      key={skeleton ? `ph-${columnCount}` : activeFilter}
    >
      {columns.map((column, colIndex) => (
        <div className="gallery__column" key={skeleton ? `ph-col-${colIndex}` : `col-${colIndex}`}>
          {column.items.map(({ item }) =>
            skeleton ? (
              <div
                key={item.id}
                className="gallery__item gallery__item--skeleton-only"
                aria-hidden="true"
              >
                <div className="gallery__item-media" style={getTileAspectStyle(item)}>
                  <span className="gallery__item-skeleton" />
                </div>
              </div>
            ) : (
              <GalleryTile
                key={item.id}
                item={item}
                onOpen={openLightbox}
              />
            )
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div ref={sectionRef} className={`gallery ${className}`.trim()}>
      {showFilters && (
        <div className="gallery__filters" role="tablist" aria-label="Gallery categories">
          {filters.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.key}
              className={`gallery__filter${activeFilter === tab.key ? ' gallery__filter--active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {mounted ? renderMasonry(masonryColumns) : renderMasonry(placeholderColumns, { skeleton: true })}

      {mounted && hasMore && (
        <div className="gallery__more">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More
          </button>
        </div>
      )}

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.categoryLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="gallery-lightbox__inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="gallery-lightbox__close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
              >
                ×
              </button>
              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                onClick={() =>
                  setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)
                }
                aria-label="Previous"
              >
                ‹
              </button>
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                className="gallery-lightbox__img"
                decoding="async"
              />
              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--next"
                onClick={() => setLightboxIndex((i) => (i + 1) % filtered.length)}
                aria-label="Next"
              >
                ›
              </button>
              <div className="gallery-lightbox__caption">
                <span className="gallery-lightbox__category">{lightboxItem.categoryLabel}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
