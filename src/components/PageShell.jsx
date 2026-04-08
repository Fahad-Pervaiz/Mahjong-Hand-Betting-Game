import PropTypes from 'prop-types'

function PageShell({ title, subtitle, right, children }) {
  return (
    <div className="app-root">
      <div className="app-shell game-frame fade-in" role="main">
        <header className="app-shell-header">
          <div>
            <div className="app-shell-title">{title || 'Mahjong Hand Betting'}</div>
            <div className="app-shell-subtitle">{subtitle}</div>
          </div>
          <div>{right}</div>
        </header>
        <div className="app-shell-main">{children}</div>
      </div>
    </div>
  )
}

PageShell.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  right: PropTypes.node,
  children: PropTypes.node,
}

export default PageShell

