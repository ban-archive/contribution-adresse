import { bind } from 'decko'
import React, { Component } from 'react'

import Dashboard from './Dashboard'
import Menu from './Menu'
import Address from './Address'
import AddressForm from './AddressForm'

export default class BottomNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {editing: false}
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

  @bind
  clearForm() {
    this.setState({editing: false, houseNumber: '', additional: '', street: ''})
  }

  @bind
  addProposal(proposal) {
    const { updateAddress, selectedAddress } = this.props
    const address = Object.assign({}, selectedAddress)
    console.log(selectedAddress)

    address.proposals.push(proposal)
    updateAddress(address)
  }

  @bind
  removeProposal() {
    const { user, updateAddress, selectedAddress } = this.props
    const address = Object.assign({}, selectedAddress)
    const proposal = address.proposals.find(proposal => proposal.user.token === user.token)

    address.proposals.pop(proposal)
    updateAddress(address)
  }

  @bind
  editAddress() {
    const { houseNumber, additional, street } = this.props.selectedAddress.address
    this.setState({editing: true, houseNumber, additional, street})
  }

  @bind
  saveAddress() {
    const { houseNumber, additional, street } = this.state
    const { selectedAddress, updateAddress } = this.props
    const newAddress = { houseNumber, additional, street }

    if (selectedAddress) {
      selectedAddress.address = newAddress
    }

    updateAddress(selectedAddress || newAddress)
    this.clearForm()
  }

  @bind
  removeAddress() {
    const { updateAddress } = this.props
    updateAddress()
  }

  render() {
    const { houseNumber, additional, street, editing } = this.state
    const { user, coords, selectedAddress, displayDashboard, openForm } = this.props
    const speed = Number((coords.speed || 0).toFixed())
    const accuracy = Number((coords.accuracy || 0).toFixed())

    if (displayDashboard) return <Dashboard speed={speed} accuracy={accuracy} openForm={openForm} />

    return (
      <Menu>
        {selectedAddress && !editing ?
          <Address user={user} address={selectedAddress} editAddress={this.editAddress} removeAddress={this.removeAddress} handleContribution={this.addProposal} cancelContribution={this.removeProposal} /> :
          <AddressForm
            address={{ houseNumber, additional, street }}
            onHouseNumberChange={this.handleHouseNumberChange}
            onAdditionalChange={this.handleAdditionalChange}
            onStreetChange={this.handleStreetChange}
            onSubmit={this.saveAddress} />
        }
      </Menu>
    )
  }
}
