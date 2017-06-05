class Dashboard extends Component {
  render() {
    const { speed, accuracy, openMenu, tutoNextStep } = this.props

    return (
      <div class="Dashboard">
        <div class="measures"><img src="accuracy_icon.png" /> {accuracy}m</div>
        <AddAddressButton openMenu={openMenu} tutoNextStep={tutoNextStep} />
        <div class="measures"><img src="speed_icon.png" /> {speed > 0 ? speed : 0}km/h</div>
      </div>
    )
  }
}
