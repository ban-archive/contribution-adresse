const { bind } = decko

class AddressForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeInput: 'houseNumbers',
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
  selectInput(input) {
    this.setState({activeInput: input})
  }

  render() {
    const { activeInput,  houseNumbers, streets, error } = this.state
    const { houseNumber, street, onHouseNumberChange, onStreetChange, onSubmit } = this.props
    if (error) return <Error error={error}/>

    return (
      <div>
        <div class="address-form">
          <input class="houseNumber-input" type="text" placeholder="N°" value={houseNumber} onInput={onHouseNumberChange} onClick={() => this.selectInput('houseNumbers')} />
          <input class="street-input" type="text" placeholder="Nom de la voie" value={street} onInput={onStreetChange} onClick={() => this.selectInput('streets')} />
        </div>
        {houseNumber && street ? <div onClick={onSubmit} class="create-button">Créer le {houseNumber} {street}</div> : null}
        <Suggestions suggestions={{houseNumbers, streets}} selectHouseNumber={onHouseNumberChange} selectStreet={onStreetChange} activeInput={activeInput} />
      </div>
    )
  }
}
