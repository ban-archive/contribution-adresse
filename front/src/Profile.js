class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {showBadges: false, editMail: false}
  }

  @bind
  displayBadgesMenu() {
    this.setState({showBadges: !this.state.showBadges})
  }

  @bind
  changeEmail() {
    this.setState({editMail: !this.state.editMail})
  }

  @bind
  modifyEmail(e) {
    const { inscription } = this.props
    this.changeEmail()
    inscription(e)
  }

  render() {
    const { showBadges, editMail } = this.state
    const { user, minimize, close } = this.props
    const badges = user.badges || []
    const contributions = user.contributions || []

    if (minimize) return (
      <div class="profile-menu-minimize" onClick={close}>{badges.length}</div>
    )

    if (!user.email || editMail) return (
      <div class="menu column">
        <img class="close" onClick={close} src="close_icon.svg"/>
        <div class="column center profile">
          <img alt="profile_icon" src="profile_icon.svg"/>
          <div class="badges-number">{badges.length}</div>
          <EmailForm userEmail={user.email} onSubmit={this.modifyEmail}/>
        </div>
      </div>
    )

    if (showBadges) return <BadgesMenu unlockedBadges={badges} close={this.displayBadgesMenu}/>

    return (
      <div class="menu column">
        <img class="close" onClick={close} src="close_icon.svg"/>
        <div class="column center profile">
          <img alt="profile_icon" src="profile_icon.svg"/>
          <div class="badges-number">{badges.length}</div>
          <div class="profile-email">
            <div>{user.email}</div>
            <img class="edit-icon" onClick={this.changeEmail} alt="modifier" src="edit_icon.svg"/>
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
          <button class="reverse" onClick={this.displayBadgesMenu}>Voir tout les badges</button>
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
                'Vous n\'avez pas encore contribuer.'
            }
          </div>
        </div>
      </div>
    )
  }
}
