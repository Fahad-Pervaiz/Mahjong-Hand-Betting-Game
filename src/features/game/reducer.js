import { ACTIONS } from './actions'
import { GAME_CONFIG, SCORING_REASONS } from './config'
import { buildDeck } from './engine/buildDeck'
import { shuffle } from './engine/shuffle'
import { drawHandWithReshuffle } from './engine/draw'
import { compareHands, getHandTotal, getInitialDynamicValues } from './engine/hand'
import { updateDynamicValues } from './engine/updateTileValues'
import { checkDynamicValueGameOver } from './engine/gameOver'
import { applyScore } from './engine/scoring'

export const initialGameState = {
  status: 'landing',
  score: 0,
  roundNumber: 0,
  currentHand: [],
  lastHandTotal: 0,
  previousRounds: [],
  drawPile: [],
  discardPile: [],
  dynamicTileValues: getInitialDynamicValues(),
  reshuffleCount: 0,
  leaderboard: [],
  lastRoundResult: null,
  lastGameSummary: null,
}

// Initializes a brand new playable session.
function startNewGame(state) {
  const baseDeck = buildDeck()
  const shuffled = shuffle(baseDeck)
  const {
    hand,
    nextDrawPile,
    nextDiscardPile,
    reshuffleCount,
  } = drawHandWithReshuffle(
    {
      drawPile: shuffled,
      discardPile: [],
      reshuffleCount: 0,
    },
    GAME_CONFIG.handSize,
  )

  const handTotal = getHandTotal(hand, state.dynamicTileValues)

  return {
    ...state,
    status: 'playing',
    score: 0,
    roundNumber: 1,
    currentHand: hand,
    lastHandTotal: handTotal,
    previousRounds: [],
    drawPile: nextDrawPile,
    discardPile: nextDiscardPile,
    reshuffleCount,
    lastRoundResult: null,
    lastGameSummary: null,
  }
}

// One full round: draw next hand -> compare -> update score/tiles -> maybe game over.
function resolveRound(state, betDirection) {
  const {
    hand: nextHand,
    nextDrawPile,
    nextDiscardPile,
    reshuffleCount,
    exhaustedThisRound,
    gameOverReason: drawGameOverReason,
  } = drawHandWithReshuffle(state, GAME_CONFIG.handSize)

  if (drawGameOverReason) {
    const summary = {
      finalScore: state.score,
      rounds: state.roundNumber,
      reason: SCORING_REASONS.DRAW_PILE_EXHAUSTED,
      reshuffles: reshuffleCount,
      timestamp: new Date().toISOString(),
    }
    return {
      ...state,
      status: 'gameover',
      lastGameSummary: summary,
      reshuffleCount,
    }
  }

  const cmp = compareHands(state.currentHand, nextHand, state.dynamicTileValues)
  let outcome = 'tie'
  if (cmp < 0 && betDirection === 'higher') outcome = 'win'
  if (cmp > 0 && betDirection === 'lower') outcome = 'win'
  if (cmp < 0 && betDirection === 'lower') outcome = 'loss'
  if (cmp > 0 && betDirection === 'higher') outcome = 'loss'

  let dynamicTileValues = state.dynamicTileValues
  if (outcome === 'win') {
    const winningHand =
      cmp < 0 ? nextHand : state.currentHand
    const losingHand =
      cmp < 0 ? state.currentHand : nextHand
    dynamicTileValues = updateDynamicValues(
      state.dynamicTileValues,
      winningHand,
      losingHand,
    )
  }

  const nextScore = applyScore(state.score, outcome)

  const nextRound = {
    roundNumber: state.roundNumber,
    previousTotal: state.lastHandTotal,
    nextTotal: getHandTotal(nextHand, dynamicTileValues),
    betDirection,
    outcome,
    currentHand: state.currentHand,
    nextHand,
  }

  const dynamicOver = checkDynamicValueGameOver(dynamicTileValues)
  const finishedByReshuffles =
    exhaustedThisRound && reshuffleCount >= GAME_CONFIG.maxReshuffles

  let status = state.status
  let lastGameSummary = state.lastGameSummary

  if (dynamicOver.isOver || finishedByReshuffles) {
    status = 'gameover'
    lastGameSummary = {
      finalScore: nextScore,
      rounds: state.roundNumber,
      reason: dynamicOver.isOver
        ? dynamicOver.reason
        : SCORING_REASONS.DRAW_PILE_EXHAUSTED,
      detail: dynamicOver.detail || null,
      reshuffles: reshuffleCount,
      timestamp: new Date().toISOString(),
    }
  }

  return {
    ...state,
    status,
    score: nextScore,
    roundNumber: status === 'gameover' ? state.roundNumber : state.roundNumber + 1,
    currentHand: status === 'gameover' ? state.currentHand : nextHand,
    lastHandTotal: getHandTotal(nextHand, dynamicTileValues),
    previousRounds: [nextRound, ...state.previousRounds],
    drawPile: nextDrawPile,
    discardPile: [...state.discardPile, ...state.currentHand],
    dynamicTileValues,
    reshuffleCount,
    lastRoundResult: outcome,
    lastGameSummary,
  }
}

export function gameReducer(state, action) {
  // Reducer is pure: same input state + action => same output state.
  switch (action.type) {
    case ACTIONS.START_GAME:
      return startNewGame(state)
    case ACTIONS.RESOLVE_ROUND:
      return resolveRound(state, action.payload.betDirection)
    case ACTIONS.EXIT_TO_LANDING:
      return {
        ...state,
        status: 'landing',
      }
    case ACTIONS.LOAD_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload.leaderboard || [],
      }
    case ACTIONS.SAVE_SCORE: {
      const newEntry = action.payload.entry
      const combined = [...state.leaderboard, newEntry].sort(
        (a, b) => b.score - a.score,
      )
      return {
        ...state,
        leaderboard: combined.slice(0, 5),
      }
    }
    case ACTIONS.RESET_SESSION:
      return {
        ...initialGameState,
        leaderboard: state.leaderboard,
      }
    default:
      return state
  }
}

