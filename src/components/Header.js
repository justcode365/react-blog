import React, { Component, Fragment } from 'react'
import { Consumer } from 'routes'
import './Header.css'

class Header extends Component {
  componentDidMount() {
    this.fetchUser()
  }

  componentDidUpdate() {
    this.fetchUser()
  }

  fetchUser = async () => {
    const token = localStorage.getItem('token')
    if (token && !this.props.user) {
      const res = await fetch(`${process.env.REACT_APP_API}/user`, {
        headers: { authorization: token }
      })
      const { user } = await res.json()
      this.props.setUser(user)
    }
  }

  render() {
    const { user, linkClick } = this.props
    return (
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
                <a href="/editor" onClick={linkClick}>
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
                <a href={`/@${user.username}`} onClick={linkClick}>
                  <img src={user.image} width={30} alt="avatar" />
                  <span>{user.username}</span>
                </a>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    )
  }
}

export default () => <Consumer>{context => <Header {...context} />}</Consumer>
