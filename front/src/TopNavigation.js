import { h, Component } from 'preact'
import { bind } from 'decko'

import EmailForm from './EmailForm'
import BadgesMenu from './BadgesMenu'
import Profile from './Profile'

export default class TopNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {showBadges: false, editMail: false}
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
  updateEmail(e) {
    const { inscription } = this.props
    this.toggleEditEmail()
    inscription(e)
  }

  render() {
    const { showBadges, editMail } = this.state
    const { user, minimize, close } = this.props
    const badges = user.badges || []
    const contributions = user.contributions || []

    if (minimize) return (
      <div className="profile-menu-minimize" onClick={close}>{badges.length}</div>
    )

    if (!user.email || editMail) return (
      <div className="menu column">
        <img className="close" onClick={close} src="close_icon.svg"/>
        <div className="column center profile">
          <img alt="profile_icon" src="profile_icon.svg"/>
          <div className="badges-number">{badges.length}</div>
          <EmailForm userEmail={user.email} onSubmit={this.updateEmail}/>
        </div>
      </div>
    )

    if (showBadges) return <BadgesMenu unlockedBadges={badges} close={this.displayBadgesMenu}/>

    return <Profile user={user} badges={badges} contributions={contributions} close={close} toggleEditEmail={this.toggleEditEmail} displayBadgesMenu={this.displayBadgesMenu}/>
  }
}
