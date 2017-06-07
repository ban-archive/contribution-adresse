class Tuto extends Component {
  constructor(props) {
    super(props)
    this.step = [
      <div class="Tuto tuto0">
        <div class="panel">
          <p>Placez vous à l'adresse que vous souhaitez ajouter</p>
          <button onClick={() => props.nextStep(1)}>Ok</button>
        </div>
      </div>,
      <div class="Tuto tuto1">
        <div class="arrow-box">Appuyez sur le bouton pour ajouter une nouvelle adresse</div>
      </div>,
      <div class="tuto2">
        <div class="panel">Saisissez le numéro ainsi que le nom de la voie de l'adresse</div>
      </div>,
      <div class="Tuto tuto3">
        <div class="panel">
          <p>Félicitations vous venez de créer votre première adresse !</p>
          <p>Grâce à votre contribution, la base adresse national s'est enrichie</p>
          <button onClick={() => props.nextStep(4)}>Ok</button>
        </div>
      </div>,
    ]
  }

  render() {
    const { stepIndex } = this.props

    return this.step[stepIndex] || null
  }
}
