import { bind } from 'decko'
import React, { Component } from 'react'

export default class AddressContribution extends Component {

  @bind
  valid() {
    const { user, handleContribution } = this.props
    handleContribution({
      user,
      date: Date.now(),
      valid: true,
    })
  }

  @bind
  decline() {
    const { user, handleContribution } = this.props
    handleContribution({
      user,
      date: Date.now(),
      valid: false,
    })
  }

  render() {
    const { user, address, cancelContribution } = this.props
    const { houseNumber, additional, street } = address.address
    const userProposal = address.proposals.find(proposal => proposal.user.token === user.token)

    return (
      <div className="Address">
        <p>Cette adresse est-elle correcte ?</p>
        <div className="divider" />
        <div className="address">
          <img className="location_logo" src="location_logo.svg" alt="location_logo" />
          <div className="address">
            {houseNumber} {additional} {street}
          </div>
        </div>
        <div className="divider" />
        {userProposal ?
          <div className="thanks">
            <p>Merci de votre contribution !</p>
            <div>{userProposal.valid ? <img alt="valider" src="like.svg" /> : <img className="upside-down" alt="refuser" src="like.svg" />}</div>
            <div onClick={cancelContribution}>Modifier votre contribution</div>
          </div>:
          <div>
            <div className="actions">
              <img onClick={this.valid} alt="valider" src="like.svg" />
              <div className="divider vertical" />
              <img className="upside-down" onClick={this.decline} alt="refuser" src="like.svg" />
            </div>
          </div>}
      </div>
    )
  }
}
