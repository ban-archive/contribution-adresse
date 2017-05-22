const { bind } = decko

class CreateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      street: '',
    }
  }

  @bind
  handleChange(e) {
    this.setState({street: e.target.value})
  }

  @bind
  add() {
    const { street } = this.state
    const { coords, createAddress } = this.props

    createAddress(coords, {street, town: '28100 Dreux'})
  }

  render() {
    const { street } = this.state

    return (
      <div>
        <div class="searchbar">
          <input type="text" value={street} onInput={this.handleChange} />
          <img src="location_logo.png" alt="location_logo" />
        </div>
        {street.length ? <div onClick={this.add} class="create-button">Créer le {street}</div> : null}
      </div>
    )
  }
}
