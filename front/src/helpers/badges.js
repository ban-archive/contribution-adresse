export const badges = [
  {id: 1, name: 'tutorial', condition: 'Terminer le tutoriel', img: 'badges/tutorial_badge.svg'},
  {id: 2, name: 'first address', condition: 'Ajouter votre première adresse', img: 'badges/first_address_badge.svg'},
]

export function getBadge(badgeName) {
  return badges.find(badge => badge.name === badgeName)
}
