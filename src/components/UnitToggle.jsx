import {temperatureUnits} from '../utils/temperatureUtils'

const UnitToggle = props => {
  const {temperatureUnit, setTemperatureUnit} = props

  const isCelsius = temperatureUnit === temperatureUnits.CELSIUS

  return (
    <div className="unit-toggle">
      <button
        className={`unit-button ${isCelsius ? 'active-unit' : ''}`}
        type="button"
        onClick={() => setTemperatureUnit(temperatureUnits.CELSIUS)}
      >
        °C
      </button>

      <button
        className={`unit-button ${!isCelsius ? 'active-unit' : ''}`}
        type="button"
        onClick={() => setTemperatureUnit(temperatureUnits.FAHRENHEIT)}
      >
        °F
      </button>
    </div>
  )
}

export default UnitToggle