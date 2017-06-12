class EmailForm extends Component {
  constructor(props) {
    super(props)
    this.state = {email: '', valid: false}
  }

  @bind
  handleEmailChange(e) {
    const email = e.target.value
    this.setState({email})
    this.validateEmail()
  }

  validateEmail() {
    const { email } = this.state
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.setState({valid: re.test(email)})
  }

  @bind
  submit() {
    const { email } = this.state
    const { onSubmit } = this.props

    onSubmit(email)
  }

  render() {
    const { email, valid } = this.state
    const { userEmail } = this.props
    const formState = valid ? 'valid' : 'error'

    return (
      <div class="EmailForm">
        <input class={`${!email.length ? '' : formState}`} type="email" placeholder="Email" value={email || userEmail} onInput={this.handleEmailChange} />
        {valid ?
          <button class="reverse" onClick={this.submit}>Enregister</button> :
          <button class="reverse" disabled="true">Enregister</button>
        }
      </div>
    )
  }
}
