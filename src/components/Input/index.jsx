import { string } from 'prop-types'

const Input = ({ label, ...props }) => {
  return (
    <label
      htmlFor={label}
      className="text-slate-900"
    >
      <strong className="font-semibold block mb-1">
        {label}
      </strong>

      <input
        id={label}
        {...props}
        className="rounded p-2 border border-slate-200 w-full focus:outline-cyan-500"
      />
    </label>
  )
}

Input.propTypes = {
  label: string.isRequired,
}

export default Input
