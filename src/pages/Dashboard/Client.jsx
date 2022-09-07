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
      detailId: '',
      draftType: 'blue',
      draftFoo: 0,
      draftBar: 0,
      draftBaz: 0,
      calculations: [],
      hiddenMap: {},
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
  getState, setState, getContext,
}) => ({
  getCalculations: async () => {
    const calculations = await GET('calculations')

    setState({
      isLoading: false,
      calculations: calculations.map((calc) => {
        let status = 'started'
        if (calc.cancelled_at) {
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
  toggleHidden: (id) => {
    const { hiddenMap } = getState()

    if (!id) {
      setState({
        hiddenMap: {},
      })
      return
    }

    const newHiddenMap = {
      ...hiddenMap,
    }

    newHiddenMap[id] = true

    setState({
      hiddenMap: newHiddenMap,
    })
  },
  logOut: () => {
    const { setAppState } = getContext()

    window.localStorage.removeItem('t')

    setAppState({ isAuthenticated: false })
  },
})

export default DashboardClient
