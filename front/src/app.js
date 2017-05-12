const { h, render, Component } = preact

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: null,
      watchId: null,
    }
  }

  componentDidMount() {
    this.updatePosition()
  }

  componentWillUnmount() {
    const { watchId } = this.state
    navigator.geolocation.clearWatch(watchId)
  }

  updatePosition() {
    const watchId = navigator.geolocation.watchPosition(position => {
      console.log('updatePosition to :', position.coords)
      this.setState({coords: position.coords})
    })

    this.setState({watchId})
  }

  render() {
    const { coords } = this.state
    if (!coords) return <div class="loading">Chargement...</div>

    return <LeafletMap coords={coords}/>
  }
}

// render an instance of App into <body>:
render(<App />, document.body)
