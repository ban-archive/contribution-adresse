import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from './app'
import Welcome from './Welcome'
import Map from './Map'

describe('App', () => {
  describe('user', () => {
    it('should render Map Component', () => {
      const wrapper = shallow(<App localUser={{token: '123456'}} localAddresses={[]} />)
      wrapper.instance().setState({coords: {lat: '123', lng: '123'}, error: null})

      expect(wrapper.find(Map).length).to.equal(1)
    })
  })

  describe('no user', () => {
    it('should render Welcome Component', () => {
      const wrapper = shallow(<App localUser={{token: null}} localAddresses={[]} />)

      expect(wrapper.find(Welcome)).to.have.length(1)
    })
  })
})
