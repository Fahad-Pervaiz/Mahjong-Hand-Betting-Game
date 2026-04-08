/**
 * Central configuration for game rules and tunable knobs.
 */
export const GAME_CONFIG = {
  handSize: 3,
  maxReshuffles: 3,
  minDynamicValue: 0,
  maxDynamicValue: 10,
  /**
   * Score delta per outcome.
   */
  scoring: {
    win: 1,
    loss: 0,
    tie: 0,
  },
}

export const SCORING_REASONS = {
  DRAW_PILE_EXHAUSTED: 'Draw pile ran out for the third time.',
  TILE_VALUE_MIN: 'A tile value dropped to the minimum.',
  TILE_VALUE_MAX: 'A tile value reached the maximum.',
}

