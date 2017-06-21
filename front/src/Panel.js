const { h, Component } = preact

export default class Panel extends Component {
  render() {
    const { close, children, position='', reverse=false } = this.props

    return (
      <div class={`overlay resizable ${position}`}>
        <div class={`panel ${reverse ? 'reverse' : ''}`}>
          { close ? <img class="close" onClick={close} src="close_icon.svg"/> : null}
          {children}
        </div>
      </div>
    )
  }
}
