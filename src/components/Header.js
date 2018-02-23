import React from 'react'
import { Consumer } from 'routes'
import './Header.css'

export default () => (
  <Consumer>
    {context => (
      <nav className="Header container">
        <a href="/" className="Header-brand">
          conduit
        </a>
        <ul className="Header-link">
          <li>
            <a href="/home" onClick={context.route}>
              Home
            </a>
          </li>
          <li>
            <a href="/signin" onClick={context.route}>
              Sign in
            </a>
          </li>
          <li>
            <a href="/signup" onClick={context.route}>
              Sign up
            </a>
          </li>
        </ul>
      </nav>
    )}
  </Consumer>
)
