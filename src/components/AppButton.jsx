import PropTypes from 'prop-types'

function AppButton({ variant = 'primary', children, ...rest }) {
  return (
    <button
      className={`app-button app-button-${variant} button-press`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}

AppButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'ghost', 'danger', 'success']),
  children: PropTypes.node.isRequired,
}

export default AppButton

