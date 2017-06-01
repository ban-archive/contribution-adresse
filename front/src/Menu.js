class Menu extends Component {
  render() {
    const { selectedAddress, coords, createAddress, editAddress, removeAddress } = this.props

    return (
      <div class="Menu">
        {selectedAddress ?
          <Address selectedAddress={selectedAddress} editAddress={editAddress} removeAddress={removeAddress} /> :
          <CreateAddress coords={coords} createAddress={createAddress} />}
      </div>
    )
  }
}
