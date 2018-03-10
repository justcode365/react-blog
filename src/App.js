import React, { Component, createContext } from 'react'
import Router from './routes'

const { Provider, Consumer } = createContext()

export default class App extends Component {
  state = { user: {} }

  componentDidMount() {
    this.fetchUser()
  }

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

  setUser = user => {
    localStorage.setItem('token', 'Token ' + user.token)
    this.setState({ user })
  }

  removeUser = () => {
    localStorage.removeItem('token')
    this.setState({ user: null })
  }

  render() {
    return (
      <Provider
        value={{
          user: this.state.user,
          setUser: this.setUser,
          removeUser: this.removeUser
        }}
      >
        <Router />
      </Provider>
    )
  }
}

export { Consumer }
