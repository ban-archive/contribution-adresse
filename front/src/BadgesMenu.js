import badges from './badges.json'
import { h, Component } from 'preact'

export default class BadgesMenu extends Component {
  render() {
    const { unlockedBadges, close } = this.props

    return (
      <div class="menu">
        <div>
          <h2>Badges</h2>
          <img class="close" onClick={close} src="close_icon.svg"/>
        </div>
        <div class="list">
          {badges.map(badge => {
            const unlock = unlockedBadges.find(unlockedBadge => unlockedBadge.id === badge.id)
            return (
              <div class="badge">
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
