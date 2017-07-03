export function addressToString(address) {
  return Object.keys(address).map(key => {
    if (!address[key]) return
    return address[key].toString()
  }).join(' ')
}

export function isSameAddress(address1, address2) {
  if (address1.houseNumber !== address2.houseNumber) return false
  if (address1.additional !== address2.additional) return false
  if (address1.street !== address2.street) return false

  return true
}
