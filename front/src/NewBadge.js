import { h, Component } from 'preact'

export default class NewBadge extends Component {
  render() {
    const { badge, closeWindow } = this.props

    return (
      <div className="overlay resizable center">
        <div className="panel">
          <div>Vous avez gagné un nouveau badge !</div>
          <div className="new-badge">
            <img alt={badge.name} src={badge.img} />
            <div className="background-spinner" />
          </div>
          <div>{badge.condition}</div>
          <button onClick={closeWindow}>Ok</button>
        </div>
      </div>
    )
  }
}
