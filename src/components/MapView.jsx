import {useEffect, useMemo, useState} from 'react'
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const defaultPosition = [13.0827, 80.2707]

const MapClickHandler = ({onSelectCoordinates}) => {
  useMapEvents({
    click(event) {
      const {lat, lng} = event.latlng
      onSelectCoordinates(lat, lng)
    },
  })

  return null
}

const MapFlyToLocation = ({markerPosition}) => {
  const map = useMap()

  useEffect(() => {
    if (!markerPosition) {
      return
    }

    map.flyTo(markerPosition, 12, {
      animate: true,
      duration: 1.2,
    })

    setTimeout(() => {
      map.invalidateSize()
    }, 300)
  }, [markerPosition, map])

  return null
}

const MapView = props => {
  const {selectedLocation, placeName, onMapLocationSelect} = props

  const selectedPosition = useMemo(() => {
    if (!selectedLocation) {
      return defaultPosition
    }

    return [selectedLocation.latitude, selectedLocation.longitude]
  }, [selectedLocation])

  const [markerPosition, setMarkerPosition] = useState(selectedPosition)

  useEffect(() => {
    setMarkerPosition(selectedPosition)
  }, [selectedPosition])

  const onSelectCoordinates = (latitude, longitude) => {
    const updatedPosition = [latitude, longitude]

    setMarkerPosition(updatedPosition)

    onMapLocationSelect({
      latitude,
      longitude,
      accuracy: null,
      source: 'map',
    })
  }

  const onMarkerDragEnd = event => {
    const position = event.target.getLatLng()

    onSelectCoordinates(position.lat, position.lng)
  }

  return (
    <div className="forecast-section map-card">
      <div className="section-header">
        <p className="section-eyebrow">Location Picker</p>
        <h2 className="section-title">Drag Map Marker</h2>
      </div>

      <div className="map-frame-wrapper">
        <MapContainer
          center={markerPosition}
          zoom={11}
          scrollWheelZoom
          zoomControl
          className="leaflet-map"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={markerPosition}
            icon={markerIcon}
            draggable
            eventHandlers={{
              dragend: onMarkerDragEnd,
            }}
          />

          <MapClickHandler onSelectCoordinates={onSelectCoordinates} />
          <MapFlyToLocation markerPosition={markerPosition} />
        </MapContainer>
      </div>

      <p className="map-location-name">{placeName}</p>

      <p className="map-help-text">
        Search a city, use GPS, click the map, or drag the marker to update
        weather.
      </p>
    </div>
  )
}

export default MapView