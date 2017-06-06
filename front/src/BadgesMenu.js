const badges = [
  {id: 1, name: 'tutorial', condition: 'Terminer le tutoriel', img: 'badges/tutorial_badge.png'},
  {id: 2, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
  {id: 3, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
  {id: 4, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
  {id: 5, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
  {id: 6, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
  {id: 7, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
  {id: 8, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
  {id: 9, name: 'first address', condition: 'Ajouter sa première adresse', img: 'badges/first_address_badge.png'},
]

class BadgesMenu extends Component {
  render() {
    const { minimize, unlockedBadges, displayMenu } = this.props

    if (minimize) return (
      <div class="badges-menu-minimize" onClick={displayMenu}>
        <div>{unlockedBadges.length}</div>
        <img alt="badge icon" src="badges/empty.png" />
      </div>
    )

    return (
      <div class="BadgesMenu">
        <div>
          <h2>Badges</h2>
          <img class="close" onClick={displayMenu} src="close_icon.png"/>
        </div>
        <div class="badges-list">
          {badges.map(badge => {
            const unlock = unlockedBadges.find(unlockedBadge => unlockedBadge.id === badge.id)
            return (
              <div class="badge">
                <img alt={badge.name} src={unlock ? badge.img : 'badges/locked.png'} />
                <div>{badge.condition}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
