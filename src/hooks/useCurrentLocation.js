import {useEffect, useState} from 'react'

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 30000,
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null)
  const [isLocationLoading, setIsLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.')
      return undefined
    }

    setIsLocationLoading(true)

    const handleSuccess = position => {
      const {latitude, longitude, accuracy} = position.coords

      setLocation({
        latitude,
        longitude,
        accuracy,
        timestamp: position.timestamp,
      })

      setLocationError('')
      setIsLocationLoading(false)
    }

    const handleError = error => {
      let message = 'Unable to get your location.'

      if (error.code === error.PERMISSION_DENIED) {
        message = 'Location permission was denied.'
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        message = 'Location information is unavailable.'
      } else if (error.code === error.TIMEOUT) {
        message = 'Location request timed out.'
      }

      setLocationError(message)
      setIsLocationLoading(false)
    }

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      locationOptions,
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return {
    location,
    isLocationLoading,
    locationError,
  }
}

export default useCurrentLocation