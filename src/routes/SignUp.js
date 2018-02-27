import React, { Component } from 'react'
import { Consumer } from 'routes'

export default class SignUp extends Component {
  handleChange = () => {}
  render() {
    return (
      <form className="sign form">
        <header>
          <h1>Sign Up</h1>
          <Consumer>
            {context => (
              <a href="/signin" onClick={context.linkClick}>
                Have an account?
              </a>
            )}
          </Consumer>
        </header>
        <p>
          <input type="text" placeholder="Username" name="username" onChange={this.handleChange} />
        </p>
        <p>
          <input type="email" placeholder="Email" name="email" onChange={this.handleChange} />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
        </p>
        <p>
          <input type="submit" value="Sign up" />
        </p>
      </form>
    )
  }
}
