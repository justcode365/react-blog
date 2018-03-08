import React, { Component, Fragment } from 'react'
import { Edit, Settings } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default class Header extends Component {
  componentDidMount() {
    console.log('Header mount')
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

      console.log('get userinfo')
      this.props.setUser(user)
    }
  }

  render() {
    const { user, linkClick } = this.props
    return (
      <Nav className="container">
        <Link to="/">conduit</Link>

        <HeaderUL>
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
                <a href="/editor" onClick={linkClick}>
                  <Edit color="#aaa" size={16} className="Header-logo" />
                  New Post
                </a>
              </li>

              <li>
                <a href="/settings" onClick={linkClick}>
                  <Settings color="#aaa" size={16} className="Header-logo" />
                  Settings
                </a>
              </li>

              <li>
                <a href={`/@${user.username}`} onClick={linkClick}>
                  <img src={user.image} width={26} alt="avatar" style={{ marginRight: 3 }} />
                  <span>{user.username}</span>
                </a>
              </li>
            </Fragment>
          )}
        </HeaderUL>
      </Nav>
    )
  }
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > a {
    color: var(--green);
    font-size: 1.5rem;
    font-weight: bold;
  }
`

const HeaderUL = styled.ul`
  display: flex;
  align-items: center;

  li {
    margin-left: 1rem;
  }

  a {
    color: rgba(0, 0, 0, 0.3);
    display: inline-flex;
    align-items: center;
  }

  a:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`
