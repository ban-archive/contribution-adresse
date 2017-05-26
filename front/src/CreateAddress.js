const { bind } = decko

class CreateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      compl: '',
      street: '',
      suggestions: [],
    }
  }

  componentDidMount() {
    this.setState({suggestions: this.getSuggestions()})
  }

  @bind
  getSuggestions() {
    return ['rue du moulin', 'chemin de la vieille', 'rue de la soupe de grenouille', 'rue des nonnes']
  }

  @bind
  handleStreetChange(e) {
    this.setState({street: e.target.value})
  }

  @bind
  handleNumberChange(e) {
    this.setState({number: e.target.value})
  }

  @bind
  add() {
    const { street } = this.state
    const { coords, createAddress } = this.props

    createAddress(coords, {number, street})
  }

  render() {
    const { number, street, suggestions } = this.state
    return (
      <div>
        <div class="address-form">
          <input class="number-input" type="text" placeholder="N°" value={number} onInput={this.handleNumberChange} />
          <input class="street-input" type="text" placeholder="Nom de la voie" value={street} onInput={this.handleStreetChange} />
        </div>
        <Suggestions suggestions={suggestions} />
        {number && street ? <div onClick={this.add} class="create-button">Créer le {number} {street}</div> : null}
      </div>
    )
  }
}

// <div class="searchbar">
//   <input type="text" value={street} onInput={this.handleChange} />
//   <img src="location_logo.png" alt="location_logo" />
// </div>
