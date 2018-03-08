import React, { Component, createContext } from 'react'
import Router from './routes'

const { Provider, Consumer } = createContext()

export default class App extends Component {
  state = { user: undefined }

  componentDidMount() {
    this.fetchUser()
  }

  // componentDidUpdate() {
  //   this.fetchUser()
  // }

  fetchUser = async () => {
    const token = localStorage.getItem('token')
    if (token && !this.props.user) {
      const res = await fetch(`${process.env.REACT_APP_API}/user`, {
        headers: { authorization: token }
      })
      const { user } = await res.json()

      this.setUser(user)
    }
  }

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
