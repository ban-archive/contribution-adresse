const { h } = preact

import Dashboard from './Dashboard'
import Menu from './Menu'
import Address from './Address'
import AddressForm from './AddressForm'
import AddressContribution from './AddressContribution'

const BottomNavigation = ({ user, selectedAddress, houseNumber, additional, street, speed, accuracy, displayDashboard, openMenu, handleHouseNumberChange, handleAdditionalChange, handleStreetChange, editAddress, removeAddress, addProposal, removeProposal, addAddress }) => {
  if (displayDashboard) return <Dashboard speed={speed} accuracy={accuracy} openMenu={openMenu} />

  return (
      <Menu>
        {selectedAddress ?
          (selectedAddress.createBy.token === user.token ?
            <Address houseNumber={houseNumber} additional={additional} street={street} handleHouseNumberChange={handleHouseNumberChange} handleAdditionalChange={handleAdditionalChange} handleStreetChange={handleStreetChange} editAddress={editAddress} removeAddress={removeAddress} /> :
            <AddressContribution user={user} address={selectedAddress} handleContribution={addProposal} cancelContribution={removeProposal}/>
          ) :
          <AddressForm houseNumber={houseNumber} additional={additional} street={street} onHouseNumberChange={handleHouseNumberChange} onAdditionalChange={handleAdditionalChange} onStreetChange={handleStreetChange} onSubmit={addAddress} />
        }
      </Menu>
  )
}

export default BottomNavigation
