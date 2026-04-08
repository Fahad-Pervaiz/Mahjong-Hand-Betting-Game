import PropTypes from 'prop-types'
import TileCard from './TileCard'
import { getTileValue } from '../features/game/engine/hand'

function HandView({ hand, dynamicValues, total, drawCount, discardCount }) {
  return (
    <section aria-label="Current hand" className="panel panel-main hand-panel">
      <header className="panel-header">
        <div className="panel-kicker">First Hand</div>
        <div className="panel-title">Current Hand</div>
      </header>
      <div className="hand-tiles">
        {hand.map((tile) => (
          <TileCard
            key={tile.id}
            tile={tile}
            value={getTileValue(tile, dynamicValues)}
          />
        ))}
      </div>
      <div className="hand-footer">
        <div className="panel-total-wrap">
          <span className="panel-subtitle">Hand Total</span>
          <span className="panel-total">{total}</span>
        </div>
        <div className="pile-counts">
          <span className="pile-pill">Draw Pile: {drawCount}</span>
          <span className="pile-pill">Discard Pile: {discardCount}</span>
        </div>
      </div>
    </section>
  )
}

HandView.propTypes = {
  hand: PropTypes.arrayOf(PropTypes.object).isRequired,
  dynamicValues: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  drawCount: PropTypes.number.isRequired,
  discardCount: PropTypes.number.isRequired,
}

export default HandView

