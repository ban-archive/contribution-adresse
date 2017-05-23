class Menu extends Component {
  render() {
    const { marker, coords, createAddress, editAddress, removeAddress } = this.props

    return (
      <div class="Menu">
        {marker ?
          <Address marker={marker} editAddress={editAddress} removeAddress={removeAddress} /> :
          <CreateAddress coords={coords} createAddress={createAddress} />}
      </div>
    )
  }
}
