const { h, Component } = preact

export default class AddAddressButton extends Component {
  render() {
    const { openForm } = this.props

    return (
      <div class="circle" onClick={openForm}>
        <div class="AddAddressButton">
        <img src="addHome.svg"/>
        </div>
      </div>
    )
  }
}
