import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

class SignIn extends Component {
  render() {
    return (
      <form action="" className="blog-form">
        <h1>Sign In</h1>
        <Link to="register">Need an account?</Link>
        <p>
          <input type="text" placeholder="Email" />
        </p>
        <p>
          <input type="text" placeholder="Password" />
        </p>

        <p>
          <input type="submit" value="Sign in" />
        </p>
      </form>
    )
  }
}

export default SignIn
