const { bind } = decko

class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newAddress: {street: '', houseNumber: ''},
      editInput: false,
    }
  }

  @bind
  edit() {
    const { selectedAddress, editAddress } = this.props
    const { newAddress } = this.state
    this.setState({editInput: false}, editAddress(selectedAddress, newAddress))
  }

  @bind
  remove() {
    const { address, removeAddress } = this.props
    removeAddress(address)
  }

  @bind
  changeNumber(e) {
    const { street } = this.props.selectedAddress.address
    const { newAddress } = this.state
    this.setState({newAddress: {street: newAddress.street ? newAddress.street : street, houseNumber: e.target.value}})
  }

  @bind
  changeStreet(e) {
    const { houseNumber } = this.props.selectedAddress.address
    const { newAddress } = this.state
    this.setState({newAddress: {houseNumber: newAddress.houseNumber ? newAddress.houseNumber : houseNumber, street: e.target.value}})
  }

  @bind
  editing() {
    this.setState({editInput: true})
  }

  render() {
    const { street, houseNumber } = this.props.selectedAddress.address
    const { editInput, newAddress } = this.state

    return (
      <div class="Address">
        <div>
          <img class="location_logo" src="location_logo.png" alt="location_logo" />
            {editInput ? (
              <div class="address">
                <input type="text" defaultValue={houseNumber} onChange={this.changeNumber} />
                <input type="text" defaultValue={street} onChange={this.changeStreet} />
                <button onClick={this.edit}>Enregister</button>
              </div>
            ) : (
              <div class="address">
                <div>{newAddress.houseNumber ? newAddress.houseNumber : houseNumber}</div>
                <div>{newAddress.street ? newAddress.street : street}</div>
              </div>
            )}
        </div>
        <div class="divider" />
        <div>
          <button onClick={this.remove} class="remove">Supprimer</button>
          <button onClick={this.editing} class="edit">Modifier</button>
        </div>
      </div>
    )
  }
}
