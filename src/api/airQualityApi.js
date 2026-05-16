const AIR_QUALITY_BASE_URL =
  'https://air-quality-api.open-meteo.com/v1/air-quality'

export const fetchAirQualityByCoordinates = async (latitude, longitude) => {
  const airQualityUrl = new URL(AIR_QUALITY_BASE_URL)

  airQualityUrl.searchParams.set('latitude', latitude)
  airQualityUrl.searchParams.set('longitude', longitude)

  airQualityUrl.searchParams.set(
    'current',
    [
      'european_aqi',
      'us_aqi',
      'pm10',
      'pm2_5',
      'carbon_monoxide',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'ozone',
      'uv_index',
    ].join(','),
  )

  airQualityUrl.searchParams.set('timezone', 'auto')

  const response = await fetch(airQualityUrl.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch air quality data.')
  }

  return response.json()
}