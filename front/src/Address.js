const { bind } = decko

class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {editInput: false}
  }

  @bind
  edit() {
    const { editAddress } = this.props
    this.setState({editInput: false}, editAddress())
  }

  @bind
  editing() {
    this.setState({editInput: true})
  }

  render() {
    const { street, houseNumber, handleHouseNumberChange, handleStreetChange, removeAddress } = this.props
    const { editInput } = this.state

    if (editInput) return <AddressForm houseNumber={houseNumber} street={street} onHouseNumberChange={handleHouseNumberChange} onStreetChange={handleStreetChange} onSubmit={this.edit} />

    return (
      <div class="Address">
        <div>
          <img class="location_logo" src="location_logo.png" alt="location_logo" />
          <div class="address">
            <div>{houseNumber}</div>
            <div>{street}</div>
          </div>
        </div>
        <div class="divider" />
        <div>
          <button onClick={removeAddress} class="remove">Supprimer</button>
          <button onClick={this.editing} class="edit">Modifier</button>
        </div>
      </div>
    )
  }
}
