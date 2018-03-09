import React, { Fragment } from 'react'
import { Edit, Settings } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Consumer } from '../App'

export default () => (
  <Nav className="container">
    <Link to="/">conduit</Link>
    <UL>
      <li>
        <Link to="/">Home</Link>
      </li>

      <Consumer>
        {({ user }) =>
          !user ? (
            <Fragment>
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link to="/editor">
                  <Edit color="#aaa" size={16} className="Header-logo" />
                  New Post
                </Link>
              </li>

              <li>
                <Link to="/settings">
                  <Settings color="#aaa" size={16} className="Header-logo" />
                  Settings
                </Link>
              </li>

              <li>
                <Link to={`/@${user.username}`}>
                  <img src={user.image} width={26} alt="avatar" style={{ marginRight: 3 }} />
                  <span>{user.username}</span>
                </Link>
              </li>
            </Fragment>
          )
        }
      </Consumer>
    </UL>
  </Nav>
)

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

const UL = styled.ul`
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
