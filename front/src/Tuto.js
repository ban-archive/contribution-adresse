class Tuto extends Component {
  constructor(props) {
    super(props)
    this.step = [
      <Panel position="center">
        <p>Placez vous à l'adresse que vous souhaitez ajouter</p>
        <button onClick={props.nextStep}>Ok</button>
      </Panel>,
      <div class="overlay bottom">
        <div class="arrow-box">Appuyez sur le bouton pour ajouter une nouvelle adresse</div>
      </div>,
      <Panel position="top">
        <div>Saisissez le numéro ainsi que le nom de la voie de l'adresse</div>
      </Panel>,
      <Panel position="center">
        <div>
          <p>Félicitations vous venez de créer votre première adresse !</p>
          <p>Grâce à votre contribution, la base adresse national s'est enrichie</p>
          <div class="buttons">
            <button onClick={props.nextStep}>Fermer</button>
            <button onClick={props.saveProgression}>Sauvegarder ma progression</button>
          </div>
        </div>
      </Panel>,
    ]
  }

  render() {
    const { stepIndex } = this.props

    return this.step[stepIndex] || null
  }
}
