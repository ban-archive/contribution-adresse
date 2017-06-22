const { h, render, Component } = preact
const { bind } = decko

import Welcome from './Welcome'
import Loading from './Loading'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import PopUpManager from './PopUpManager'
import Map from './Map'
import badges from './badges.json'

const stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?']

function generateToken() {
  let rndString = ''

  for (let i = 0; i <= 15; i++) {
    const rndNum = Math.ceil(Math.random() * stringArray.length) - 1
    rndString = rndString + stringArray[rndNum]
  }

  return rndString
}

function isLocalStorageNameSupported() {
  const testKey = 'test'
  const storage = window.sessionStorage
  try {
    storage.setItem(testKey, '1')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}

function useLocalStorage(fn, name, data) {
  if (!isLocalStorageNameSupported()) return
  if (fn === 'getItem') {
    return JSON.parse(localStorage.getItem(name))
  } else if (fn === 'setItem') {
    return localStorage.setItem(name, JSON.stringify(data))
  }
  throw new Error(`localStorage function ${fn} unknown.`)
}

function getBadge(badgeName) {
  return badges.find(badge => badge.name === badgeName)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tuto: 0,
      newBadge: null,
      showProfile: false,
      showEmailForm: false,
      selectedAddress: null,
      userCoords: null,
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
    if (!isLocalStorageNameSupported()) return
    const { addresses, user } = this.state
    useLocalStorage('setItem', 'addresses', addresses)
    useLocalStorage('setItem', 'user', user)
  }

  loadLocalStorage() {
    const addresses = useLocalStorage('getItem', 'addresses') || []
    const user = useLocalStorage('getItem', 'user') || {token: null, badges: []}
    this.setState({user, addresses})
  }

  @bind
  setStateAndUpdateMap(state) {
    this.setState(state)
  }

  @bind
  saveAddresses(addresses) {
    this.setState({addresses}, () => this.saveToLocalStorage(addresses))
  }

  @bind
  openMenu() {
    const { tuto } = this.state
    if (tuto === 1) this.tutoNextStep()
    this.setStateAndUpdateMap({fullscreen: false})
  }

  @bind
  closeForm() {
    this.clearForm()
    this.setStateAndUpdateMap({fullscreen: true, selectedAddress: null})
  }

  @bind
  handleHouseNumberChange(e) {
    this.setState({houseNumber: e.target.value || e.target.textContent})
  }

  @bind
  handleAdditionalChange(e) {
    this.setState({additional: e.target.value || e.target.textContent})
  }

  @bind
  handleStreetChange(e) {
    this.setState({street: e.target.value || e.target.textContent})
  }

  clearForm() {
    this.setState({houseNumber: '', additional: '', street: ''})
  }

  @bind
  addAddress() {
    const { user, addresses, coords, houseNumber, additional, street, tuto } = this.state
    if (!addresses.length) this.winBadge(getBadge('first address'))
    const newAddresses = [...addresses]
    const coordinates = {
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed,
    }
    newAddresses.push({
      coords: coordinates,
      address: {houseNumber, additional, street},
      id: `${houseNumber}_${street}`,
      createAt: Date.now(),
      createBy: user,
      proposals: [],
    })
    if (tuto === 2 ) this.tutoNextStep()
    this.closeForm()
    this.saveAddresses(newAddresses)
  }

  @bind
  removeAddress() {
    const { addresses, selectedAddress } = this.state
    const newAddresses = [...addresses]
    newAddresses.pop(selectedAddress)
    this.closeForm()
    this.saveAddresses(newAddresses)
  }

  @bind
  editAddress() {
    const { addresses, selectedAddress, houseNumber, additional, street } = this.state
    const newAddresses = [...addresses]
    const addressToEdit = newAddresses.find(addr => addr.id === selectedAddress.id)
    addressToEdit.address = {houseNumber, additional, street}
    this.saveAddresses(newAddresses)
  }

  @bind
  addProposal(proposal) {
    const { selectedAddress, addresses } = this.state
    const newAddresses = [...addresses]
    const addressToEdit = newAddresses.find(addr => addr.id === selectedAddress.id)
    addressToEdit.proposals.push(proposal)
    this.saveAddresses(newAddresses)
  }

  @bind
  removeProposal() {
    const { user, selectedAddress, addresses } = this.state
    const newAddresses = [...addresses]
    const addressToEdit = newAddresses.find(addr => addr.id === selectedAddress.id)
    const proposal = addressToEdit.proposals.find(proposal => proposal.user.token === user.token)
    addressToEdit.proposals.pop(proposal)
    this.saveAddresses(newAddresses)
  }

  @bind
  displayAddress(e) {
    const { addresses } = this.state
    const address = addresses.find(address => address.id === e.target.options.id)
    this.setState({houseNumber: address.address.houseNumber, additional: address.address.additional, street: address.address.street})
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
  setEmail(email) {
    const { user, showEmailForm } = this.state
    user.email = email
    this.setState({user}, useLocalStorage('setItem', 'user', user))
    if (showEmailForm) this.displayEmailForm()
  }

  @bind
  setToken() {
    const { user } = this.state
    user.token = generateToken()
    this.setState({user}, useLocalStorage('setItem', 'user', user))
  }

  @bind
  tutoNextStep() {
    const { tuto } = this.state
    const nextTuto = tuto + 1
    if (nextTuto === 4) {
      const tutorialBadge = getBadge('tutorial')
      this.winBadge(tutorialBadge)
    }
    this.setState({tuto: nextTuto})
  }

  @bind
  winBadge(newBadge) {
    const { badges } = this.state.user
    const newBadges = [...badges]
    if (newBadges.find(badge => badge.id === newBadge.id)) return
    badges.push(newBadge)
    this.setState({badges, newBadge})
    this.saveToLocalStorage()
  }

  @bind
  unlockedBadge(badgeName) {
    const { badges } = this.state.user
    const badge = getBadge(badgeName)
    if (!badges) return false
    return badges.find(unlockedBadge => unlockedBadge.id === badge.id)
  }

  @bind
  resetNewBadge() {
    this.setState({newBadge: null})
  }

  @bind
  displayEmailForm() {
    const { tuto } = this.state
    this.setState({showEmailForm: !this.state.showEmailForm})
    if (tuto === 3) this.tutoNextStep()
  }

  @bind
  displayProfile() {
    this.setState({showProfile: !this.state.showProfile})
  }

  render() {
    const { user, tuto, coords, newBadge, showProfile, showEmailForm, houseNumber, additional, street, addresses, selectedAddress, fullscreen, error } = this.state
    if (!user.token) return <Welcome skip={this.setToken}/>
    if (error) return <Error error={error} />
    if (!coords) return <Loading />
    const speed = Number((coords.speed || 0).toFixed())
    const accuracy = Number((coords.accuracy || 0).toFixed())

    return (
      <div class="container">
        <PopUpManager user={user} showEmailForm={showEmailForm} tutorialBadgeUnlocked={this.unlockedBadge('tutorial')} newBadge={newBadge} tuto={tuto} setEmail={this.setEmail} tutoNextStep={this.tutoNextStep} displayEmailForm={this.displayEmailForm} resetNewBadge={this.resetNewBadge} />
        <TopNavigation user={user} minimize={!showProfile} close={this.displayProfile} displayEmailForm={this.displayEmailForm} inscription={this.setEmail} />
        <Map user={user} addresses={addresses} selectedAddress={selectedAddress} coords={selectedAddress ? selectedAddress.coords : coords} fullscreen={fullscreen} displayAddress={this.displayAddress} closeForm={this.closeForm} />
        <BottomNavigation user={user} selectedAddress={selectedAddress} houseNumber={houseNumber} additional={additional} street={street} speed={speed} accuracy={accuracy} displayDashboard={fullscreen} openMenu={this.openMenu} handleHouseNumberChange={this.handleHouseNumberChange} handleAdditionalChange={this.handleAdditionalChange} handleStreetChange={this.handleStreetChange} editAddress={this.editAddress} removeAddress={this.removeAddress} addProposal={this.addProposal} removeProposal={this.removeProposal} addAddress={this.addAddress} />
      </div>
    )
  }
}

// render an instance of App into <body>:
render(<App />, document.body)
