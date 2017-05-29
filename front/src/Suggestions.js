class Suggestions extends Component {
  render() {
    const { suggestions, selectNumber, selectStreet, activeInput } = this.props
    return (
      <div class="Suggestions">
        {suggestions[activeInput].map(suggestion =>
          <div class="suggestion" onClick={activeInput === 'numbers' ? () => selectNumber(suggestion) : () => selectStreet(suggestion)}>{suggestion}</div>)}
      </div>
    )
  }
}
