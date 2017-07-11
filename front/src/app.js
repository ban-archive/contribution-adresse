import React, { Component } from 'react'
import { bind } from 'decko'

import Error from './Error'
import Welcome from './Welcome'
import Loading from './Loading'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'
import Map from './Map'
import Tuto from './Tuto'
import NewBadge from './NewBadge'

import { generateToken } from './helpers/token'
import { getBadge } from './helpers/badges'
import { useLocalStorage, isLocalStorageNameSupported } from './helpers/localStorage'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.localUser,
      addresses: [...props.localAddresses],
      tuto: 0,
      newBadge: null,
      showProfile: false,
      selectedAddress: null,
      userCoords: null,
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

  saveToLocalStorage() {
    if (!isLocalStorageNameSupported()) return
    const { addresses, user } = this.state
    useLocalStorage('setItem', 'addresses', addresses)
    useLocalStorage('setItem', 'user', user)
  }

  @bind
  saveAddresses(addresses) {
    this.setState({addresses}, () => this.saveToLocalStorage(addresses))
  }

  @bind
  openMenu() {
    const { tuto } = this.state
    if (tuto === 1) this.tutoNextStep()
    this.setState({fullscreen: false})
  }

  @bind
  closeMenu() {
    this.setState({fullscreen: true, selectedAddress: null})
  }

  /* ADDRESS */

  @bind
  updateAddress(address) {
    const { addresses, selectedAddress } = this.state
    let cpyAddresses = [...addresses]

    if (!address) {
      cpyAddresses.pop(selectedAddress)
      this.closeMenu()
    } else if (address && selectedAddress) {
      const addressToEdit = cpyAddresses.find(addr => addr.id === selectedAddress.id)
      addressToEdit.address = address
    } else if (address && !selectedAddress) {
      cpyAddresses = this.addAddress(address)
      this.closeMenu()
    }

    this.saveAddresses(cpyAddresses)
  }

  @bind
  addAddress(address) {
    const { user, addresses, coords, tuto } = this.state
    if (!addresses.length) this.winBadge(getBadge('first address'))
    const cpyAddresses = [...addresses]
    const coordinates = {
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed,
    }
    cpyAddresses.push({
      address,
      coords: coordinates,
      id: `${address.houseNumber}_${address.street}_${user.id}`,
      createAt: Date.now(),
      createBy: user,
      proposals: [],
    })
    if (tuto === 2 ) this.tutoNextStep()
    this.closeMenu()
    return cpyAddresses
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
    this.setState({fullscreen: false, selectedAddress: address})
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
    const { user } = this.state
    user.email = email
    this.setState({user}, useLocalStorage('setItem', 'user', user))
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
  displayProfile() {
    this.setState({showProfile: !this.state.showProfile})
  }

  render() {
    const { user, tuto, coords, newBadge, showProfile, addresses, selectedAddress, fullscreen, error } = this.state
    if (!user.token) return <Welcome skip={this.setToken}/>
    if (error) return <Error error={error} />
    if (!coords) return <Loading />
    return (
      <div className="container">
        {newBadge ?
          <NewBadge badge={newBadge} closeWindow={this.resetNewBadge} /> :
          <Tuto close={this.tutoNextStep} stepIndex={tuto} saveProgression={this.setEmail} done={this.unlockedBadge('tutorial')} />
        }
        <TopNavigation user={user} minimize={!showProfile} close={this.displayProfile} inscription={this.setEmail} />
        <Map user={user} addresses={addresses} selectedAddress={selectedAddress} coords={selectedAddress ? selectedAddress.coords : coords} fullscreen={fullscreen} displayAddress={this.displayAddress} closeMenu={this.closeMenu} />
        <BottomNavigation user={user} coords={coords} selectedAddress={selectedAddress} displayDashboard={fullscreen} openForm={this.openMenu} updateAddress={this.updateAddress} addProposal={this.addProposal} removeProposal={this.removeProposal}/>
      </div>
    )
  }
}
