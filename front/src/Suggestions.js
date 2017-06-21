const { h, Component } = preact

export default class Suggestions extends Component {
  render() {
    const { suggestions, selectSuggestion } = this.props

    return (
      <div class="menu">
        {suggestions.map(suggestion =>
          <div class="suggestion" onClick={selectSuggestion}>{suggestion}</div>)}
      </div>
    )
  }
}
