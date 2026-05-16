export const temperatureUnits = {
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
}

export const getTemperatureSymbol = unit => {
  return unit === temperatureUnits.FAHRENHEIT ? '°F' : '°C'
}

export const convertTemperature = (temperature, unit) => {
  if (temperature === null || temperature === undefined || temperature === '--') {
    return '--'
  }

  if (unit === temperatureUnits.FAHRENHEIT) {
    return Math.round((temperature * 9) / 5 + 32)
  }

  return Math.round(temperature)
}