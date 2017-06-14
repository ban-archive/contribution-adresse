class EmailForm extends Component {
  constructor(props) {
    super(props)
    this.state = {email: '', valid: props.userEmail ? true : false}
  }

  @bind
  handleEmailChange(e) {
    const email = e.target.value
    this.setState({email})
    this.validateEmail()
  }

  validateEmail() {
    const { email } = this.state
    const { userEmail } = this.props
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.setState({valid: re.test(email) || (!email.length && userEmail)})
  }

  @bind
  submit() {
    const { email } = this.state
    const { userEmail, onSubmit } = this.props

    onSubmit(email || userEmail)
  }

  render() {
    const { email, valid } = this.state
    const { userEmail } = this.props
    const formState = valid ? 'valid' : 'error'

    return (
      <div class="EmailForm">
        <input class={`${!email.length ? '' : formState}`} type="email" placeholder={userEmail || 'Email'} value={email} onInput={this.handleEmailChange} />
        {valid ?
          <button class="reverse" onClick={this.submit}>Enregister</button> :
          <button class="reverse" disabled>Enregister</button>
        }
      </div>
    )
  }
}
