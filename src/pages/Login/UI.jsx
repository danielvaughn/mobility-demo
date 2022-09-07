import { func, string } from 'prop-types'
import Input from '../../components/Input'
import Layout from '../../components/Layout'
import Button from '../../components/Button'

const LoginUI = ({
  username, password, setState, logIn,
}) => {
  const canLogIn = Boolean(username) && Boolean(password)

  return (
    <Layout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          logIn()
        }}
      >
        <div className="w-full flex flex-col gap-5 py-5">
          <Input
            label="Username"
            type="text"
            onChange={(e) => setState({ username: e.target.value })}
          />

          <Input
            label="Password"
            type="password"
            onChange={(e) => setState({ password: e.target.value })}
          />

          <Button
            type="submit"
            disabled={!canLogIn}
          >
            Log In
          </Button>
        </div>
      </form>
    </Layout>
  )
}

LoginUI.propTypes = {
  username: string.isRequired,
  password: string.isRequired,
  setState: func.isRequired,
  logIn: func.isRequired,
}

export default LoginUI
