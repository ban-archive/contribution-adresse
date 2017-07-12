import React from 'react'

const Locator = ({ accuracy, fullscreen, display }) => {
  const dimensionMin = screen.width > screen.height ? screen.height - 150 : screen.width
  const accuracyMin = accuracy > dimensionMin ? dimensionMin : accuracy
  const margin = (accuracy / 2) * -1
  const locatorStyle = {
    position: 'absolute',
    top: fullscreen ? '50%' : '25%',
    left: '50%',
  }
  const radarStyle = {
    width: accuracyMin,
    height: accuracyMin,
    marginTop: margin,
    marginLeft: margin,
  }

  if (!display) return

  return (
    <div className="Locators" style={locatorStyle}>
      <div id="radar" style={radarStyle} />
      <div id="user" />
    </div>
  )
}

export default Locator
