import { h } from 'preact'

const Welcome = ({ skip }) => {
  return (
    <div class="Welcome">
      <div class="head">
        <div><h1>C<img class="logo" alt="o" src="addHome.svg"/>ntrib'Adresses</h1></div>
        <div class="legend">Outil de contribution citoyenne au référentiel des adresses</div>
        <p>Raz-le-bol que personne ne trouve votre adresse ?</p>
      </div>
      <div class="slogan">
        <div><img class="gps" alt="illustration gps" src="gps.svg" /></div>
        <div><button onClick={skip}>Je veux contribuer !</button></div>
      </div>
    </div>
  )
}

export default Welcome
