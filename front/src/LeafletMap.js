const { h, Component } = preact

class LeafletMap extends Component {
  componentDidMount() {
    const { coords, onCloseForm, fullscreen } = this.props
    const { latitude, longitude } = coords
    this.map = L.map(this.container, {
      zoomControl: false,
      dragging: false,
      center: [latitude, longitude],
      zoom: 18,
      preferCanvas: true,
    })

    if (fullscreen) this.map.on('click', onCloseForm)

    L.vectorGrid.protobuf('https://free-{s}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key={key}', {
      subdomains: '0123',
      key: 'Cix9ftgsKpmlL57ju0pR',
      maxZoom: 14,
      rendererFactory: L.canvas.tile,
    }).addTo(this.map)
  }

  updateMap() {
    const { latitude, longitude } = this.props.coords
    this.props.markers.map(marker => {
      if (!this.map.hasLayer(marker)) {
        marker.addTo(this.map)
        marker.on('click', this.props.onShowAddress)
      }
    })
    this.map.panTo([latitude, longitude])
    this.map.invalidateSize(true) // Check if Checks if the map container size changed and updates the map
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    const { fullscreen } = this.props
    if (this.map) this.updateMap()

    return (
      <div id="map" style={{height: fullscreen ? '100%' : '50%'}} ref={ref => this.container = ref} />
    )
  }
}
