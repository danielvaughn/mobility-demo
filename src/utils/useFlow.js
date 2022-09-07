import { useState, useEffect } from 'react'
import produce from 'immer'

export const useFlow = (state, actions = null, context = {}) => {
  const [flowState, setFlowState] = useState(state)

  const getState = () => flowState
  const setState = (statePartial) => {
    const modifier = (draft) => {
      Object.keys(statePartial).forEach((key) => {
        draft[key] = statePartial[key]
      })
    }
    const newState = produce({}, modifier)

    setFlowState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }

  const getContext = () => ({ ...context })

  let flowActions = null

  const getActions = () => flowActions

  if (typeof actions === 'function') {
    flowActions = {
      ...actions({
        getState, setState, getContext, getActions,
      }),
      setState,
    }
  } else {
    flowActions = setState
  }

  useEffect(() => {
    if (flowActions === null) {
      return
    }

    if (typeof flowActions.init === 'function') {
      flowActions.init()
    }

    if (typeof flowActions.destroy === 'function') {
      return flowActions.destroy
    }
  }, [])

  return [
    flowState,
    flowActions,
    getContext(),
  ]
}
