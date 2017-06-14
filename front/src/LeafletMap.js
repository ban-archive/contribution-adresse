const { h, Component } = preact

const homeIcon = L.icon({
  iconUrl: 'home_icon.svg',
  iconSize:     [43, 42],
  iconAnchor:   [22, 21],
})

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
    const { addresses } = this.props
    const markerToRemove = this.getMarkerToRemove()
    markerToRemove.map(marker => this.markers.removeLayer(marker))

    addresses.map(address => {
      const marker = this.getMarker(address)
      if (!marker) {
        const newMarker = this.createMarker(address)
        this.markers.addLayer(newMarker)
      } else if (!this.isSameLatLng(marker, address)) {
        const latLng = new L.latLng(address.coords.latitude, address.coords.longitude)
        marker.setLatLng(latLng)
        marker.options.address = address.address
      }
    })
  }

  isSameLatLng(marker, address) {
    const { lat, lng } = marker.getLatLng()
    return lat === address.latitude && lng === address.longitude
  }

  getMarkerToRemove() {
    const { addresses } = this.props
    const toRemove = []
    const markers = this.markers.getLayers()
    for (let i = 0; i < markers.length; i++) {
      let find = false
      for (let y = 0; y < addresses.length; y++) {
        if (addresses[y].address === markers[i].options.address) find = true
      }
      if (!find) toRemove.push(markers[i])
    }
    return toRemove
  }

  getMarker(address) {
    const markers = this.markers.getLayers()
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].options.id === address.id) return markers[i]
    }
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
