const { h } = preact

import Tuto from './Tuto'
import NewBadge from './NewBadge'

const PopUpManager = ({ newBadge, tuto, tutoDone, setEmail, tutoNextStep, resetNewBadge }) => {
  let popUp

  if (!tutoDone) {
    popUp = <Tuto nextStep={tutoNextStep} stepIndex={tuto} saveProgression={setEmail} />
  }
  if (newBadge) {
    popUp = <NewBadge badge={newBadge} closeWindow={resetNewBadge} />
  }

  return popUp
}

export default PopUpManager
