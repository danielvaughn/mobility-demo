import { useContext, useEffect } from 'react'
import { useFlow } from '../../utils/useFlow'
import { GET, POST } from '../../utils/api'
import { appContext } from '../../context/AppProvider'
import DashboardUI from './UI'

const DashboardClient = () => {
  const [state, actions] = useFlow(
    {
      isLoading: true,
      draftType: 'blue',
      draftFoo: 0,
      draftBar: 0,
      draftBaz: 0,
      calculations: [],
    },
    dashboardActions,
    useContext(appContext),
  )

  useEffect(() => {
    const interval = window.setInterval(actions.getCalculations, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <DashboardUI {...state} {...actions} />
  )
}

export const dashboardActions = ({
  getState, setState, getActions, getContext,
}) => ({
  init: async () => {
    const { getCalculations } = getActions()
    getCalculations()
  },
  getCalculations: async () => {
    const calculations = await GET('calculations')

    setState({
      isLoading: false,
      calculations: calculations.map((calc) => {
        return {
          ...calc,
        }
      }),
    })
  },
  createCalculation: async () => {
    const {
      draftType, draftFoo, draftBar, draftBaz,
    } = getState()

    await POST('calculations', {
      calc_type: draftType,
      foo: draftFoo,
      bar: draftBar,
      baz: draftBaz,
    })
  },
  logOut: () => {
    const { setAppState } = getContext()

    window.localStorage.removeItem('t')

    setAppState({ isAuthenticated: false })
  },
})

export default DashboardClient
