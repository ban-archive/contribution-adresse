const { h, Component } = preact
const { bind } = decko

import EmailForm from './EmailForm'
import PopUp from './PopUp'

export default class Tuto extends Component {
  constructor(props) {
    super(props)
    this.step = [
      <PopUp position="center">
        <p>Placez vous à l'adresse que vous souhaitez ajouter</p>
        <button onClick={props.nextStep}>Ok</button>
      </PopUp>,
      <PopUp arrowBox={true}>
        Appuyez sur le bouton pour ajouter une nouvelle adresse
      </PopUp>,
      <PopUp position="top">
        <div>Saisissez le numéro ainsi que le nom de la voie de l'adresse</div>
      </PopUp>,
      <PopUp reverse={true} position="center" close={props.nextStep}>
        <div>
          <p>Félicitations vous venez de créer votre première adresse !</p>
          <p>Grâce à votre contribution, la base adresse national s'est enrichie</p>
          <b>Sauvegardez votre progression !</b>
          <EmailForm userEmail={props.userEmail} onSubmit={this.endTutorial} />
        </div>
      </PopUp>,
    ]
  }

  @bind
  endTutorial() {
    const { nextStep, saveProgression } = this.props
    nextStep()
    saveProgression()
  }

  render() {
    const { stepIndex } = this.props

    return this.step[stepIndex] || null
  }
}
