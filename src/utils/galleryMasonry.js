/** Gap between tiles, expressed as a fraction of column width */
const GAP_UNIT = 0.14

export function getItemVisualWeight(item) {
  if (item.width && item.height) {
    return item.height / item.width
  }
  return 1
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

/**
 * Place items into columns using shortest-column balancing
 * with each tile's true aspect ratio (height / width).
 */
export function buildMasonryLayout(items, columnCount) {
  if (!items.length) return []

  const cols = columnCount < 1 ? 1 : columnCount
  const columns = Array.from({ length: cols }, () => ({
    height: 0,
    items: [],
  }))

  items.forEach((item) => {
    const weight = getItemVisualWeight(item) + GAP_UNIT
    let bestCol = 0
    let bestHeight = Infinity

    for (let colIdx = 0; colIdx < cols; colIdx += 1) {
      if (columns[colIdx].height < bestHeight) {
        bestHeight = columns[colIdx].height
        bestCol = colIdx
      }
    }

    columns[bestCol].items.push({ item })
    columns[bestCol].height += weight
  })

  polishColumnEnds(columns)

  return columns
}

/** Move trailing tiles from tallest to shortest column when the gap is large */
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

    const moving = tallCol.items[tallCol.items.length - 1]
    const weight = getItemVisualWeight(moving.item) + GAP_UNIT

    const tallAfter = tallCol.height - weight
    const shortAfter = columns[shortIdx].height + weight
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
