const { h, Component } = preact

export default class AddAddressButton extends Component {
  render() {
    const { openMenu } = this.props

    return (
      <div class="circle" onClick={openMenu}>
        <div class="AddAddressButton">
        <img src="addHome.svg"/>
        </div>
      </div>
    )
  }
}
