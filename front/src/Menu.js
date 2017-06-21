const { h, Component } = preact

export default class Menu extends Component {
  render() {
    const { children } = this.props

    return (
      <div class="Menu">
        {children}
      </div>
    )
  }
}
