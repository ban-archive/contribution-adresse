const { bind } = decko
const { h, Component } = preact

import BottomMenu from './BottomMenu'
import UserAddress from './UserAddress'
import AddressHistory from './AddressHistory'
import AddressContribution from './AddressContribution'

export default class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {displayHistory: false}
  }

  @bind
  handleHistory() {
    this.setState({displayHistory: !this.state.displayHistory})
  }

  render() {
    const { displayHistory } = this.state
    const { userAddress, user, address, editAddress, removeAddress, handleContribution, cancelContribution } = this.props

    if (displayHistory) return <AddressHistory proposals={address.proposals} closeHistory={this.handleHistory} />

    return (
      <BottomMenu>
        {userAddress ?
          <UserAddress address={address.address} onEdit={editAddress} onRemove={removeAddress} displayHistory={this.handleHistory} /> :
          <AddressContribution user={user} address={address} handleContribution={handleContribution} cancelContribution={cancelContribution} displayHistory={this.handleHistory}/>
        }
      </BottomMenu>
    )
  }
}
