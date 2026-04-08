import { GAME_CONFIG, SCORING_REASONS } from '../config'

export function checkDynamicValueGameOver(dynamicValues) {
  let minHitKey = null
  let maxHitKey = null

  Object.entries(dynamicValues).forEach(([key, value]) => {
    if (value <= GAME_CONFIG.minDynamicValue) {
      minHitKey = key
    }
    if (value >= GAME_CONFIG.maxDynamicValue) {
      maxHitKey = key
    }
  })

  if (minHitKey) {
    return {
      isOver: true,
      reason: SCORING_REASONS.TILE_VALUE_MIN,
      detail: minHitKey,
    }
  }

  if (maxHitKey) {
    return {
      isOver: true,
      reason: SCORING_REASONS.TILE_VALUE_MAX,
      detail: maxHitKey,
    }
  }

  return { isOver: false, reason: null, detail: null }
}

