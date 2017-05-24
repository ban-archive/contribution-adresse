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
    const { marker, editAddress } = this.props
    const { newAddress } = this.state
    this.setState({editInput: false}, editAddress(marker, newAddress))
  }

  @bind
  remove() {
    const { marker, removeAddress } = this.props
    removeAddress(marker)
  }

  @bind
  changeTown(e) {
    const { street } = this.props.marker.options.address
    const { newAddress } = this.state
    this.setState({newAddress: {street: newAddress.street ? newAddress.street : street, town: e.target.value}})
  }

  @bind
  changeStreet(e) {
    const { town } = this.props.marker.options.address
    const { newAddress } = this.state
    this.setState({newAddress: {town: newAddress.town ? newAddress.town : town, street: e.target.value}})
  }

  @bind
  editing() {
    this.setState({editInput: true})
  }

  render() {
    const { street, town } = this.props.marker.options.address
    const { editInput, newAddress } = this.state

    return (
      <div class="Address">
        <div>
          <img class="location_logo" src="location_logo.png" alt="location_logo" />
            {editInput ? (
              <div class="address">
                <input type="text" defaultValue={street} onChange={this.changeStreet} />
                <input type="text" defaultValue={town} onChange={this.changeTown} />
                <button onClick={this.edit}>Enregister</button>
              </div>
            ) : (
              <div class="address">
                <div>{newAddress.street ? newAddress.street : street}</div>
                <div>{newAddress.town ? newAddress.town : town}</div>
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
