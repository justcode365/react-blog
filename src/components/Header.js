import React from 'react'
import { Link } from 'react-router-dom'
import { Settings, Edit } from 'react-feather'

import './Header.css'

export default ({ user }) => (
  <header className="container Header">
    <h2>conduit</h2>
    <nav>
      {user ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Edit color="#aaa" size={16} />
            <Link to="/newPost">New Post</Link>
          </li>
          <li>
            <Settings color="#aaa" size={16} />
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <img src={user.image} width={30} alt="avatar" />
            <span>{user.username}</span>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Sign in</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
        </ul>
      )}
    </nav>
  </header>
)
