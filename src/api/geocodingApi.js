const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org'
const OPEN_METEO_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

export const fetchPlaceNameByCoordinates = async (latitude, longitude) => {
  const url = new URL(`${NOMINATIM_BASE_URL}/reverse`)

  url.searchParams.set('format', 'json')
  url.searchParams.set('lat', latitude)
  url.searchParams.set('lon', longitude)
  url.searchParams.set('zoom', '10')
  url.searchParams.set('addressdetails', '1')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch place name.')
  }

  const data = await response.json()

  const address = data.address || {}

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.suburb ||
    address.county ||
    'Unknown Location'

  const country = address.country || ''

  return {
    city,
    country,
    displayName: country ? `${city}, ${country}` : city,
  }
}

export const searchLocationByCity = async cityName => {
  const url = new URL(OPEN_METEO_GEOCODING_URL)

  url.searchParams.set('name', cityName)
  url.searchParams.set('count', '5')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to search location.')
  }

  const data = await response.json()

  if (!data.results || data.results.length === 0) {
    throw new Error('No location found. Try another city name.')
  }

  const firstResult = data.results[0]

  return {
    latitude: firstResult.latitude,
    longitude: firstResult.longitude,
    city: firstResult.name,
    country: firstResult.country,
    displayName: `${firstResult.name}, ${firstResult.country}`,
    accuracy: null,
    source: 'search',
  }
}