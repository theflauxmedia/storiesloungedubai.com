import { useState, useEffect } from 'react'
import { getMasonryColumnCount } from '../utils/galleryMasonry'

export function useMasonryColumns() {
  const [columnCount, setColumnCount] = useState(() =>
    typeof window !== 'undefined' ? getMasonryColumnCount(window.innerWidth) : 3
  )

  useEffect(() => {
    const update = () => setColumnCount(getMasonryColumnCount(window.innerWidth))

    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return columnCount
}
