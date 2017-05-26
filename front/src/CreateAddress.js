const { bind } = decko

class CreateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'numbers',
      number: '',
      compl: '',
      street: '',
      numbers: [],
      streets: [],
    }
  }

  componentDidMount() {
      this.getNumbersSuggestions(),
      this.getStreetsSuggestions()
  }

  @bind
  getNumbersSuggestions() {
    this.setState({numbers: [8, 10, 12, 14, 16, 1, 5, 7, 9, 11]})
    // const { latitude, longitude } = this.props.coords
    // fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}`)
    //   .then(response => response.json())
    //   .then(result => this.setState({numbers: result}))
    //   .catch(error => this.setState({error}))
  }

  @bind
  getStreetsSuggestions() {
    this.setState({streets: ['rue de Javel', 'avenue Émile Zola', 'Quai André Citroën', 'port de Javel Haut']})
    // const { latitude, longitude } = this.props.coords
    // fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}`)
    //   .then(response => response.json())
    //   .then(result => this.setState({numbers: result}))
    //   .catch(error => this.setState({error}))
  }

  @bind
  handleStreetChange(e) {
    this.setStreet(e.target.value)
  }

  @bind
  handleNumberChange(e) {
    this.setNumber(e.target.value)
  }

  @bind
  setNumber(number) {
    this.setState({number})
  }

  @bind
  setStreet(street) {
    this.setState({street})
  }

  @bind
  selectInput(input) {
    this.setState({active: input})
  }

  @bind
  add() {
    const { number, street } = this.state
    const { coords, createAddress } = this.props

    createAddress(coords, {number, street})
  }

  render() {
    const { active, number, street, numbers, streets, error } = this.state
    if (error) return <Error error={error}/>

    return (
      <div>
        <div class="address-form">
          <input class="number-input" type="text" placeholder="N°" value={number} onInput={this.handleNumberChange} onClick={() => this.selectInput('numbers')} />
          <input class="street-input" type="text" placeholder="Nom de la voie" value={street} onInput={this.handleStreetChange} onClick={() => this.selectInput('streets')} />
        </div>
        {number && street ? <div onClick={this.add} class="create-button">Créer le {number} {street}</div> : null}
        <Suggestions suggestions={{numbers, streets}} selectNumber={this.setNumber} selectStreet={this.setStreet} active={active} />
      </div>
    )
  }
}
