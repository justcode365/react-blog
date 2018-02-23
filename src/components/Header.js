import React, { Component, Fragment } from 'react'
import { Consumer } from 'routes'
import './Header.css'

export default class Header extends Component {
  state = { user: null }

  componentDidUpdate() {
    const token = localStorage.getItem('token')
    if (token && !this.state.user) {
      this.fetchUser(token)
    }
  }

  fetchUser = async token => {
    const res = await fetch(`${process.env.REACT_APP_API}/user`, {
      headers: { authorization: token }
    })
    const { user } = await res.json()
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    return (
      <Consumer>
        {({ linkClick }) => (
          <nav className="Header container">
            <a href="/" className="Header-brand">
              conduit
            </a>
            <ul className="Header-link">
              <li>
                <a href="/home" onClick={linkClick}>
                  Home
                </a>
              </li>

              {!user ? (
                <Fragment>
                  <li>
                    <a href="/signin" onClick={linkClick}>
                      Sign in
                    </a>
                  </li>
                  <li>
                    <a href="/signup" onClick={linkClick}>
                      Sign up
                    </a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    {/* <Edit color="#aaa" size={16} /> */}
                    <a href="/newPost" onClick={linkClick}>
                      New Post
                    </a>
                  </li>

                  <li>
                    {/* <Settings color="#aaa" size={16} /> */}
                    <a href="/settings" onClick={linkClick}>
                      Settings
                    </a>
                  </li>
                  <li>
                    <img src={user.image} width={30} alt="avatar" />
                    <span>{user.username}</span>
                  </li>
                </Fragment>
              )}
            </ul>
          </nav>
        )}
      </Consumer>
    )
  }
}
