import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'
import Error from './Error'

describe('', () => {
  it('', () => {
    const msg = 'error message'
    const wrapper = mount(<Error error={msg} />)
    expect(wrapper.text()).to.contains(msg)
  })
})
