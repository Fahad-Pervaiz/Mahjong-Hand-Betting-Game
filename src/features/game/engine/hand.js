import { GAME_CONFIG } from '../config'
import { createBaseTileTypes, buildTileTypeKey } from '../tileCatalog'

const baseTypes = createBaseTileTypes()
const baseValueByKey = baseTypes.reduce((acc, t) => {
  if (t.category === 'number') {
    acc[t.key] = t.rank
  } else {
    acc[t.key] = 5
  }
  return acc
}, {})

export function getInitialDynamicValues() {
  const values = {}
  baseTypes.forEach((t) => {
    if (t.category === 'number') return
    const key = buildTileTypeKey(t)
    values[key] = baseValueByKey[key]
  })
  return values
}

export function getTileValue(tile, dynamicValues) {
  if (tile.category === 'number') {
    return baseValueByKey[tile.key]
  }
  const val = dynamicValues[tile.key]
  return typeof val === 'number' ? val : baseValueByKey[tile.key]
}

export function getHandTotal(hand, dynamicValues) {
  return hand.reduce((sum, tile) => sum + getTileValue(tile, dynamicValues), 0)
}

export function compareHands(a, b, dynamicValues) {
  const totalA = getHandTotal(a, dynamicValues)
  const totalB = getHandTotal(b, dynamicValues)
  if (totalA > totalB) return 1
  if (totalA < totalB) return -1
  return 0
}

export function clampDynamicValue(v) {
  if (v < GAME_CONFIG.minDynamicValue) return GAME_CONFIG.minDynamicValue
  if (v > GAME_CONFIG.maxDynamicValue) return GAME_CONFIG.maxDynamicValue
  return v
}

