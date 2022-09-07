import { useContext, useEffect } from 'react'
import { useFlow } from '../../utils/useFlow'
import { appContext } from '../../context/AppProvider'
import DashboardUI from './UI'

const DashboardClient = () => {
  const [state, actions] = useFlow(
    {
      calculations: [],
    },
    dashboardActions,
    useContext(appContext),
  )

  useEffect(() => {
    actions.init()
  }, [])

  return (
    <DashboardUI {...state} {...actions} />
  )
}

export const dashboardActions = () => ({
  init: async () => {

  },
})

export default DashboardClient
