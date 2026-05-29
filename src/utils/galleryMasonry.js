/** Relative visual height per tile (width-normalized) + gap unit */
const GAP_UNIT = 0.14

export const GALLERY_SPANS = [
  { className: 'gallery__item-media--wide', weight: 11 / 16 },
  { className: 'gallery__item-media--landscape', weight: 4 / 5 },
  { className: 'gallery__item-media--square', weight: 1 },
  { className: 'gallery__item-media--portrait', weight: 5 / 4 },
  { className: 'gallery__item-media--tall', weight: 4 / 3 },
]

const spanByClass = Object.fromEntries(GALLERY_SPANS.map((s) => [s.className, s]))

function hashId(id) {
  let h = 0
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function scoreColumnHeights(heights) {
  const max = Math.max(...heights)
  const min = Math.min(...heights)
  const spread = max - min
  const mean = heights.reduce((a, b) => a + b, 0) / heights.length
  const variance =
    heights.reduce((acc, h) => acc + (h - mean) ** 2, 0) / heights.length
  return spread * 3.2 + variance * 1.4 + max * 0.08
}

/** Preferred span variety per item — editorial, stable per id */
function preferredSpansForItem(item, index) {
  const h = hashId(item.id)
  const rotated = [
    GALLERY_SPANS[h % GALLERY_SPANS.length],
    GALLERY_SPANS[(h + 2) % GALLERY_SPANS.length],
    GALLERY_SPANS[(index + 1) % GALLERY_SPANS.length],
    GALLERY_SPANS[(h + 3) % GALLERY_SPANS.length],
    GALLERY_SPANS[(index + 2) % GALLERY_SPANS.length],
  ]
  return [...new Map(rotated.map((s) => [s.className, s])).values()]
}

/**
 * Place items into columns using shortest-column + span selection
 * for balanced bottoms without rigid symmetry.
 */
export function buildMasonryLayout(items, columnCount) {
  if (!items.length) return []

  const cols = columnCount < 1 ? 1 : columnCount
  if (cols === 1) {
    return [
      {
        items: items.map((item, index) => {
          const span = preferredSpansForItem(item, index)[0]
          return { item, aspectClass: span.className }
        }),
      },
    ]
  }

  const columns = Array.from({ length: cols }, () => ({
    height: 0,
    items: [],
  }))

  items.forEach((item, index) => {
    const candidates = preferredSpansForItem(item, index)
    let best = null
    let bestScore = Infinity

    for (const span of candidates) {
      for (let colIdx = 0; colIdx < cols; colIdx += 1) {
        const nextHeights = columns.map((col, i) =>
          i === colIdx ? col.height + span.weight + GAP_UNIT : col.height
        )
        const score = scoreColumnHeights(nextHeights)
        if (score < bestScore) {
          bestScore = score
          best = { colIdx, span }
        }
      }
    }

    const placement = best ?? { colIdx: 0, span: candidates[0] }
    const column = columns[placement.colIdx]
    column.items.push({ item, aspectClass: placement.span.className })
    column.height += placement.span.weight + GAP_UNIT
  })

  polishColumnEnds(columns)

  return columns
}

/** Swap trailing tiles between tallest & shortest column when gap is large */
function polishColumnEnds(columns, maxPasses = 2) {
  const cols = columns.length
  if (cols < 2) return

  for (let pass = 0; pass < maxPasses; pass += 1) {
    const heights = columns.map((c) => c.height)
    const maxH = Math.max(...heights)
    const minH = Math.min(...heights)
    if (maxH - minH < 0.35) break

    const tallIdx = heights.indexOf(maxH)
    const shortIdx = heights.indexOf(minH)
    const tallCol = columns[tallIdx]
    if (!tallCol.items.length) break

    const lastIdx = tallCol.items.length - 1
    const moving = tallCol.items[lastIdx]
    const span = spanByClass[moving.aspectClass] ?? GALLERY_SPANS[2]

    const tallAfter = tallCol.height - span.weight - GAP_UNIT
    const shortAfter = columns[shortIdx].height + span.weight + GAP_UNIT
    const newHeights = columns.map((c, i) => {
      if (i === tallIdx) return tallAfter
      if (i === shortIdx) return shortAfter
      return c.height
    })

    if (scoreColumnHeights(newHeights) >= scoreColumnHeights(heights)) break

    tallCol.items.pop()
    tallCol.height = tallAfter
    columns[shortIdx].items.push(moving)
    columns[shortIdx].height = shortAfter
  }
}

export function getMasonryColumnCount(width) {
  if (width < 560) return 1
  if (width < 1024) return 2
  return 3
}
