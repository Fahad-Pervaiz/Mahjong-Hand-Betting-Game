import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import AppButton from '../components/AppButton'
import Leaderboard from '../components/Leaderboard'
import { loadLeaderboard, loadLastSummary } from '../app/storage'

function SummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [leaderboard, setLeaderboard] = useState([])
  const summary = location.state?.summary || loadLastSummary()

  useEffect(() => {
    setLeaderboard(loadLeaderboard())
  }, [])

  if (!summary) {
    return (
      <PageShell subtitle="Game summary">
        <p>There is no completed game to summarize. Start a new game.</p>
        <AppButton variant="primary" onClick={() => navigate('/')}>
          Back to landing
        </AppButton>
      </PageShell>
    )
  }

  return (
    <PageShell title="Game Over" subtitle="Final score and game over reason.">
      <section className="panel panel-main summary-panel fade-in">
        <header className="panel-header">
          <div className="panel-title">Game Over</div>
          <div className="panel-subtitle">{summary.reason}</div>
        </header>
        <div className="summary-grid">
          <div className="summary-stat">
            <div className="summary-label">Final Score</div>
            <div className="summary-value">{summary.finalScore}</div>
          </div>
          <div className="summary-stat">
            <div className="summary-label">Rounds Played</div>
            <div className="summary-value">{summary.rounds}</div>
          </div>
          <div className="summary-stat">
            <div className="summary-label">Reshuffles</div>
            <div className="summary-value">{summary.reshuffles}</div>
          </div>
        </div>
        <div className="summary-actions">
          <AppButton variant="success" onClick={() => navigate('/game')}>
            Play Again
          </AppButton>
          <AppButton variant="ghost" onClick={() => navigate('/')}>
            Back to Landing
          </AppButton>
        </div>
      </section>
      <section className="summary-leaderboard-wrap">
        <Leaderboard entries={leaderboard} />
      </section>
    </PageShell>
  )
}

export default SummaryPage

