class Menu extends Component {
  render() {
    const { address, coords, createAddress, editAddress, removeAddress } = this.props

    return (
      <div class="Menu">
        {address ?
          <Address address={address} editAddress={editAddress} removeAddress={removeAddress} /> :
          <CreateAddress coords={coords} createAddress={createAddress} />}
      </div>
    )
  }
}
