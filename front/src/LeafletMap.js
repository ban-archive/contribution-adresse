const { h, Component } = preact

const homeIcon = L.icon({
  iconUrl: 'home_icon.svg',
  iconSize:     [21, 21],
  iconAnchor:   [11, 12],
})

function isSameLatLng(marker, address) {
  const { lat, lng } = marker.getLatLng()
  return lat === address.coords.latitude && lng === address.coords.longitude
}

function updateMarkerPosition(marker, address) {
  if (!isSameLatLng(marker, address)) {
    const latLng = new L.latLng(address.coords.latitude, address.coords.longitude)
    marker.setLatLng(latLng)
    marker.options.address = address.address
  }
}

function updateMarkerIcon(marker, address, selectedAddress) {
  if (selectedAddress && selectedAddress === address) {
    marker._icon.className = 'selected-address'
  } else {
    marker._icon.className = ''
  }
}

class LeafletMap extends Component {
  componentDidMount() {
    const { coords, onCloseForm, fullscreen } = this.props
    const { latitude, longitude } = coords
    this.map = L.map(this.container, {
      zoomControl: false,
      dragging: false,
      center: [latitude, longitude],
      zoom: 18,
      preferCanvas: true,
    })

    if (fullscreen) this.map.on('click', onCloseForm)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      maxZoom: 20,
    }).addTo(this.map)

    this.markers = new L.FeatureGroup()
    this.markers.addTo(this.map)

    this.updateMap()
    this.updateMarkers()
  }

  componentWillUpdate() {
    if (this.map) {
      this.updateMap()
      this.updateMarkers()
    }
  }

  createMarker(address) {
    const { displayAddress } = this.props
    const options = {icon: homeIcon, address: address.address, id: address.id}
    return new L.marker([address.coords.latitude, address.coords.longitude], options)
      .on('click', displayAddress)
  }

  updateMap() {
    const { latitude, longitude } = this.props.coords
    this.map.panTo([latitude, longitude])
    this.map.invalidateSize(true) // Check if Checks if the map container size changed and updates the map
  }

  updateMarkers() {
    const { addresses, selectedAddress } = this.props
    const markersToRemove = this.getMarkersToRemove()
    markersToRemove.forEach(marker => this.markers.removeLayer(marker))

    addresses.forEach(address => {
      const marker = this.getMarker(address)

      if (!marker) {
        const newMarker = this.createMarker(address)
        this.markers.addLayer(newMarker)
      } else {
        updateMarkerPosition(marker, address)
        updateMarkerIcon(marker, address, selectedAddress)
      }
    })
  }

  getMarkersToRemove() {
    const { addresses } = this.props
    const markers = this.markers.getLayers()

    return markers.filter(marker => !addresses.find(address => address.address === marker.options.address))
  }

  getMarker(address) {
    const markers = this.markers.getLayers()
    return markers.find(marker => marker.options.id === address.id)
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    const { fullscreen } = this.props

    return (
      <div id="map" style={{height: fullscreen ? '100%' : '50%'}} ref={ref => this.container = ref} />
    )
  }
}
