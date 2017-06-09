class NewBadge extends Component {
  render() {
    const { badge, closeWindow } = this.props

    return (
      <div class="NewBadge">
        <div class="panel">
          <div>Vous avez gagné un nouveau badge !</div>
          <div>
            <img alt={badge.name} src={badge.img} />
            <div class="background"></div>
          </div>
          <div>{badge.condition}</div>
          <button onClick={closeWindow}>Ok</button>
        </div>
      </div>
    )
  }
}
