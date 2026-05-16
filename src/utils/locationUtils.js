const EARTH_RADIUS_IN_METERS = 6371000

const toRadians = degrees => {
  return degrees * (Math.PI / 180)
}

export const getDistanceInMeters = (firstLocation, secondLocation) => {
  if (!firstLocation || !secondLocation) {
    return Infinity
  }

  const firstLatitude = toRadians(firstLocation.latitude)
  const secondLatitude = toRadians(secondLocation.latitude)

  const latitudeDifference = toRadians(
    secondLocation.latitude - firstLocation.latitude,
  )

  const longitudeDifference = toRadians(
    secondLocation.longitude - firstLocation.longitude,
  )

  const a =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_IN_METERS * c
}