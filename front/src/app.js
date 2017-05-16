const { h, render, Component } = preact
const { bind } = decko

let homeIcon = L.icon({
  iconUrl: 'home_icon.png',
  iconSize:     [84, 86],
  iconAnchor:   [43, 42],
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: null,
      watchId: null,
      markers: [],
      geoOptions: {
        timeout: 27000,
        enableHighAccuracy: true,
        maximumAge: Infinity,
      },
      error: null,
    }
  }

  componentDidMount() {
    this.updatePosition()
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
  addAddress() {
    const { coords, markers } = this.state
    const newMarker = L.marker([coords.latitude, coords.longitude], {icon: homeIcon})
    if (!this.farEnough(newMarker) || this.isAlreadyExist(newMarker)) return
    const markersCopy = [...markers]
    markersCopy.push(newMarker)
    this.setState({markers: markersCopy})
  }

  componentWillUnmount() {
    const { watchId } = this.state
    navigator.geolocation.clearWatch(watchId)
  }

  @bind
  geoError(error) {
    console.log(error)
    this.setState({error: error.message})
  }

  @bind
  geoSucces(position) {
    console.log('updatePosition to :', position.coords)
    this.setState({coords: position.coords})
  }

  updatePosition() {
    const { geoOptions } = this.state
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(this.geoSucces, this.geoError, geoOptions)
      this.setState({watchId})
    } else {
      this.setState({error: 'La géolocalisation n\'est pas prise en charge par votre navigateur.'})
    }
  }

  render() {
    const { coords, markers, error } = this.state
    if (error) return <Error error={error} />
    if (!coords) return <Loading />

    return (
      <div class="container">
        <LeafletMap coords={coords} markers={markers} />
        <div class="locator"></div>
        <AddAddressButton action={this.addAddress} />
      </div>
    )
  }
}

// render an instance of App into <body>:
render(<App />, document.body)
