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
        <button onClick={props.close}>Ok</button>
      </PopUp>,
      <PopUp arrowBox={true}>
        Appuyez sur le bouton pour ajouter une nouvelle adresse
      </PopUp>,
      <PopUp position="top">
        <div>Saisissez le numéro ainsi que le nom de la voie de l'adresse</div>
      </PopUp>,
      <PopUp reverse={true} position="center" close={props.close}>
        <div>
          <p>Félicitations vous venez de créer votre première adresse !</p>
          <p>Grâce à votre contribution, la base adresse national s'est enrichie</p>
          <b>Sauvegardez votre progression !</b>
          <EmailForm onSubmit={this.endTutorial} />
        </div>
      </PopUp>,
    ]
  }

  @bind
  endTutorial(email) {
    const { close, saveProgression } = this.props
    close()
    saveProgression(email)
  }

  render() {
    const { stepIndex, done } = this.props
    if (done) return
    return this.step[stepIndex] || null
  }
}
