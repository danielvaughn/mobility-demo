import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useFlow } from '../../utils/useFlow'
import { GET } from '../../utils/api'
import CalculationDetailUI from './UI'

const CalculationDetailClient = () => {
  const { calculationId } = useParams()
  const navigate = useNavigate()

  const [state, actions] = useFlow(
    {
      id: calculationId,
      isLoading: true,
      values: [],
      maxValue: 0,
      minValue: 0,
    },
    calculationDetailActions,
    {
      navigate,
    },
  )

  useEffect(() => {
    const interval = window.setInterval(actions.getDetails, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <CalculationDetailUI
      {...state}
      {...actions}
    />
  )
}

export const calculationDetailActions = ({ getState, setState, getContext }) => ({
  getDetails: async () => {
    const { id } = getState()

    const details = await GET(`calculations/${id}`)

    let maxValue = 0
    let minValue = 0

    const values = details.values.map((value, i) => {
      if (i % 25 !== 0) {
        return null
      }

      maxValue = Math.max(maxValue, value)
      minValue = Math.min(minValue, value)

      return {
        x: i + 1,
        y: value,
      }
    }).filter((value) => value !== null)

    setState({
      values,
      maxValue,
      minValue,
      isLoading: false,
    })
  },
  onClose: () => {
    const { navigate } = getContext()

    navigate('/dashboard')
  },
})

export default CalculationDetailClient
