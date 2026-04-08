import { buildDeck } from './buildDeck'
import { shuffle } from './shuffle'
import { GAME_CONFIG } from '../config'

/**
 * Draw N tiles, applying reshuffle rules when needed.
 * Returns { hand, nextDrawPile, nextDiscardPile, reshuffleCount, exhaustedThisRound, gameOverReason }
 */
export function drawHandWithReshuffle(state, tilesNeeded) {
  let drawPile = state.drawPile.slice()
  let discardPile = state.discardPile.slice()
  let reshuffleCount = state.reshuffleCount
  let exhaustedThisRound = false
  let gameOverReason = null

  if (drawPile.length < tilesNeeded) {
    reshuffleCount += 1
    exhaustedThisRound = true
    if (reshuffleCount > GAME_CONFIG.maxReshuffles) {
      gameOverReason = 'Draw pile exhausted maximum times.'
      return {
        hand: [],
        nextDrawPile: drawPile,
        nextDiscardPile: discardPile,
        reshuffleCount,
        exhaustedThisRound,
        gameOverReason,
      }
    }
    const freshDeck = shuffle(buildDeck())
    drawPile = shuffle([...drawPile, ...discardPile, ...freshDeck])
    discardPile = []
  }

  const hand = drawPile.slice(0, tilesNeeded)
  const nextDrawPile = drawPile.slice(tilesNeeded)

  return {
    hand,
    nextDrawPile,
    nextDiscardPile: discardPile,
    reshuffleCount,
    exhaustedThisRound,
    gameOverReason,
  }
}

