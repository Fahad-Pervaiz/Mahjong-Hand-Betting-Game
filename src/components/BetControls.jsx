import PropTypes from 'prop-types'
import AppButton from './AppButton'

function BetControls({ onHigher, onLower }) {
  return (
    <section className="bet-controls" aria-label="Bet controls">
      <AppButton
        variant="success"
        onClick={onHigher}
        aria-label="Bet that next hand will be higher"
      >
        Bet Higher
      </AppButton>
      <AppButton
        variant="danger"
        onClick={onLower}
        aria-label="Bet that next hand will be lower"
      >
        Bet Lower
      </AppButton>
    </section>
  )
}

BetControls.propTypes = {
  onHigher: PropTypes.func.isRequired,
  onLower: PropTypes.func.isRequired,
}

export default BetControls

