import { useFlow } from '../../utils/useFlow'
import { POST } from '../../utils/api'
import LoginUI from './UI'

const LoginClient = () => {
  const [state, actions] = useFlow({
    username: '',
    password: '',
    isLoggingIn: false,
    errorMessage: '',
  }, loginActions)

  return (
    <LoginUI {...state} {...actions} />
  )
}

const loginActions = ({ getState, setState }) => ({
  logIn: async () => {
    const { username, password } = getState()

    if (!username && !password) {
      return
    }

    setState({ isLoggingIn: true })

    try {
      const loginResponse = await POST('login', { username, password })
      window.localStorage.setItem('t', loginResponse.token)
    } catch (error) {
      // TODO
    }
  },
})

export default LoginClient
