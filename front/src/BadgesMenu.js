import badges from './badges.json'
const { h, Component } = preact

import Menu from './Menu'

export default class BadgesMenu extends Component {
  render() {
    const { unlockedBadges, close } = this.props

    return (
      <Menu title="Badges" onClose={close}>
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
      </Menu>
    )
  }
}
