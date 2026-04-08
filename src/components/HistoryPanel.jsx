import PropTypes from 'prop-types'
import TileMiniCard from './TileMiniCard'
import { getTileValue } from '../features/game/engine/hand'

function HistoryPanel({ rounds, dynamicValues }) {
  if (!rounds.length) {
    return (
      <section className="panel panel-secondary history-panel" aria-label="History">
        <header className="panel-header">
          <div className="panel-title">History</div>
          <div className="panel-subtitle">Rounds will appear here</div>
        </header>
        <div className="history-empty">Your round timeline appears after the first bet.</div>
      </section>
    )
  }

  return (
    <section className="panel panel-secondary history-panel" aria-label="History">
      <header className="panel-header">
        <div className="panel-title">Round History</div>
        <div className="panel-subtitle">Newest first</div>
      </header>
      <div className="history-list">
        {rounds.map((round) => (
          <article key={round.roundNumber} className="history-row">
            <div className="history-meta">
              <span className="badge-round">R{round.roundNumber}</span>
              <span className={`badge-outcome outcome-${round.outcome}`}>
                {round.outcome.toUpperCase()}
              </span>
              <span className="history-bet">
                Bet: {round.betDirection === 'higher' ? 'Higher' : 'Lower'}
              </span>
            </div>
            <div className="history-hands">
              <div className="history-hand" aria-label="Previous hand">
                {round.currentHand.map((tile) => (
                  <TileMiniCard
                    key={tile.id}
                    tile={tile}
                    value={getTileValue(tile, dynamicValues)}
                  />
                ))}
                <span className="history-total">Total: {round.previousTotal}</span>
              </div>
              <div className="history-hand" aria-label="New hand">
                {round.nextHand.map((tile) => (
                  <TileMiniCard
                    key={tile.id}
                    tile={tile}
                    value={getTileValue(tile, dynamicValues)}
                  />
                ))}
                <span className="history-total">Total: {round.nextTotal}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

HistoryPanel.propTypes = {
  rounds: PropTypes.arrayOf(PropTypes.object).isRequired,
  dynamicValues: PropTypes.object.isRequired,
}

export default HistoryPanel

