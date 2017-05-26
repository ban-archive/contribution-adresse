class Suggestions extends Component {
  render() {
    const { suggestions  } = this.props

    return (
      <div class="Suggestions">
        {suggestions.map(suggestion => <div class="suggestion">{suggestion}</div>)}
      </div>
    )
  }
}
