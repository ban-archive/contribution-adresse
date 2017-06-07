class Suggestions extends Component {
  render() {
    const { suggestions, selectHouseNumber, selectStreet, activeInput } = this.props
    return (
      <div class="Suggestions">
        {suggestions[activeInput].map(suggestion =>
          <div class="suggestion" onClick={activeInput === 'houseNumbers' ? selectHouseNumber : selectStreet}>{suggestion}</div>)}
      </div>
    )
  }
}
