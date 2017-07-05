import badges from './badges.json'
import { h, Component } from 'preact'

export default class BadgesMenu extends Component {
  render() {
    const { unlockedBadges, close } = this.props

    return (
      <div className="menu">
        <div>
          <h2>Badges</h2>
          <img className="close" onClick={close} src="close_icon.svg"/>
        </div>
        <div className="list">
          {badges.map(badge => {
            const unlock = unlockedBadges.find(unlockedBadge => unlockedBadge.id === badge.id)
            return (
              <div className="badge">
                <img alt={badge.name} src={unlock ? badge.img : 'badges/locked.svg'} />
                <div>{badge.condition}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
