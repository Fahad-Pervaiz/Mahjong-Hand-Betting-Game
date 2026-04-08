import PropTypes from 'prop-types'

function RoundResultBanner({ result, previousTotal, nextTotal }) {
  if (!result) {
    return (
      <section className="result-banner" aria-live="polite">
        Place a bet to reveal the next hand.
      </section>
    )
  }

  const resultText = result === 'win' ? 'Correct Guess' : result === 'loss' ? 'Missed Guess' : 'Push'
  const trend =
    nextTotal > previousTotal ? 'Higher' : nextTotal < previousTotal ? 'Lower' : 'Tie'

  return (
    <section className={`result-banner result-${result}`} aria-live="polite">
      <strong>{resultText}</strong> - New hand is {nextTotal} ({trend}) vs {previousTotal}
    </section>
  )
}

RoundResultBanner.propTypes = {
  result: PropTypes.oneOf(['win', 'loss', 'tie', null]),
  previousTotal: PropTypes.number,
  nextTotal: PropTypes.number,
}

export default RoundResultBanner

