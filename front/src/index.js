import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { useLocalStorage } from './helpers/localStorage'

function loadLocalStorage() {
  const addresses = useLocalStorage('getItem', 'addresses') || []
  const user = useLocalStorage('getItem', 'user') || {token: null, badges: []}
  return {user, addresses}
}

const { user, addresses } = loadLocalStorage()

// render an instance of App into <body>:
render(<App localUser={user} localAddresses={addresses} />, document.getElementById('root'))
