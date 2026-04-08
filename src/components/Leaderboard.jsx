import PropTypes from 'prop-types'

function Leaderboard({ entries }) {
  if (!entries.length) {
    return (
      <div className="panel panel-secondary leaderboard-card">
        <header className="panel-header">
          <div className="panel-title">Top 5 Leaderboard</div>
          <div className="panel-subtitle">No games played yet.</div>
        </header>
      </div>
    )
  }

  return (
    <div className="panel panel-secondary leaderboard-card">
      <header className="panel-header">
        <div className="panel-title">Top 5 Leaderboard</div>
        <div className="panel-subtitle">Best scores on this device</div>
      </header>
      <ol className="leaderboard-list">
        {entries.map((entry, index) => (
          <li key={`${entry.timestamp}-${index}`} className="leaderboard-row">
            <span className="leaderboard-rank">{index + 1}</span>
            <span className="leaderboard-score">{entry.score}</span>
            <span className="leaderboard-meta">
              {entry.rounds} rounds ·{' '}
              {new Date(entry.timestamp).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

Leaderboard.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      rounds: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default Leaderboard

