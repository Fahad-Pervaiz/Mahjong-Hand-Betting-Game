import { clampDynamicValue } from './hand'

/**
 * Update dynamic values given winning and losing hands.
 * Values are tracked per tile key and shared across copies.
 */
export function updateDynamicValues(prevValues, winningHand, losingHand) {
  const next = { ...prevValues }

  const incrementKeys = new Set()
  const decrementKeys = new Set()

  winningHand.forEach((tile) => {
    if (tile.category === 'number') return
    incrementKeys.add(tile.key)
  })

  losingHand.forEach((tile) => {
    if (tile.category === 'number') return
    decrementKeys.add(tile.key)
  })

  incrementKeys.forEach((key) => {
    const current = typeof next[key] === 'number' ? next[key] : 5
    next[key] = clampDynamicValue(current + 1)
  })

  decrementKeys.forEach((key) => {
    const current = typeof next[key] === 'number' ? next[key] : 5
    next[key] = clampDynamicValue(current - 1)
  })

  return next
}

