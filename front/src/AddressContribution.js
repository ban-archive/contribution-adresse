const { bind } = decko
const { Component, h } = preact

export default class AddressContribution extends Component {

  @bind
  valid() {
    const { user, handleContribution } = this.props
    handleContribution({
      user,
      date: Date.now(),
      type: 'approve',
      comment: '',
    })
  }

  @bind
  decline() {
    const { user, handleContribution } = this.props
    handleContribution({
      user,
      date: Date.now(),
      type: 'disapprove',
      comment: '',
    })
  }

  render() {
    const { user, address, cancelContribution, displayHistory } = this.props
    const { houseNumber, additional, street } = address.address
    const userProposal = address.proposals.find(proposal => proposal.user.token === user.token)

    return (
      <div class="Address">
        <p>Cette adresse est-elle correcte ?</p>
        <div class="divider" />
        <div class="address">
          <img class="location_logo" src="location_logo.svg" alt="location_logo" />
          <div class="address">
            {houseNumber} {additional} {street}
          </div>
        </div>
        <div class="divider" />
        {userProposal ?
          <div class="thanks">
            <p>Merci de votre contribution !</p>
            <div>{userProposal.type === 'approve' ? <img alt="valider" src="like.svg" /> : <img class="upside-down" alt="refuser" src="like.svg" />}</div>
            <div onClick={cancelContribution}>Modifier votre contribution</div>
          </div>:
          <div>
            <div class="actions">
            <img onClick={this.valid} alt="valider" src="like.svg" />
            <div class="divider vertical" />
            <img class="upside-down" onClick={this.decline} alt="refuser" src="like.svg" />
          </div>
        </div>}
        <button onClick={displayHistory}>Voir l'historique</button>
      </div>
    )
  }
}
