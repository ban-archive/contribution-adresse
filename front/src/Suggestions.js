class Suggestions extends Component {
  render() {
    const { suggestions, selectNumber, selectStreet, active } = this.props
    return (
      <div class="Suggestions">
        {suggestions[active].map(suggestion =>
          <div class="suggestion" onClick={active === 'numbers' ? () => selectNumber(suggestion) : () => selectStreet(suggestion)}>{suggestion}</div>)}
      </div>
    )
  }
}
