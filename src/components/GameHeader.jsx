import PropTypes from 'prop-types'

function GameHeader({ score, roundNumber, drawCount, discardCount, reshuffles }) {
  return (
    <section className="stats-bar panel panel-secondary" aria-label="Game statistics">
      <div className="stat hud-chip">
        <span className="stat-label">Score</span>
        <span className="stat-value">{score}</span>
      </div>
      <div className="stat hud-chip">
        <span className="stat-label">Round</span>
        <span className="stat-value">{roundNumber}</span>
      </div>
      <div className="stat hud-chip">
        <span className="stat-label">Draw pile</span>
        <span className="stat-value">{drawCount}</span>
      </div>
      <div className="stat hud-chip">
        <span className="stat-label">Discard</span>
        <span className="stat-value">{discardCount}</span>
      </div>
      <div className="stat hud-chip">
        <span className="stat-label">Reshuffles</span>
        <span className="stat-value">{reshuffles}</span>
      </div>
    </section>
  )
}

GameHeader.propTypes = {
  score: PropTypes.number.isRequired,
  roundNumber: PropTypes.number.isRequired,
  drawCount: PropTypes.number.isRequired,
  discardCount: PropTypes.number.isRequired,
  reshuffles: PropTypes.number.isRequired,
}

export default GameHeader

