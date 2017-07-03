const { h } = preact

const types = {
  creation: {
    icon: 'addHome.svg',
    text: 'Créé',
  },
  suppression: {
    icon: 'removeHome.svg',
    text: 'Supprimé',
  },
  edition: {
    icon: 'edit.svg',
    text: 'Modifié',
  },
  comment: {
    icon: 'message.svg',
    text: 'Commenté',
  },
  disapprove: {
    icon: 'like.svg',
    text: 'Désapprouvé',
  },
  approve: {
    icon: 'like.svg',
    text: 'Approuvé',
  },
}

function getType(proposal) {
  return types[proposal.type]
}

const HistoryStep = ({ proposal }) => {
  const email = proposal.user.email
  const username = email ? email.substr(0, proposal.user.email.indexOf('@')) : 'Anonyme'
  const date = new Date(proposal.date)
  const type = getType(proposal)

  return (
    <div class="step">
      <div class="icon">
        <img class={proposal.type === 'disapprove' ? 'upside-down' : ''} src={type.icon} alt={type.text} />
      </div>
      <div class="step-infos">
        <div class="date">{date.getDate() + '/' + (date.getMonth() + 1)  + '/' +  date.getFullYear()}</div>
        <div class="proposal">
          <p>{type.text} par <div class="user">{username}</div></p>
          {proposal.comment ? <div class="comment">{`"${proposal.comment}"`}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default HistoryStep
