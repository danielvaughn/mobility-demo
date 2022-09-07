import { useContext } from 'react'
import { useFlow } from '../../utils/useFlow'
import { POST } from '../../utils/api'
import { appContext } from '../../context/AppProvider'
import LoginUI from './UI'

const LoginClient = () => {
  const [state, actions] = useFlow(
    {
      username: '',
      password: '',
      isLoggingIn: false,
      errorMessage: '',
    },
    loginActions,
    useContext(appContext),
  )

  return (
    <LoginUI {...state} {...actions} />
  )
}

const loginActions = ({ getState, setState, getContext }) => ({
  logIn: async () => {
    const { username, password } = getState()

    if (!username && !password) {
      return
    }

    setState({ isLoggingIn: true })

    try {
      const loginResponse = await POST('login', { username, password })
      window.localStorage.setItem('t', loginResponse.token)

      const { setAppState } = getContext()

      setAppState({
        isAuthenticated: true,
      })
    } catch (error) {
      // TODO
    }
  },
})

export default LoginClient
