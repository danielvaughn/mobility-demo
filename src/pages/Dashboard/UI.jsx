import {
  arrayOf, bool, func, number, object, shape, string,
} from 'prop-types'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import './Dashboard.css'

const DashboardUI = ({ isLoading, calculations, logOut }) => {
  return (
    <section className="text-slate-900 h-full flex flex-col">
      <header className="p-5 bg-white border-b border-slate-300 shadow flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Dashboard</h1>
        <Button
          type="button"
          onClick={logOut}
        >
          Log Out
        </Button>
      </header>

      <div className="h-full overflow-x-hidden flex-grow relative p-5">
        {isLoading && (
          <Loader />
        )}

        {!isLoading && (
          <table className="text-left max-w-4xl mx-auto px-5">
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {calculations.map((calc) => (
                <tr
                  key={calc.id}
                >
                  <td className="pr-5">
                    <div className="flex items-center">
                      <span
                        className="block w-4 h-4 rounded-full mr-2"
                        style={{
                          backgroundColor: calc.calc_type,
                        }}
                      />
                      {calc.id}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <progress
                        id={`progress-${calc.id}`}
                        value={calc.fraction_complete}
                        max={1}
                        className="progress-bar"
                      />
                      <label
                        htmlFor={`progress-${calc.id}`}
                        className="text-xs text-slate-500 ml-2"
                      >
                        {calc.fraction_complete_parsed}
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

DashboardUI.propTypes = {
  isLoading: bool.isRequired,
  logOut: func.isRequired,
  calculations: arrayOf(shape({
    id: string,
    bar: number,
    baz: number,
    calc_type: string,
    started_at: string,
    cancelled_at: string,
    completed_at: string,
    error: object,
    foo: number,
    fraction_complete: number,
    fraction_complete_parsed: string,
    mine: bool,
    value: number,
    values_per_second: number,
  })).isRequired,
}

export default DashboardUI
