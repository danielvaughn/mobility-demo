import { useContext, useEffect } from 'react'
import { useFlow } from '../../utils/useFlow'
import { GET, PATCH, POST } from '../../utils/api'
import { appContext } from '../../context/AppProvider'
import DashboardUI from './UI'

const DashboardClient = () => {
  const [state, actions] = useFlow(
    {
      isLoading: true,
      showOnlyMine: false,
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
        let status = 'started'
        if (calc.cancalled_at) {
          status = 'cancelled'
        } else if (calc.completed_at) {
          status = 'completed'
        }

        return {
          ...calc,
          status,
        }
      }).sort((a, b) => {
        return new Date(b.started_at) - new Date(a.started_at)
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

    setState({
      draftType: 'blue',
      draftFoo: 0,
      draftBar: 0,
      draftBaz: 0,
    })
  },
  cancelCalculation: async (id) => {
    await PATCH(`calculations/${id}/cancel`)
  },
  logOut: () => {
    const { setAppState } = getContext()

    window.localStorage.removeItem('t')

    setAppState({ isAuthenticated: false })
  },
})

export default DashboardClient
