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
      className="p-3 bg-cyan-500 text-white rounded disabled:opacity-50"
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
