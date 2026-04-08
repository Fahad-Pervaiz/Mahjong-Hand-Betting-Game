import { GAME_CONFIG } from '../config'

export function applyScore(score, outcome) {
  if (outcome === 'win') {
    return score + GAME_CONFIG.scoring.win
  }
  if (outcome === 'loss') {
    return score + GAME_CONFIG.scoring.loss
  }
  return score + GAME_CONFIG.scoring.tie
}

