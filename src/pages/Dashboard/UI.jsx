import {
  any,
  arrayOf, bool, func, number, object, objectOf, oneOf, shape, string,
} from 'prop-types'
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Outlet } from 'react-router'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import './Dashboard.css'

const DashboardUI = ({
  draftType,
  draftFoo,
  draftBar,
  draftBaz,
  showOnlyMine,
  hiddenMap,
  isLoading,
  calculations,
  viewCalculationDetails,
  createCalculation,
  cancelCalculation,
  toggleHidden,
  logOut,
  setState,
}) => {
  return (
    <>
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
          <div className="max-w-4xl mx-auto px-5">
            <h2 className="text-xl font-semibold mb-4">Start A New Calculation</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createCalculation()
              }}
              className="p-3 bg-white rounded mb-8 flex space-x-5"
            >
              <label htmlFor="calc-type">
                <span className="block mb-1 text-sm">Type</span>

                <select
                  id="calc-type"
                  value={draftType}
                  onChange={(e) => setState({ draftType: e.target.value })}
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="yellow">Yellow</option>
                </select>
              </label>

              <label htmlFor="calc-foo">
                <span className="block mb-1 text-sm">
                  Foo
                  &nbsp;
                  {draftFoo}
                </span>

                <input
                  id="calc-foo"
                  type="range"
                  min={-10}
                  max={10}
                  step={1}
                  value={draftFoo}
                  onChange={(e) => setState({ draftFoo: Number(e.target.value) })}
                />
              </label>

              <label htmlFor="calc-bar">
                <span className="block mb-1 text-sm">
                  Bar
                </span>

                <input
                  id="calc-bar"
                  type="number"
                  value={draftBar}
                  className="w-20"
                  onChange={(e) => setState({ draftBar: Number(e.target.value) })}
                />
              </label>

              <label htmlFor="calc-baz">
                <span className="block mb-1 text-sm">
                  Baz
                  &nbsp;
                  {draftBaz}
                </span>

                <input
                  id="calc-baz"
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={draftBaz}
                  onChange={(e) => setState({ draftBaz: Number(e.target.value) })}
                />
              </label>

              <div className="flex-grow flex justify-end">
                <Button
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </form>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Calculations</h2>

              <div className="flex items-center">
                <label htmlFor="show-only-mine" className="mr-5">
                  <span className="text-sm mr-2">My Calculations</span>
                  <input
                    id="show-only-mine"
                    type="checkbox"
                    checked={showOnlyMine}
                    onChange={(e) => {
                      setState({
                        showOnlyMine: e.target.checked,
                      })
                    }}
                  />
                </label>
                <Button
                  type="button"
                  size="small"
                  disabled={Object.keys(hiddenMap).length === 0}
                  onClick={() => {
                    toggleHidden()
                  }}
                >
                  Show Hidden Rows
                  <AiOutlineEye className="ml-1" />
                </Button>
              </div>
            </div>
            <table className="text-left text-sm w-full">
              <thead>
                <tr>
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Owner</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {calculations.map((calc) => {
                  const isFiltered = showOnlyMine && !calc.mine
                  const isHidden = hiddenMap[calc.id] === true
                  if (isFiltered || isHidden) {
                    return null
                  }

                  return (
                    <tr
                      key={calc.id}
                    >
                      <td className="pr-5 pb-2">
                        <button
                          type="button"
                          className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
                          onClick={() => {
                            viewCalculationDetails(calc.id)
                          }}
                        >
                          <span
                            className="block w-4 h-4 rounded-full mr-2 flex-shrink-0"
                            style={{
                              backgroundColor: calc.calc_type,
                            }}
                          />
                          {calc.id}
                        </button>
                      </td>
                      <td className="pr-5 pb-2">
                        {calc.mine && (
                        <span className="block w-fit px-2 py-1 bg-green-300 border border-green-500 text-green-700 text-xs rounded">owned</span>
                        )}

                        {!calc.mine && (
                        <span className="block w-fit px-2 py-1 bg-gray-300 border border-gray-500 text-gray-700 text-xs rounded">hidden</span>
                        )}
                      </td>
                      <td className="pr-5 pb-2">
                        <div className="flex items-center max-w-[185px]">
                          <span className="flex-grow capitalize text-sm text-slate-600">{calc.status}</span>
                          <progress
                            value={calc.fraction_complete}
                            max={1}
                            className={`progress-bar ${calc.status}`}
                          />
                        </div>
                      </td>
                      <td className="pb-2">
                        <div className="flex items-center justify-end space-x-2">
                          {calc.mine && (
                          <Button
                            type="button"
                            size="small"
                            bgColor="bg-red-500"
                            onClick={() => {
                              cancelCalculation(calc.id)
                            }}
                            title="Cancel"
                          >
                            <AiOutlineClose />
                          </Button>
                          )}

                          <Button
                            type="button"
                            size="small"
                            bgColor="bg-gray-500"
                            onClick={() => {
                              toggleHidden(calc.id)
                            }}
                            title="Hide"
                          >
                            <AiOutlineEyeInvisible />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </section>
      <Outlet />
    </>
  )
}

DashboardUI.propTypes = {
  isLoading: bool.isRequired,
  draftType: oneOf(['blue', 'green', 'yellow', 'purple']).isRequired,
  draftFoo: number.isRequired,
  draftBar: number.isRequired,
  draftBaz: number.isRequired,
  showOnlyMine: bool.isRequired,
  hiddenMap: objectOf(any).isRequired,
  calculations: arrayOf(shape({
    id: string,
    status: oneOf(['started', 'completed', 'cancelled']),
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
  setState: func.isRequired,
  viewCalculationDetails: func.isRequired,
  createCalculation: func.isRequired,
  cancelCalculation: func.isRequired,
  toggleHidden: func.isRequired,
  logOut: func.isRequired,
}

export default DashboardUI
