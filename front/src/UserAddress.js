const { h } = preact

const UserAddress = ({ address, onEdit, onRemove, displayHistory }) => {
  const { houseNumber, additional, street } = address

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
        <button onClick={onRemove} class="remove">Supprimer</button>
        <button onClick={onEdit} class="edit">Modifier</button>
      </div>
      <button onClick={displayHistory}>Voir l'historique</button>
    </div>
  )
}

export default UserAddress
