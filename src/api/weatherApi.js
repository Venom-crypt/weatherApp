const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export const fetchWeatherByCoordinates = async (latitude, longitude) => {
  const weatherUrl = new URL(BASE_URL)

  weatherUrl.searchParams.set('latitude', latitude)
  weatherUrl.searchParams.set('longitude', longitude)

  weatherUrl.searchParams.set(
    'current',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
    ].join(','),
  )

  weatherUrl.searchParams.set(
    'hourly',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
  )

  weatherUrl.searchParams.set(
    'daily',
    [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'sunrise',
      'sunset',
    ].join(','),
  )

  weatherUrl.searchParams.set('timezone', 'auto')
  weatherUrl.searchParams.set('wind_speed_unit', 'kmh')
  weatherUrl.searchParams.set('forecast_days', '7')

  const response = await fetch(weatherUrl.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch weather data.')
  }

  return response.json()
}