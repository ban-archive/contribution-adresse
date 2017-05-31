const { h, render, Component } = preact
const { bind } = decko

// [
//   {
//     id: '76517531867311',
//     address: {
//       houseNumber: '9c',
//       street: 'rue du moulin'
//     },
//     coords: {
//       accuracy : 30
//       altitude : 100
//       altitudeAccuracy
//       heading
//       latitude
//       longitude
//       speed
//    }
//   }
// ]

const stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?']

function generateToken() {
  let rndString = ''

  for (var i = 0; i <= 15; i++) {
			var rndNum = Math.ceil(Math.random() * stringArray.length) - 1
			rndString = rndString + stringArray[rndNum];
		}

  return rndString
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddress: null,
      userCoords: null,
      addresses: [],
      geoOptions: {
        enableHighAccuracy: true,
        maximumAge: 3000,
      },
      fullscreen: true,
      error: null,
    }
    this.loadLocalStorage()
  }

  componentDidMount() {
    this.updatePosition()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  saveToLocalStorage() {
    const { addresses, user } = this.state
    localStorage.setItem('addresses', JSON.stringify(addresses))
    localStorage.setItem('user', JSON.stringify(user))
  }

  loadLocalStorage() {
    const addresses = JSON.parse(localStorage.getItem('addresses') || null)
    const user = JSON.parse(localStorage.getItem('user') || null)

    this.setState({
      user: user || {token: null},
      addresses: addresses || []
    })
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
    this.setState(state, () => this.leafletMap.forceUpdate())
  }

  @bind
  saveAddresses(addresses) {
    this.setState({addresses}, () => this.saveToLocalStorage(addresses))
  }

  @bind
  openForm() {
    this.setStateAndUpdateMap({fullscreen: false})
  }

  @bind
  closeForm() {
    this.setStateAndUpdateMap({fullscreen: true, selectedAddress: null})
  }

  @bind
  addAddress(coordinates, address) {
    const { addresses } = this.state
    const newAddresses = [...addresses]
    const coords = {
      accuracy: coordinates.accuracy,
      altitude: coordinates.altitude,
      altitudeAccuracy: coordinates.altitudeAccuracy,
      heading: coordinates.heading,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      speed: coordinates.speed,
    }
    newAddresses.push({coords, address, id: `${address.houseNumber}_${address.street}`})
    this.closeForm()
    this.saveAddresses(newAddresses)
  }

  @bind
  removeAddress(address) {
    const { addresses } = this.state
    const newAddresses = [...addresses]
    newAddresses.pop(address)
    this.closeForm()
    this.saveAddresses(newAddresses)
  }

  @bind
  editAddress(address, newAddress) {
    const { addresses } = this.state
    const newAddresses = [...addresses]
    const addressToEdit = newAddresses.find(addr => addr.id === address.id)
    addressToEdit.address = newAddress
    this.saveAddresses(newAddresses)
  }

  @bind
  displayAddress(e) {
    const { addresses } = this.state
    const address = addresses.find(address => address.id === e.target.options.id)
    this.setStateAndUpdateMap({fullscreen: false, selectedAddress: address})
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

  @bind
  setToken() {
    const { user } = this.state
    console.log(user);
    user.token = generateToken()
    this.setState({user}, localStorage.setItem('user', JSON.stringify(user)))
  }

  render() {
    const { user, coords, addresses, selectedAddress, fullscreen, error } = this.state
    console.log(user);
    if (!user.token) return <Welcome skip={this.setToken}/>
    if (error) return <Error error={error} />
    if (!coords) return <Loading />

    const speed = Number((coords.speed || 0).toFixed())
    const accuracy = Number((coords.accuracy || 0).toFixed())

    return (
      <div class="container">
        <LeafletMap ref={ref => this.leafletMap = ref} addresses={addresses} displayAddress={this.displayAddress} onCloseForm={this.closeForm} coords={coords} fullscreen={fullscreen} />
        <Locator accuracy={coords.accuracy} fullscreen={fullscreen} />
        {fullscreen ?
          <Dashboard speed={speed} accuracy={accuracy} openForm={this.openForm}/> :
          <Menu selectedAddress={selectedAddress} coords={coords} createAddress={this.addAddress} editAddress={this.editAddress} removeAddress={this.removeAddress} />
        }
      </div>
    )
  }
}

// render an instance of App into <body>:
render(<App />, document.body)
