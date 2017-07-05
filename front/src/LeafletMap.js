import { h, Component } from 'preact'
import L from 'leaflet'

const homeIcon = L.divIcon({
  className: 'marker-icon',
  html: '<svg viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="home_icon"><circle id="Oval-4" fill="#D8D8D8" cx="11" cy="11" r="10"></circle><path d="M11,2 L19,9.5542522 L3,9.5542522 L11,2 Z M5.10752688,9.5542522 L16.9354839,9.5542522 L16.9354839,18 L5.10752688,18 L5.10752688,9.5542522 Z" id="Combined-Shape" fill="#FFFFFF"></path></g></g></svg>',
})

const checkedHomeIcon = L.divIcon({
  className: 'marker-icon',
  html: '<svg viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="check_home_icon"><circle id="Oval-4" fill="#D8D8D8" cx="11" cy="11" r="10"></circle><path d="M11,2 L19,9.5542522 L3,9.5542522 L11,2 Z M5.10752688,9.5542522 L16.9354839,9.5542522 L16.9354839,18 L5.10752688,18 L5.10752688,9.5542522 Z" id="Combined-Shape" fill="#FFFFFF"></path><g id="valid_icon" transform="translate(7.000000, 8.000000)" stroke="#3F4DAB" stroke-linecap="square"><path d="M0.285714286,4.03846154 L3.14285714,6.73076923" id="Line"></path><path d="M3.14285714,6.73076923 L7.71428571,0.269230769" id="Line"></path></g></g></g></svg>',
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

function updateMarkerIcon(user, marker, address, selectedAddress) {
  let style = 'leaflet-marker-icon marker-icon leaflet-zoom-animated leaflet-interactive'
  if (address.proposals.find(proposal => proposal.user.token === user.token)) {
    marker.setIcon(checkedHomeIcon)
  } else {
    marker.setIcon(homeIcon)
  }
  if (selectedAddress && selectedAddress.id === address.id) style += ' selected-address'
  if (address.createBy.token === user.token) style += ' user'
  marker._icon.className = style
}

export default class LeafletMap extends Component {
  componentDidMount() {
    const { coords, onCloseMenu, fullscreen } = this.props
    const { latitude, longitude } = coords
    this.map = L.map(this.container, {
      zoomControl: false,
      dragging: false,
      center: [latitude, longitude],
      zoom: 18,
      preferCanvas: true,
    })

    if (fullscreen) this.map.on('click', onCloseMenu)

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
    const { user, addresses, selectedAddress } = this.props
    const markersToRemove = this.getMarkersToRemove()
    markersToRemove.forEach(marker => this.markers.removeLayer(marker))

    addresses.forEach(address => {
      let marker = this.getMarker(address)
      if (!marker) {
        marker = this.createMarker(address)
        this.markers.addLayer(marker)
      } else {
        updateMarkerPosition(marker, address)
      }
      updateMarkerIcon(user, marker, address, selectedAddress)
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
