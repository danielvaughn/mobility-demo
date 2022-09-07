import classNames from 'classnames'
import { any, oneOf, string } from 'prop-types'

const Button = ({
  children,
  type,
  size,
  bgColor,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={classNames(
        'text-white rounded max-w-xs disabled:opacity-50 transition flex items-center',
        bgColor,
        {
          'py-1 px-3 text-xs': size === 'small',
          'py-3 px-6 text-base': size === 'medium',
        },
      )}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: oneOf(['submit', 'button', 'reset']).isRequired,
  size: oneOf(['small', 'medium', 'large']),
  bgColor: string,
  children: any.isRequired,
}

Button.defaultProps = {
  size: 'medium',
  bgColor: 'bg-cyan-500',
}

export default Button
