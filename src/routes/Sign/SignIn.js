import React, { Component } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import { Consumer } from 'routes'
import './Sign.css'

class SignIn extends Component {
  state = { email: '', password: '' }
  handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state

    const url = 'https://conduit.productionready.io/api/users/login'
    const options = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    }

    const res = await fetch(url, options)
    const { user } = await res.json()

    localStorage.setItem('token', 'Token ' + user.token)

    this.props.redirect('/')
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state

    return (
      <form className="Sign" onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>
        <a href="/signup" onClick={this.props.linkClick}>
          Need an account?
        </a>

        <p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </p>
        <p>
          <input type="submit" name="password" value="Sign in" />
        </p>
      </form>
    )
  }
}

export default () => (
  <Consumer>{({ linkClick, redirect }) => <SignIn {...{ linkClick, redirect }} />}</Consumer>
)
