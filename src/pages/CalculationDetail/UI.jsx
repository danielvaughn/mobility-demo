import { LineCanvas } from '@nivo/line'
import {
  number, arrayOf, func, shape, bool,
} from 'prop-types'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Loader from '../../components/Loader'

const CalculationDetailUI = ({
  isLoading, maxValue, minValue, values, onClose,
}) => {
  return (
    <div
      className="inset-0 absolute bg-opacity-30 bg-slate-900 h-full w-full flex justify-center items-center"
      onClick={onClose}
    >
      <section
        className="bg-white rounded shadow p-5"
        onClick={(e) => {
          // Prevent the modal from closing
          e.stopPropagation()
        }}
      >
        <header className="flex items-center justify-between">
          <h2>Calculation Details</h2>
          <button
            type="button"
            className="rounded-full"
            onClick={onClose}
          >
            <AiOutlineCloseCircle />
          </button>
        </header>

        <div className="w-[400px] h-[300px]">
          {isLoading && (
            <Loader />
          )}

          {!isLoading && (
          <LineCanvas
            height={300}
            width={400}
            data={[{
              id: 'values',
              data: values,
            }]}
            margin={{
              top: 20, right: 20, bottom: 20, left: 30,
            }}
            yScale={{
              type: 'linear', stacked: true, min: minValue, max: maxValue,
            }}
            yFormat=" >-.2f"
            xFormat=" >-,"
            curve="monotoneX"
            axisTop={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisBottom={null}
            enableGridX={false}
            colors={{ scheme: 'spectral' }}
            lineWidth={1}
            pointSize={4}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={1}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh
          />
          )}
        </div>
      </section>
    </div>
  )
}

CalculationDetailUI.propTypes = {
  isLoading: bool.isRequired,
  maxValue: number.isRequired,
  minValue: number.isRequired,
  values: arrayOf(shape({
    x: number,
    y: number,
  })).isRequired,
  onClose: func.isRequired,
}

export default CalculationDetailUI
