class Welcome extends Component {
  render() {
    const { skip } = this.props

    return (
      <div class="Welcome">
        <div class="head">
          <div><h1>C<img class="logo" src="addHome.svg"/>ntrib'Adresses</h1></div>
          <div class="legend">Outil de contribution citoyenne aux référentiels d'adresses</div>
          <p>Ras-le-bol que personne ne trouve votre adresse ?</p>
        </div>
        <div class="slogan">
          <div><img class="gps" src="gps.svg" /></div>
          <div><button onClick={skip}>Je veux contribuer !</button></div>
        </div>
      </div>
    )
  }
}
