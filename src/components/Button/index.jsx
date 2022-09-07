import { any, oneOf } from 'prop-types'

const Button = ({
  children,
  type,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className="py-3 px-6 bg-cyan-500 text-white rounded max-w-xs disabled:opacity-50 transition hover:bg-cyan-600"
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: oneOf(['submit', 'button', 'reset']).isRequired,
  children: any.isRequired,
}

export default Button
