const { h, Component } = preact

export default class NewBadge extends Component {
  render() {
    const { badge, closeWindow } = this.props

    return (
      <div class="overlay resizable center">
        <div class="panel">
          <div>Vous avez gagné un nouveau badge !</div>
          <div class="new-badge">
            <img alt={badge.name} src={badge.img} />
            <div class="background-spinner"></div>
          </div>
          <div>{badge.condition}</div>
          <button onClick={closeWindow}>Ok</button>
        </div>
      </div>
    )
  }
}
