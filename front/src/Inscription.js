class Inscription extends Component {
  render() {
    const { inscription, close } = this.props

    return (
      <div class="menu">
        <img class="close" onClick={close} src="close_icon.svg" />
        <h2>inscription</h2>
        <EmailForm onSubmit={inscription} />
      </div>
    )
  }
}
