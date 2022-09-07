import { func } from 'prop-types'
import Layout from '../../components/Layout'

const LoginUI = ({ setState, logIn }) => {
  return (
    <Layout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          logIn()
        }}
      >
        <label htmlFor="username">
          Username

          <input
            id="username"
            type="text"
            onChange={(e) => setState({ username: e.target.value })}
          />
        </label>

        <label htmlFor="username">
          Password

          <input
            id="username"
            type="password"
            onChange={(e) => setState({ password: e.target.value })}
          />
        </label>

        <button type="submit">Log In</button>
      </form>
    </Layout>
  )
}

LoginUI.propTypes = {
  setState: func.isRequired,
  logIn: func.isRequired,
}

export default LoginUI
