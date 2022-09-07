import { func, string } from 'prop-types'
import Input from '../../components/Input'
import Button from '../../components/Button'

const LoginUI = ({
  username, password, errorMessage, setState, logIn,
}) => {
  const canLogIn = Boolean(username) && Boolean(password)

  return (
    <section className="h-full max-w-xl mx-auto px-5">
      <h1 className="text-2xl font-semibold text-slate-900 pt-20 pb-10">Welcome back. Please log in.</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          logIn()
        }}
      >
        <div className="w-full flex flex-col gap-5">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setState({ username: e.target.value })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setState({ password: e.target.value })}
          />

          <Button
            type="submit"
            disabled={!canLogIn}
          >
            Log In
          </Button>

          {errorMessage !== '' && (
            <p className="text-red-500 text-sm italic">{errorMessage}</p>
          )}
        </div>
      </form>
    </section>
  )
}

LoginUI.propTypes = {
  username: string.isRequired,
  password: string.isRequired,
  errorMessage: string.isRequired,
  setState: func.isRequired,
  logIn: func.isRequired,
}

export default LoginUI
