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
    const { houseNumber, additional, street, handleHouseNumberChange, handleAdditionalChange, handleStreetChange, removeAddress } = this.props
    const { editInput } = this.state

    if (editInput) return <AddressForm houseNumber={houseNumber} additional={additional} street={street} onHouseNumberChange={handleHouseNumberChange} onAdditionalChange={handleAdditionalChange} onStreetChange={handleStreetChange} onSubmit={this.edit} />

    return (
      <div class="Address">
        <div class="address">
          <img class="location_logo" src="location_logo.svg" alt="location_logo" />
          <div class="address">
            {houseNumber} {additional} {street}
          </div>
        </div>
        <div class="divider" />
        <div class="actions">
          <button onClick={removeAddress} class="remove">Supprimer</button>
          <button onClick={this.editing} class="edit">Modifier</button>
        </div>
      </div>
    )
  }
}
