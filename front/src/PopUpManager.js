const { h } = preact

import Tuto from './Tuto'
import PopUp from './PopUp'
import NewBadge from './NewBadge'
import EmailForm from './EmailForm'

const PopUpManager = ({ user, showEmailForm, tutorialBadgeUnlocked, newBadge, tuto, setEmail, tutoNextStep, displayEmailForm, resetNewBadge }) => {
  return (
    <div>
      {!tutorialBadgeUnlocked && !newBadge ? <Tuto nextStep={tutoNextStep} stepIndex={tuto} saveProgression={displayEmailForm} /> : null}
      {newBadge && !showEmailForm ? <NewBadge badge={newBadge} closeWindow={resetNewBadge} /> : null}
      {showEmailForm ?
        <PopUp close={displayEmailForm} reverse={true} position="center">
          <EmailForm userEmail={user.email} onSubmit={setEmail} />
        </PopUp> : null}
    </div>
  )
}

export default PopUpManager
