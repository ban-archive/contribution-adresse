const { h, render, Component } = preact
const { bind } = decko

let greenIcon = L.icon({
  iconUrl: 'homeMarker.svg',

  iconSize:     [84, 86], // size of the icon
  // iconAnchor:   [20, 22], // point of the icon which will correspond to marker's location
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: null,
      watchId: null,
      markers: [],
      error: false,
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
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      const newMarker = L.marker([latitude, longitude], {icon: greenIcon})
      if (!this.farEnough(newMarker) || this.isAlreadyExist(newMarker)) return
      const markers = [...this.state.markers]
      markers.push(newMarker)
      this.setState({markers})
    })
  }

  componentWillUnmount() {
    const { watchId } = this.state
    navigator.geolocation.clearWatch(watchId)
  }

  updatePosition() {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(position => {
        // console.log('updatePosition to :', position.coords)
        this.setState({coords: position.coords})
      }, () => this.setState({error: true}))

      this.setState({watchId})
    } else {
      this.setState({error: true})
    }
  }

  render() {
    const { coords, markers, error } = this.state
    if (error) return <h1>Erreur</h1>
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
