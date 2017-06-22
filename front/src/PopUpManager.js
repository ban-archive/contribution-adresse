const { h } = preact

import Tuto from './Tuto'
import PopUp from './PopUp'
import NewBadge from './NewBadge'
import EmailForm from './EmailForm'

const PopUpManager = ({ userEmail, showEmailForm, newBadge, tuto, setEmail, tutoNextStep, displayEmailForm, resetNewBadge }) => {
  let popUp = <Tuto nextStep={tutoNextStep} stepIndex={tuto} saveProgression={displayEmailForm} />

  if (showEmailForm) {
    popUp = (
      <PopUp close={displayEmailForm} reverse={true} position="center">
        <EmailForm userEmail={userEmail} onSubmit={setEmail} />
      </PopUp>
    )
  } else if (newBadge) {
    popUp = <NewBadge badge={newBadge} closeWindow={resetNewBadge} />
  }

  return popUp
}

export default PopUpManager
