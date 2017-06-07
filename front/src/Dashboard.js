class Dashboard extends Component {
  render() {
    const { speed, accuracy, openMenu } = this.props

    return (
      <div class="Dashboard">
        <div class="measures"><img src="accuracy_icon.png" /> {accuracy}m</div>
        <AddAddressButton openMenu={openMenu} />
        <div class="measures"><img src="speed_icon.png" /> {speed > 0 ? speed : 0}km/h</div>
      </div>
    )
  }
}
