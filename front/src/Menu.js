const { h, Component } = preact

export default class Menu extends Component {
  render() {
    const { children, title, onClose } = this.props
    let header = <img class="close" onClick={onClose} src="close_icon.svg"/>

    if (title) {
      header = (
        <div class="header">
          <div>{title}</div>
          <img class="close inverted" onClick={onClose} src="close_icon.svg"/>
        </div>
      )
    }

    return (
      <div class="menu">
        {header}
        {children}
      </div>
    )
  }
}
