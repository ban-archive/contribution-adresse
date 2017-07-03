const { h, Component } = preact
const { bind } = decko

import EmailForm from './EmailForm'
import BadgesMenu from './BadgesMenu'
import Profile from './Profile'

export default class TopNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {showBadges: false, editMail: false}
  }

  componentWillUpdate() {
    const { user } = this.props

    this.setState({editMail: !user.email})
  }

  @bind
  displayBadgesMenu() {
    this.setState({showBadges: !this.state.showBadges})
  }

  @bind
  toggleEditEmail() {
    this.setState({editMail: !this.state.editMail})
  }

  @bind
  updateEmail(email) {
    const { inscription } = this.props
    this.toggleEditEmail()
    inscription(email)
  }

  render() {
    const { showBadges, editMail } = this.state
    const { user, minimize, close } = this.props
    const badges = user.badges || []
    const contributions = user.contributions || []

    if (minimize) return (
      <div class="profile-menu-minimize" onClick={close}>{badges.length}</div>
    )

    if (editMail) return (
      <div class="menu column">
        <img class="close" onClick={close} src="close_icon.svg"/>
        <div class="column center profile">
          <img alt="profile_icon" src="profile_icon.svg"/>
          <div class="badges-number">{badges.length}</div>
          <EmailForm userEmail={user.email} onSubmit={this.updateEmail}/>
        </div>
      </div>
    )

    if (showBadges) return <BadgesMenu unlockedBadges={badges} close={this.displayBadgesMenu}/>

    return <Profile user={user} badges={badges} contributions={contributions} close={close} toggleEditEmail={this.toggleEditEmail} displayBadgesMenu={this.displayBadgesMenu}/>
  }
}
