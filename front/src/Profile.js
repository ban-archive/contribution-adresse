import React from 'react'

const Profile = ({ user, badges, contributions, close, toggleEditEmail, displayBadgesMenu }) => {
  return (
    <div className="menu column">
      <img className="close" onClick={close} src="close_icon.svg"/>
      <div className="column center profile">
        <img className="avatar" alt="profile_icon" src="profile_icon.svg"/>
        <div className="badges-number">{badges.length}</div>
        <div className="profile-email">
          <div>{user.email}</div>
          <img className="edit-icon" onClick={toggleEditEmail} alt="modifier" src="edit_icon.svg"/>
        </div>
      </div>
      <div className="divider"/>
      <div className="section">
        <div className="title">Badges</div>
        <div className="list">
          {badges.length ? badges.map(badge =>
            <div className="badge">
              <img alt={badge.name} src={badge.img} />
              <div>{badge.condition}</div>
            </div>) :
            'Vous n\'avez aucun badge.'
          }
        </div>
        <button className="reverse" onClick={displayBadgesMenu}>Voir tout les badges</button>
      </div>
      <div className="divider"/>
      <div className="section">
        <div className="title">Contributions</div>
        <div className="list">
          {contributions.length ? contributions.map(contribution =>
            <div>
              <img className="location_logo" src="location_logo.svg" alt="location_logo" />
              <div className="address">
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
