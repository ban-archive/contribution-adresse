import { h } from 'preact'

import AddressContribution from './AddressContribution'

const Address = ({ user, address, editAddress, removeAddress, handleContribution, cancelContribution }) => {
  const { houseNumber, additional, street } = address.address

  if (address.createBy.token !== user.token ) {
    return <AddressContribution user={user} address={address} handleContribution={handleContribution} cancelContribution={cancelContribution}/>
  }

  return (
    <div className="Address">
      <div className="address">
        <img className="location_logo" src="location_logo.svg" alt="location_logo" />
        <div className="address">
          {houseNumber} {additional} {street}
        </div>
      </div>
      <div className="divider" />
      <div className="actions">
        <button onClick={removeAddress} className="remove">Supprimer</button>
        <button onClick={editAddress} className="edit">Modifier</button>
      </div>
    </div>
  )
}

export default Address
