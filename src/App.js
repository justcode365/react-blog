import React, { createContext } from 'react'
import Router from './routes'

const { Provider, Consumer } = createContext()

export default () => (
  <Provider>
    <Router />
  </Provider>
)

export { Consumer }
