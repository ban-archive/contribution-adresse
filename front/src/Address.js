const { bind } = decko

class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editInput: false,
      newAddress: props.address,
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
    const { newAddress } = this.state
    const address = {town: e.target.value, street: newAddress.street}
    this.setState({newAddress: address})
  }

  @bind
  changeStreet(e) {
    const { newAddress } = this.state
    const address = {town: newAddress.town, street: e.target.value}
    this.setState({newAddress: address})
  }

  @bind
  editing() {
    this.setState({editInput: true})
  }

  render() {
    const { editInput, newAddress } = this.state

    return (
      <div class="Address">
        <div>
          <img class="location_logo" src="location_logo.png" alt="location_logo" />
            {editInput ? (
              <div class="address">
                <input type="text" value={newAddress.street} onChange={this.changeStreet} />
                <input type="text" value={newAddress.town} onChange={this.changeTown} />
                <button onClick={this.edit}>Enregister</button>
              </div>
            ) : (
              <div class="address">
                <div>{newAddress.street}</div>
                <div>{newAddress.town}</div>
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
