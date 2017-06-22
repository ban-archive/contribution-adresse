const { h } = preact

import Tuto from './Tuto'
import NewBadge from './NewBadge'

const PopUpManager = ({ userEmail, newBadge, tuto, setEmail, tutoNextStep, resetNewBadge }) => {
  let popUp = <Tuto userEmail={userEmail} nextStep={tutoNextStep} stepIndex={tuto} saveProgression={setEmail} />

  if (newBadge) {
    popUp = <NewBadge badge={newBadge} closeWindow={resetNewBadge} />
  }

  return popUp
}

export default PopUpManager
