import React, { Component } from 'react'

export default class AddAddressButton extends Component {
  render() {
    const { openForm } = this.props

    return (
      <div className="circle" onClick={openForm}>
        <div className="AddAddressButton">
          <img src="addHome.svg"/>
        </div>
      </div>
    )
  }
}
