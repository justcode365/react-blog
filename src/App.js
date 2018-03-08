import React, { Component, createContext } from 'react'
import Router from './routes'

const { Provider, Consumer } = createContext()

export default class App extends Component {
  state = { user: undefined }

  setUser = user => this.setState({ user })

  render() {
    const { user } = this.state
    return (
      <Provider value={{ setUser: this.setUser, user }}>
        <Router />
      </Provider>
    )
  }
}

export { Consumer }
