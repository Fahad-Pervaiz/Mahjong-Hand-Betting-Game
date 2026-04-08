import PropTypes from 'prop-types'
import { getTilePresentation } from './tilePresentation'

function TileCard({ tile, value }) {
  // UI-only mapper: converts raw tile data into symbols/labels for display.
  const presentation = getTilePresentation(tile)

  return (
    <div
      className={`mahjong-tile tile-pop tone-${presentation.tone}`}
      aria-label={tile.displayName}
    >
      <div className="mahjong-face">
        <div className={`mahjong-symbol ${presentation.kind}`}>{presentation.symbol}</div>
        <div className="mahjong-sub-label">{presentation.subLabel}</div>
        <div className="mahjong-pip">★</div>
      </div>
      <div className="mahjong-value-chip">{value}</div>
    </div>
  )
}

TileCard.propTypes = {
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

export default TileCard

