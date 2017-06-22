const { h } = preact

const ProposalsHistory = ({ proposals }) => (
  <div class="ProposalsHistory">
    <p>Historique</p>
    <div class="list">
    {proposals.map((proposal, idx) =>
      <div class="row spread">
        <div>{proposal.user.email.split('@')[0]}</div>
        <div>{proposal.valid ? <img alt="valider" src="like.svg" /> : <img class="upside-down" alt="refuser" src="like.svg" />}</div>
        {idx + 1 !== proposals.length ? <div class="half divider" /> : null}
      </div>
    )}
    </div>
  </div>
)

export default ProposalsHistory
