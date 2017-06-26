const { h, Component } = preact
import AddAddressButton from './AddAddressButton'

export default class Dashboard extends Component {
  render() {
    const { speed, accuracy, openForm } = this.props

    return (
      <div class="Dashboard">
        <div class="measures"><img src="accuracy_icon.svg" /> {accuracy}m</div>
        <AddAddressButton openForm={openForm} />
        <div class="measures"><img src="speed_icon.svg" /> {speed > 0 ? speed : 0}km/h</div>
      </div>
    )
  }
}
