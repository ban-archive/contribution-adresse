const { h } = preact

const Suggestions = ({ suggestions, selectSuggestion }) => (
  <div class="menu">
    {suggestions.map(suggestion =>
      <div class="suggestion" onClick={selectSuggestion}>{suggestion}</div>)}
  </div>
)

export default Suggestions
