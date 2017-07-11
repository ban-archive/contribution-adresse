import React from 'react'

const Welcome = ({ skip }) => {
  return (
    <div className="Welcome">
      <div className="head">
        <div><h1>C<img className="logo" alt="o" src="addHome.svg"/>ntrib'Adresses</h1></div>
        <div className="legend">Outil de contribution citoyenne au référentiel des adresses</div>
        <p>Raz-le-bol que personne ne trouve votre adresse ?</p>
      </div>
      <div className="slogan">
        <div><img className="gps" alt="illustration gps" src="gps.svg" /></div>
        <div><button onClick={skip}>Je veux contribuer !</button></div>
      </div>
    </div>
  )
}

export default Welcome
