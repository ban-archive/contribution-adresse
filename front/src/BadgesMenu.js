const badges = [
  {id: 1, name: 'tutorial', condition: 'Terminer le tutoriel', img: 'badges/tutorial_badge.svg'},
  {id: 2, name: 'first address', condition: 'Ajouter votre première adresse', img: 'badges/first_address_badge.svg'},
]

class BadgesMenu extends Component {
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
