import React from 'react'
import './Header.css'

export default () => {
  return (
    <nav className="Header container">
      <a href="/" className="Header-brand">
        conduit
      </a>
      <ul className="Header-link">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/login">Sign in</a>
        </li>
        <li>
          <a href="/signup">Sign up</a>
        </li>
      </ul>
    </nav>
  )
}
