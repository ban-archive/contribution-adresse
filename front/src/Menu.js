import { h, Component } from 'preact'

export default class Menu extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="Menu">
        {children}
      </div>
    )
  }
}
