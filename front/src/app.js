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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null,
      coords: null,
      watchId: localStorage.getItem('watchId') || null,
      markers:  this.loadMarkers(),
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
    const markersSaved = JSON.parse(localStorage.getItem('markers'))
    if (!markersSaved) return []

    const markers = []
    for (let i = 0; i < markersSaved.length; i++) {
      const { coords, address } = markersSaved[i]
      markers.push(createMarker(coords, address))
    }

    return markers
  }

  isAlreadyExist(newMarker) {
    const { markers } = this.state
    return markers.find(marker => marker.getLatLng() === newMarker.getLatLng())
  }

  farEnough(newMarker) {
    const { markers } = this.state
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].getLatLng().distanceTo(newMarker.getLatLng()) < 2) return false
    }
    return true
  }

  @bind
  openForm() {
    this.setState({fullscreen: false})
  }

  @bind
  closeForm() {
    this.setState({
      fullscreen: true,
      address: '',
    })
  }

  @bind
  addAddress(coords, address) {
    const { markers } = this.state
    const newMarker = createMarker(coords, address)

    if (!this.farEnough(newMarker) || this.isAlreadyExist(newMarker)) return
    const markersCopy = [...markers]
    markersCopy.push(newMarker)

    this.closeForm()
    this.setState({markers: markersCopy}, () => {
      localStorage.setItem('markers', JSON.stringify(markersCopy.map(marker => {
        const { lat, lng } = marker.getLatLng()
        return {coords: {latitude: lat, longitude: lng}, address: marker.options.address}
      }))
    )})
  }

  @bind
  removeAddress(address) {
    const { markers } = this.state
    const markersCopy = [...markers]

    for (let i = 0; i < markersCopy.length; i++) {
      if (markersCopy[i].options.address === address) {
        markersCopy[i].remove()
        markersCopy.splice(markersCopy[i], 1)
      }
    }

    this.closeForm()
    this.setState({markers: markersCopy})
  }

  @bind
  editAddress(address, newAddress) {
    const { markers } = this.state
    const markersCopy = [...markers]

    for (let i = 0; i < markersCopy.length; i++) {
      if (markersCopy[i].options.address === address) {
        markersCopy[i].options.address = newAddress
      }
    }

    this.setState({markers: markersCopy})
  }

  componentWillUnmount() {
    const { watchId } = this.state
    navigator.geolocation.clearWatch(watchId)
  }

  @bind
  displayAddress(e) {
    this.setState({
      fullscreen: false,
      address: e.target.options.address,
    })
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
    const { coords, markers, fullscreen, address, error } = this.state
    if (error) return <Error error={error} />
    if (!coords) return <Loading />

    return (
      <div class="container">
        <LeafletMap onShowAddress={this.displayAddress} onCloseForm={this.closeForm} coords={coords} markers={markers} fullscreen={fullscreen} />
        <Locator accuracy={coords.accuracy} fullscreen={fullscreen} />
        {fullscreen ?
          <AddAddressButton action={this.openForm} /> :
          <Menu address={address} coords={coords} createAddress={this.addAddress} editAddress={this.editAddress} removeAddress={this.removeAddress} />
        }
      </div>
    )
  }
}

// render an instance of App into <body>:
render(<App />, document.body)
