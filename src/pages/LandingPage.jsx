import { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import AppButton from '../components/AppButton'
import Leaderboard from '../components/Leaderboard'
import { gameReducer, initialGameState } from '../features/game/reducer'
import { ACTIONS } from '../features/game/actions'
import { loadLeaderboard } from '../app/storage'

function LandingPage() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  useEffect(() => {
    const entries = loadLeaderboard()
    dispatch({ type: ACTIONS.LOAD_LEADERBOARD, payload: { leaderboard: entries } })
  }, [])

  const handleStart = () => {
    navigate('/game')
  }

  return (
    <PageShell
      title="Mahjong Hand Betting"
      subtitle="A polished tabletop prediction game."
    >
      <div className="landing-layout">
        <section className="landing-hero">
          <h1 className="landing-title">Enter The Mahjong Table</h1>
          <p className="landing-lead">
            Read the current hand, predict higher or lower, and outplay shifting
            Wind and Dragon tile values.
          </p>
          <div className="landing-preview-tiles" aria-hidden="true">
            <div className="mahjong-tile-mini tone-bamboo"><span className="mahjong-tile-mini-symbol">6</span><span className="mahjong-tile-mini-value">6</span></div>
            <div className="mahjong-tile-mini tone-characters"><span className="mahjong-tile-mini-symbol">2</span><span className="mahjong-tile-mini-value">2</span></div>
            <div className="mahjong-tile-mini tone-dots"><span className="mahjong-tile-mini-symbol">9</span><span className="mahjong-tile-mini-value">9</span></div>
            <div className="mahjong-tile-mini tone-wind"><span className="mahjong-tile-mini-symbol">東</span><span className="mahjong-tile-mini-value">5</span></div>
            <div className="mahjong-tile-mini tone-red"><span className="mahjong-tile-mini-symbol">中</span><span className="mahjong-tile-mini-value">5</span></div>
          </div>
          <div className="landing-actions">
            <AppButton variant="success" onClick={handleStart}>
              New Game
            </AppButton>
          </div>
          <div className="landing-hint">
            3-tile hands · Number tiles keep their face value · Winds and Dragons
            slide between 0–10 based on wins and losses. The game ends when a tile
            hits the edge or the draw pile exhausts three times.
          </div>
        </section>
        <aside className="landing-side">
          <Leaderboard entries={state.leaderboard} />
        </aside>
      </div>
    </PageShell>
  )
}

export default LandingPage

