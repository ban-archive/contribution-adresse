const { h, Component } = preact

export default class BottomMenu extends Component {
  render() {
    const { children } = this.props

    return (
      <div class="BottomMenu">
        {children}
      </div>
    )
  }
}
