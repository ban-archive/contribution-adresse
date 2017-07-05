import { h } from 'preact'

const Profile = ({ user, badges, contributions, close, toggleEditEmail, displayBadgesMenu }) => {
  return (
    <div class="menu column">
      <img class="close" onClick={close} src="close_icon.svg"/>
      <div class="column center profile">
        <img class="avatar" alt="profile_icon" src="profile_icon.svg"/>
        <div class="badges-number">{badges.length}</div>
        <div class="profile-email">
          <div>{user.email}</div>
          <img class="edit-icon" onClick={toggleEditEmail} alt="modifier" src="edit_icon.svg"/>
        </div>
      </div>
      <div class="divider"/>
      <div class="section">
        <div class="title">Badges</div>
        <div class="list">
          {badges.length ? badges.map(badge =>
            <div class="badge">
              <img alt={badge.name} src={badge.img} />
              <div>{badge.condition}</div>
            </div>) :
            'Vous n\'avez aucun badge.'
          }
        </div>
        <button class="reverse" onClick={displayBadgesMenu}>Voir tout les badges</button>
      </div>
      <div class="divider"/>
      <div class="section">
        <div class="title">Contributions</div>
        <div class="list">
          {contributions.length ? contributions.map(contribution =>
            <div>
              <img class="location_logo" src="location_logo.svg" alt="location_logo" />
              <div class="address">
                <div>{contribution.houseNumber}</div>
                <div>{contribution.street}</div>
              </div>
            </div>) :
            'Vous n\'avez pas encore contribué.'
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
