const { h } = preact

const Locator = ({ accuracy }) => {
  const dimensionMin = screen.width > screen.height ? screen.height - 150 : screen.width
  const accuracyMin = accuracy > dimensionMin ? dimensionMin : accuracy
  const margin = (accuracyMin / 2) * -1
  const style = {
    width: accuracyMin,
    height: accuracyMin,
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
