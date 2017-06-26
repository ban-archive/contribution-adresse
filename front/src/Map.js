const { h, Component } = preact

import LeafletMap from './LeafletMap'
import Locator from './Locator'

export default class Map extends Component {
  render() {
    const { user, addresses, selectedAddress, coords, fullscreen, displayAddress, closeMenu } = this.props
    if (this.leafletMap) this.leafletMap.forceUpdate()

    return (
      <div>
        <LeafletMap ref={ref => this.leafletMap = ref} user={user} addresses={addresses} selectedAddress={selectedAddress} displayAddress={displayAddress} onCloseMenu={closeMenu} coords={coords} fullscreen={fullscreen} />
        {!selectedAddress ? <Locator accuracy={coords.accuracy} fullscreen={fullscreen} /> : null}
      </div>
    )
  }
}
