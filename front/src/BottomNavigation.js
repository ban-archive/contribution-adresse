const { h, Component } = preact
const { bind } = decko

import Dashboard from './Dashboard'
import Address from './Address'
import AddressForm from './AddressForm'
import { isSameAddress } from './helpers/address'

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
    let selectedAddressCpy

    if (selectedAddress) {
      if (isSameAddress(selectedAddress.address, newAddress)) return
      selectedAddressCpy = Object.assign({}, selectedAddress)
      selectedAddressCpy.address = newAddress
    }

    updateAddress(selectedAddressCpy || newAddress)
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
    let toRender

    if (displayDashboard) {
      toRender = <Dashboard speed={speed} accuracy={accuracy} openForm={openForm} />
    } else if (selectedAddress && !editing) {
      toRender = <Address
                    userAddress={selectedAddress.createBy.token === user.token}
                    user={user}
                    address={selectedAddress}
                    editAddress={this.editAddress}
                    removeAddress={this.removeAddress}
                    handleContribution={this.addProposal}
                    cancelContribution={this.removeProposal} />
    } else {
      toRender = <AddressForm
                    address={{ houseNumber, additional, street }}
                    onHouseNumberChange={this.handleHouseNumberChange}
                    onAdditionalChange={this.handleAdditionalChange}
                    onStreetChange={this.handleStreetChange}
                    onSubmit={this.saveAddress} />
    }

    return toRender
  }
}
