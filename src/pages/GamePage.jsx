import { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import AppButton from '../components/AppButton'
import HandView from '../components/HandView'
import HistoryPanel from '../components/HistoryPanel'
import GameHeader from '../components/GameHeader'
import BetControls from '../components/BetControls'
import RoundResultBanner from '../components/RoundResultBanner'
import { gameReducer, initialGameState } from '../features/game/reducer'
import { ACTIONS } from '../features/game/actions'
import { getHandTotal } from '../features/game/engine/hand'
import { loadLeaderboard, saveLeaderboard, saveLastSummary } from '../app/storage'

function GamePage() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  useEffect(() => {
    // Start a fresh game when this page mounts.
    dispatch({ type: ACTIONS.START_GAME })
  }, [])

  useEffect(() => {
    if (state.status === 'gameover') {
      if (state.lastGameSummary) {
        const entry = {
          score: state.lastGameSummary.finalScore,
          rounds: state.lastGameSummary.rounds,
          timestamp: state.lastGameSummary.timestamp || new Date().toISOString(),
        }
        const nextBoard = [...loadLeaderboard(), entry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
        saveLeaderboard(nextBoard)
        saveLastSummary(state.lastGameSummary)
      }
      navigate('/summary', { state: { summary: state.lastGameSummary } })
    }
  }, [state.status, state.lastGameSummary, navigate])

  const handleBet = (direction) => {
    if (state.status !== 'playing') return
    // dispatch tells reducer to run one complete betting round.
    dispatch({
      type: ACTIONS.RESOLVE_ROUND,
      payload: { betDirection: direction },
    })
  }

  const handleExit = () => {
    navigate('/')
  }

  const handTotal = getHandTotal(state.currentHand, state.dynamicTileValues)

  return (
    <PageShell
      title="Mahjong Hand Betting"
      subtitle="Bet higher or lower on the next Mahjong hand."
      right={
        <AppButton variant="ghost" onClick={handleExit} aria-label="Exit to landing">
          Exit to Menu
        </AppButton>
      }
    >
      <GameHeader
        score={state.score}
        roundNumber={state.roundNumber}
        drawCount={state.drawPile.length}
        discardCount={state.discardPile.length}
        reshuffles={state.reshuffleCount}
      />
      <div className="app-grid">
        <HandView
          hand={state.currentHand}
          dynamicValues={state.dynamicTileValues}
          total={handTotal}
          drawCount={state.drawPile.length}
          discardCount={state.discardPile.length}
        />
        <HistoryPanel
          rounds={state.previousRounds}
          dynamicValues={state.dynamicTileValues}
        />
      </div>
      <BetControls onHigher={() => handleBet('higher')} onLower={() => handleBet('lower')} />
      <RoundResultBanner
        result={state.lastRoundResult}
        previousTotal={state.previousRounds[0]?.previousTotal}
        nextTotal={state.previousRounds[0]?.nextTotal}
      />
    </PageShell>
  )
}

export default GamePage

