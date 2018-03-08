import React, { Component } from 'react'
import Form from '../components/Form'
import { Link } from 'react-router-dom'
import { SignWrapper } from './SignUp'

export default class SignIn extends Component {
  state = { email: '', password: '', error: '' }
  handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state

    const url = 'https://conduit.productionready.io/api/users/login'
    const options = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    }

    try {
      const res = await fetch(url, options)
      const info = await res.json()
      if (info.errors) {
        this.setState({ error: 'email or password is invalid' })
        return
      }

      localStorage.setItem('token', 'Token ' + info.user.token)
      this.props.redirect('/')
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, error } = this.state

    return (
      <SignWrapper>
        <Form>
          <header>
            <h1>Sign In</h1>

            <Link to="/signup">Need an account?</Link>
          </header>

          {error && <li className="Form-error">{error}</li>}

          <p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <input type="submit" value="Sign in" />
          </p>
        </Form>
      </SignWrapper>
    )
  }
}
