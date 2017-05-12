const { h, Component } = preact

class LeafletMap extends Component {
  componentDidMount() {
    const { latitude, longitude } = this.props.coords
    this.map = L.map(this.container, {
      zoomControl: false,
      dragging: false,
      center: [latitude, longitude],
      zoom: 18,
      preferCanvas: true,
    })
    this.marker = L.marker(this.map.getCenter()).addTo(this.map)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
  }

  updateMap() {
    const { latitude, longitude } = this.props.coords
    this.marker.setLatLng([latitude, longitude])
    this.map.panTo(this.marker.getLatLng())
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    if (this.map) this.updateMap()
    return (
      <div id="map"
         ref={ ref => this.container = ref } />
    )
  }
}
