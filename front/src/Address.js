const { h } = preact

import AddressContribution from './AddressContribution'

const Address = ({ user, address, editAddress, removeAddress, handleContribution, cancelContribution }) => {
  const { houseNumber, additional, street } = address.address

  if (address.createBy.token !== user.token ) {
    return <AddressContribution user={user} address={address} handleContribution={handleContribution} cancelContribution={cancelContribution}/>
  }
  
  return (
    <div class="Address">
      <div class="address">
        <img class="location_logo" src="location_logo.svg" alt="location_logo" />
        <div class="address">
          {houseNumber} {additional} {street}
        </div>
      </div>
      <div class="divider" />
      <div class="actions">
        <button onClick={removeAddress} class="remove">Supprimer</button>
        <button onClick={editAddress} class="edit">Modifier</button>
      </div>
    </div>
  )
}

export default Address
