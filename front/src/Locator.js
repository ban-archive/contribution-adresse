import { h } from 'preact'

const Locator = ({ accuracy, fullscreen }) => {
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
  return (
    <div class="Locators" style={locatorStyle}>
      <div id="radar" style={radarStyle} />
      <div id="user" />
    </div>
  )
}

export default Locator
