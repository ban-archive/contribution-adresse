const { h, Component } = preact

export default class Menu extends Component {
  render() {
    const { children, title, onClose } = this.props

    return (
      <div class="menu">
        <div>
          {title ? <h2>{title}</h2> : null}
          <img class="close" onClick={onClose} src="close_icon.svg"/>
        </div>
        {children}
      </div>
    )
  }
}
