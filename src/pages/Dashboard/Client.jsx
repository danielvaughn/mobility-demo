import { useContext, useEffect } from 'react'
import { useFlow } from '../../utils/useFlow'
import { GET } from '../../utils/api'
import { appContext } from '../../context/AppProvider'
import DashboardUI from './UI'

const DashboardClient = () => {
  const [state, actions] = useFlow(
    {
      isLoading: true,
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

export const dashboardActions = ({ setState, getActions, getContext }) => ({
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
          fraction_complete_parsed: `${parseFloat(calc.fraction_complete).toFixed(2)}%`,
        }
      }),
    })
  },
  logOut: () => {
    const { setAppState } = getContext()

    window.localStorage.removeItem('t')

    setAppState({ isAuthenticated: false })
  },
})

export default DashboardClient
