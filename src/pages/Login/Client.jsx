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
    const { setAppState } = getContext()

    if (!username && !password) {
      return
    }

    setState({ isLoggingIn: true })

    try {
      const loginResponse = await POST('login', { username, password })
      if (loginResponse.token) {
        window.localStorage.setItem('t', loginResponse.token)

        setAppState({
          isAuthenticated: true,
        })
      }
    } catch (error) {
      setState({ errorMessage: error.message })
    }
  },
})

export default LoginClient
