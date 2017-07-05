const { h, Component } = preact
const { bind } = decko

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
      const address = Object.assign({}, selectedAddress)
      address.address = newAddress
    }
    updateAddress(newAddress)
    this.clearForm()
  }

  @bind
  removeAddress() {
    const { updateAddress } = this.props
    updateAddress()
  }

  render() {
    const { houseNumber, additional, street, editing } = this.state
    const { user, coords, selectedAddress, displayDashboard, openForm, addProposal, removeProposal } = this.props
    const speed = Number((coords.speed || 0).toFixed())
    const accuracy = Number((coords.accuracy || 0).toFixed())

    if (displayDashboard) return <Dashboard speed={speed} accuracy={accuracy} openForm={openForm} />

    return (
      <Menu>
        {selectedAddress && !editing ?
          <Address user={user} address={selectedAddress} editAddress={this.editAddress} removeAddress={this.removeAddress} handleContribution={addProposal} cancelContribution={removeProposal} /> :
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
