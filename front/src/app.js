const { h, render, Component } = preact
const { bind } = decko

/*
  HELPERS
*/
const homeIcon = L.icon({
  iconUrl: 'home_icon.png',
  iconSize:     [43, 42],
  iconAnchor:   [22, 21],
})

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

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  createMarker(coords, address) {
    return L.marker([coords.latitude, coords.longitude], {icon: homeIcon, address})
      .on('click', this.displayMarker)
  }

  loadMarkers() {
    const markers = new L.FeatureGroup()
    const markersSaved = JSON.parse(localStorage.getItem('markers') || null)

    if (markersSaved) {
      for (let i = 0; i < markersSaved.length; i++) {
        const { coords, address } = markersSaved[i]
        this.createMarker(coords, address).addTo(markers)
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
  setStateAndUpdateMap(state) {
    this.setState(state, () => this.map.forceUpdate())
  }

  @bind
  saveMarkers(markers) {
    this.setState({markers}, () => updateLocalStorage(markers))
  }

  @bind
  openForm() {
    this.setStateAndUpdateMap({fullscreen: false})
  }

  @bind
  closeForm() {
    this.setStateAndUpdateMap({fullscreen: true, marker: null})
  }

  @bind
  addAddress(coords, address) {
    const { markers } = this.state
    const newMarker = this.createMarker(coords, address)

    if (!this.farEnough(newMarker) || markers.hasLayer(newMarker)) return
    newMarker.addTo(markers)

    this.closeForm()
    this.saveMarkers(markers)
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
    this.saveMarkers(markers)
  }

  @bind
  displayMarker(e) {
    console.log('displayMarker');
    this.setStateAndUpdateMap({fullscreen: false, marker: e.target})
  }

  @bind
  geoError(error) {
    this.setState({error: error.message})
  }

  @bind
  geoSuccess(position) {
    this.setState({coords: position.coords})
  }

  updatePosition() {
    const { geoOptions } = this.state
    if ('geolocation' in navigator) {
      this.watchId = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, geoOptions)
    } else {
      this.setState({error: 'La géolocalisation n\'est pas prise en charge par votre navigateur.'})
    }
  }

  render() {
    const { coords, markers, address, fullscreen, error } = this.state
    if (error) return <Error error={error} />
    if (!coords) return <Loading />

    const speed = Number((coords.speed || 0).toFixed())
    const accuracy = Number((coords.accuracy || 0).toFixed())

    return (
      <div class="container">
        <LeafletMap ref={ref => this.map = ref} onCloseForm={this.closeForm} coords={coords} markers={markers} fullscreen={fullscreen} />
        <Locator accuracy={coords.accuracy} fullscreen={fullscreen} />
        {fullscreen ?
          <Dashboard speed={speed} accuracy={accuracy} openForm={this.openForm}/> :
          <Menu address={address} coords={coords} createAddress={this.addAddress} editAddress={this.editAddress} removeAddress={this.removeAddress} />
        }
      </div>
    )
  }
}

// render an instance of App into <body>:
render(<App />, document.body)
