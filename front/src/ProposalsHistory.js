import { h } from 'preact'

const ProposalsHistory = ({ proposals }) => (
  <div className="ProposalsHistory">
    <p>Historique</p>
    <div className="list">
      {proposals.map((proposal, idx) =>
        <div className="row spread">
          <div>{proposal.user.email.split('@')[0]}</div>
          <div>{proposal.valid ? <img alt="valider" src="like.svg" /> : <img className="upside-down" alt="refuser" src="like.svg" />}</div>
          {idx + 1 !== proposals.length ? <div className="half divider" /> : null}
        </div>
      )}
    </div>
  </div>
)

export default ProposalsHistory
