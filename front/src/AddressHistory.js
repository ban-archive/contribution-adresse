const { h } = preact

import Menu from './Menu'
import HistoryStep from './HistoryStep'

const AddressHistory = ({ proposals, closeHistory }) => {
  return (
    <Menu title="Historique" onClose={closeHistory}>
      <div class="timeline">
        {proposals.map(proposal => <HistoryStep proposal={proposal} />)}
      </div>
    </Menu>
  )
}

export default AddressHistory
