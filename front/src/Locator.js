const { h } = preact

const Locator = ({ accuracy }) => {
  const margin = (accuracy / 2) * -1
  const style = {
    width: accuracy,
    height: accuracy,
    marginTop: margin,
    marginLeft: margin,
  }
  return (
    <div>
      <div id="locator" style={style}></div>
      <div id="user"></div>
    </div>
  )
}
