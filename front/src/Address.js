const { h } = preact

import UserAddress from './UserAddress'
import AddressContribution from './AddressContribution'

const Address = ({ userAddress, user, address, editAddress, removeAddress, handleContribution, cancelContribution }) => {
  return (
    <div>
      {userAddress ?
        <UserAddress address={address.address} onEdit={editAddress} onRemove={removeAddress} /> :
        <AddressContribution user={user} address={address} handleContribution={handleContribution} cancelContribution={cancelContribution}/>
      }
    </div>
  )
}

export default Address
