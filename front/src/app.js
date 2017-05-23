const { h, render, Component } = preact
const { bind } = decko

/*
  HELPERS
*/
let homeIcon = L.icon({
  iconUrl: 'home_icon.png',
  iconSize:     [43, 42],
  iconAnchor:   [22, 21],
})

function createMarker(coords, address) {
  return L.marker([coords.latitude, coords.longitude], {icon: homeIcon, address})
}

function updateLocalStorage(markers) {
  localStorage.setItem('markers', JSON.stringify(markers.getLayers().map(marker => {
    const { lat, lng } = marker.getLatLng()
    return {coords: {latitude: lat, longitude: lng}, address: marker.options.address}
  })))
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: null,
      coords: null,
      watchId: localStorage.getItem('watchId') || null,
      markers: this.loadMarkers(),
      geoOptions: {
        enableHighAccuracy: true,
        maximumAge: 3000,
      },
      fullscreen: true,
      error: null,
    }
  }

  componentDidMount() {
    this.updatePosition()
  }

  loadMarkers() {
    const markers = new L.FeatureGroup()
    const markersSaved = JSON.parse(localStorage.getItem('markers'))

    if (markersSaved) {
      for (let i = 0; i < markersSaved.length; i++) {
        const { coords, address } = markersSaved[i]
        createMarker(coords, address).on('click', this.displayMarker).addTo(markers)
      }
    }

    return markers
  }

  farEnough(newMarker) {
    const { markers } = this.state
    for (let i = 0; i < markers.getLayers().length; i++) {
      if (markers.getLayers()[i].getLatLng().distanceTo(newMarker.getLatLng()) < 2) return false
    }
    return true
  }

  @bind
  openForm() {
    this.setState({fullscreen: false}, () => this.map.forceUpdate())
  }

  @bind
  closeForm() {
    this.setState({
      fullscreen: true,
      marker: null,
    }, () => this.map.forceUpdate())
  }

  @bind
  addAddress(coords, address) {
    const { markers } = this.state
    const newMarker = createMarker(coords, address)

    if (!this.farEnough(newMarker) || markers.hasLayer(newMarker)) return
    newMarker.on('click', this.displayMarker).addTo(markers)

    this.closeForm()
    this.setState({markers}, () => updateLocalStorage(markers))
  }

  @bind
  removeAddress(marker) {
    const { markers } = this.state
    markers.removeLayer(marker)

    updateLocalStorage(markers)
    this.closeForm()
    this.setState({markers})
  }

  @bind
  editAddress(marker, newAddress) {
    const { markers } = this.state
    marker.options.address = newAddress
    this.setState({markers}, () => updateLocalStorage(markers))
  }

  componentWillUnmount() {
    const { watchId } = this.state
    navigator.geolocation.clearWatch(watchId)
  }

  @bind
  displayMarker(e) {
    this.setState({
      fullscreen: false,
      marker: e.target,
    }, () => this.map.forceUpdate())
  }

  @bind
  geoError(error) {
    this.setState({error: error.message})
  }

  @bind
  geoSuccess(position) {
    console.log('updatePosition to :', position.coords)
    this.setState({coords: position.coords})
  }

  updatePosition() {
    const { geoOptions } = this.state
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, geoOptions)
      this.setState({watchId})
    } else {
      this.setState({error: 'La géolocalisation n\'est pas prise en charge par votre navigateur.'})
    }
  }

  render() {
    const { coords, markers, fullscreen, marker, error } = this.state
    if (error) return <Error error={error} />
    if (!coords) return <Loading />

    return (
      <div class="container">
        <LeafletMap ref={ref => this.map = ref} onShowAddress={this.displayMarker} onCloseForm={this.closeForm} coords={coords} markers={markers} fullscreen={fullscreen} />
        <Locator accuracy={coords.accuracy} fullscreen={fullscreen} />
        {fullscreen ?
          <AddAddressButton action={this.openForm} /> :
          <Menu marker={marker} coords={coords} createAddress={this.addAddress} editAddress={this.editAddress} removeAddress={this.removeAddress} />
        }
      </div>
    )
  }
}

// render an instance of App into <body>:
render(<App />, document.body)
