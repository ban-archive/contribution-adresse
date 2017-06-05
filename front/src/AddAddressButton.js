const { h } = preact

class AddAddressButton extends Component {
  @bind
  action() {
    const { openMenu, tutoNextStep } = this.props

    tutoNextStep(2)
    openMenu()
  }

  render() {
    return (
      <div class="circle" onClick={this.action}>
        <div class="AddAddressButton">
        <img src="addHome.svg"/>
        </div>
      </div>
    )
  }
}
