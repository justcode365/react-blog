import React, { Component } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import { Consumer } from 'routes'
import './Sign.css'

export default class SignIn extends Component {
  state = { email: '', password: '', redirectToHome: false }
  handleSubmit = async event => {
    event.preventDefault()
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

    this.setState({ redirectToHome: true })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, redirectToHome } = this.state

    // if (redirectToHome) return <Redirect to="/" />
    return (
      <form className="Sign" onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>
        <Consumer>
          {context => (
            <a href="/signup" onClick={context.route}>
              Need an account?
            </a>
          )}
        </Consumer>
        <p>
          <input type="text" placeholder="Email" name="email" onChange={this.handleChange} />
        </p>
        <p>
          <input type="text" placeholder="Password" name="password" onChange={this.handleChange} />
        </p>
        <p>
          <input
            type="submit"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value="Sign in"
          />
        </p>
      </form>
    )
  }
}
