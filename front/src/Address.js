const { bind } = decko

class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newAddress: {street: '', town: ''},
      editInput: false,
    }
  }

  @bind
  edit() {
    const { address, editAddress } = this.props
    const { newAddress } = this.state
    this.setState({editInput: false}, editAddress(address, newAddress))
  }

  @bind
  remove() {
    const { address, removeAddress } = this.props
    removeAddress(address)
  }

  @bind
  changeTown(e) {
    const { address } = this.props
    const { newAddress } = this.state
    this.setState({newAddress: {street: newAddress ? newAddress.street : address.street, town: e.target.value}})
  }

  @bind
  changeStreet(e) {
    const { address } = this.props
    const { newAddress } = this.state
    this.setState({newAddress: {town: newAddress ? newAddress.town : address.town, street: e.target.value}})
  }

  @bind
  editing() {
    this.setState({editInput: true})
  }

  render() {
    const { address } = this.props
    const { editInput, newAddress } = this.state

    return (
      <div class="Address">
        <div>
          <img class="location_logo" src="location_logo.png" alt="location_logo" />
            {editInput ? (
              <div class="address">
                <input type="text" defaultValue={address.street} onChange={this.changeStreet} />
                <input type="text" defaultValue={address.town} onChange={this.changeTown} />
                <button onClick={this.edit}>Enregister</button>
              </div>
            ) : (
              <div class="address">
                <div>{newAddress.street.length ? newAddress.street : address.street}</div>
                <div>{newAddress.town.length ? newAddress.town : address.town}</div>
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
