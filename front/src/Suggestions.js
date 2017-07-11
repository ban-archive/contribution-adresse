import React from 'react'

const Suggestions = ({ suggestions, selectSuggestion }) => (
  <div className="menu">
    {suggestions.map(suggestion =>
      <div className="suggestion" onClick={selectSuggestion}>{suggestion}</div>)}
  </div>
)

export default Suggestions
