const { bind } = decko

class CreateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeInput: 'houseNumbers',
      houseNumber: '',
      street: '',
      houseNumbers: [],
      streets: [],
    }
  }

  componentDidMount() {
      this.getNumbersSuggestions(),
      this.getStreetsSuggestions()
  }

  @bind
  getNumbersSuggestions() {
    this.setState({houseNumbers: [8, 10, 12, 14, 16, 1, 5, 7, 9, 11]})
  }

  @bind
  getStreetsSuggestions() {
    this.setState({streets: ['rue de Javel', 'avenue Émile Zola', 'Quai André Citroën', 'port de Javel Haut']})
  }

  @bind
  handleStreetChange(e) {
    this.setStreet(e.target.value)
  }

  @bind
  handleNumberChange(e) {
    this.setHouseNumber(e.target.value)
  }

  @bind
  setHouseNumber(houseNumber) {
    this.setState({houseNumber})
  }

  @bind
  setStreet(street) {
    this.setState({street})
  }

  @bind
  selectInput(input) {
    this.setState({activeInput: input})
  }

  @bind
  add() {
    const { houseNumber, street } = this.state
    const { coords, createAddress } = this.props
    createAddress(coords, {houseNumber, street})
  }

  render() {
    const { activeInput, houseNumber, street, houseNumbers, streets, error } = this.state
    if (error) return <Error error={error}/>

    return (
      <div>
        <div class="address-form">
          <input class="houseNumber-input" type="text" placeholder="N°" value={houseNumber} onInput={this.handleNumberChange} onClick={() => this.selectInput('houseNumbers')} />
          <input class="street-input" type="text" placeholder="Nom de la voie" value={street} onInput={this.handleStreetChange} onClick={() => this.selectInput('streets')} />
        </div>
        {houseNumber && street ? <div onClick={this.add} class="create-button">Créer le {houseNumber} {street}</div> : null}
        <Suggestions suggestions={{houseNumbers, streets}} selectHouseNumber={this.setHouseNumber} selectStreet={this.setStreet} activeInput={activeInput} />
      </div>
    )
  }
}
