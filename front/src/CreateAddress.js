const { bind } = decko

class CreateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
    }
  }

  @bind
  handleChange(e) {
    this.setState({address: e.target.value})
  }

  @bind
  add() {
    const { address } = this.state
    const { coords, createAddress } = this.props

    createAddress(coords, address)
  }

  render() {
    const { address } = this.state

    return (
      <div class="CreateAddress">
        <div class="searchbar">
          <input type="text" value={address} onInput={this.handleChange} />
          <img src="location_logo.png" alt="location_logo" />
        </div>
        {address.length ? <div onClick={this.add} class="create-button">Créer le {address}</div> : null}
      </div>
    )
  }
}
