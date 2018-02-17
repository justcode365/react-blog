import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SignUp extends Component {
  render() {
    return (
      <form className="SignIn">
        <h1>Sign Up</h1>
        <Link to="login">Have an account?</Link>
        <p>
          <input type="text" placeholder="Username" />
        </p>
        <p>
          <input type="text" placeholder="Email" />
        </p>
        <p>
          <input type="text" placeholder="Password" />
        </p>

        <p>
          <input type="submit" value="Sign up" />
        </p>
      </form>
    )
  }
}

export default SignUp
