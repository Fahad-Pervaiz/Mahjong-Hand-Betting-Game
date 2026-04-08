import PropTypes from 'prop-types'
import { getTilePresentation } from './tilePresentation'

function TileMiniCard({ tile, value }) {
  const presentation = getTilePresentation(tile)
  return (
    <div className={`mahjong-tile-mini tone-${presentation.tone}`} aria-label={tile.displayName}>
      <span className="mahjong-tile-mini-symbol">{presentation.symbol}</span>
      <span className="mahjong-tile-mini-value">{value}</span>
    </div>
  )
}

TileMiniCard.propTypes = {
  tile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string,
    rank: PropTypes.number,
    suit: PropTypes.string,
  }).isRequired,
  value: PropTypes.number.isRequired,
}

export default TileMiniCard

